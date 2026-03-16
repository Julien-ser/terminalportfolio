#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { join } from 'path';
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) {
    console.error('Error: PINECONE_API_KEY environment variable is required');
    process.exit(1);
  }

  const indexName = process.env.PINECONE_INDEX_NAME || 'terminalportfolio';
  const embeddingsPath = join(process.cwd(), 'src/data/embeddings.json');

  try {
    console.log(`Reading embeddings from ${embeddingsPath}...`);
    const rawData = await readFile(embeddingsPath, 'utf-8');
    const data = JSON.parse(rawData);
    const chunks = data.chunks;

    if (!Array.isArray(chunks) || chunks.length === 0) {
      throw new Error('No chunks found in embeddings file');
    }

    console.log(`Loaded ${chunks.length} chunks from embeddings.json`);

    // Initialize Pinecone client
    const pinecone = new Pinecone({ apiKey });

    // Check if index exists
    const { indexNames } = await pinecone.listIndexes();
    const indexExists = indexNames.includes(indexName);

    // Create index if it doesn't exist
    if (!indexExists) {
      console.log(`Creating index "${indexName}"...`);
      await pinecone.createIndex({
        name: indexName,
        dimension: 1536,
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1',
          },
        },
      });
      console.log('Index created. Waiting for index to be ready...');
      await pinecone.waitForIndexReady(indexName);
    }

    const index = pinecone.index(indexName);

    // Upsert vectors in batches
    const batchSize = 100;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const vectors = batch.map((chunk, idx) => {
        const filename = chunk.metadata?.filename ?? 'unknown';
        const chunkIndex = chunk.metadata?.chunkIndex ?? idx;
        const id = `${filename}-${chunkIndex}`;

        if (!chunk.embedding || !Array.isArray(chunk.embedding)) {
          throw new Error(`Chunk ${id} is missing embedding array`);
        }

        // Store content and metadata
        const metadata = {
          content: chunk.content,
          source: chunk.metadata?.source ?? '',
          filename: chunk.metadata?.filename ?? '',
          chunkIndex: chunk.metadata?.chunkIndex ?? idx,
        };

        return { id, values: chunk.embedding, metadata };
      });

      await index.upsert(vectors);
      console.log(`Upserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(chunks.length / batchSize)} (${vectors.length} vectors)`);
    }

    // Get index stats
    const stats = await index.describeStats();
    console.log('Index stats:', JSON.stringify(stats, null, 2));

    // Get index host for client-side usage
    const description = await index.describeIndex();
    console.log(`\nIndex "${indexName}" is ready.`);
    console.log(`Pinecone Host: ${description.host}`);
    console.log('\nPlease add the following to your .env.local file:');
    console.log(`VITE_PINECONE_INDEX_HOST=${description.host}`);

    console.log('\nIndex population completed successfully!');
  } catch (error) {
    console.error('Index creation failed:', error);
    process.exit(1);
  }
}

main();
