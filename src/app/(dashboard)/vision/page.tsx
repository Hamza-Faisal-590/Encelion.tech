'use client';

import { useState } from 'react';

type TaskType = 'OCR' | 'DOCUMENT_PARSING' | 'OBJECT_DETECTION' | 'FACE_ANALYSIS' | 'DIAGRAM_EXTRACTION' | 'VISUAL_QA';

export default function VisionPage() {
  const [selectedTask, setSelectedTask] = useState<TaskType>('OCR');
  const [isProcessing, setIsProcessing] = useState(false);
  const [prompt, setPrompt] = useState('Extract all key invoice numbers, dates, line items, and totals.');
  
  const [outputResult, setOutputResult] = useState<any>({
    documentType: 'Invoice / Commercial Receipt',
    confidenceScore: 0.994,
    latencyMs: 165,
    extractedData: {
      invoiceNumber: 'ENC-2026-9021',
      date: '2026-09-22',
      vendor: 'Encelion Technologies Inc.',
      client: 'Acme Corporation',
      lineItems: [
        { description: 'Enterprise AI Monorepo License', qty: 1, amount: '$35,000.00' },
        { description: 'Dedicated RAG Vector Index Node', qty: 2, amount: '$7,000.00' },
        { description: 'Voice AI Stream Accelerator', qty: 1, amount: '$7,500.00' },
      ],
      subtotal: '$49,500.00',
      tax: '$0.00',
      totalAmountDue: '$49,500.00',
    },
    boundingBoundingBoxes: [
      { label: 'Vendor Header', x: '5%', y: '4%', w: '40%', h: '8%' },
      { label: 'Invoice #', x: '60%', y: '4%', w: '35%', h: '6%' },
      { label: 'Line Items Table', x: '5%', y: '25%', w: '90%', h: '45%' },
      { label: 'Total Due', x: '55%', y: '75%', w: '40%', h: '10%' },
    ],
  });

  const handleRunAnalysis = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1200);
  };

  const tasks: { type: TaskType; title: string; desc: string; icon: string }[] = [
    { type: 'OCR', title: 'OCR Text Extraction', desc: 'Extract multi-lingual text & bounding boxes', icon: '📝' },
    { type: 'DOCUMENT_PARSING', title: 'Contract & Invoice Parsing', desc: 'Key-value extraction to JSON', icon: '📑' },
    { type: 'OBJECT_DETECTION', title: 'Industrial Object Detection', desc: 'Identify components, defect areas', icon: '🔍' },
    { type: 'FACE_ANALYSIS', title: 'Biometric Face Analysis', desc: 'Detection, anti-spoofing checks', icon: '👤' },
    { type: 'DIAGRAM_EXTRACTION', title: 'Architecture Diagram Parser', desc: 'Convert flowcharts to Mermaid JSON', icon: '📐' },
    { type: 'VISUAL_QA', title: 'Visual Question Answering', desc: 'Ask natural language questions on image', icon: '💬' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Computer Vision AI Engine</h1>
          <p className="text-sm text-slate-400 mt-1">
            Multimodal visual intelligence for document parsing, OCR, object detection, and visual Q&A.
          </p>
        </div>
        <span className="text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1.5 rounded-full border border-[#00F0FF]/30">
          GPU Accelerated · Latency ~165ms
        </span>
      </div>

      {/* Task Type Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {tasks.map((t) => (
          <div
            key={t.type}
            onClick={() => setSelectedTask(t.type)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition flex flex-col justify-between space-y-2 ${
              selectedTask === t.type
                ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/10'
                : 'bg-[#111827]/80 border-white/10 text-slate-300 hover:border-white/20'
            }`}
          >
            <div className="text-xl">{t.icon}</div>
            <div>
              <p className="text-xs font-bold text-white truncate">{t.title}</p>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Studio Area: Image Canvas & JSON Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Drag & Drop Image Canvas with Bounding Boxes */}
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Input Image Workspace</span>
              <span className="text-[10px] text-slate-400 font-mono">invoice_sample_9021.png</span>
            </h2>
            <button className="text-xs text-[#00F0FF] hover:underline font-medium">Upload New Image</button>
          </div>

          {/* Interactive Bounding Box Canvas Container */}
          <div className="relative w-full h-[380px] bg-[#0B0F19] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center group">
            {/* Simulated Invoice Graphic */}
            <div className="w-[85%] h-[90%] bg-slate-900 border border-slate-700 rounded-lg p-6 font-mono text-[10px] text-slate-300 space-y-4 relative shadow-2xl">
              <div className="flex justify-between border-b border-slate-800 pb-3">
                <div>
                  <p className="font-bold text-white text-xs">ENCELION TECH INC</p>
                  <p className="text-slate-500">100 Silicon Way, San Francisco, CA</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#00F0FF]">INVOICE #ENC-2026-9021</p>
                  <p className="text-slate-500">Date: Sep 22, 2026</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-slate-500 font-bold">LINE ITEMS:</p>
                <div className="flex justify-between border-b border-slate-800 py-1">
                  <span>1x Enterprise AI Monorepo License</span>
                  <span className="text-white">$35,000.00</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 py-1">
                  <span>2x Dedicated RAG Vector Index Node</span>
                  <span className="text-white">$7,000.00</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 py-1">
                  <span>1x Voice AI Stream Accelerator</span>
                  <span className="text-white">$7,500.00</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-700 text-xs font-bold text-white">
                <span>TOTAL DUE:</span>
                <span className="text-emerald-400">$49,500.00</span>
              </div>
            </div>

            {/* Bounding Box Overlays */}
            {outputResult.boundingBoundingBoxes?.map((box: any, i: number) => (
              <div
                key={i}
                style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
                className="absolute border-2 border-[#00F0FF] bg-[#00F0FF]/10 rounded pointer-events-none transition-all duration-300 group-hover:border-[#7000FF] group-hover:bg-[#7000FF]/15"
              >
                <span className="absolute -top-4 left-0 bg-[#00F0FF] text-[#0B0F19] text-[9px] font-extrabold px-1 rounded truncate">
                  {box.label}
                </span>
              </div>
            ))}
          </div>

          {/* Prompt & Run Action */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Analysis Prompt / Custom Instruction</label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] hover:opacity-90 text-[#0B0F19] font-bold rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-xs"
            >
              <span>{isProcessing ? 'Processing Vision Model...' : 'Execute Vision Analysis'}</span>
            </button>
          </div>
        </div>

        {/* Right: JSON Inspection & Structured Output */}
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Structured Output Inspector</h2>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
              {(outputResult.confidenceScore * 100).toFixed(1)}% Confidence
            </span>
          </div>

          {/* JSON Tree Viewer */}
          <div className="flex-1 bg-[#0B0F19] border border-white/10 rounded-xl p-4 overflow-y-auto max-h-[460px] font-mono text-xs text-emerald-400">
            <pre className="whitespace-pre-wrap">{JSON.stringify(outputResult, null, 2)}</pre>
          </div>

          {/* Export Actions */}
          <div className="flex items-center space-x-3 pt-2">
            <button className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-xl border border-white/10 transition">
              Copy JSON
            </button>
            <button className="flex-1 py-2.5 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] text-xs font-semibold rounded-xl border border-[#00F0FF]/30 transition">
              Export to Webhook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
