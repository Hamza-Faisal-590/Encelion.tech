export interface TTSResult {
  audioBuffer: Buffer;
  audioBytes: number;
  audioSeconds: number;
  characterCount: number;
  latencyMs: number;
  provider: string;
  voiceId: string;
  cacheHit: boolean;
}

export interface TextToSpeechProvider {
  readonly name: string;
  synthesize(text: string, voiceId?: string): Promise<TTSResult>;
  streamSynthesize?(text: string, voiceId?: string): AsyncIterable<Buffer>;
}
