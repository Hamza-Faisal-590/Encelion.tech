'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#04171d] border border-[#00B894]/30 flex items-center justify-center shadow-lg shadow-[#00B894]/20 group-hover:scale-105 transition duration-200 flex-shrink-0">
            <img src="/logo.png" alt="Encelion.tech Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-[#00B894] transition">
            ENCELION<span className="text-[#00B894]">.TECH</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="#rag" className="hover:text-[#00F0FF] transition">RAG Engine</Link>
          <Link href="#voice" className="hover:text-[#00F0FF] transition">Voice AI</Link>
          <Link href="#workflows" className="hover:text-[#00F0FF] transition">Workflows</Link>
          <Link href="#robotics" className="hover:text-[#00F0FF] transition">Robotics</Link>
          <Link href="#pricing" className="hover:text-[#00F0FF] transition">Pricing</Link>
          <Link href="#docs" className="hover:text-[#00F0FF] transition">Docs</Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-sm font-bold bg-[#00F0FF] text-[#0B0F19] hover:bg-[#00D0DF] px-4 py-2 rounded-lg shadow-lg shadow-[#00F0FF]/25 transition"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0B0F19] px-4 pt-2 pb-6 space-y-3">
          <Link href="#rag" className="block text-sm font-medium text-slate-300 py-2">RAG Engine</Link>
          <Link href="#voice" className="block text-sm font-medium text-slate-300 py-2">Voice AI</Link>
          <Link href="#workflows" className="block text-sm font-medium text-slate-300 py-2">Workflows</Link>
          <Link href="#robotics" className="block text-sm font-medium text-slate-300 py-2">Robotics</Link>
          <Link href="#pricing" className="block text-sm font-medium text-slate-300 py-2">Pricing</Link>
          <div className="pt-4 border-t border-white/10 space-y-2">
            <Link href="/login" className="block w-full text-center text-sm font-semibold text-slate-300 py-2">Sign In</Link>
            <Link href="/register" className="block w-full text-center text-sm font-bold bg-[#00F0FF] text-[#0B0F19] py-2 rounded-lg">Get Started Free</Link>
          </div>
        </div>
      )}
    </header>
  );
}
