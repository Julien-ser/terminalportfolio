import { generateEmbeddings } from './embeddingService';

export interface SearchResult {
  content: string;
  metadata: {
    source?: string;
    filename?: string;
    chunkIndex: number;
  };
  score: number;
}

// Get Pinecone configuration from environment
const PINECONE_INDEX_HOST = import.meta.env.VITE_PINECONE_INDEX_HOST;
const PINECONE_API_KEY = import.meta.env.VITE_PINECONE_API_KEY;

if (!PINECONE_INDEX_HOST || !PINECONE_API_KEY) {
  throw new Error(
    'Missing required environment variables: VITE_PINECONE_INDEX_HOST and VITE_PINECONE_API_KEY must be set'
  );
}

/**
 * Search for similar chunks in Pinecone vector database
 * @param query - The search query string
 * @param topK - Number of top results to return (default: 5)
 * @returns Promise of SearchResult array, sorted by relevance score
 */
export async function search(query: string, topK: number = 5): Promise<SearchResult[]> {
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    throw new Error('Invalid query: must be a non-empty string');
  }

  try {
    // Generate embedding for the query using OpenAI
    const queryEmbeddings = await generateEmbeddings([query], PINECONE_API_KEY);
    const queryVector = queryEmbeddings[0];

    // Query Pinecone
    const response = await fetch(`https://${PINECONE_INDEX_HOST}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': PINECONE_API_KEY,
      },
      body: JSON.stringify({
        vector: queryVector,
        topK,
        includeMetadata: true,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Pinecone query failed: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();

    // Transform matches into SearchResult format
    const results: SearchResult[] = (data.matches || []).map((match: any) => ({
      content: match.metadata?.content ?? '',
      metadata: {
        source: match.metadata?.source,
        filename: match.metadata?.filename,
        chunkIndex: match.metadata?.chunkIndex ?? 0,
      },
      score: match.score,
    }));

    return results;
  } catch (error) {
    console.error('Vector search error:', error);
    throw error;
  }
}
