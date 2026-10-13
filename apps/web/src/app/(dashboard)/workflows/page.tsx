'use client';

import { useState } from 'react';

type NodeType =
  | 'TRIGGER'
  | 'AI_PROMPT'
  | 'BRANCH_CONDITION'
  | 'WEBHOOK'
  | 'DB_ACTION'
  | 'EMAIL_NOTIFICATION'
  | 'DELAY'
  | 'VOICE_CALL'
  | 'LEAD_CAPTURE'
  | 'CRM_SYNC'
  | 'CODE_SANDBOX';

interface WorkflowNode {
  id: string;
  type: NodeType;
  title: string;
  desc: string;
  icon: string;
  x: number;
  y: number;
  color: string;
}

const PALETTE: { type: NodeType; title: string; desc: string; icon: string; color: string }[] = [
  { type: 'TRIGGER', title: 'Event Trigger', desc: 'Webhook, DB event, or schedule', icon: '⚡', color: 'from-[#00F0FF] to-cyan-500' },
  { type: 'AI_PROMPT', title: 'AI Prompt / LLM', desc: 'Execute prompt with Claude/GPT-4', icon: '🤖', color: 'from-[#7000FF] to-purple-600' },
  { type: 'BRANCH_CONDITION', title: 'Branch / If-Else', desc: 'Evaluate condition logic', icon: '🔀', color: 'from-amber-500 to-orange-500' },
  { type: 'WEBHOOK', title: 'HTTP Webhook', desc: 'Send POST/GET payload to URL', icon: '🌐', color: 'from-emerald-500 to-teal-600' },
  { type: 'DB_ACTION', title: 'Database Query', desc: 'Upsert or retrieve SQL/NoSQL record', icon: '💾', color: 'from-blue-500 to-indigo-600' },
  { type: 'EMAIL_NOTIFICATION', title: 'Send Email', desc: 'Resend transactional email', icon: '✉️', color: 'from-pink-500 to-rose-600' },
  { type: 'DELAY', title: 'Delay / Timer', desc: 'Wait duration before next step', icon: '⏱️', color: 'from-slate-400 to-slate-600' },
  { type: 'VOICE_CALL', title: 'Voice Call', desc: 'Trigger automated AI call', icon: '📞', color: 'from-violet-500 to-purple-800' },
  { type: 'LEAD_CAPTURE', title: 'Lead Capture', desc: 'Record prospect to CRM pipeline', icon: '🎯', color: 'from-[#00F0FF] to-emerald-400' },
  { type: 'CRM_SYNC', title: 'HubSpot / Salesforce', desc: 'Bi-directional CRM sync', icon: '🔄', color: 'from-orange-400 to-red-500' },
  { type: 'CODE_SANDBOX', title: 'Code Sandbox', desc: 'Run custom JS/Python snippet', icon: '💻', color: 'from-cyan-400 to-blue-600' },
];

export default function WorkflowsPage() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: '1', type: 'TRIGGER', title: 'Lead Form Submitted', desc: 'Triggers on incoming web lead', icon: '⚡', x: 80, y: 140, color: 'from-[#00F0FF] to-cyan-500' },
    { id: '2', type: 'AI_PROMPT', title: 'Intent Scoring Agent', desc: 'Analyze budget & urgency', icon: '🤖', x: 420, y: 140, color: 'from-[#7000FF] to-purple-600' },
    { id: '3', type: 'BRANCH_CONDITION', title: 'High Intent Check', desc: 'Score >= 0.8', icon: '🔀', x: 760, y: 140, color: 'from-amber-500 to-orange-500' },
    { id: '4', type: 'LEAD_CAPTURE', title: 'Sales CRM Handoff', desc: 'Create VIP deals record', icon: '🎯', x: 1100, y: 80, color: 'from-[#00F0FF] to-emerald-400' },
    { id: '5', type: 'EMAIL_NOTIFICATION', title: 'Send Welcome Nurture', desc: 'Dispatch intro sequence', icon: '✉️', x: 1100, y: 260, color: 'from-pink-500 to-rose-600' },
  ]);

  const [activeTab, setActiveTab] = useState<'BUILDER' | 'EXECUTIONS'>('BUILDER');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('2');

  const addNode = (p: typeof PALETTE[0]) => {
    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type: p.type,
      title: p.title,
      desc: p.desc,
      icon: p.icon,
      x: 300 + Math.random() * 100,
      y: 200 + Math.random() * 100,
      color: p.color,
    };
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newNode.id);
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationLogs(['⚡ [14:43:01] Trigger node activated: "Lead Form Submitted"', '🤖 [14:43:02] Running AI Prompt: Intent Scoring...']);
    setTimeout(() => {
      setSimulationLogs((prev) => [...prev, '🔀 [14:43:03] Condition evaluated: score = 0.92 (TRUE)', '🎯 [14:43:04] Sales CRM Handoff executed successfully.', '✅ Workflow finished in 312ms.']);
      setIsSimulating(false);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col space-y-4">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Enterprise Lead Qualification Workflow</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Active
              </span>
            </h1>
            <p className="text-xs text-slate-400">Node-based multi-agent decision tree & action router.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('BUILDER')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                activeTab === 'BUILDER' ? 'bg-[#00F0FF] text-[#0B0F19]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Canvas Builder
            </button>
            <button
              onClick={() => setActiveTab('EXECUTIONS')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                activeTab === 'EXECUTIONS' ? 'bg-[#00F0FF] text-[#0B0F19]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Execution History
            </button>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="px-4 py-2 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] hover:opacity-90 text-[#0B0F19] text-xs font-bold rounded-xl shadow-lg transition flex items-center space-x-2"
          >
            <svg className={`w-4 h-4 fill-current ${isSimulating ? 'animate-spin' : ''}`} viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>{isSimulating ? 'Simulating...' : 'Run Simulation'}</span>
          </button>

          <button className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition border border-white/10">
            Save Workflow
          </button>
        </div>
      </div>

      {/* Main Canvas & Sidebar Container */}
      <div className="flex-1 flex space-x-4 overflow-hidden">
        {/* Node Palette */}
        <div className="w-72 bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col justify-between overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Node Palette</h3>
            <div className="space-y-2">
              {PALETTE.map((p) => (
                <div
                  key={p.type}
                  onClick={() => addNode(p)}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#00F0FF]/40 hover:bg-white/10 cursor-pointer transition flex items-center space-x-3 group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center text-sm shadow-md`}>
                    {p.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate group-hover:text-[#00F0FF] transition">{p.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Canvas */}
        <div className="flex-1 bg-[#0B0F19] border border-white/10 rounded-2xl relative overflow-hidden flex flex-col">
          {/* Blueprint Grid Lines SVG background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, #00F0FF 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#7000FF" />
              </linearGradient>
            </defs>
            {/* Edge 1 -> 2 */}
            <path d="M 260 185 C 340 185, 340 185, 420 185" stroke="url(#lineGrad)" strokeWidth="3" fill="none" strokeDasharray="6 4" className="animate-pulse" />
            {/* Edge 2 -> 3 */}
            <path d="M 600 185 C 680 185, 680 185, 760 185" stroke="url(#lineGrad)" strokeWidth="3" fill="none" />
            {/* Edge 3 -> 4 (True) */}
            <path d="M 940 185 C 1020 185, 1020 125, 1100 125" stroke="#00F0FF" strokeWidth="2.5" fill="none" />
            {/* Edge 3 -> 5 (False) */}
            <path d="M 940 185 C 1020 185, 1020 305, 1100 305" stroke="#FF007A" strokeWidth="2.5" fill="none" />
          </svg>

          {/* Nodes Canvas Workspace */}
          <div className="flex-1 relative z-10 p-6 overflow-auto">
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                  className={`absolute w-44 bg-[#111827] border rounded-xl p-3.5 shadow-2xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                    isSelected
                      ? 'border-[#00F0FF] shadow-[#00F0FF]/30 ring-2 ring-[#00F0FF]/40'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center text-xs font-bold text-[#0B0F19]`}>
                      {node.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">{node.type}</span>
                      <p className="text-xs font-bold text-white truncate">{node.title}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 line-clamp-2">{node.desc}</p>

                  {/* Input/Output handles */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] border border-[#0B0F19] absolute -left-1.5 top-1/2 -translate-y-1/2" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7000FF] border border-[#0B0F19] absolute -right-1.5 top-1/2 -translate-y-1/2" />
                </div>
              );
            })}
          </div>

          {/* Live Simulator Logs Overlay */}
          {simulationLogs.length > 0 && (
            <div className="bg-[#0B0F19]/95 border-t border-white/10 p-4 space-y-1.5 z-20 font-mono text-xs max-h-40 overflow-y-auto">
              <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase">
                <span>Simulation Console Execution Log</span>
                <button onClick={() => setSimulationLogs([])} className="hover:text-white">Clear</button>
              </div>
              {simulationLogs.map((log, idx) => (
                <p key={idx} className="text-slate-200">{log}</p>
              ))}
            </div>
          )}
        </div>

        {/* Selected Node Inspector Sidebar */}
        <div className="w-80 bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Node Properties</span>
              <span className="text-[10px] text-slate-400 font-mono">ID: {selectedNodeId}</span>
            </h3>

            {selectedNodeId ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">Step Label</label>
                  <input
                    type="text"
                    defaultValue="Intent Scoring Agent"
                    className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">AI Model Provider</label>
                  <select className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]">
                    <option>Anthropic Claude 3.5 Sonnet</option>
                    <option>OpenAI GPT-4o Enterprise</option>
                    <option>Google Gemini 1.5 Pro</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">System Instructions / Prompt</label>
                  <textarea
                    rows={4}
                    defaultValue="Analyze incoming lead fields (company size, budget, timeline) and output a JSON intent score between 0.0 and 1.0."
                    className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#00F0FF] resize-none"
                  />
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Retry on Failure</span>
                  <input type="checkbox" defaultChecked className="accent-[#00F0FF]" />
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">Select any node on the canvas to configure parameters.</p>
            )}
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                if (selectedNodeId) {
                  setNodes(nodes.filter((n) => n.id !== selectedNodeId));
                  setSelectedNodeId(null);
                }
              }}
              className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-xl transition"
            >
              Delete Node
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
