export interface ChunkOptions {
  maxChunkSize?: number; // target token / char count
  overlapSize?: number;
}

export interface DocumentChunkOutput {
  chunkIndex: number;
  content: string;
  headingPath?: string;
  tokenCount: number;
}

/**
 * Recursive text chunker splitting by headings, paragraphs, and sentences.
 */
export function chunkDocument(
  text: string,
  options: ChunkOptions = {}
): DocumentChunkOutput[] {
  const maxChunkSize = options.maxChunkSize || 500;
  const overlapSize = options.overlapSize || 50;

  const paragraphs = text.split(/\n\n+/);
  const chunks: DocumentChunkOutput[] = [];
  let currentChunk = '';
  let chunkIndex = 0;
  let currentHeading = '';

  for (const para of paragraphs) {
    if (para.startsWith('#')) {
      currentHeading = para.replace(/^#+\s*/, '').trim();
    }

    if ((currentChunk.length + para.length) > maxChunkSize && currentChunk.length > 0) {
      chunks.push({
        chunkIndex,
        content: currentChunk.trim(),
        headingPath: currentHeading,
        tokenCount: Math.ceil(currentChunk.length / 4),
      });
      chunkIndex++;
      // Apply overlap
      const words = currentChunk.split(' ');
      const overlapWords = words.slice(-Math.min(words.length, overlapSize / 5)).join(' ');
      currentChunk = overlapWords + '\n' + para;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + para;
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push({
      chunkIndex,
      content: currentChunk.trim(),
      headingPath: currentHeading,
      tokenCount: Math.ceil(currentChunk.length / 4),
    });
  }

  return chunks;
}
