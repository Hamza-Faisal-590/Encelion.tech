export interface STTResult {
  transcript: string;
  confidence: number;
  language: string;
  audioSeconds: number;
  latencyMs: number;
  provider: string;
}

export interface SpeechToTextProvider {
  readonly name: string;
  transcribe(audioBuffer: Buffer, language?: string): Promise<STTResult>;
}
