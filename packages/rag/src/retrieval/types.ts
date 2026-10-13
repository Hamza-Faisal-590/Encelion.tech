import { Citation } from '@encelion/types';

export interface RetrievedChunk {
  chunkId: string;
  documentId: string;
  knowledgeBaseId: string;
  content: string;
  score: number;
  headingPath?: string;
  documentTitle: string;
  metadata: Record<string, unknown>;
}

export interface RetrievalQuery {
  query: string;
  knowledgeBaseId: string;
  topK?: number;
  threshold?: number;
  strategy?: 'vector' | 'lexical' | 'hybrid';
}

export interface RetrievalResult {
  chunks: RetrievedChunk[];
  citations: Citation[];
  latencyMs: number;
  strategy: string;
}
