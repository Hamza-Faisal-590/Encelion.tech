'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  MessageSquare,
  Save,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Check,
  Eye,
  Building,
  Headphones,
  ShieldCheck,
  Send,
  ArrowRight,
} from 'lucide-react';
import { useContactInfo } from '@/hooks/useContactInfo';
import ColorIcon from '@/components/ColorIcon';

export default function ContactInfoAdminPage() {
  const { contactInfo, isLoaded, saveContactInfo, resetDefaults } = useContactInfo();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local draft state for editing
  const [formData, setFormData] = useState(contactInfo);
  const [isDirty, setIsDirty] = useState(false);

  // When contactInfo loads or updates from external events, sync if not dirty
  const currentData = isDirty ? formData : contactInfo;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleChange = (field: string, val: string) => {
    setIsDirty(true);
    setFormData(prev => ({
      ...prev,
      [field]: val,
    }));
  };

  const handleSocialChange = (network: string, val: string) => {
    setIsDirty(true);
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [network]: val,
      },
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveContactInfo(currentData);
    setIsDirty(false);
    showToast('Contact information saved! Updates are now live on the public site.');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all contact information back to the original company defaults?')) {
      const defaults = resetDefaults();
      setFormData(defaults);
      setIsDirty(false);
      showToast('Restored default company contact details.');
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

      {/* ── HEADER & ACTIONS ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E6F7F4] text-[#00B894]">
              <Sparkles size={13} />
              Public Site Synchronization Active
            </span>
            {isDirty && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                Unsaved Changes
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Company Contact & Inquiries Configuration
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Update primary email addresses, telephone numbers, headquarters location, operating hours, and social media channels. Changes immediately propagate to the Contact page, Footer, and across the website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
            title="Open Live Public Contact Page"
          >
            <Eye size={15} />
            Public Contact Page
            <ExternalLink size={12} className="opacity-70" />
          </Link>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition-all"
            title="Reset to default company contact details"
          >
            <RotateCcw size={14} />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00B894] hover:bg-[#00997A] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00B894]/20 transition-all hover:scale-[1.02]"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {/* ── MODE TABS (EDIT FORM VS LIVE PREVIEW) ── */}
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
            Edit Contact Details
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
            Live Public Preview
          </button>
        </div>

        <div className="text-xs text-slate-400 font-medium hidden sm:block">
          Changes persist in client storage and broadcast across open tabs
        </div>
      </div>

      {/* ── TAB 1: EDIT FORM ── */}
      {activeTab === 'edit' && (
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* SECTION 1: PRIMARY EMAILS */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F7F4] text-[#00B894] flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Email & Inquiries Channels</h2>
                <p className="text-xs text-slate-500">Official contact emails for visitors, sales leads, and client support.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Primary Public Email *
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={currentData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                    placeholder="hello@encelion.tech"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Displayed on the Contact page top pill and Footer.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Sales & Enterprise Inquiries Email
                </label>
                <div className="relative">
                  <Headphones size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    value={currentData.salesEmail || ''}
                    onChange={e => handleChange('salesEmail', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                    placeholder="sales@encelion.tech"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">For custom AI solutions and partnership proposals.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Technical Support Email
                </label>
                <div className="relative">
                  <ShieldCheck size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    value={currentData.supportEmail || ''}
                    onChange={e => handleChange('supportEmail', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                    placeholder="support@encelion.tech"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">For active client SLAs and system assistance.</p>
              </div>
            </div>
          </div>

          {/* SECTION 2: TELEPHONE, MESSAGING & OPERATING HOURS */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Telephone, Instant Messaging & Hours</h2>
                <p className="text-xs text-slate-500">Phone numbers, WhatsApp line, and working schedule.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Main Phone Number *
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={currentData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                    placeholder="+92 001 23 4567"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Displayed with clickable tel: link on website.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  WhatsApp / Messaging Line
                </label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={currentData.whatsapp || ''}
                    onChange={e => handleChange('whatsapp', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                    placeholder="+92 300 1234567"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">For immediate real-time chat inquiries.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Working Operating Hours
                </label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={currentData.workingHours}
                    onChange={e => handleChange('workingHours', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                    placeholder="Mon - Fri: 9:00 AM - 6:00 PM (PKT)"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Team availability schedule.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Response Time Guarantee / SLA Promise
              </label>
              <input
                type="text"
                value={currentData.responseTime}
                onChange={e => handleChange('responseTime', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                placeholder="e.g. Average response time < 2 hours"
              />
            </div>
          </div>

          {/* SECTION 3: LOCATION & HEADQUARTERS */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Headquarters & Office Location</h2>
                <p className="text-xs text-slate-500">Physical presence and geographic representation.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Display Office Address *
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={currentData.address}
                    onChange={e => handleChange('address', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                    placeholder="Lahore, Pakistan"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Displayed on the Contact Us card and Footer.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  City
                </label>
                <div className="relative">
                  <Building size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={currentData.city}
                    onChange={e => handleChange('city', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                    placeholder="Lahore"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Country
                </label>
                <div className="relative">
                  <Globe size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={currentData.country}
                    onChange={e => handleChange('country', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                    placeholder="Pakistan"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: SOCIAL CHANNELS */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Globe size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Official Social Media Profiles</h2>
                <p className="text-xs text-slate-500">Social channels linked from the Footer and public profiles.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Twitter / X */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Twitter size={14} className="text-slate-800" />
                  Twitter / X URL
                </label>
                <input
                  type="text"
                  value={currentData.socialLinks.twitter}
                  onChange={e => handleSocialChange('twitter', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                  placeholder="https://twitter.com/..."
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Linkedin size={14} className="text-[#0A66C2]" />
                  LinkedIn Company Page
                </label>
                <input
                  type="text"
                  value={currentData.socialLinks.linkedin}
                  onChange={e => handleSocialChange('linkedin', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                  placeholder="https://linkedin.com/company/..."
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Github size={14} className="text-slate-800" />
                  GitHub Organization
                </label>
                <input
                  type="text"
                  value={currentData.socialLinks.github}
                  onChange={e => handleSocialChange('github', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                  placeholder="https://github.com/..."
                />
              </div>

              {/* YouTube */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Youtube size={14} className="text-rose-600" />
                  YouTube Channel
                </label>
                <input
                  type="text"
                  value={currentData.socialLinks.youtube}
                  onChange={e => handleSocialChange('youtube', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: MESSAGING & TAGLINES */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Send size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Brand Tagline & Contact Page Subtitle</h2>
                <p className="text-xs text-slate-500">Custom copy displayed across the public site.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Company Tagline (Footer Eyebrow)
                </label>
                <input
                  type="text"
                  value={currentData.tagline}
                  onChange={e => handleChange('tagline', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                  placeholder="AI Solutions for a Smarter Tomorrow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Contact Page Hero Subtitle
                </label>
                <textarea
                  rows={2}
                  value={currentData.contactSubtitle}
                  onChange={e => handleChange('contactSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
                  placeholder="Have a project in mind, a question, or just want to say hello? We'd love to hear from you."
                />
              </div>
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              Reset to Defaults
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#00B894] hover:bg-[#00997A] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00B894]/20 transition-all hover:scale-[1.02]"
            >
              Save All Contact Details
            </button>
          </div>
        </form>
      )}

      {/* ── TAB 2: LIVE PUBLIC PREVIEW ── */}
      {activeTab === 'preview' && (
        <div className="space-y-8">
          
          {/* Card Preview 1: Contact Page Top Pills */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00B894]">
                  PREVIEW: CONTACT PAGE HERO PILLS
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">Contact Page Header Cards</h3>
              </div>
              <Link
                href="/contact"
                target="_blank"
                className="text-xs text-[#00B894] hover:underline font-bold flex items-center gap-1"
              >
                Go to /contact <ExternalLink size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="bg-[#F9FAFB] p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-2xs">
                <ColorIcon name="email" size={46} />
                <div>
                  <div className="text-xs text-slate-500 font-medium">Email Us</div>
                  <div className="text-sm font-bold text-slate-900 break-all">{currentData.email}</div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-2xs">
                <ColorIcon name="phone" size={46} />
                <div>
                  <div className="text-xs text-slate-500 font-medium">Call Us</div>
                  <div className="text-sm font-bold text-slate-900">{currentData.phone}</div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-2xs">
                <ColorIcon name="location" size={46} />
                <div>
                  <div className="text-xs text-slate-500 font-medium">Visit Us</div>
                  <div className="text-sm font-bold text-slate-900">{currentData.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Preview 2: Footer Preview */}
          <div className="bg-[#0A1628] rounded-3xl p-8 md:p-10 text-white border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00B894]">
                  PREVIEW: WEBSITE FOOTER
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">Footer Contact Us & Social Column</h3>
              </div>
              <span className="text-xs text-slate-400">Renders on all pages</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Brand info with social links */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00B894] flex items-center justify-center font-bold text-slate-900">
                    E
                  </div>
                  <span className="text-lg font-bold">
                    Encelion<span className="text-[#00B894]">.tech</span>
                  </span>
                </div>

                <div className="text-xs font-mono uppercase tracking-widest text-[#00B894]">
                  {currentData.tagline}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                  We build intelligent AI solutions to help businesses automate, innovate, and grow.
                </p>

                <div className="flex items-center gap-2 pt-2">
                  {currentData.socialLinks.twitter && (
                    <a
                      href={currentData.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#00B894] transition"
                    >
                      <Twitter size={16} />
                    </a>
                  )}
                  {currentData.socialLinks.linkedin && (
                    <a
                      href={currentData.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#00B894] transition"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {currentData.socialLinks.github && (
                    <a
                      href={currentData.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#00B894] transition"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {currentData.socialLinks.youtube && (
                    <a
                      href={currentData.socialLinks.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#00B894] transition"
                    >
                      <Youtube size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Contact Us Column */}
              <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Contact Us
                </h4>
                <ul className="space-y-3 text-xs">
                  <li className="flex items-center gap-2.5">
                    <Mail size={16} className="text-[#00B894] shrink-0" />
                    <span className="text-slate-300 hover:text-white transition font-medium">
                      {currentData.email}
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone size={16} className="text-[#00B894] shrink-0" />
                    <span className="text-slate-300 hover:text-white transition font-medium">
                      {currentData.phone}
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MapPin size={16} className="text-[#00B894] shrink-0" />
                    <span className="text-slate-400">
                      {currentData.address}
                    </span>
                  </li>
                  {currentData.workingHours && (
                    <li className="flex items-center gap-2.5 pt-1 text-[11px] text-slate-400">
                      <Clock size={14} className="text-slate-400 shrink-0" />
                      <span>{currentData.workingHours}</span>
                    </li>
                  )}
                </ul>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00B894] text-white text-xs font-bold rounded-xl shadow-xs">
                    Get Started <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
