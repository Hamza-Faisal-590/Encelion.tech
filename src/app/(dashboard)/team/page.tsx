'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  UserCheck,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Sparkles,
  Check,
  ChevronUp,
  ChevronDown,
  Eye,
  AlertCircle,
  X,
  Palette,
  Upload,
  Camera,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import { useFounders } from '@/hooks/useFounders';
import { Founder } from '@/data/founders';

const COLOR_PRESETS = [
  { label: 'Encelion Teal', value: '#00B894' },
  { label: 'Deep Navy', value: '#0A1628' },
  { label: 'Indigo Neon', value: '#6366F1' },
  { label: 'Cyber Violet', value: '#8B5CF6' },
  { label: 'Rose Pink', value: '#EC4899' },
  { label: 'Electric Blue', value: '#00F0FF' },
  { label: 'Emerald Glow', value: '#10B981' },
  { label: 'Amber Gold', value: '#F59E0B' },
];

const PHOTO_PRESETS = [
  { label: 'CEO Portrait', path: '/founder_ceo.png' },
  { label: 'Leadership Team', path: '/about_team_crop.jpg' },
  { label: 'AI Robotics', path: '/about_robot_crop.jpg' },
  { label: 'Monitors & Lab', path: '/case_monitors_crop.jpg' },
];

export default function FoundersAdminPage() {
  const {
    founders,
    isLoaded,
    updateFounder,
    addFounder,
    deleteFounder,
    saveAll,
    resetDefaults,
  } = useFounders();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [newSkillInput, setNewSkillInput] = useState<{ [id: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [modalUploading, setModalUploading] = useState(false);

  // Hidden file input refs
  const fileInputRefs = useRef<{ [id: string]: HTMLInputElement | null }>({});
  const modalFileInputRef = useRef<HTMLInputElement | null>(null);

  // New founder form state
  const [newFounderForm, setNewFounderForm] = useState({
    name: '',
    role: '',
    tag: '',
    bio: '',
    image: '',
    expertise: ['AI Architecture', 'Product Strategy'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    email: '',
    color: '#00B894',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleFieldChange = (id: string, field: keyof Founder, value: any) => {
    updateFounder(id, { [field]: value });
  };

  const handleNameChange = (id: string, name: string) => {
    const parts = name.trim().split(/\s+/);
    const initials = parts.map(p => p[0]?.toUpperCase() || '').join('').slice(0, 3) || 'FN';
    updateFounder(id, { name, initials });
  };

  // Image upload handler with resilient fallback (API -> Base64 Data URL)
  const processImageFile = async (file: File): Promise<string> => {
    // Check size limit: max 10MB
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('Image size exceeds 10MB. Please select a smaller photo.');
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          return data.url;
        }
      }
    } catch (err) {
      console.warn('API upload failed, falling back to base64 Data URL:', err);
    }

    // Fallback to Base64 Data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (founderId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(founderId);
    try {
      const imageUrl = await processImageFile(file);
      updateFounder(founderId, { image: imageUrl });
      showToast('Profile picture uploaded successfully!');
    } catch (err: any) {
      alert(err.message || 'Error uploading image');
    } finally {
      setUploadingId(null);
      // Reset input value so same file can be selected again if needed
      e.target.value = '';
    }
  };

  const handleModalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setModalUploading(true);
    try {
      const imageUrl = await processImageFile(file);
      setNewFounderForm(prev => ({ ...prev, image: imageUrl }));
      showToast('Image uploaded for new profile!');
    } catch (err: any) {
      alert(err.message || 'Error uploading image');
    } finally {
      setModalUploading(false);
      e.target.value = '';
    }
  };

  const handleRemovePhoto = (founderId: string) => {
    updateFounder(founderId, { image: null });
    showToast('Photo removed. Initials avatar active.');
  };

  const handleAddSkill = (id: string) => {
    const skill = (newSkillInput[id] || '').trim();
    if (!skill) return;

    const founder = founders.find(f => f.id === id);
    if (founder && !founder.expertise.includes(skill)) {
      const updated = [...founder.expertise, skill];
      updateFounder(id, { expertise: updated });
    }
    setNewSkillInput(prev => ({ ...prev, [id]: '' }));
    showToast(`Added expertise tag to ${founder?.name || 'founder'}`);
  };

  const handleRemoveSkill = (id: string, skillToRemove: string) => {
    const founder = founders.find(f => f.id === id);
    if (founder) {
      const updated = founder.expertise.filter(s => s !== skillToRemove);
      updateFounder(id, { expertise: updated });
      showToast(`Removed tag "${skillToRemove}"`);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= founders.length) return;

    const list = [...founders];
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);
    saveAll(list);
    showToast('Reordered founders list');
  };

  const handleSaveIndividual = (name: string) => {
    showToast(`Saved ${name}'s information! Updates are live.`);
  };

  const handleResetToDefault = () => {
    if (confirm('Are you sure you want to restore the original default founder profiles? Any custom edits will be reset.')) {
      resetDefaults();
      showToast('Restored default founder profiles');
    }
  };

  const handleCreateNewFounder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFounderForm.name.trim() || !newFounderForm.role.trim()) {
      alert('Please provide at least a name and role.');
      return;
    }

    const parts = newFounderForm.name.trim().split(/\s+/);
    const initials = parts.map(p => p[0]?.toUpperCase() || '').join('').slice(0, 3) || 'FN';

    addFounder({
      name: newFounderForm.name.trim(),
      role: newFounderForm.role.trim(),
      tag: newFounderForm.tag.trim() || newFounderForm.role.trim(),
      bio: newFounderForm.bio.trim() || 'Executive leadership profile at Encelion.tech.',
      image: newFounderForm.image.trim() || null,
      expertise: newFounderForm.expertise,
      linkedin: newFounderForm.linkedin.trim() || 'https://linkedin.com',
      twitter: newFounderForm.twitter.trim() || 'https://twitter.com',
      github: newFounderForm.github.trim() || '',
      email: newFounderForm.email.trim() || '',
      initials,
      color: newFounderForm.color,
    });

    setShowAddModal(false);
    setNewFounderForm({
      name: '',
      role: '',
      tag: '',
      bio: '',
      image: '',
      expertise: ['AI Architecture', 'Product Strategy'],
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      email: '',
      color: '#00B894',
    });
    showToast('New executive profile created successfully!');
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

      {/* ── HEADER & ACTIONS ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E6F7F4] text-[#00B894]">
              <Sparkles size={13} />
              Live Site Synchronization
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
              {founders.length} Profiles
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Founders & Leadership Management
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Edit and upload founders' pictures, update executive roles, bios, and credentials. Changes instantly reflect across all public pages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
            title="Open Public Site About Page"
          >
            <Eye size={15} />
            Public View
            <ExternalLink size={12} className="opacity-70" />
          </Link>

          <button
            onClick={handleResetToDefault}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition-all"
            title="Reset to default company founders"
          >
            <RotateCcw size={14} />
            Reset Defaults
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00B894] hover:bg-[#00997A] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00B894]/20 transition-all hover:scale-[1.02]"
          >
            <Plus size={16} />
            Add Founder
          </button>
        </div>
      </div>

      {/* ── MODE TABS (EDIT VS LIVE PREVIEW) ── */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'edit'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Edit Profiles ({founders.length})
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'preview'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye size={14} />
            Live Site Card Preview
          </button>
        </div>

        <div className="text-xs text-slate-400 font-medium hidden sm:block">
          Auto-saved locally with instant browser broadcast
        </div>
      </div>

      {/* ── TAB 1: EDIT FOUNDERS ── */}
      {activeTab === 'edit' && (
        <div className="space-y-6">
          {founders.map((founder, index) => (
            <div
              key={founder.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all hover:border-slate-300"
            >
              {/* Founder Header Bar */}
              <div
                className="p-5 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4"
                style={{ borderLeft: `6px solid ${founder.color}` }}
              >
                <div className="flex items-center gap-4">
                  {/* Photo or Initials Avatar */}
                  <div
                    className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center font-bold text-white shadow-md shrink-0 relative group"
                    style={{ backgroundColor: founder.color }}
                  >
                    {founder.image ? (
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span className="text-lg">{founder.initials}</span>
                    )}

                    {/* Quick Camera Hover Overlay */}
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[founder.id]?.click()}
                      className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                      title="Upload new picture"
                    >
                      <Camera size={18} />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">{founder.name}</h3>
                      <span
                        className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                        style={{
                          backgroundColor: `${founder.color}15`,
                          color: founder.color,
                          border: `1px solid ${founder.color}30`,
                        }}
                      >
                        {founder.tag || founder.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{founder.role}</p>
                  </div>
                </div>

                {/* Card Controls (Reorder, Save, Delete) */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                    <button
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Up"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === founders.length - 1}
                      className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Down"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleSaveIndividual(founder.name)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00B894] hover:bg-[#00997A] text-white text-xs font-bold rounded-xl shadow-xs transition"
                  >
                    <Save size={14} />
                    Save
                  </button>

                  {founders.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to remove ${founder.name}?`)) {
                          deleteFounder(founder.id);
                          showToast(`Removed ${founder.name}`);
                        }
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                      title="Delete profile"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Founder Detailed Edit Form */}
              <div className="p-6 md:p-8 space-y-6 bg-slate-50/40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={founder.name}
                      onChange={e => handleNameChange(founder.id, e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 transition"
                      placeholder="e.g. Hamza Iqbal"
                    />
                  </div>

                  {/* Role Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Official Role *
                    </label>
                    <input
                      type="text"
                      value={founder.role}
                      onChange={e => handleFieldChange(founder.id, 'role', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 transition"
                      placeholder="e.g. CEO & Co-Founder"
                    />
                  </div>

                  {/* Badge Tag */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Executive Tag
                    </label>
                    <input
                      type="text"
                      value={founder.tag}
                      onChange={e => handleFieldChange(founder.id, 'tag', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 transition"
                      placeholder="e.g. Chief Executive Officer"
                    />
                  </div>
                </div>

                {/* ── PHOTO UPLOAD & COLOR ROW ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                  
                  {/* Left Column: Picture Upload, Avatar Preview & Controls (7 cols) */}
                  <div className="lg:col-span-7 space-y-4 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-5 lg:pb-0 lg:pr-6">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon size={14} className="text-[#00B894]" />
                        Founder Picture & Avatar
                      </label>
                      <span className="text-[11px] font-semibold text-slate-400">
                        PNG, JPG, WEBP, SVG (Max 10MB)
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                      {/* Big Avatar Thumbnail */}
                      <div
                        className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-md flex items-center justify-center font-bold text-2xl text-white border-2 relative"
                        style={{
                          backgroundColor: founder.color,
                          borderColor: `${founder.color}60`,
                        }}
                      >
                        {founder.image ? (
                          <img
                            src={founder.image}
                            alt={founder.name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          founder.initials
                        )}

                        {uploadingId === founder.id && (
                          <div className="absolute inset-0 bg-slate-900/70 flex flex-col items-center justify-center text-white">
                            <Loader2 size={24} className="animate-spin text-[#00B894]" />
                            <span className="text-[10px] mt-1 font-bold">Uploading...</span>
                          </div>
                        )}
                      </div>

                      {/* Upload and Action Buttons */}
                      <div className="flex-1 space-y-2.5 w-full sm:w-auto">
                        {/* Hidden file input */}
                        <input
                          type="file"
                          accept="image/*"
                          ref={el => { fileInputRefs.current[founder.id] = el; }}
                          onChange={e => handleFileUpload(founder.id, e)}
                          className="hidden"
                        />

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[founder.id]?.click()}
                            disabled={uploadingId === founder.id}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B894] hover:bg-[#00997A] text-white text-xs font-bold rounded-xl shadow-xs transition hover:scale-[1.02]"
                          >
                            <Upload size={14} />
                            Upload New Picture
                          </button>

                          {founder.image && (
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(founder.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl border border-rose-200 transition"
                              title="Remove photo and switch to initials avatar"
                            >
                              <Trash2 size={13} />
                              Remove Picture
                            </button>
                          )}
                        </div>

                        {/* URL Direct Edit Input */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 font-medium">Or enter image URL:</span>
                          <input
                            type="text"
                            value={founder.image || ''}
                            onChange={e => handleFieldChange(founder.id, 'image', e.target.value ? e.target.value : null)}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 focus:outline-none focus:border-[#00B894]"
                            placeholder="https://... or /uploads/..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Presets Gallery */}
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                        Quick Preset Portraits:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PHOTO_PRESETS.map((p, pi) => (
                          <button
                            key={pi}
                            type="button"
                            onClick={() => handleFieldChange(founder.id, 'image', p.path)}
                            className={`flex items-center gap-2 p-1.5 rounded-xl border text-left transition-all ${
                              founder.image === p.path
                                ? 'border-[#00B894] bg-[#E6F7F4] font-bold text-[#00B894]'
                                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium'
                            }`}
                          >
                            <img
                              src={p.path}
                              alt={p.label}
                              className="w-7 h-7 rounded-lg object-cover object-top shrink-0"
                            />
                            <span className="text-[10px] truncate">{p.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Brand Accent Color (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Palette size={14} className="text-[#00B894]" />
                      Accent & Card Brand Color
                    </label>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={founder.color}
                        onChange={e => handleFieldChange(founder.id, 'color', e.target.value)}
                        className="w-12 h-12 rounded-2xl cursor-pointer border border-slate-200 p-0.5 shadow-xs"
                      />
                      <div>
                        <input
                          type="text"
                          value={founder.color}
                          onChange={e => handleFieldChange(founder.id, 'color', e.target.value)}
                          className="w-32 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800"
                          placeholder="#00B894"
                        />
                        <div className="text-[10px] text-slate-400 mt-1">Glow, borders & badges</div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                        Color Presets:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {COLOR_PRESETS.map((c, ci) => (
                          <button
                            key={ci}
                            type="button"
                            onClick={() => handleFieldChange(founder.id, 'color', c.value)}
                            className={`w-7 h-7 rounded-xl transition-transform hover:scale-110 shadow-2xs ${
                              founder.color.toLowerCase() === c.value.toLowerCase() ? 'ring-2 ring-slate-800 ring-offset-2' : ''
                            }`}
                            style={{ backgroundColor: c.value }}
                            title={c.label}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biography */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Executive Biography & Vision
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {founder.bio.length} characters
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={founder.bio}
                    onChange={e => handleFieldChange(founder.id, 'bio', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm leading-relaxed text-slate-800 focus:outline-none focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 transition"
                    placeholder="Enter biography detailing experience, vision, and leadership at Encelion..."
                  />
                </div>

                {/* Expertise Tags */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Core Expertise & Competency Tags
                  </label>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {founder.expertise.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-full shadow-2xs group"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(founder.id, skill)}
                          className="text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 max-w-md">
                    <input
                      type="text"
                      value={newSkillInput[founder.id] || ''}
                      onChange={e =>
                        setNewSkillInput(prev => ({ ...prev, [founder.id]: e.target.value }))
                      }
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill(founder.id);
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00B894]"
                      placeholder="Add tag (e.g. Autonomous Agents, LLM Fine-Tuning)..."
                    />
                    <button
                      type="button"
                      onClick={() => handleAddSkill(founder.id)}
                      className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
                    >
                      + Add Tag
                    </button>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="border-t border-slate-200/80 pt-5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Social & Contact Links
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* LinkedIn */}
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
                      <Linkedin size={16} className="text-[#0A66C2] shrink-0" />
                      <input
                        type="text"
                        value={founder.linkedin}
                        onChange={e => handleFieldChange(founder.id, 'linkedin', e.target.value)}
                        className="w-full text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
                        placeholder="LinkedIn URL"
                      />
                    </div>

                    {/* Twitter/X */}
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
                      <Twitter size={16} className="text-slate-800 shrink-0" />
                      <input
                        type="text"
                        value={founder.twitter}
                        onChange={e => handleFieldChange(founder.id, 'twitter', e.target.value)}
                        className="w-full text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
                        placeholder="Twitter / X URL"
                      />
                    </div>

                    {/* GitHub */}
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
                      <Github size={16} className="text-slate-700 shrink-0" />
                      <input
                        type="text"
                        value={founder.github || ''}
                        onChange={e => handleFieldChange(founder.id, 'github', e.target.value)}
                        className="w-full text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
                        placeholder="GitHub Profile"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
                      <Mail size={16} className="text-slate-500 shrink-0" />
                      <input
                        type="email"
                        value={founder.email || ''}
                        onChange={e => handleFieldChange(founder.id, 'email', e.target.value)}
                        className="w-full text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
                        placeholder="Executive Email"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 2: LIVE CARD PREVIEW (WYSIWYG identical to public site) ── */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          <div className="bg-[#0A1628] rounded-3xl p-8 md:p-12 text-white border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0,184,148,0.12) 0%, transparent 50%),
                                  radial-gradient(circle at 80% 50%, rgba(0,184,148,0.08) 0%, transparent 50%)`,
              }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center mb-10">
              <span className="inline-block text-xs font-bold tracking-widest text-[#00B894] uppercase mb-2">
                LIVE SITE WYSIWYG PREVIEW
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                The Minds Behind <span className="text-[#00B894]">Encelion.tech</span>
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                This shows exactly how your updated pictures and information render for visitors on the public site.
              </p>
            </div>

            {/* Founder Cards Grid in Dark Theme */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-5xl mx-auto">
              {founders.map((founder, i) => (
                <div
                  key={founder.id || i}
                  className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between transition-all hover:scale-[1.01]"
                  style={{
                    boxShadow: `0 20px 50px rgba(0,0,0,0.4)`,
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${founder.color}, #00997A)`,
                    }}
                  />

                  <div className="p-7 space-y-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Photo & Role Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-lg flex items-center justify-center font-bold text-2xl text-white border-2"
                          style={{
                            backgroundColor: founder.color,
                            borderColor: `${founder.color}50`,
                          }}
                        >
                          {founder.image ? (
                            <img
                              src={founder.image}
                              alt={founder.name}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            founder.initials
                          )}
                        </div>

                        <div>
                          <div
                            className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-1"
                            style={{
                              backgroundColor: `${founder.color}25`,
                              color: founder.color,
                              border: `1px solid ${founder.color}40`,
                            }}
                          >
                            {founder.tag}
                          </div>
                          <h3 className="text-xl font-bold text-white">{founder.name}</h3>
                          <div className="text-xs text-slate-400 font-medium">{founder.role}</div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
                        {founder.bio}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/10">
                      {/* Tags */}
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          EXPERTISE
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {founder.expertise.map((exp, expIdx) => (
                            <span
                              key={expIdx}
                              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-slate-200 border border-white/10"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Social Bar */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-slate-400">
                          Connect with {founder.name.split(' ')[0]}
                        </span>
                        <div className="flex items-center gap-2">
                          {founder.linkedin && (
                            <a
                              href={founder.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#00B894] transition"
                            >
                              <Linkedin size={15} />
                            </a>
                          )}
                          {founder.twitter && (
                            <a
                              href={founder.twitter}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#00B894] transition"
                            >
                              <Twitter size={15} />
                            </a>
                          )}
                          {founder.github && (
                            <a
                              href={founder.github}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#00B894] transition"
                            >
                              <Github size={15} />
                            </a>
                          )}
                          {founder.email && (
                            <a
                              href={`mailto:${founder.email}`}
                              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#00B894] transition"
                            >
                              <Mail size={15} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: ADD NEW FOUNDER ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add Executive / Founder Profile</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Create a new leadership profile to display on Encelion.tech
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateNewFounder} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFounderForm.name}
                    onChange={e => setNewFounderForm({ ...newFounderForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                    placeholder="e.g. Sarah Jenkins"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFounderForm.role}
                    onChange={e => setNewFounderForm({ ...newFounderForm, role: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                    placeholder="e.g. Chief AI Scientist & Co-Founder"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tagline / Executive Title
                </label>
                <input
                  type="text"
                  value={newFounderForm.tag}
                  onChange={e => setNewFounderForm({ ...newFounderForm, tag: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="e.g. Chief Technology Officer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Biography & Background
                </label>
                <textarea
                  rows={3}
                  value={newFounderForm.bio}
                  onChange={e => setNewFounderForm({ ...newFounderForm, bio: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed"
                  placeholder="Describe vision, previous company background, degrees, or domain breakthroughs..."
                />
              </div>

              {/* Photo Upload in Add Modal */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Profile Picture
                </label>

                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm flex items-center justify-center font-bold text-lg text-white"
                    style={{ backgroundColor: newFounderForm.color }}
                  >
                    {newFounderForm.image ? (
                      <img
                        src={newFounderForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      'AV'
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      ref={modalFileInputRef}
                      onChange={handleModalFileUpload}
                      className="hidden"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => modalFileInputRef.current?.click()}
                        disabled={modalUploading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00B894] hover:bg-[#00997A] text-white text-xs font-bold rounded-lg shadow-xs transition"
                      >
                        {modalUploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                        Upload Image
                      </button>

                      {newFounderForm.image && (
                        <button
                          type="button"
                          onClick={() => setNewFounderForm({ ...newFounderForm, image: '' })}
                          className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={newFounderForm.image}
                      onChange={e => setNewFounderForm({ ...newFounderForm, image: e.target.value })}
                      className="w-full px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      placeholder="Or paste image URL"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Accent Color:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newFounderForm.color}
                    onChange={e => setNewFounderForm({ ...newFounderForm, color: e.target.value })}
                    className="w-9 h-9 rounded-xl cursor-pointer border border-slate-200 p-0.5"
                  />
                  <input
                    type="text"
                    value={newFounderForm.color}
                    onChange={e => setNewFounderForm({ ...newFounderForm, color: e.target.value })}
                    className="w-28 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                  />
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
                  Save & Publish Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
