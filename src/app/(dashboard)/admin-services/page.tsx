'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Check,
  Eye,
  Search,
  X,
  CheckCircle2,
  AlertCircle,
  Tag,
  Palette,
} from 'lucide-react';
import { useServices } from '@/hooks/useServices';
import { ServiceItem } from '@/data/services';
import ColorIcon from '@/components/ColorIcon';

const COLOR_PRESETS = [
  '#00B894',
  '#6366F1',
  '#EC4899',
  '#F59E0B',
  '#8B5CF6',
  '#00F0FF',
  '#10B981',
  '#0A1628',
];

const ICON_PRESETS = [
  { name: 'agents', label: 'AI Agents' },
  { name: 'chatbot', label: 'Chatbot' },
  { name: 'workflow', label: 'Workflow' },
  { name: 'vision', label: 'Computer Vision' },
  { name: 'custom', label: 'Custom ML' },
  { name: 'database', label: 'Database' },
  { name: 'analytics', label: 'Analytics' },
  { name: 'studio', label: 'Studio' },
];

export default function ServicesAdminPage() {
  const {
    services,
    isLoaded,
    addService,
    updateService,
    deleteService,
    resetDefaults,
  } = useServices();

  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Service Form State
  const [newForm, setNewForm] = useState<Omit<ServiceItem, 'id'>>({
    title: '',
    slug: '',
    tagline: '',
    iconName: 'agents',
    heroColor: '#00B894',
    description: '',
    longDescription: '',
    benefits: ['24/7 autonomous operation', 'High precision accuracy', 'Seamless API integrations'],
    techStack: ['Python', 'OpenAI', 'Next.js'],
    status: 'ACTIVE',
  });

  const [tempBenefit, setTempBenefit] = useState('');
  const [tempTech, setTempTech] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTitleChangeForNew = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setNewForm(prev => ({ ...prev, title, slug }));
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.title.trim()) {
      alert('Please enter a service title');
      return;
    }

    addService({
      ...newForm,
      slug: newForm.slug || newForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });

    setShowAddModal(false);
    setNewForm({
      title: '',
      slug: '',
      tagline: '',
      iconName: 'agents',
      heroColor: '#00B894',
      description: '',
      longDescription: '',
      benefits: ['24/7 autonomous operation', 'High precision accuracy', 'Seamless API integrations'],
      techStack: ['Python', 'OpenAI', 'Next.js'],
      status: 'ACTIVE',
    });
    showToast(`Service "${newForm.title}" created successfully!`);
  };

  const handleUpdateServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    updateService(editingService.id, editingService);
    setEditingService(null);
    showToast(`Updated "${editingService.title}" successfully!`);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all services back to default company offerings?')) {
      resetDefaults();
      showToast('Restored default company services catalog.');
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#00B894] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* ── TOAST NOTIFICATION ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A1628] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#00B894]/40 flex items-center gap-3 animate-bounce">
          <div className="w-7 h-7 rounded-full bg-[#00B894]/20 text-[#00B894] flex items-center justify-center">
            <Check size={16} />
          </div>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E6F7F4] text-[#00B894]">
              <Sparkles size={13} />
              Live Site Synchronization
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
              {services.length} Services
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Services Catalog Management
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Add new AI service offerings, modify descriptions, tech stacks, and value propositions. All updates immediately reflect on the public Services page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/services"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
            title="Open Live Services Page"
          >
            <Eye size={15} />
            Public View
            <ExternalLink size={12} className="opacity-70" />
          </Link>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition-all"
          >
            <RotateCcw size={14} />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00B894] hover:bg-[#00997A] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00B894]/20 transition-all hover:scale-[1.02]"
          >
            <Plus size={16} />
            Add New Service
          </button>
        </div>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search services by title or tag..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
          />
        </div>

        <div className="text-xs text-slate-400 font-semibold self-end sm:self-center">
          Showing {filteredServices.length} of {services.length} services
        </div>
      </div>

      {/* ── SERVICES LIST ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md"
          >
            <div>
              {/* Accent top stripe */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: service.heroColor || '#00B894' }}
              />

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100">
                    <ColorIcon name={service.iconName || 'agents'} size={44} />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        service.status === 'DRAFT'
                          ? 'bg-amber-50 text-amber-600 border border-amber-200'
                          : 'bg-[#E6F7F4] text-[#00B894] border border-[#00B894]/30'
                      }`}
                    >
                      {service.status || 'ACTIVE'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                  <div className="text-xs text-slate-400 font-mono">/services/{service.slug}</div>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {service.description || service.tagline}
                  </p>
                </div>

                {/* Benefits sample */}
                {service.benefits && service.benefits.length > 0 && (
                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Key Highlights:
                    </div>
                    <ul className="space-y-1">
                      {service.benefits.slice(0, 2).map((b, bi) => (
                        <li key={bi} className="text-xs text-slate-600 flex items-center gap-1.5 truncate">
                          <CheckCircle2 size={12} className="text-[#00B894] shrink-0" />
                          <span className="truncate">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/services/${service.slug}`}
                target="_blank"
                className="text-xs font-bold text-slate-500 hover:text-[#00B894] flex items-center gap-1 transition"
              >
                View Page <ExternalLink size={11} />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(service)}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <Edit3 size={13} />
                  Edit
                </button>

                {services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
                        deleteService(service.id);
                        showToast(`Deleted service "${service.title}"`);
                      }
                    }}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                    title="Delete service"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── MODAL: ADD NEW SERVICE ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add New AI Service</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish a new service offering to the Encelion.tech catalog
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newForm.title}
                    onChange={e => handleTitleChangeForNew(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                    placeholder="e.g. AI Voice Intelligence"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={newForm.slug}
                    onChange={e => setNewForm({ ...newForm, slug: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-700"
                    placeholder="e.g. ai-voice-intelligence"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={newForm.tagline}
                  onChange={e => setNewForm({ ...newForm, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="e.g. Ultra-realistic neural speech synthesis for global support."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Short Description (Card Summary) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newForm.description}
                  onChange={e => setNewForm({ ...newForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed"
                  placeholder="Summary shown on the main services card grid..."
                />
              </div>

              {/* Icon & Color Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Service Icon
                  </label>
                  <select
                    value={newForm.iconName}
                    onChange={e => setNewForm({ ...newForm, iconName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    {ICON_PRESETS.map(i => (
                      <option key={i.name} value={i.name}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Brand Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newForm.heroColor}
                      onChange={e => setNewForm({ ...newForm, heroColor: e.target.value })}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={newForm.heroColor}
                      onChange={e => setNewForm({ ...newForm, heroColor: e.target.value })}
                      className="w-28 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#00B894] hover:bg-[#00997A] text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  Save & Publish Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: EDIT SERVICE ── */}
      {editingService && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Edit Service: {editingService.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update content, descriptions, and highlights
                </p>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateServiceSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.slug}
                    onChange={e => setEditingService({ ...editingService, slug: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={editingService.tagline}
                  onChange={e => setEditingService({ ...editingService, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Service Icon
                  </label>
                  <select
                    value={editingService.iconName}
                    onChange={e => setEditingService({ ...editingService, iconName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    {ICON_PRESETS.map(i => (
                      <option key={i.name} value={i.name}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Brand Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingService.heroColor}
                      onChange={e => setEditingService({ ...editingService, heroColor: e.target.value })}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={editingService.heroColor}
                      onChange={e => setEditingService({ ...editingService, heroColor: e.target.value })}
                      className="w-28 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#00B894] hover:bg-[#00997A] text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
