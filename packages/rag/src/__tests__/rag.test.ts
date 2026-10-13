import { chunkDocument, generateEmbedding } from '../index';

describe('@encelion/rag', () => {
  it('should chunk document text into configured sizes', () => {
    const text = 'Sentence one. Sentence two. Sentence three. Sentence four. Sentence five.';
    const chunks = chunkDocument(text, { chunkSize: 30, chunkOverlap: 5 });
    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks[0].text).toBeDefined();
    expect(chunks[0].chunkIndex).toBe(0);
  });

  it('should generate vector embeddings of expected dimension', async () => {
    const embedding = await generateEmbedding('Encelion AI RAG test text');
    expect(embedding.vector).toBeDefined();
    expect(embedding.vector.length).toBe(1536);
    expect(embedding.tokensUsed).toBeGreaterThan(0);
  });
});
