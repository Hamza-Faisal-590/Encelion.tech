'use client';

import Link from 'next/link';

export function PricingCards() {
  const plans = [
    {
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      description: 'Ideal for prototyping & exploring Encelion AI capabilities.',
      features: [
        '1 Active AI Agent',
        '50,000 Monthly Tokens',
        '1 GB RAG Storage',
        'Community Forum Support',
      ],
      cta: 'Get Started Free',
      href: '/register',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      description: 'For growing teams requiring custom agents, STT/TTS & RAG.',
      features: [
        '10 Active AI Agents',
        '2,000,000 Monthly Tokens',
        '50 GB RAG Storage',
        'Real-time Voice (STT & TTS)',
        'React Flow Workflow Engine',
        'Priority SLA Support',
      ],
      cta: 'Start 14-Day Trial',
      href: '/register?plan=pro',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '$499',
      period: 'per month',
      description: 'Dedicated cloud isolation, custom humanoid models & audit logs.',
      features: [
        'Unlimited AI Agents',
        '50,000,000 Monthly Tokens',
        '1,000 GB RAG Storage',
        '3D Humanoid Telemetry & Control',
        'Custom SSO & Webhook Integrations',
        'Dedicated Solutions Architect',
      ],
      cta: 'Contact Sales',
      href: '/register?plan=enterprise',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold tracking-widest text-[#7000FF] uppercase bg-[#7000FF]/10 px-3 py-1 rounded-full border border-[#7000FF]/20">
          TRANSPARENT PRICING
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Flexible Plans for Every Stage
        </h2>
        <p className="text-slate-400 text-lg">
          Scale your enterprise AI footprint effortlessly with transparent token metering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl p-8 flex flex-col justify-between border transition duration-300 relative ${
              p.highlighted
                ? 'bg-[#111827] border-[#00F0FF] shadow-2xl shadow-[#00F0FF]/15 scale-105 z-10'
                : 'bg-[#111827]/60 border-white/10 hover:border-white/20'
            }`}
          >
            {p.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00F0FF] text-[#0B0F19] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-md">
                MOST POPULAR
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
              <p className="text-xs text-slate-400 mb-6 min-h-[36px]">{p.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">{p.price}</span>
                <span className="text-xs text-slate-400 ml-2">/ {p.period}</span>
              </div>

              <ul className="space-y-3 mb-8 text-xs text-slate-300">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-center space-x-2">
                    <span className="text-[#00F0FF]">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={p.href}
              className={`w-full py-3 rounded-xl font-bold text-center text-xs transition duration-200 ${
                p.highlighted
                  ? 'bg-[#00F0FF] text-[#0B0F19] hover:bg-[#00D0DF] shadow-lg shadow-[#00F0FF]/25'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
