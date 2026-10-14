'use client';

export function FeatureGrid() {
  const features = [
    {
      id: 'rag',
      title: 'Multi-Tenant RAG Knowledge Graph',
      description: 'Hybrid pgvector search + Cohere reranker. Instant chunking of PDFs, Web docs, and database schema with tenant boundary isolation.',
      badge: 'RAG ENGINE',
      icon: '🧠',
    },
    {
      id: 'voice',
      title: 'Real-Time Voice AI (STT / TTS)',
      description: 'Ultra-low latency audio stream via OpenAI Whisper & ElevenLabs with web-speech fallbacks and dynamic waveform sync.',
      badge: 'VOICE STREAM',
      icon: '🎙️',
    },
    {
      id: 'workflows',
      title: 'Autonomous Workflow Engine',
      description: 'Visual React Flow canvas with 11 specialized node types. Trigger automated CRM updates, API calls, and Slack alerts.',
      badge: 'AUTOMATION',
      icon: '⚡',
    },
    {
      id: 'vision',
      title: 'Computer Vision & Inspection',
      description: 'Object detection, OCR text extraction, and automated code quality inspection powered by multimodal vision models.',
      badge: 'VISION AI',
      icon: '👁️',
    },
    {
      id: 'robotics',
      title: '3D Humanoid Robot Control',
      description: 'State machine driven Three.js humanoid avatar with WebAudio RMS volume reactivity and real-time posture tracking.',
      badge: 'ROBOTICS',
      icon: '🤖',
    },
    {
      id: 'security',
      title: 'Enterprise RBAC & Security',
      description: 'Granular role-based permissions, AES-256 database column encryption, immutable audit trails, and TOTP 2FA.',
      badge: 'SECURITY',
      icon: '🛡️',
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold tracking-widest text-[#00F0FF] uppercase bg-[#00F0FF]/10 px-3 py-1 rounded-full border border-[#00F0FF]/20">
          ENTERPRISE ARCHITECTURE
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineered for Extreme Scale & Precision
        </h2>
        <p className="text-slate-400 text-lg">
          Complete end-to-end autonomous AI ecosystem built on Next.js 14, NestJS microservices, and PostgreSQL.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f) => (
          <div
            key={f.id}
            id={f.id}
            className="group relative bg-[#111827]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#00F0FF]/50 transition duration-300 shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7000FF]/10 rounded-full blur-2xl group-hover:bg-[#00F0FF]/20 transition duration-300 pointer-events-none" />
            
            <div className="text-4xl mb-4">{f.icon}</div>
            <span className="text-[10px] font-extrabold tracking-wider text-[#00F0FF] uppercase bg-[#00F0FF]/10 px-2.5 py-1 rounded border border-[#00F0FF]/30">
              {f.badge}
            </span>
            <h3 className="text-xl font-bold text-white mt-4 mb-2 group-hover:text-[#00F0FF] transition">
              {f.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
