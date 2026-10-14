'use client';

import { useState } from 'react';
import { VoicePlayer } from '@/components/voice/VoicePlayer';
import { MicButton } from '@/components/voice/MicButton';

const VOICES = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', category: 'Conversational', gender: 'Female', accent: 'American', sampleText: 'Welcome to Encelion AI. How can I transform your operational workflows today?' },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi', category: 'Empathetic', gender: 'Female', accent: 'American', sampleText: 'I understand your query. Let me analyze your knowledge base right away.' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', category: 'Executive', gender: 'Female', accent: 'British', sampleText: 'Good afternoon. I have compiled your quarterly revenue forecast metrics.' },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', category: 'Technical', gender: 'Male', accent: 'American', sampleText: 'Executing vector similarity search across 10,000 indexed document chunks.' },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli', category: 'Friendly', gender: 'Female', accent: 'Australian', sampleText: 'G\'day! Ready to build your next automated multi-agent AI pipeline?' },
];

export default function VoiceStudioPage() {
  const [selectedVoice, setSelectedVoice] = useState<(typeof VOICES)[0]>(VOICES[0]!);
  const [isPlaying, setIsPlaying] = useState(false);
  const [promptInput, setPromptInput] = useState('Hello! Can you summarize our top-performing leads for this month?');
  const [transcript, setTranscript] = useState('');
  const [latency] = useState({ stt: 85, tts: 120, total: 205 });

  const handleTestTTS = () => {
    setIsPlaying(true);
    // Simulate audio playing end after 3.5s
    setTimeout(() => {
      setIsPlaying(false);
    }, 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Voice AI Studio</h1>
          <p className="text-sm text-slate-400 mt-1">
            Ultra-low latency Speech-to-Text (STT) & Text-to-Speech (TTS) configuration for voice agents.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-mono">Real-time Latency</span>
            <span className="text-xs font-bold text-[#00F0FF]">{latency.total} ms</span>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
            ● Full Duplex Active
          </span>
        </div>
      </div>

      {/* Latency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">STT Engine (Whisper v3)</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Sub-100ms</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{latency.stt} <span className="text-sm font-normal text-slate-400">ms</span></p>
          <p className="text-[11px] text-slate-500 mt-1">98.4% Word Error Rate (WER) accuracy</p>
        </div>

        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">TTS Engine (ElevenLabs Flash)</span>
            <span className="text-[10px] text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded">Streaming</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{latency.tts} <span className="text-sm font-normal text-slate-400">ms</span></p>
          <p className="text-[11px] text-slate-500 mt-1">PCM 24kHz studio quality output</p>
        </div>

        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Round-Trip</span>
            <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Optimal</span>
          </div>
          <p className="text-2xl font-bold text-[#00F0FF] mt-2">{latency.total} <span className="text-sm font-normal text-slate-400">ms</span></p>
          <p className="text-[11px] text-slate-500 mt-1">Human conversational threshold (&lt; 300ms)</p>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voice Selector */}
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-bold text-white">Voice Model Selection</h2>
          <div className="space-y-3">
            {VOICES.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVoice(v)}
                className={`p-3.5 rounded-xl border cursor-pointer transition ${
                  selectedVoice?.id === v.id
                    ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-white'
                    : 'bg-white/5 border-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{v.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                    {v.accent}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1.5 text-[11px] text-slate-400">
                  <span>{v.gender}</span>
                  <span>·</span>
                  <span className="text-[#00F0FF] font-medium">{v.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Speech Tester */}
        <div className="lg:col-span-2 bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Interactive Speech Simulator</h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Mic Input:</span>
                <MicButton
                  onTranscript={(t) => {
                    setTranscript(t);
                    setPromptInput(t);
                  }}
                />
              </div>
            </div>

            {/* Prompt Input Box */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Synthesis Text Prompt</label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                rows={4}
                className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#00F0FF] transition resize-none"
                placeholder="Type text to synthesize into high-fidelity voice..."
              />
            </div>

            {/* Live Transcript Display */}
            {transcript && (
              <div className="p-3 bg-[#00F0FF]/5 border border-[#00F0FF]/20 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-wider block">Live Mic Transcript</span>
                <p className="text-xs text-slate-200 font-mono">{transcript}</p>
              </div>
            )}
          </div>

          {/* Player Visualizer & Synthesize CTA */}
          <div className="space-y-4">
            <VoicePlayer
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              text={promptInput}
              voiceName={`${selectedVoice!.name} (${selectedVoice!.category})`}
            />

            <button
              onClick={handleTestTTS}
              className="w-full py-3 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] hover:opacity-90 text-[#0B0F19] font-bold rounded-xl shadow-lg shadow-[#00F0FF]/20 transition flex items-center justify-center space-x-2 text-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
              <span>Synthesize with {selectedVoice!.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
