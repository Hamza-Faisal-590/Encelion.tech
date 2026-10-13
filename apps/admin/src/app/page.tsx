'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Layers,
  Package,
  Bot,
  MessageSquare,
  Users,
  BarChart3,
  UserCheck,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
  Calendar,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  DollarSign,
  Award,
  TrendingUp,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Send,
  Mic,
  Volume2,
  Shield,
  Activity,
  Check,
  Building,
  MapPin,
  ExternalLink,
  Eye,
  Code,
  Workflow,
  FileText,
  RefreshCw,
} from 'lucide-react';

// ── TYPES ──
type NavigationTab =
  | 'dashboard'
  | 'projects'
  | 'services'
  | 'products'
  | 'agents'
  | 'chatbot'
  | 'clients'
  | 'analytics'
  | 'team'
  | 'settings';

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  iconName: string;
  heroColor: string;
  description: string;
  status: 'ACTIVE' | 'DRAFT';
}

interface ProductItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  price: string;
  status: 'LIVE' | 'BETA';
}

interface FounderItem {
  id: string;
  name: string;
  role: string;
  tag: string;
  bio: string;
  expertise: string[];
  image: string;
  initials: string;
  color: string;
  email: string;
  linkedin: string;
}

interface CustomerMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  date: string;
  status: 'NEW' | 'IN_PROGRESS' | 'REPLIED' | 'CLOSED';
  replies: { sender: 'admin' | 'customer'; text: string; time: string }[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // ── DATA STORES FOR EDITING ──
  const [services, setServices] = useState<ServiceItem[]>([
    { id: 's-1', slug: 'ai-agents', title: 'AI Agents', tagline: 'Autonomous intelligence that plans & executes.', iconName: 'agents', heroColor: '#00B894', description: 'Build autonomous AI agents that browse the web, execute code, and complete workflows.', status: 'ACTIVE' },
    { id: 's-2', slug: 'chatbots', title: 'AI Chatbots', tagline: 'Conversational AI that converts 24/7.', iconName: 'chatbot', heroColor: '#06B6D4', description: 'Customer support chatbots integrated with Shopify, Zendesk, and CRMs.', status: 'ACTIVE' },
    { id: 's-3', slug: 'workflow-automation', title: 'Workflow Automation', tagline: 'Eliminate repetitive tasks with AI RPA.', iconName: 'workflow', heroColor: '#F59E0B', description: 'End-to-end automation systems connecting 200+ business applications.', status: 'ACTIVE' },
    { id: 's-4', slug: 'computer-vision', title: 'Computer Vision', tagline: 'Visual intelligence for image & video analysis.', iconName: 'vision', heroColor: '#0D9488', description: 'Defect detection, medical image analysis, and real-time CCTV monitoring.', status: 'ACTIVE' },
    { id: 's-5', slug: 'custom-ai', title: 'Custom AI Development', tagline: 'Bespoke models for unique challenges.', iconName: 'custom', heroColor: '#34D399', description: 'Proprietary fine-tuned LLMs, recommendation engines, and predictive pipelines.', status: 'ACTIVE' },
  ]);

  const [products, setProducts] = useState<ProductItem[]>([
    { id: 'p-1', name: 'AgentOrchestrator Pro', category: 'Autonomous Agents', tagline: 'Multi-agent orchestration framework', price: '$499/mo', status: 'LIVE' },
    { id: 'p-2', name: 'VisionInspector AI', category: 'Computer Vision', tagline: 'Edge QA visual defect detector', price: '$899/mo', status: 'LIVE' },
    { id: 'p-3', name: 'ConversationalCore RAG', category: 'Chatbots', tagline: 'Enterprise RAG knowledge base engine', price: '$299/mo', status: 'LIVE' },
    { id: 'p-4', name: 'WorkflowAutomation Hub', category: 'Automation', tagline: 'Low-code AI process pipeline editor', price: '$399/mo', status: 'BETA' },
  ]);

  const [founders, setFounders] = useState<FounderItem[]>([
    {
      id: 'f-1',
      name: 'Hamza Iqbal',
      role: 'CEO & Co-Founder',
      tag: 'Chief Executive Officer',
      bio: 'Visionary entrepreneur and AI strategist with 8+ years of experience building enterprise software.',
      expertise: ['AI Strategy', 'Business Development', 'Product Vision', 'Enterprise Partnerships'],
      image: '/founder_ceo.png',
      initials: 'HI',
      color: '#00B894',
      email: 'hamza@encelion.tech',
      linkedin: 'https://linkedin.com/in/hamzaiqbal',
    },
    {
      id: 'f-2',
      name: 'Usman Tariq',
      role: 'CTO & Co-Founder',
      tag: 'Chief Technology Officer',
      bio: 'Full-stack AI engineer and systems architect with deep expertise in machine learning and autonomous agents.',
      expertise: ['Machine Learning', 'NLP & LLMs', 'System Architecture', 'AI Agents'],
      image: '',
      initials: 'UT',
      color: '#06B6D4',
      email: 'usman@encelion.tech',
      linkedin: 'https://linkedin.com/in/usmantariq',
    },
  ]);

  const [customers, setCustomers] = useState<CustomerMessage[]>([
    {
      id: 'c-101',
      name: 'Alexander Wright',
      email: 'alex.wright@finserve.com',
      phone: '+1 (555) 234-8901',
      service: 'AI Agents & Workflow Automation',
      budget: '$25,000 - $50,000',
      message: 'Looking to deploy autonomous agents for invoice processing and ERP record reconciliation.',
      date: '2026-10-07 11:30',
      status: 'NEW',
      replies: [],
    },
    {
      id: 'c-102',
      name: 'Dr. Elena Vance',
      email: 'evance@diagnoai.org',
      phone: '+1 (555) 890-1234',
      service: 'Computer Vision',
      budget: '$50,000+',
      message: 'We want to expand our existing computer vision model for MRI scans across 3 new hospital clinics.',
      date: '2026-10-06 16:45',
      status: 'IN_PROGRESS',
      replies: [
        { sender: 'admin', text: 'Hello Dr. Vance, thanks for reaching out. We can schedule a tech deep-dive this Thursday.', time: '2026-10-06 17:10' },
      ],
    },
    {
      id: 'c-103',
      name: 'Marcus Brody',
      email: 'mbrody@manucore.io',
      phone: '+1 (555) 456-7890',
      service: 'Predictive Maintenance',
      budget: '$10,000 - $25,000',
      message: 'Need telemetry sensor integration for 40 CNC machines at our Austin plant.',
      date: '2026-10-05 09:15',
      status: 'REPLIED',
      replies: [
        { sender: 'admin', text: 'Proposal sent over email. Waiting for factory floor specs.', time: '2026-10-05 10:30' },
      ],
    },
  ]);

  // AI Assistant Widget State
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

  // Modal Editing States
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [editingFounder, setEditingFounder] = useState<FounderItem | null>(null);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

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

  const handleSendReply = (customerId: string) => {
    const text = replyTextMap[customerId];
    if (!text || !text.trim()) return;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId) {
          return {
            ...c,
            status: 'REPLIED',
            replies: [...c.replies, { sender: 'admin', text, time: nowStr }],
          };
        }
        return c;
      })
    );
    setReplyTextMap((prev) => ({ ...prev, [customerId]: '' }));
  };

  return (
    <div className={`min-h-screen ${themeMode === 'dark' ? 'bg-[#0B0F17] text-slate-100' : 'bg-[#F8FAFC] text-slate-800'} font-sans flex antialiased`}>
      
      {/* ── LEFT SIDEBAR NAV ── */}
      <aside className={`w-64 flex-shrink-0 ${themeMode === 'dark' ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200/80'} border-r flex flex-col justify-between p-5 min-h-screen sticky top-0 h-screen z-20`}>
        <div>
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 px-2 py-1 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00B894] to-[#00D26A] flex items-center justify-center shadow-lg shadow-[#00B894]/25">
              <span className="text-white font-extrabold text-xl italic tracking-tighter">E</span>
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">Encelion</span>
              <span className="font-extrabold text-lg text-[#00B894]">.tech</span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'projects', label: 'Projects', icon: FolderKanban },
              { id: 'services', label: 'Services', icon: Layers },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'agents', label: 'AI Agents', icon: Bot },
              { id: 'chatbot', label: 'Chatbot', icon: MessageSquare },
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'team', label: 'Team', icon: UserCheck },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as NavigationTab)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#E6F7F4] text-[#00B894] shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#00B894]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Upgrade Banner */}
        <div className="mt-6 bg-gradient-to-b from-[#E0F7FA]/80 to-[#EBF8F6] rounded-2xl p-4 border border-cyan-100/70 text-center relative overflow-hidden shadow-sm">
          <div className="w-16 h-16 mx-auto mb-1 relative flex items-center justify-center">
            <img src="/hero_robot.png" alt="Robot Pro" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 mt-1">Upgrade to Pro</h4>
          <p className="text-[11px] text-slate-500 leading-tight mt-1 mb-3 px-1">
            Unlock advanced AI features, higher limits and priority support.
          </p>
          <button className="bg-[#00B894] hover:bg-[#00A382] text-white text-xs font-semibold px-4 py-2 rounded-full w-full shadow-md shadow-[#00B894]/20 transition-all flex items-center justify-center gap-1.5">
            <span>Upgrade Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 min-w-0 flex flex-col">
        
        {/* TOP HEADER BAR */}
        <header className={`h-16 px-8 flex items-center justify-between border-b ${themeMode === 'dark' ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200/80'} sticky top-0 z-10`}>
          {/* Search Bar */}
          <div className="relative w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-100/80 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00B894]/30 focus:bg-white transition-all border border-transparent focus:border-[#00B894]/40"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200/60">
              <button
                onClick={() => setThemeMode('light')}
                className={`p-1 rounded-full transition-all ${themeMode === 'light' ? 'bg-white shadow-sm text-[#00B894]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode('dark')}
                className={`p-1 rounded-full transition-all ${themeMode === 'dark' ? 'bg-slate-800 shadow-sm text-[#00B894]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-[#00B894]/10 border-2 border-[#00B894] overflow-hidden flex items-center justify-center font-bold text-xs text-[#00B894]">
                <img src="/founder_ceo.png" alt="Hamza Faisal" className="w-full h-full object-cover" onError={(e) => { (e.target as any).style.display = 'none'; }} />
                <span>HF</span>
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">Hamza Faisal</div>
                <div className="text-[11px] text-slate-400 font-medium">Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN DASHBOARD PAGE BODY */}
        <div className="p-8 space-y-7">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-7">
              
              {/* PAGE TITLE & GREETING ROW */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Good Morning, Hamza</span>
                    <span className="text-2xl">👋</span>
                  </h1>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Here's what's happening with your AI solutions today.
                  </p>
                </div>
                {/* Date Dropdown */}
                <button className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-1.5 text-xs text-slate-600 font-semibold shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mon, Sep 22, 2026</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* TOP LAYOUT GRID: LEFT CONTENT (8 cols) + RIGHT PANEL (4 cols) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-7">
                
                {/* LEFT MAIN SECTION (8 COLS) */}
                <div className="xl:col-span-8 space-y-7">
                  
                  {/* HERO BANNER CARD */}
                  <div className="rounded-3xl p-7 relative overflow-hidden bg-gradient-to-r from-[#DFF7F4]/90 via-[#EAF9F6] to-[#F7FDFC] border border-[#00B894]/20 shadow-sm flex flex-col md:flex-row items-center justify-between min-h-[200px]">
                    
                    {/* Left Text */}
                    <div className="z-10 max-w-sm space-y-3">
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                        Build Smarter <br />
                        with <span className="text-[#00B894]">Encelion.tech</span>
                      </h2>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        AI solutions that automate, innovate and scale your business.
                      </p>
                      <button
                        onClick={() => setActiveTab('services')}
                        className="bg-[#00B894] hover:bg-[#00A382] text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md shadow-[#00B894]/25 transition-all flex items-center gap-2 mt-2"
                      >
                        <span>Explore Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Center 3D Robot Image */}
                    <div className="hidden md:block absolute right-48 top-0 bottom-0 w-64 pointer-events-none">
                      <img src="/hero_robot.png" alt="Robot AI" className="w-full h-full object-contain drop-shadow-xl" />
                    </div>

                    {/* Right Glassmorphism Pills */}
                    <div className="z-10 mt-4 md:mt-0 space-y-2 w-full md:w-auto">
                      {[
                        { title: 'AI Automation', icon: Workflow },
                        { title: 'Chatbots', icon: MessageSquare },
                        { title: 'Computer Vision', icon: Eye },
                        { title: 'Custom AI Dev', icon: Code },
                      ].map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                          <div
                            key={idx}
                            onClick={() => setActiveTab('services')}
                            className="bg-white/85 backdrop-blur-md border border-slate-100 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 flex items-center justify-between shadow-xs hover:shadow-md hover:bg-white transition-all cursor-pointer w-full md:w-48 group"
                          >
                            <div className="flex items-center space-x-2.5">
                              <div className="w-6 h-6 rounded-lg bg-[#E6F7F4] text-[#00B894] flex items-center justify-center">
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[11px] font-bold text-slate-800">{item.title}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00B894] transition-colors" />
                          </div>
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
                        <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
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
                    <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs flex flex-col justify-between">
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
                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
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
                            fill="url(#areaGrad)"
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
                    <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs flex flex-col justify-between">
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
                    <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-extrabold text-sm text-slate-900">Recent Projects</h3>
                        <button onClick={() => setActiveTab('projects')} className="text-xs text-[#00B894] font-bold hover:underline flex items-center gap-1">
                          <span>View All</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
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
                                  <button onClick={() => setActiveTab('projects')} className="text-[#00B894] font-bold hover:underline text-[10px] flex items-center justify-end gap-0.5 ml-auto">
                                    <span>View</span>
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Top Performing Services (5 cols) */}
                    <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs flex flex-col justify-between">
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

                  {/* BOTTOM QUICK ACTIONS TRIPLE CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { title: 'Quick Actions', desc: 'Access your most used features', tab: 'services', icon: Sparkles },
                      { title: 'Recent Clients', desc: 'View all your clients', tab: 'clients', icon: Users },
                      { title: 'System Status', desc: 'All systems operational', tab: 'analytics', icon: CheckCircle2 },
                    ].map((qa, idx) => {
                      const QaIcon = qa.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => setActiveTab(qa.tab as NavigationTab)}
                          className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
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
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* RIGHT SIDEBAR PANEL (4 COLS) */}
                <div className="xl:col-span-4 space-y-7">
                  
                  {/* RECENT ACTIVITIES CARD */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-extrabold text-sm text-slate-900">Recent Activities</h3>
                      <button className="text-xs text-[#00B894] font-bold hover:underline flex items-center gap-1">
                        <span>View All</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
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
                  <div className="bg-white rounded-2xl border border-slate-200/70 shadow-xs flex flex-col h-[420px] overflow-hidden">
                    
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
          )}

          {/* TAB 2: SERVICES MANAGER */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Manage Services</h2>
                  <p className="text-xs text-slate-500">Edit, add or toggle active AI service offerings displayed on website</p>
                </div>
                <button
                  onClick={() =>
                    setEditingService({
                      id: `s-${Date.now()}`,
                      slug: 'new-service',
                      title: 'New AI Service',
                      tagline: 'Service tagline here',
                      iconName: 'custom',
                      heroColor: '#00B894',
                      description: 'Comprehensive description of the new AI service offering.',
                      status: 'ACTIVE',
                    })
                  }
                  className="bg-[#00B894] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 hover:bg-[#00A382]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((srv) => (
                  <div key={srv.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: srv.heroColor }}>
                        {srv.title.charAt(0)}
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${srv.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {srv.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{srv.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{srv.tagline}</p>
                    <p className="text-xs text-slate-400 line-clamp-2">{srv.description}</p>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <button
                        onClick={() => setEditingService(srv)}
                        className="text-xs text-[#00B894] font-bold flex items-center space-x-1 hover:underline"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Service</span>
                      </button>
                      <button
                        onClick={() => setServices(services.filter((s) => s.id !== srv.id))}
                        className="text-xs text-red-500 font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS MANAGER */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Manage Products</h2>
                  <p className="text-xs text-slate-500">Configure AI products, categories, pricing, and live deployment statuses</p>
                </div>
                <button
                  onClick={() =>
                    setEditingProduct({
                      id: `p-${Date.now()}`,
                      name: 'New Product AI',
                      category: 'Autonomous Agents',
                      tagline: 'Enterprise scale AI tool',
                      price: '$399/mo',
                      status: 'LIVE',
                    })
                  }
                  className="bg-[#00B894] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 hover:bg-[#00A382]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500">
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Tagline</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900">{p.name}</td>
                        <td className="p-4 text-slate-600">{p.category}</td>
                        <td className="p-4 text-slate-500 max-w-xs truncate">{p.tagline}</td>
                        <td className="p-4 font-bold text-[#00B894]">{p.price}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.status === 'LIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => setEditingProduct(p)} className="text-[#00B894] font-bold hover:underline">Edit</button>
                          <button onClick={() => setProducts(products.filter((x) => x.id !== p.id))} className="text-red-500 font-semibold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: TEAM & FOUNDERS MANAGER */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Manage Founders & Team Info</h2>
                  <p className="text-xs text-slate-500">Update founder profiles, bio descriptions, expertise tags, and avatar pictures</p>
                </div>
                <button
                  onClick={() =>
                    setEditingFounder({
                      id: `f-${Date.now()}`,
                      name: 'New Team Member',
                      role: 'AI Researcher',
                      tag: 'Research & Science',
                      bio: 'Passionate AI scientist building state of the art models.',
                      expertise: ['LLMs', 'PyTorch', 'Vector Search'],
                      image: '',
                      initials: 'TM',
                      color: '#00B894',
                      email: 'team@encelion.tech',
                      linkedin: 'https://linkedin.com',
                    })
                  }
                  className="bg-[#00B894] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 hover:bg-[#00A382]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Founder / Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {founders.map((f) => (
                  <div key={f.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#00B894]/10 border-2 border-[#00B894] overflow-hidden flex items-center justify-center font-bold text-lg text-[#00B894] flex-shrink-0">
                          {f.image ? (
                            <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                          ) : (
                            <span>{f.initials}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-lg">{f.name}</h3>
                          <div className="text-xs font-bold text-[#00B894]">{f.role}</div>
                          <div className="text-[11px] text-slate-400">{f.email}</div>
                        </div>
                      </div>
                      <button onClick={() => setEditingFounder(f)} className="p-2 bg-slate-100 hover:bg-[#E6F7F4] text-slate-600 hover:text-[#00B894] rounded-xl transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{f.bio}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {f.expertise.map((exp, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CLIENT COMMUNICATIONS & MESSAGES */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Customer Inbox & Communication</h2>
                  <p className="text-xs text-slate-500">View incoming project inquiries and directly communicate with potential clients</p>
                </div>
              </div>

              <div className="space-y-4">
                {customers.map((c) => (
                  <div key={c.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="font-bold text-slate-900 text-base">{c.name}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            c.status === 'NEW' ? 'bg-blue-100 text-blue-700' : c.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {c.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {c.email} • {c.phone} • Submitted: {c.date}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          value={c.status}
                          onChange={(e) => setCustomers(customers.map((x) => x.id === c.id ? { ...x, status: e.target.value as any } : x))}
                          className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold"
                        >
                          <option value="NEW">Status: NEW</option>
                          <option value="IN_PROGRESS">Status: IN PROGRESS</option>
                          <option value="REPLIED">Status: REPLIED</option>
                          <option value="CLOSED">Status: CLOSED</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1">
                      <div><span className="font-bold text-slate-700">Requested Service:</span> <span className="text-[#00B894] font-semibold">{c.service}</span></div>
                      <div><span className="font-bold text-slate-700">Budget Range:</span> {c.budget}</div>
                      <p className="text-slate-600 pt-1 leading-relaxed">{c.message}</p>
                    </div>

                    {/* Reply History */}
                    {c.replies.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <div className="text-xs font-bold text-slate-500">Communication History:</div>
                        {c.replies.map((rep, idx) => (
                          <div key={idx} className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 text-xs space-y-1">
                            <div className="flex items-center justify-between text-emerald-800 font-bold">
                              <span>Admin Reply</span>
                              <span className="text-[10px] text-slate-400">{rep.time}</span>
                            </div>
                            <p className="text-slate-700">{rep.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input Box */}
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="text"
                        value={replyTextMap[c.id] || ''}
                        onChange={(e) => setReplyTextMap({ ...replyTextMap, [c.id]: e.target.value })}
                        placeholder="Write a message or reply to customer..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#00B894]"
                      />
                      <button
                        onClick={() => handleSendReply(c.id)}
                        className="bg-[#00B894] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 hover:bg-[#00A382]"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Reply</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OTHER TABS FALLBACK */}
          {['projects', 'agents', 'chatbot', 'analytics', 'settings'].includes(activeTab) && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F4] text-[#00B894] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 capitalize">{activeTab} Console</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {activeTab} module is connected to live Encelion API backend with real-time telemetry streaming enabled.
              </p>
            </div>
          )}

        </div>

      </main>

      {/* ── MODALS FOR EDITING SERVICES, PRODUCTS, FOUNDERS ── */}
      {editingService && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Edit Service Details</h3>
              <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Service Title</label>
                <input type="text" value={editingService.title} onChange={(e) => setEditingService({ ...editingService, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                <input type="text" value={editingService.tagline} onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Description</label>
                <textarea rows={3} value={editingService.description} onChange={(e) => setEditingService({ ...editingService, description: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Status</label>
                <select value={editingService.status} onChange={(e) => setEditingService({ ...editingService, status: e.target.value as any })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold">
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="DRAFT">DRAFT</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button onClick={() => setEditingService(null)} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100">Cancel</button>
              <button
                onClick={() => {
                  setServices(services.map((s) => (s.id === editingService.id ? editingService : s)));
                  setEditingService(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#00B894] hover:bg-[#00A382]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {editingFounder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Edit Founder / Team Profile</h3>
              <button onClick={() => setEditingFounder(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input type="text" value={editingFounder.name} onChange={(e) => setEditingFounder({ ...editingFounder, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Title</label>
                <input type="text" value={editingFounder.role} onChange={(e) => setEditingFounder({ ...editingFounder, role: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Bio</label>
                <textarea rows={3} value={editingFounder.bio} onChange={(e) => setEditingFounder({ ...editingFounder, bio: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Photo / Avatar Image URL</label>
                <input type="text" value={editingFounder.image} onChange={(e) => setEditingFounder({ ...editingFounder, image: e.target.value })} placeholder="/founder_ceo.png" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button onClick={() => setEditingFounder(null)} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100">Cancel</button>
              <button
                onClick={() => {
                  setFounders(founders.map((f) => (f.id === editingFounder.id ? editingFounder : f)));
                  setEditingFounder(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#00B894] hover:bg-[#00A382]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
