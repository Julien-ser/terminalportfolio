#!/usr/bin/env node

/**
 * Ingest script to generate embeddings from portfolio markdown documents
 * Run with: npm run ingest or node scripts/ingest.js
 * Requires OPENAI_API_KEY or VITE_OPENAI_API_KEY environment variable
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import dotenv from 'dotenv';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

// Load environment variables from .env.local or .env
dotenv.config();

async function loadDocuments(dirPath) {
  const files = await readdir(dirPath);
  const markdownFiles = files.filter(file => extname(file).toLowerCase() === '.md');

  const documents = [];

  for (const file of markdownFiles) {
    const filePath = join(dirPath, file);
    const content = await readFile(filePath, 'utf-8');
    documents.push({
      content,
      metadata: {
        source: filePath,
        filename: file,
      },
    });
  }

  return documents;
}

async function chunkDocuments(docs, chunkSize = 1000, chunkOverlap = 200) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
    separators: ['\n\n', '\n', '. ', ' ', ''],
  });

  const chunks = [];

  for (const doc of docs) {
    const splitTexts = await splitter.splitText(doc.content);
    for (let i = 0; i < splitTexts.length; i++) {
      chunks.push({
        content: splitTexts[i],
        embedding: [], // will be filled later
        metadata: {
          ...doc.metadata,
          chunkIndex: i,
        },
      });
    }
  }

  return chunks;
}

async function generateEmbeddings(texts, apiKey, model = 'text-embedding-ada-002') {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: texts,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}${errorData.error?.message ? ` - ${errorData.error.message}` : ''}`);
  }

  const data = await response.json();
  return data.data.map(item => item.embedding);
}

async function main() {
  const apiKey = import.meta.env?.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY or VITE_OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  try {
    const docsDir = './src/data/docs';
    const outputPath = './src/data/embeddings.json';

    // Load documents
    console.log('Loading documents from:', docsDir);
    const documents = await loadDocuments(docsDir);
    console.log(`Loaded ${documents.length} documents`);

    // Chunk documents
    console.log('Chunking documents...');
    const chunks = await chunkDocuments(documents, 1000, 200);
    console.log(`Created ${chunks.length} chunks`);

    // Extract texts for embedding
    const texts = chunks.map(chunk => chunk.content);

    // Generate embeddings in batches to avoid rate limits
    console.log('Generating embeddings...');
    const embeddings = [];
    const batchSize = 100;
    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(texts.length / batchSize)}`);
      const batchEmbeddings = await generateEmbeddings(batch, apiKey);
      embeddings.push(...batchEmbeddings);
    }

    // Attach embeddings to chunks
    for (let i = 0; i < chunks.length; i++) {
      chunks[i].embedding = embeddings[i];
    }

    // Write output
    const outputData = {
      chunks,
      total: chunks.length,
      generatedAt: new Date().toISOString(),
    };
    await writeFile(outputPath, JSON.stringify(outputData, null, 2));
    console.log(`Embeddings saved to ${outputPath}`);
    console.log('Ingestion completed successfully!');
  } catch (error) {
    console.error('Ingestion failed:', error);
    process.exit(1);
  }
}

main();
