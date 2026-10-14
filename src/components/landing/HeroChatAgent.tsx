'use client';

import { useState } from 'react';
import { useRobotStore } from '../robot/useRobotStore';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function HeroChatAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Greeting human. I am the Encelion Neural Core. Ask me about RAG architecture, humanoid state machines, or enterprise deployment.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { setState } = useRobotStore();

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Set robot to THINKING state
    setState('THINKING');

    // Simulate AI response delay & state transitions
    setTimeout(() => {
      let aiResponse = 'Encelion AI powers multi-tenant hybrid vector search, whisper STT stream, and zero-latency prompt pipelines.';
      if (messageText.toLowerCase().includes('rag')) {
        aiResponse = 'Our RAG engine utilizes pgvector with hybrid BM25 + dense embedding reranking, achieving <50ms retrieval latency across 10M+ documents.';
      } else if (messageText.toLowerCase().includes('robot') || messageText.toLowerCase().includes('3d')) {
        aiResponse = 'The 3D Humanoid Robot is driven by a 5-state finite state machine synced via Zustand with real-time WebAudio RMS frequency analysis.';
      } else if (messageText.toLowerCase().includes('pricing') || messageText.toLowerCase().includes('plan')) {
        aiResponse = 'Plans range from Free Starter (50k tokens) to Enterprise with dedicated cluster isolation and custom SLA.';
      }

      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: aiResponse };
      setMessages((prev) => [...prev, assistantMsg]);
      setLoading(false);

      // Trigger SPEAKING state
      setState('SPEAKING');
      setTimeout(() => setState('IDLE'), 4000);
    }, 1200);
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
      setState('IDLE');
    } else {
      setIsListening(true);
      setState('LISTENING');
      // Speech recognition simulation
      setTimeout(() => {
        setIsListening(false);
        handleSend('Tell me about Encelion RAG architecture and performance');
      }, 3000);
    }
  };

  return (
    <div className="bg-[#111827]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col h-[380px]">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
          <span className="text-xs font-bold text-white tracking-wider uppercase">Live Neural Agent</span>
        </div>
        <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">BFF Stream Active</span>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${
                msg.role === 'user'
                  ? 'bg-[#00F0FF] text-[#0B0F19] font-medium'
                  : 'bg-[#1E293B] text-slate-200 border border-white/5'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1E293B] text-[#00F0FF] text-xs px-3.5 py-2 rounded-xl border border-white/5 flex items-center space-x-2">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-2 border-t border-white/10 flex items-center space-x-2"
      >
        <button
          type="button"
          onClick={toggleMic}
          className={`p-2.5 rounded-xl border transition ${
            isListening
              ? 'bg-red-500/20 border-red-500 text-red-400 animate-bounce'
              : 'bg-[#1E293B] border-white/10 text-slate-400 hover:text-white'
          }`}
          title="Voice STT Input"
        >
          🎤
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? 'Listening to voice...' : 'Ask AI Agent anything...'}
          className="flex-1 bg-[#1E293B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]"
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 bg-[#00F0FF] text-[#0B0F19] font-bold rounded-xl text-xs hover:bg-[#00D0DF] disabled:opacity-40 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
