'use client';

import { useState } from 'react';

interface MicButtonProps {
  onTranscript?: (text: string) => void;
  onListeningStateChange?: (isListening: boolean) => void;
}

export function MicButton({ onTranscript, onListeningStateChange }: MicButtonProps) {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    const newState = !isRecording;
    setIsRecording(newState);
    onListeningStateChange?.(newState);

    if (newState) {
      // Simulate real-time browser STT transcription
      setTimeout(() => {
        if (onTranscript) {
          onTranscript('Hello Encelion AI, can you help me automate our customer onboarding workflows?');
        }
        setIsRecording(false);
        onListeningStateChange?.(false);
      }, 3500);
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {isRecording && (
        <>
          <span className="absolute w-14 h-14 rounded-full bg-[#00F0FF]/30 animate-ping" />
          <span className="absolute w-12 h-12 rounded-full bg-[#7000FF]/40 animate-pulse" />
        </>
      )}
      <button
        onClick={toggleRecording}
        className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center transition shadow-lg ${
          isRecording
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/40 scale-105'
            : 'bg-gradient-to-r from-[#00F0FF] to-[#7000FF] text-[#0B0F19] hover:opacity-90 shadow-[#00F0FF]/25'
        }`}
        title={isRecording ? 'Stop listening' : 'Start voice input'}
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
      </button>
    </div>
  );
}
