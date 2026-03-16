/**
 * Embedding Service for document chunking and embedding generation
 * Provides pure functions that can be used in both Node.js (ingestion) and browser (query embedding)
 */

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export interface Document {
  content: string;
  metadata: {
    source?: string;
    filename?: string;
    [key: string]: any;
  };
}

export interface Chunk {
  content: string;
  embedding: number[];
  metadata: {
    source?: string;
    filename?: string;
    chunkIndex: number;
    [key: string]: any;
  };
}

/**
 * Split documents into chunks using RecursiveCharacterTextSplitter
 */
export async function chunkDocuments(
  docs: Document[],
  chunkSize: number = 1000,
  chunkOverlap: number = 200
): Promise<Chunk[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
    separators: ['\n\n', '\n', '. ', ' ', ''],
  });

  const chunks: Chunk[] = [];

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

/**
 * Generate embeddings for an array of texts using OpenAI API
 */
export async function generateEmbeddings(
  texts: string[],
  apiKey: string,
  model: string = 'text-embedding-ada-002'
): Promise<number[][]> {
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
  return data.data.map((item: { embedding: number[] }) => item.embedding);
}
