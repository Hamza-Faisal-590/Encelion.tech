'use client';

import { useState } from 'react';

export default function SettingsBillingPage() {
  const [currentPlan, setCurrentPlan] = useState<'STARTER' | 'GROWTH' | 'ENTERPRISE'>('ENTERPRISE');

  const plans = [
    {
      key: 'STARTER',
      name: 'Developer Starter',
      price: '$99',
      period: '/month',
      desc: 'Ideal for small AI projects & prototype testing.',
      features: ['Up to 3 AI Agents', '1,000 Chat Sessions/mo', '100 Document Chunks RAG', 'Community Support'],
    },
    {
      key: 'GROWTH',
      name: 'Growth Scale',
      price: '$499',
      period: '/month',
      desc: 'For scaling teams with custom workflows & voice agents.',
      features: ['Up to 15 AI Agents', '10,000 Chat Sessions/mo', '50,000 Chunks Hybrid RAG', 'Voice AI Studio (100 mins)', 'Priority Email Support'],
    },
    {
      key: 'ENTERPRISE',
      name: 'Enterprise Ultra',
      price: 'Custom ($1,999+)',
      period: '/month',
      desc: 'Dedicated single-tenant infrastructure with SLA guarantees.',
      features: ['Unlimited AI Agents', 'Unlimited Sessions & RAG', 'Voice & Vision AI Engine', '3D Humanoid Robot Avatar', 'Custom SSO & Audit Logs', '24/7 Dedicated Solutions Engineer'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Organization & Billing</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your subscription plan, API quota usage meters, and billing payment methods.
          </p>
        </div>
        <button className="px-4 py-2 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 text-xs font-bold rounded-xl hover:bg-[#00F0FF]/20 transition">
          Stripe Billing Portal ↗
        </button>
      </div>

      {/* Usage Meter Gauges */}
      <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
        <h2 className="text-base font-bold text-white">Current Billing Cycle Quota Usage</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Meter 1 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Agent Sessions</span>
              <span className="text-white font-mono font-bold">4,250 / 10,000</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] rounded-full" style={{ width: '42.5%' }} />
            </div>
            <p className="text-[11px] text-slate-500">Resets in 18 days</p>
          </div>

          {/* Meter 2 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">RAG Vector Tokens</span>
              <span className="text-white font-mono font-bold">1.25M / 5.0M</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00F0FF] to-emerald-400 rounded-full" style={{ width: '25%' }} />
            </div>
            <p className="text-[11px] text-slate-500">25.0% consumed</p>
          </div>

          {/* Meter 3 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Voice AI Streaming</span>
              <span className="text-white font-mono font-bold">140 / 500 Mins</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '28%' }} />
            </div>
            <p className="text-[11px] text-slate-500">28.0% consumed</p>
          </div>
        </div>
      </div>

      {/* Subscription Tier Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Subscription Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => {
            const isCurrent = currentPlan === p.key;
            return (
              <div
                key={p.key}
                className={`bg-[#111827]/80 backdrop-blur-xl border rounded-2xl p-6 flex flex-col justify-between space-y-6 transition relative ${
                  isCurrent
                    ? 'border-[#00F0FF] shadow-2xl shadow-[#00F0FF]/10 ring-1 ring-[#00F0FF]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-3 right-6 bg-[#00F0FF] text-[#0B0F19] text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    Current Plan
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{p.desc}</p>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-extrabold text-white">{p.price}</span>
                    <span className="text-xs text-slate-400">{p.period}</span>
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-2">
                    {p.features.map((f, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                        <span className="text-[#00F0FF] font-bold">✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPlan(p.key as any)}
                  className={`w-full py-2.5 text-xs font-bold rounded-xl transition ${
                    isCurrent
                      ? 'bg-white/10 text-white cursor-default'
                      : 'bg-gradient-to-r from-[#00F0FF] to-[#7000FF] text-[#0B0F19] hover:opacity-90 shadow-lg'
                  }`}
                >
                  {isCurrent ? 'Active Subscription' : 'Upgrade Plan'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white">Invoice History</h2>
        <div className="divide-y divide-white/5 text-xs">
          <div className="py-3 flex justify-between items-center text-slate-400 font-semibold">
            <span>Invoice ID</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Download</span>
          </div>
          {[
            { id: 'INV-2026-009', date: 'Sep 01, 2026', amount: '$1,999.00', status: 'PAID' },
            { id: 'INV-2026-008', date: 'Aug 01, 2026', amount: '$1,999.00', status: 'PAID' },
            { id: 'INV-2026-007', date: 'Jul 01, 2026', amount: '$1,999.00', status: 'PAID' },
          ].map((inv) => (
            <div key={inv.id} className="py-3 flex justify-between items-center text-white">
              <span className="font-mono text-slate-300">{inv.id}</span>
              <span>{inv.date}</span>
              <span className="font-bold">{inv.amount}</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px]">
                {inv.status}
              </span>
              <button className="text-[#00F0FF] hover:underline font-medium">PDF 📄</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
