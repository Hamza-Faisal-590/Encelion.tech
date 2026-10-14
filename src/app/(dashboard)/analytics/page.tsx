'use client';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Platform Analytics & Intelligence</h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time telemetry, LLM token consumption, latency metrics, and agent conversation volume.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="bg-[#111827] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 24 Hours</option>
          </select>
          <button className="px-4 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition border border-white/10">
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total Agent Sessions</span>
          <p className="text-3xl font-bold text-white">4,250</p>
          <p className="text-[11px] text-emerald-400">↑ 14.2% vs previous period</p>
        </div>

        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Token Usage (Prompt + Completion)</span>
          <p className="text-3xl font-bold text-[#00F0FF]">14.5M</p>
          <p className="text-[11px] text-slate-500">9.2M prompt / 5.3M completion</p>
        </div>

        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Avg Response Latency</span>
          <p className="text-3xl font-bold text-white">185 <span className="text-sm font-normal text-slate-400">ms</span></p>
          <p className="text-[11px] text-emerald-400">⚡ 99.4% SLA Compliance</p>
        </div>

        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-medium">CSAT Satisfaction Score</span>
          <p className="text-3xl font-bold text-purple-400">4.85 <span className="text-sm font-normal text-slate-400">/ 5.0</span></p>
          <p className="text-[11px] text-slate-500">Based on 1,820 user ratings</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Session Bar Chart */}
        <div className="lg:col-span-2 bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Daily Agent Conversation Volume</h2>
            <span className="text-xs text-[#00F0FF] font-mono">Peak: 295 sessions/day</span>
          </div>

          {/* CSS Bar Chart */}
          <div className="h-56 flex items-end justify-between space-x-3 pt-6 px-2 border-b border-white/10">
            {[
              { day: 'Sep 16', count: 120, height: '40%' },
              { day: 'Sep 17', count: 145, height: '49%' },
              { day: 'Sep 18', count: 190, height: '64%' },
              { day: 'Sep 19', count: 210, height: '71%' },
              { day: 'Sep 20', count: 180, height: '61%' },
              { day: 'Sep 21', count: 240, height: '81%' },
              { day: 'Sep 22', count: 295, height: '100%' },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center space-y-2 group">
                <span className="text-[10px] text-slate-400 font-mono opacity-0 group-hover:opacity-100 transition">
                  {bar.count}
                </span>
                <div
                  style={{ height: bar.height }}
                  className="w-full bg-gradient-to-t from-[#7000FF] to-[#00F0FF] rounded-t-lg transition-all duration-300 group-hover:brightness-125"
                />
                <span className="text-[10px] text-slate-400 font-medium truncate">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Model Distribution */}
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <h2 className="text-base font-bold text-white">LLM Provider Token Distribution</h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">Claude 3.5 Sonnet</span>
                <span className="text-[#00F0FF] font-bold">55% (7.9M tokens)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#00F0FF] rounded-full" style={{ width: '55%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">GPT-4o Enterprise</span>
                <span className="text-purple-400 font-bold">35% (5.0M tokens)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#7000FF] rounded-full" style={{ width: '35%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">Gemini 1.5 Pro</span>
                <span className="text-pink-400 font-bold">10% (1.4M tokens)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-slate-400">
            💡 <strong className="text-white">Cost Optimizer Tip:</strong> Routing simple triage queries to Gemini 1.5 Flash could reduce token costs by 22%.
          </div>
        </div>
      </div>
    </div>
  );
}
