'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  FolderKanban,
  Users,
  Shield,
  CheckCircle2,
  Workflow,
  MessageSquare,
  Eye,
  Code,
  Sparkles,
  Bot,
  Mic,
  Volume2,
  Send,
  Edit3,
  DollarSign,
  Mail,
} from 'lucide-react';

export default function DashboardPage() {
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time?: string }>>([
    { sender: 'bot', text: "Hi Hamza 👋\nI'm your AI assistant. I can help you with projects, services, clients, or anything related to Encelion.tech." },
    { sender: 'user', text: 'Show me all active projects' },
    {
      sender: 'bot',
      text: "Here are your active projects:\n1. E-commerce AI Chatbot\n2. Healthcare Automation\n3. Social Media Content AI\n4. Smart Vision System",
      time: '10:24 AM',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userMsg = inputMessage;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputMessage('');

    setTimeout(() => {
      let botResponse = "I'm processing your request. All AI services and system modules are running at peak health (99.98% SLA).";
      if (userMsg.toLowerCase().includes('project')) {
        botResponse = "Currently managing 12 projects: 8 Active in development, 3 in planning phase, and 1 queued for final QA audit.";
      } else if (userMsg.toLowerCase().includes('client') || userMsg.toLowerCase().includes('customer')) {
        botResponse = "You have 8 active clients and 3 new pending lead inquiries in your client inbox tab.";
      } else if (userMsg.toLowerCase().includes('service')) {
        botResponse = "5 core AI services are active: AI Agents, Chatbots, Workflow Automation, Computer Vision, and Custom AI Dev.";
      }
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: botResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-7 text-slate-800 antialiased font-sans">
      
      {/* ── HEADER GREETING ROW ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B0F19] tracking-tight flex items-center gap-2">
            <span>Good Morning, Hamza</span>
            <span className="text-2xl">👋</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Here's what's happening with your AI solutions today.
          </p>
        </div>
        {/* Date Dropdown */}
        <button className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-1.5 text-xs text-slate-600 font-semibold shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-all self-start sm:self-auto">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Mon, Sep 22, 2026</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* ── TOP LAYOUT GRID: LEFT MAIN CONTENT (8 cols) + RIGHT PANEL (4 cols) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-7">
        
        {/* ── LEFT MAIN SECTION (8 COLS) ── */}
        <div className="xl:col-span-8 space-y-7">
          
          {/* HERO BANNER CARD */}
          <div className="rounded-3xl p-7 relative overflow-hidden bg-gradient-to-r from-[#DFF7F4]/90 via-[#EAF9F6] to-[#F7FDFC] border border-[#00B894]/20 shadow-xs flex flex-col md:flex-row items-center justify-between min-h-[200px]">
            
            {/* Left Text */}
            <div className="z-10 max-w-sm space-y-3">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                Build Smarter <br />
                with <span className="text-[#00B894]">Encelion.tech</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                AI solutions that automate, innovate and scale your business.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-[#00B894] hover:bg-[#00A382] text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md shadow-[#00B894]/25 transition-all mt-2"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Center 3D Robot Image */}
            <div className="hidden md:block absolute right-48 top-0 bottom-0 w-64 pointer-events-none">
              <img src="/hero_robot.png" alt="Robot AI" className="w-full h-full object-contain drop-shadow-xl" />
            </div>

            {/* Right Glassmorphism Pills */}
            <div className="z-10 mt-4 md:mt-0 space-y-2 w-full md:w-auto">
              {[
                { title: 'AI Automation', icon: Workflow, href: '/workflows' },
                { title: 'Chatbots', icon: MessageSquare, href: '/agents' },
                { title: 'Computer Vision', icon: Eye, href: '/vision' },
                { title: 'Custom AI Dev', icon: Code, href: '/services' },
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="bg-white/85 backdrop-blur-md border border-slate-100 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 flex items-center justify-between shadow-xs hover:shadow-md hover:bg-white transition-all cursor-pointer w-full md:w-48 group block"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#E6F7F4] text-[#00B894] flex items-center justify-center">
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800">{item.title}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00B894] transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 4 METRIC CARDS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Total Projects', value: '12', change: '+ 20%', icon: FolderKanban, spark: 'M0 25 Q 15 20, 30 15 T 60 10 T 90 5' },
              { title: 'Active Clients', value: '8', change: '+ 33%', icon: Users, spark: 'M0 25 Q 20 22, 40 18 T 70 12 T 90 8' },
              { title: 'Revenue (This Month)', value: '$24,500', change: '+ 45%', icon: Shield, spark: 'M0 25 Q 15 18, 35 15 T 65 8 T 90 2' },
              { title: 'Completion Rate', value: '92%', change: '+ 12%', icon: CheckCircle2, spark: 'M0 20 Q 25 18, 50 12 T 75 10 T 90 4' },
            ].map((card, i) => {
              const CardIcon = card.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#E6F7F4] text-[#00B894] flex items-center justify-center">
                      <CardIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" />
                      {card.change}
                    </span>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400">{card.title}</div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-xl font-extrabold text-slate-900">{card.value}</span>
                      <svg className="w-16 h-7 overflow-visible" viewBox="0 0 90 30">
                        <path d={card.spark} fill="none" stroke="#00B894" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CHARTS ROW: REVENUE OVERVIEW & SERVICE DISTRIBUTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Revenue Overview (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Revenue Overview</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Last 6 months</p>
                </div>
                <select className="bg-slate-50 border border-slate-200 text-slate-600 rounded-lg px-2.5 py-1 text-[11px] font-semibold focus:outline-none">
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>

              {/* SVG Line Chart with Area Gradient */}
              <div className="relative w-full h-44 mt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGradWeb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00B894" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#00B894" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="40" y1="20" x2="480" y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="55" x2="480" y2="55" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="90" x2="480" y2="90" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="125" x2="480" y2="125" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Y Axis Labels */}
                  <text x="32" y="24" textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="600">$40k</text>
                  <text x="32" y="59" textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="600">$30k</text>
                  <text x="32" y="94" textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="600">$20k</text>
                  <text x="32" y="129" textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="600">$10k</text>

                  {/* Filled Area */}
                  <path
                    d="M 50 120 C 130 100, 200 110, 280 95 C 360 80, 420 70, 470 30 L 470 145 L 50 145 Z"
                    fill="url(#areaGradWeb)"
                  />

                  {/* Main Line Curve */}
                  <path
                    d="M 50 120 C 130 100, 200 110, 280 95 C 360 80, 420 70, 470 30"
                    fill="none"
                    stroke="#00B894"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Data Nodes */}
                  <circle cx="50" cy="120" r="3.5" fill="#00B894" />
                  <circle cx="134" cy="104" r="3.5" fill="#00B894" />
                  <circle cx="218" cy="106" r="3.5" fill="#00B894" />
                  <circle cx="302" cy="92" r="3.5" fill="#00B894" />
                  <circle cx="386" cy="74" r="3.5" fill="#00B894" />
                  
                  {/* Active Highlight Node at Sep 2026 */}
                  <circle cx="470" cy="30" r="6" fill="#00B894" stroke="#ffffff" strokeWidth="2" />

                  {/* X Axis Labels */}
                  <text x="50" y="158" textAnchor="middle" fontSize="9" fill="#94A3B8" fontWeight="600">Apr</text>
                  <text x="134" y="158" textAnchor="middle" fontSize="9" fill="#94A3B8" fontWeight="600">May</text>
                  <text x="218" y="158" textAnchor="middle" fontSize="9" fill="#94A3B8" fontWeight="600">Jun</text>
                  <text x="302" y="158" textAnchor="middle" fontSize="9" fill="#94A3B8" fontWeight="600">Jul</text>
                  <text x="386" y="158" textAnchor="middle" fontSize="9" fill="#94A3B8" fontWeight="600">Aug</text>
                  <text x="470" y="158" textAnchor="middle" fontSize="9" fill="#94A3B8" fontWeight="700">Sep</text>
                </svg>

                {/* Tooltip Callout Box at Sep */}
                <div className="absolute right-0 top-0 bg-white border border-slate-200 rounded-lg px-2.5 py-1 shadow-md text-center pointer-events-none transform -translate-y-4">
                  <div className="text-[9px] text-slate-400 font-semibold">Sep 2026</div>
                  <div className="text-[11px] font-extrabold text-[#00B894]">$24,500</div>
                </div>
              </div>
            </div>

            {/* Service Distribution (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 mb-2">Service Distribution</h3>

              <div className="flex items-center justify-between gap-2">
                {/* Donut SVG */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Segment 1: AI Automation 35% */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#00B894" strokeWidth="4" strokeDasharray="30.7 57.3" strokeDashoffset="0" />
                    {/* Segment 2: Chatbots 22% */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#06B6D4" strokeWidth="4" strokeDasharray="19.3 68.7" strokeDashoffset="-30.7" />
                    {/* Segment 3: Computer Vision 18% */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#0D9488" strokeWidth="4" strokeDasharray="15.8 72.2" strokeDashoffset="-50" />
                    {/* Segment 4: Custom AI Dev 15% */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#34D399" strokeWidth="4" strokeDasharray="13.2 74.8" strokeDashoffset="-65.8" />
                    {/* Segment 5: Other 10% */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#CBD5E1" strokeWidth="4" strokeDasharray="8.8 79.2" strokeDashoffset="-79" />
                  </svg>
                  {/* Center Text */}
                  <div className="absolute text-center">
                    <div className="text-[9px] text-slate-400 font-semibold leading-none">Total Services</div>
                    <div className="text-xl font-black text-slate-900 leading-tight mt-0.5">48</div>
                  </div>
                </div>

                {/* Legend Stack */}
                <div className="space-y-1.5 text-xs font-semibold">
                  {[
                    { name: 'AI Automation', pct: '35%', color: 'bg-[#00B894]' },
                    { name: 'Chatbots', pct: '22%', color: 'bg-[#06B6D4]' },
                    { name: 'Computer Vision', pct: '18%', color: 'bg-[#0D9488]' },
                    { name: 'Custom AI Dev', pct: '15%', color: 'bg-[#34D399]' },
                    { name: 'Other', pct: '10%', color: 'bg-slate-300' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between space-x-3 text-[11px]">
                      <div className="flex items-center space-x-1.5">
                        <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                        <span className="text-slate-600 font-medium">{item.name}</span>
                      </div>
                      <span className="text-slate-900 font-bold">{item.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM ROW: RECENT PROJECTS & TOP PERFORMING SERVICES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Recent Projects Table (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-sm text-slate-900">Recent Projects</h3>
                <Link href="/agents" className="text-xs text-[#00B894] font-bold hover:underline flex items-center gap-1">
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                      <th className="pb-2.5">Project Name</th>
                      <th className="pb-2.5">Client</th>
                      <th className="pb-2.5">Status</th>
                      <th className="pb-2.5">Progress</th>
                      <th className="pb-2.5">Deadline</th>
                      <th className="pb-2.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-[11px]">
                    {[
                      { name: 'E-commerce AI Chatbot', client: 'TechNova Solutions', status: 'In Progress', statusColor: 'bg-cyan-50 text-cyan-600 border-cyan-200', pct: 70, date: 'Oct 15, 2026' },
                      { name: 'Healthcare Automation', client: 'LifeCare Hospital', status: 'Completed', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-200', pct: 100, date: 'Sep 10, 2026' },
                      { name: 'Social Media Content AI', client: 'BrandBoost', status: 'In Progress', statusColor: 'bg-cyan-50 text-cyan-600 border-cyan-200', pct: 60, date: 'Oct 28, 2026' },
                      { name: 'Computer Vision System', client: 'VisionTech', status: 'Planning', statusColor: 'bg-indigo-50 text-indigo-600 border-indigo-200', pct: 30, date: 'Nov 12, 2026' },
                      { name: 'Custom AI Development', client: 'ProFinance', status: 'Completed', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-200', pct: 100, date: 'Sep 5, 2026' },
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 font-bold text-slate-800 flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-[#E6F7F4] text-[#00B894] flex items-center justify-center font-bold text-[10px]">E</div>
                          <span>{row.name}</span>
                        </td>
                        <td className="py-2.5 text-slate-500 font-medium">{row.client}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${row.statusColor}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <div className="flex items-center space-x-2 w-20">
                            <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div className="bg-[#00B894] h-full rounded-full" style={{ width: `${row.pct}%` }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-600">{row.pct}%</span>
                          </div>
                        </td>
                        <td className="py-2.5 text-slate-400 font-medium text-[10px]">{row.date}</td>
                        <td className="py-2.5 text-right">
                          <Link href="/agents" className="text-[#00B894] font-bold hover:underline text-[10px] inline-flex items-center gap-0.5">
                            <span>View</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Performing Services (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-sm text-slate-900">Top Performing Services</h3>
                <select className="bg-slate-50 border border-slate-200 text-slate-600 rounded-lg px-2 py-0.5 text-[10px] font-semibold">
                  <option>This Month</option>
                </select>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'AI Automation', revenue: '$8,500', width: '85%' },
                  { name: 'Chatbots', revenue: '$6,200', width: '62%' },
                  { name: 'Computer Vision', revenue: '$4,800', width: '48%' },
                  { name: 'Custom AI Development', revenue: '$3,200', width: '32%' },
                  { name: 'Other Services', revenue: '$1,100', width: '11%' },
                ].map((srv, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-slate-700">{srv.name}</span>
                      <span className="text-slate-900 font-bold">{srv.revenue}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#00B894] h-full rounded-full" style={{ width: srv.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* BOTTOM QUICK ACTIONS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Founders & Team', desc: 'Edit leadership profiles', href: '/team', icon: Users },
              { title: 'Contact Info', desc: 'Edit email, phone & location', href: '/contact-info', icon: Mail },
              { title: 'Recent Clients', desc: 'View client inquiries', href: '/leads', icon: Users },
              { title: 'System Status', desc: 'All systems operational', href: '/analytics', icon: CheckCircle2 },
            ].map((qa, idx) => {
              const QaIcon = qa.icon;
              return (
                <Link
                  key={idx}
                  href={qa.href}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group block"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-[#E6F7F4] text-[#00B894] flex items-center justify-center">
                      <QaIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#00B894] transition-colors">{qa.title}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{qa.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#00B894] transition-colors" />
                </Link>
              );
            })}
          </div>

        </div>

        {/* ── RIGHT SIDEBAR PANEL (4 COLS) ── */}
        <div className="xl:col-span-4 space-y-7">
          
          {/* RECENT ACTIVITIES CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-sm text-slate-900">Recent Activities</h3>
              <Link href="/analytics" className="text-xs text-[#00B894] font-bold hover:underline flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { title: 'New project created', sub: 'E-commerce AI Chatbot', time: '2 hours ago', icon: FolderKanban },
                { title: 'Client message received', sub: 'TechNova Solutions', time: '4 hours ago', icon: MessageSquare },
                { title: 'Service completed', sub: 'AI Automation for HealthCare', time: '6 hours ago', icon: Edit3 },
                { title: 'New client onboarded', sub: 'BrightPath Marketing', time: '8 hours ago', icon: Users },
                { title: 'Payment received', sub: '$5,000 - Project #EN-1024', time: '10 hours ago', icon: DollarSign },
              ].map((act, index) => {
                const ActIcon = act.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-[#E6F7F4] text-[#00B894] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ActIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 leading-tight">{act.title}</div>
                      <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{act.sub}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{act.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI ASSISTANT PANEL */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-[420px] overflow-hidden">
            
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-[#00B894] text-white flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span className="font-extrabold text-xs text-slate-900">AI Assistant</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
              </span>
            </div>

            {/* Chat Scroll Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50/30">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-[#E6F7F4] text-[#00B894] flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[11px] leading-relaxed shadow-2xs whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#E6F7F4] text-slate-900 font-semibold border border-[#00B894]/20'
                      : 'bg-white border border-slate-200/80 text-slate-700 font-medium'
                  }`}>
                    {msg.text}
                    {msg.time && <div className="text-[9px] text-slate-400 font-normal mt-1">{msg.time}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Prompt Pills */}
            <div className="px-4 py-2 border-t border-slate-100 bg-white flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => {
                  setInputMessage('Show me all active projects');
                }}
                className="text-[10px] font-bold text-[#00B894] bg-[#E6F7F4] hover:bg-[#d0f2ec] px-3 py-1 rounded-full whitespace-nowrap transition-colors"
              >
                Show me all active projects
              </button>
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 border-t border-slate-100 bg-white flex items-center space-x-2">
              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                <Mic className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
              />
              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleSendMessage}
                className="w-8 h-8 rounded-full bg-[#00B894] hover:bg-[#00A382] text-white flex items-center justify-center shadow-md shadow-[#00B894]/20 transition-all flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
