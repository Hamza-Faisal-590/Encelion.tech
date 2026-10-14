'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F19] text-slate-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="col-span-2 space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-extrabold text-lg text-white">ENCELION<span className="text-[#00F0FF]">.AI</span></span>
          </Link>
          <p className="text-slate-400 max-w-sm leading-relaxed">
            Enterprise multi-tenant AI platform powering RAG knowledge graphs, multi-modal voice agents, autonomous workflows, and 3D humanoid robotics.
          </p>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] text-slate-300 font-semibold">All Systems Operational · 99.99% Uptime</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-[11px]">Platform</h4>
          <ul className="space-y-2.5">
            <li><Link href="#rag" className="hover:text-[#00F0FF]">RAG Engine</Link></li>
            <li><Link href="#voice" className="hover:text-[#00F0FF]">Voice AI</Link></li>
            <li><Link href="#workflows" className="hover:text-[#00F0FF]">Workflow Canvas</Link></li>
            <li><Link href="#vision" className="hover:text-[#00F0FF]">Vision Inspection</Link></li>
            <li><Link href="#robotics" className="hover:text-[#00F0FF]">3D Humanoid</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-[11px]">Resources</h4>
          <ul className="space-y-2.5">
            <li><Link href="#docs" className="hover:text-[#00F0FF]">Documentation</Link></li>
            <li><Link href="#api" className="hover:text-[#00F0FF]">API Reference</Link></li>
            <li><Link href="#status" className="hover:text-[#00F0FF]">System Status</Link></li>
            <li><Link href="#github" className="hover:text-[#00F0FF]">GitHub Monorepo</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-[11px]">Company</h4>
          <ul className="space-y-2.5">
            <li><Link href="#about" className="hover:text-[#00F0FF]">About Us</Link></li>
            <li><Link href="#careers" className="hover:text-[#00F0FF]">Careers</Link></li>
            <li><Link href="#privacy" className="hover:text-[#00F0FF]">Privacy Policy</Link></li>
            <li><Link href="#terms" className="hover:text-[#00F0FF]">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-[11px]">
        <p>© 2026 Encelion Inc. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Version 1.0.0 · Build-ready</p>
      </div>
    </footer>
  );
}
