'use client';

import { useState } from 'react';

interface AgentItem {
  id: string;
  name: string;
  type: string;
  model: string;
  sessions: number;
  status: 'ACTIVE' | 'PAUSED';
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<AgentItem[]>([
    { id: '1', name: 'Sales SDR Agent', type: 'SALES_SDR', model: 'gpt-4o', sessions: 1420, status: 'ACTIVE' },
    { id: '2', name: 'Customer Support Bot', type: 'CUSTOMER_SUPPORT', model: 'claude-3-5-sonnet', sessions: 8930, status: 'ACTIVE' },
    { id: '3', name: 'Code Quality Inspector', type: 'CODE_AUDITOR', model: 'gpt-4o-mini', sessions: 310, status: 'PAUSED' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentType, setNewAgentType] = useState('CUSTOMER_SUPPORT');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;

    const newAgent: AgentItem = {
      id: Date.now().toString(),
      name: newAgentName,
      type: newAgentType,
      model: 'gpt-4o',
      sessions: 0,
      status: 'ACTIVE',
    };

    setAgents([...agents, newAgent]);
    setNewAgentName('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Agents Management</h1>
          <p className="text-sm text-slate-400">Configure, monitor and deploy custom AI agent personas.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#00F0FF] text-[#0B0F19] text-xs font-bold rounded-xl shadow-lg hover:bg-[#00D0DF] transition"
        >
          + Build New Agent
        </button>
      </div>

      {/* Agents Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-[#00F0FF]/40 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#00F0FF] uppercase bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/30">
                  {agent.type}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    agent.status === 'ACTIVE'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {agent.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{agent.name}</h3>
              <p className="text-xs text-slate-400 mt-1">Provider Model: {agent.model}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>{agent.sessions.toLocaleString()} Sessions</span>
              <button className="text-[#00F0FF] hover:underline font-semibold">Configure →</button>
            </div>
          </div>
        ))}
      </div>

      {/* New Agent Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h2 className="text-xl font-bold text-white">Build AI Agent</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  placeholder="e.g. Finance SDR Bot"
                  required
                  className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                  Agent Persona / Type
                </label>
                <select
                  value={newAgentType}
                  onChange={(e) => setNewAgentType(e.target.value)}
                  className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                >
                  <option value="CUSTOMER_SUPPORT">Customer Support</option>
                  <option value="SALES_SDR">Sales SDR</option>
                  <option value="CODE_AUDITOR">Code Auditor</option>
                  <option value="KNOWLEDGE_SEARCH">Knowledge Search</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-white/10 text-white text-xs font-semibold rounded-xl hover:bg-white/20 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00F0FF] text-[#0B0F19] text-xs font-bold rounded-xl hover:bg-[#00D0DF] transition"
                >
                  Deploy Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
