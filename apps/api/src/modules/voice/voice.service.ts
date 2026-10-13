import { Injectable } from '@nestjs/common';
import { WhisperSTTProvider, ElevenLabsTTSProvider } from '@encelion/voice';

@Injectable()
export class VoiceService {
  private sttProvider = new WhisperSTTProvider();
  private ttsProvider = new ElevenLabsTTSProvider();

  async transcribeAudio(audioBuffer: Buffer, language?: string) {
    return this.sttProvider.transcribe(audioBuffer, language);
  }

  async synthesizeSpeech(text: string, voiceId?: string) {
    return this.ttsProvider.synthesize(text, voiceId);
  }

  getAvailableVoices() {
    return [
      { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel (Female - Conversational)', provider: 'ElevenLabs', accent: 'American' },
      { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi (Female - Empathetic)', provider: 'ElevenLabs', accent: 'American' },
      { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella (Female - Executive)', provider: 'ElevenLabs', accent: 'British' },
      { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni (Male - Technical)', provider: 'ElevenLabs', accent: 'American' },
      { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli (Female - Friendly)', provider: 'ElevenLabs', accent: 'Australian' },
      { id: 'TxGEqnscrfWFTf815XTV', name: 'Josh (Male - Authoritative)', provider: 'ElevenLabs', accent: 'American' },
    ];
  }
}
