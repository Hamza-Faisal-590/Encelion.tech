import { StreamChunk } from '@encelion/types';

// ─────────────────────────────────────────────────────────────────────────────
// AI Provider interface — all provider adapters implement this contract
// ─────────────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatOptions {
  model: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ChatResult {
  content: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  model: string;
  provider: string;
}

export interface AIProvider {
  readonly name: string;
  readonly defaultModel: string;

  chat(messages: ChatMessage[], options: ChatOptions): Promise<ChatResult>;

  streamChat(
    messages: ChatMessage[],
    options: ChatOptions,
    onChunk: (chunk: StreamChunk) => void,
  ): Promise<ChatResult>;

  embed(text: string | string[], model?: string): Promise<number[][]>;
}

// Registry stub — providers registered in Phase 7
const providers = new Map<string, AIProvider>();

export function registerProvider(provider: AIProvider): void {
  providers.set(provider.name, provider);
}

export function getProvider(name: string): AIProvider {
  const p = providers.get(name);
  if (!p) throw new Error(`AI provider "${name}" not registered`);
  return p;
}

export function listProviders(): string[] {
  return Array.from(providers.keys());
}
