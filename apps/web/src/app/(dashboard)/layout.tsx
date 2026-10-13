'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  ArrowRight,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Projects', href: '/agents', icon: FolderKanban },
    { label: 'Services', href: '/services', icon: Layers },
    { label: 'Products', href: '/products', icon: Package },
    { label: 'AI Agents', href: '/agents', icon: Bot },
    { label: 'Chatbot', href: '/contact', icon: MessageSquare },
    { label: 'Clients', href: '/leads', icon: Users },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Team', href: '/about', icon: UserCheck },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans antialiased">
      
      {/* ── LEFT SIDEBAR NAV ── */}
      <aside className="w-64 border-r border-slate-200/80 bg-white p-5 flex flex-col justify-between hidden md:flex min-h-screen sticky top-0 h-screen z-20 flex-shrink-0">
        <div>
          {/* Logo Brand */}
          <Link href="/dashboard" className="flex items-center space-x-3 px-2 py-1 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00B894] to-[#00D26A] flex items-center justify-center shadow-lg shadow-[#00B894]/25">
              <span className="text-white font-extrabold text-xl italic tracking-tighter">E</span>
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">Encelion</span>
              <span className="font-extrabold text-lg text-[#00B894]">.tech</span>
            </div>
          </Link>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#E6F7F4] text-[#00B894] shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#00B894]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Upgrade Banner */}
        <div className="mt-6 bg-gradient-to-b from-[#E0F7FA]/80 to-[#EBF8F6] rounded-2xl p-4 border border-cyan-100/70 text-center relative overflow-hidden shadow-xs">
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
      <div className="flex-1 min-w-0 flex flex-col">
        
        {/* TOP HEADER BAR */}
        <header className="h-16 px-8 flex items-center justify-between border-b border-slate-200/80 bg-white sticky top-0 z-10">
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
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Light / Dark Mode Toggle */}
            <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200/60">
              <button className="p-1 rounded-full bg-white shadow-xs text-[#00B894]">
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 rounded-full text-slate-400 hover:text-slate-600">
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

        {/* Page Body */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>

    </div>
  );
}
