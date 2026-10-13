'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function KnowledgePage() {
  const [docs] = useState([
    { id: '1', title: 'Product Q3 Specification v2.pdf', status: 'INDEXED', chunks: 892, mimeType: 'application/pdf', createdAt: '2026-09-20' },
    { id: '2', title: 'Engineering Architecture Handbook', status: 'INDEXED', chunks: 1240, mimeType: 'text/plain', createdAt: '2026-09-18' },
    { id: '3', title: 'API Reference v1.0.md', status: 'PROCESSING', chunks: 0, mimeType: 'text/markdown', createdAt: '2026-09-22' },
  ]);

  const [uploadModal, setUploadModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docContent, setDocContent] = useState('');

  const statusColor = (s: string) => {
    if (s === 'INDEXED') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (s === 'PROCESSING') return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (s === 'FAILED') return 'text-red-400 bg-red-500/10 border-red-500/30';
    return 'text-slate-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">RAG Knowledge Graph</h1>
          <p className="text-sm text-slate-400 mt-1">Upload, index, and manage your knowledge documents for AI retrieval.</p>
        </div>
        <button
          onClick={() => setUploadModal(true)}
          className="px-4 py-2 bg-[#00F0FF] text-[#0B0F19] text-xs font-bold rounded-xl shadow-lg hover:bg-[#00D0DF] transition"
        >
          + Upload Document
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Documents', value: '3', color: 'text-[#00F0FF]' },
          { label: 'Indexed Chunks', value: '2,132', color: 'text-[#7000FF]' },
          { label: 'Index Accuracy', value: '99.8%', color: 'text-emerald-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#111827]/80 border border-white/10 rounded-xl p-4 shadow-lg">
            <span className="text-xs text-slate-400">{s.label}</span>
            <div className={`text-2xl font-extrabold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Documents Table */}
      <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Knowledge Documents</h3>
          <span className="text-xs text-slate-400">{docs.length} documents</span>
        </div>
        <div className="divide-y divide-white/5">
          {docs.map((doc) => (
            <div key={doc.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{doc.mimeType.includes('pdf') ? '📄' : '📝'}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{doc.title}</p>
                  <p className="text-[11px] text-slate-500">{doc.chunks.toLocaleString()} chunks · {doc.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusColor(doc.status)}`}>
                  {doc.status}
                </span>
                <button className="text-xs text-red-400 hover:text-red-300 transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <h2 className="text-xl font-bold text-white">Upload Knowledge Document</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Document Title</label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g. Product Specification v3"
                  className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Document Content</label>
                <textarea
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                  rows={6}
                  placeholder="Paste document content here to index..."
                  className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00F0FF] resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setUploadModal(false)} className="px-4 py-2 bg-white/10 text-white text-xs font-semibold rounded-xl hover:bg-white/20 transition">
                Cancel
              </button>
              <button
                disabled={!docTitle.trim() || !docContent.trim()}
                className="px-4 py-2 bg-[#00F0FF] text-[#0B0F19] text-xs font-bold rounded-xl hover:bg-[#00D0DF] disabled:opacity-40 transition"
              >
                Index Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
