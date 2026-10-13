'use client';

import { useState, useEffect, useRef } from 'react';

interface VoicePlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  text?: string;
  voiceName?: string;
}

export function VoicePlayer({ isPlaying, onTogglePlay, text, voiceName }: VoicePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barCount = 36;
      const barWidth = 3;
      const gap = 3;

      for (let i = 0; i < barCount; i++) {
        let height = 6;
        if (isPlaying) {
          const sinVal = Math.sin(frame * 0.1 + i * 0.3);
          const cosVal = Math.cos(frame * 0.08 + i * 0.2);
          height = Math.max(6, Math.abs(sinVal + cosVal) * 18 + 8);
        }

        const x = i * (barWidth + gap);
        const y = (canvas.height - height) / 2;

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#00F0FF');
        gradient.addColorStop(1, '#7000FF');

        ctx.fillStyle = isPlaying ? gradient : '#334155';
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <div className="bg-[#111827]/90 border border-white/10 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onTogglePlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg ${
            isPlaying
              ? 'bg-[#00F0FF] text-[#0B0F19] shadow-[#00F0FF]/30'
              : 'bg-white/10 text-white hover:bg-[#00F0FF]/20 hover:text-[#00F0FF]'
          }`}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div>
          <p className="text-xs font-semibold text-white truncate max-w-[240px]">
            {voiceName || 'ElevenLabs Flash v2.5'}
          </p>
          <p className="text-[11px] text-slate-400 truncate max-w-[240px]">
            {text ? `"${text}"` : 'Audio preview wave'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <canvas ref={canvasRef} width={220} height={36} className="block" />
        <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-1 rounded">
          {isPlaying ? 'PLAYING' : 'IDLE'}
        </span>
      </div>
    </div>
  );
}
