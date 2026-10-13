import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma } from '@encelion/database';
import { chunkDocument } from '@encelion/rag';
import { generateBatchEmbeddings } from '@encelion/rag';

@Injectable()
export class RagService {
  /**
   * Create a new knowledge base for a tenant
   */
  async createKnowledgeBase(tenantId: string, data: { name: string; description?: string }) {
    return prisma.knowledgeBase.create({
      data: {
        tenantId,
        name: data.name,
        description: data.description,
      },
    });
  }

  /**
   * List all knowledge bases for a tenant
   */
  async listKnowledgeBases(tenantId: string) {
    return prisma.knowledgeBase.findMany({
      where: { tenantId },
      include: { _count: { select: { documents: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single knowledge base, scoped to tenant
   */
  async getKnowledgeBase(tenantId: string, kbId: string) {
    const kb = await prisma.knowledgeBase.findFirst({
      where: { id: kbId, tenantId },
      include: {
        documents: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!kb) throw new NotFoundException('Knowledge base not found');
    return kb;
  }

  /**
   * Delete knowledge base and all related documents/chunks
   */
  async deleteKnowledgeBase(tenantId: string, kbId: string) {
    const kb = await prisma.knowledgeBase.findFirst({ where: { id: kbId, tenantId } });
    if (!kb) throw new NotFoundException('Knowledge base not found');
    await prisma.knowledgeBase.delete({ where: { id: kbId } });
    return { deleted: true };
  }

  /**
   * Ingest a text document: chunk → embed → store
   */
  async ingestDocument(
    tenantId: string,
    kbId: string,
    data: { title: string; content: string; mimeType?: string; sourceUrl?: string }
  ) {
    // Verify KB belongs to tenant
    const kb = await prisma.knowledgeBase.findFirst({ where: { id: kbId, tenantId } });
    if (!kb) throw new NotFoundException('Knowledge base not found');

    // Create document record
    const doc = await prisma.document.create({
      data: {
        knowledgeBaseId: kbId,
        title: data.title,
        mimeType: data.mimeType || 'text/plain',
        fileSizeBytes: Buffer.byteLength(data.content, 'utf8'),
        sourceUrl: data.sourceUrl,
        status: 'PROCESSING',
      },
    });

    try {
      // 1. Chunk the document
      const chunks = chunkDocument(data.content, { maxChunkSize: 500, overlapSize: 50 });

      // 2. Generate embeddings in batch
      const texts = chunks.map((c) => c.content);
      const embeddings = await generateBatchEmbeddings(texts);

      // 3. Store chunks + embeddings
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const embeddingVector = embeddings[i];

        const storedChunk = await prisma.documentChunk.create({
          data: {
            documentId: doc.id,
            chunkIndex: chunk.chunkIndex,
            content: chunk.content,
            headingPath: chunk.headingPath,
            tokenCount: chunk.tokenCount,
            metadata: {},
          },
        });

        // Store embedding as JSON string (production: use pgvector extension)
        await prisma.embedding.create({
          data: {
            chunkId: storedChunk.id,
            provider: 'openai',
            modelName: 'text-embedding-3-small',
            dimensions: embeddingVector.length,
            vector: JSON.stringify(embeddingVector),
          },
        });
      }

      // Mark document as indexed
      await prisma.document.update({
        where: { id: doc.id },
        data: { status: 'INDEXED' },
      });

      return {
        documentId: doc.id,
        title: doc.title,
        chunksCreated: chunks.length,
        status: 'INDEXED',
      };
    } catch (err: any) {
      await prisma.document.update({
        where: { id: doc.id },
        data: { status: 'FAILED', errorMessage: err.message },
      });
      throw new BadRequestException(`Document ingestion failed: ${err.message}`);
    }
  }

  /**
   * Hybrid keyword retrieval (simplified - production uses pgvector cosine similarity)
   */
  async retrieve(tenantId: string, query: string, kbIds: string[], topK = 5) {
    const chunks = await prisma.documentChunk.findMany({
      where: {
        document: {
          knowledgeBase: {
            tenantId,
            ...(kbIds.length > 0 ? { id: { in: kbIds } } : {}),
          },
        },
      },
      include: {
        document: {
          select: { title: true, knowledgeBaseId: true },
        },
      },
      take: topK * 3, // over-fetch for reranking
    });

    // Simple keyword scoring (production: use pgvector cosine + Cohere reranker)
    const queryLower = query.toLowerCase();
    const scored = chunks
      .map((c) => ({
        chunkId: c.id,
        documentId: c.documentId,
        knowledgeBaseId: c.document.knowledgeBaseId,
        content: c.content,
        documentTitle: c.document.title,
        headingPath: c.headingPath,
        score: c.content.toLowerCase().split(' ').filter((w) => queryLower.includes(w)).length,
        metadata: c.metadata,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return scored;
  }
}
