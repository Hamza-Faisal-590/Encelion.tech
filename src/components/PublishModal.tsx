'use client';

import { useState, useEffect } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  X,
  Loader2,
  GitCommit,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PublishModal({ isOpen, onClose }: PublishModalProps) {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [commitMessage, setCommitMessage] = useState('Update website content from admin dashboard');
  const [statusResult, setStatusResult] = useState<{
    hasChanges?: boolean;
    changedFiles?: string[];
    error?: string;
  } | null>(null);
  const [publishResult, setPublishResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
    fallbackCommand?: string;
    alreadyUpToDate?: boolean;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const fallbackCommand =
    'git add . && git commit -m "Update website content" && git push origin main';

  useEffect(() => {
    if (isOpen) {
      setPublishResult(null);
      checkGitStatus();
    }
  }, [isOpen]);

  const checkGitStatus = async () => {
    setChecking(true);
    try {
      const res = await fetch('/api/admin/publish');
      const data = await res.json();
      setStatusResult(data);
    } catch (err: any) {
      setStatusResult({ error: err.message || 'Could not verify git status' });
    } finally {
      setChecking(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    setPublishResult(null);

    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commitMessage }),
      });

      const data = await res.json();
      setPublishResult(data);
      if (data.success) {
        checkGitStatus();
      }
    } catch (err: any) {
      setPublishResult({
        success: false,
        error: err.message || 'Network request failed',
        fallbackCommand,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(fallbackCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00B894] to-[#00D26A] flex items-center justify-center text-white shadow-lg shadow-[#00B894]/25">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">
              Publish to Live Website
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Sync code changes & push to GitHub repository
            </p>
          </div>
        </div>

        {/* Informational Banner */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-5 text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#00B894]" />
            <span>Automatic Code Synchronization</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            All edits in <strong>Services</strong>, <strong>Products</strong>,{' '}
            <strong>Team</strong>, and <strong>Contact Info</strong> are already auto-saved to your
            local code files in <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-700 font-mono">src/data/</code>.
          </p>
        </div>

        {/* Git Changed Files Status */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span>Pending Local Changes:</span>
            {checking && (
              <span className="flex items-center gap-1 text-[#00B894]">
                <Loader2 className="w-3 h-3 animate-spin" /> Checking git...
              </span>
            )}
          </div>

          <div className="bg-slate-900 text-slate-300 rounded-2xl p-3.5 text-xs font-mono max-h-36 overflow-y-auto border border-slate-800">
            {checking ? (
              <div className="text-slate-500 italic">Inspecting repository status...</div>
            ) : statusResult?.changedFiles && statusResult.changedFiles.length > 0 ? (
              <ul className="space-y-1">
                {statusResult.changedFiles.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-emerald-400">
                    <span className="text-slate-500">›</span> {f}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-slate-400">
                Working tree is clean. Ready to push or pull latest updates.
              </div>
            )}
          </div>
        </div>

        {/* Commit Message Input */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
            Commit Summary
          </label>
          <div className="relative">
            <GitCommit className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={commitMessage}
              onChange={e => setCommitMessage(e.target.value)}
              placeholder="e.g. Update website content from admin dashboard"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 transition"
            />
          </div>
        </div>

        {/* Publish Result Feedback */}
        {publishResult && (
          <div
            className={`p-4 rounded-2xl text-xs mb-5 border ${
              publishResult.success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {publishResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-[#00B894] flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold mb-1">
                  {publishResult.success ? 'Success!' : 'Manual Git Push Needed'}
                </div>
                <p className="leading-relaxed mb-2">
                  {publishResult.message || publishResult.error}
                </p>
                {publishResult.fallbackCommand && (
                  <div className="mt-2 bg-slate-900 text-white p-2.5 rounded-xl font-mono text-[11px] flex items-center justify-between gap-2">
                    <span className="truncate">{publishResult.fallbackCommand}</span>
                    <button
                      onClick={handleCopyCommand}
                      className="text-xs text-[#00B894] hover:underline flex items-center gap-1 flex-shrink-0"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePublish}
            disabled={loading}
            className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#00B894] to-[#00997A] text-white font-bold text-xs shadow-lg shadow-[#00B894]/25 hover:shadow-xl hover:shadow-[#00B894]/35 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Pushing to GitHub...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>🚀 Push to Live Site (GitHub)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyCommand}
            className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            title="Copy terminal command"
          >
            {copied ? <Check className="w-4 h-4 text-[#00B894]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Command'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
