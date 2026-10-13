import { Controller, Post, Get, Body, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { VoiceService } from './voice.service';
import { TenantGuard } from '../auth/guards/tenant.guard';

@Controller('voice')
@UseGuards(TenantGuard)
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Get('voices')
  getVoices() {
    return this.voiceService.getAvailableVoices();
  }

  @Post('transcribe')
  async transcribe(@Body() body: { audioBase64: string; language?: string }) {
    const buffer = Buffer.from(body.audioBase64 || '', 'base64');
    return this.voiceService.transcribeAudio(buffer, body.language);
  }

  @Post('synthesize')
  async synthesize(@Body() body: { text: string; voiceId?: string }, @Res() res: Response) {
    const result = await this.voiceService.synthesizeSpeech(body.text, body.voiceId);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('X-Latency-Ms', result.latencyMs.toString());
    res.setHeader('X-Audio-Seconds', result.audioSeconds.toString());
    res.send(result.audioBuffer);
  }
}
