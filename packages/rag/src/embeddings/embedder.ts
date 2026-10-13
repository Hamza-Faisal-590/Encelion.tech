import OpenAI from 'openai';

let _openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!_openai) {
    const apiKey = process.env['OPENAI_API_KEY'];
    _openai = new OpenAI({ apiKey: apiKey || 'dummy-key' });
  }
  return _openai;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAIClient();
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.replace(/\n/g, ' '),
    encoding_format: 'float',
  });
  return response.data[0]?.embedding || [];
}

export async function generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
  const openai = getOpenAIClient();
  const sanitized = texts.map((t) => t.replace(/\n/g, ' '));
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: sanitized,
    encoding_format: 'float',
  });
  return response.data.map((d) => d.embedding);
}
