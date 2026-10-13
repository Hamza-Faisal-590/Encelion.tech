'use client';

import { useState } from 'react';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  intentScore: number;
  status: string;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads] = useState<Lead[]>([
    { id: '1', name: 'Sarah Mitchell', email: 'sarah@acmecorp.com', company: 'Acme Corp', intentScore: 0.92, status: 'QUALIFIED', createdAt: '2026-09-22' },
    { id: '2', name: 'James Okafor', email: 'james@techstart.io', company: 'TechStart', intentScore: 0.78, status: 'NEW', createdAt: '2026-09-22' },
    { id: '3', name: 'Elena Vasquez', email: 'elena@buildfast.com', company: 'BuildFast Inc', intentScore: 0.65, status: 'CONTACTED', createdAt: '2026-09-21' },
    { id: '4', name: 'Marcus Chen', email: 'marcus@nextwave.ai', company: 'NextWave AI', intentScore: 0.88, status: 'HANDOFF_PENDING', createdAt: '2026-09-21' },
    { id: '5', name: 'Priya Sharma', email: 'priya@cloudops.io', company: 'CloudOps', intentScore: 0.45, status: 'DISQUALIFIED', createdAt: '2026-09-20' },
  ]);

  const [filterStatus, setFilterStatus] = useState('ALL');

  const statusConfig: Record<string, { label: string; color: string }> = {
    NEW: { label: 'New', color: 'text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30' },
    QUALIFIED: { label: 'Qualified', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    HANDOFF_PENDING: { label: 'Handoff', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    CONTACTED: { label: 'Contacted', color: 'text-[#7000FF] bg-[#7000FF]/10 border-[#7000FF]/30' },
    CONVERTED: { label: 'Converted', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    DISQUALIFIED: { label: 'Disqualified', color: 'text-slate-400 bg-slate-700/20 border-slate-600' },
  };

  const filtered = filterStatus === 'ALL' ? leads : leads.filter((l) => l.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Lead Pipeline</h1>
          <p className="text-sm text-slate-400 mt-1">Captured leads from AI agent conversations with intent scoring.</p>
        </div>
        <span className="text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1.5 rounded-full border border-[#00F0FF]/30">
          {leads.length} Total Leads
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {['ALL', 'NEW', 'QUALIFIED', 'HANDOFF_PENDING', 'CONTACTED', 'CONVERTED'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
              filterStatus === s ? 'bg-[#00F0FF] text-[#0B0F19]' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {filtered.map((lead) => {
            const cfg = statusConfig[lead.status] ?? { label: lead.status, color: 'text-slate-400 bg-slate-700/20 border-slate-600' };
            return (
              <div key={lead.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition group">
                <div className="flex items-center space-x-4">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00F0FF] to-[#7000FF] flex items-center justify-center font-bold text-[#0B0F19] text-sm">
                    {lead.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{lead.name}</p>
                    <p className="text-[11px] text-slate-400">{lead.email} · {lead.company}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Intent Score */}
                  <div className="text-center hidden md:block">
                    <span className="text-xs text-slate-400">Intent Score</span>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#7000FF] to-[#00F0FF] rounded-full"
                          style={{ width: `${lead.intentScore * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-white">{(lead.intentScore * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded border ${cfg.color}`}>
                    {cfg.label}
                  </span>

                  {/* Date */}
                  <span className="text-[11px] text-slate-500 hidden lg:block">{lead.createdAt}</span>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition">
                    <button className="text-[11px] text-[#00F0FF] hover:underline font-medium">View</button>
                    <button className="text-[11px] text-emerald-400 hover:underline font-medium">Qualify</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
