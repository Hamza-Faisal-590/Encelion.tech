'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Package,
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
  Tag,
  DollarSign,
} from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { ProductItem } from '@/data/products';
import ColorIcon from '@/components/ColorIcon';

const ICON_PRESETS = [
  { name: 'workflow', label: 'Workflow' },
  { name: 'chatbot', label: 'Chat Platform' },
  { name: 'vision', label: 'Computer Vision' },
  { name: 'database', label: 'Data Intelligence' },
  { name: 'analytics', label: 'Analytics' },
  { name: 'studio', label: 'AI Studio' },
  { name: 'agents', label: 'Autonomous Agents' },
  { name: 'custom', label: 'Custom ML' },
];

export default function ProductsAdminPage() {
  const {
    products,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct,
    resetDefaults,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [newForm, setNewForm] = useState<Omit<ProductItem, 'id'>>({
    title: '',
    slug: '',
    desc: '',
    iconName: 'workflow',
    category: 'Enterprise AI',
    badge: 'New',
    price: 'From $299/mo',
    features: ['High-throughput execution', 'Zero data leakage guarantee', 'Custom API webhooks'],
    ctaText: 'Explore Product',
    ctaLink: '/contact',
    color: '#00B894',
    status: 'ACTIVE',
  });

  const [tempFeature, setTempFeature] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTitleChangeForNew = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setNewForm(prev => ({ ...prev, title, slug }));
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.title.trim()) {
      alert('Please enter a product title');
      return;
    }

    addProduct({
      ...newForm,
      slug: newForm.slug || newForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });

    setShowAddModal(false);
    setNewForm({
      title: '',
      slug: '',
      desc: '',
      iconName: 'workflow',
      category: 'Enterprise AI',
      badge: 'New',
      price: 'From $299/mo',
      features: ['High-throughput execution', 'Zero data leakage guarantee', 'Custom API webhooks'],
      ctaText: 'Explore Product',
      ctaLink: '/contact',
      color: '#00B894',
      status: 'ACTIVE',
    });
    showToast(`Product "${newForm.title}" published successfully!`);
  };

  const handleUpdateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
    showToast(`Updated "${editingProduct.title}" successfully!`);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all products back to default company suite?')) {
      resetDefaults();
      showToast('Restored default company products catalog.');
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
              {products.length} Products
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Products & SaaS Suite Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Create, edit, or remove enterprise SaaS products. Updates automatically synchronize with the public Products catalog.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/products"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
            title="Open Live Products Page"
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
            Add New Product
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
            placeholder="Search products by title, category, or features..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00B894] focus:bg-white transition"
          />
        </div>

        <div className="text-xs text-slate-400 font-semibold self-end sm:self-center">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* ── PRODUCTS LIST ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md"
          >
            <div>
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: product.color || '#00B894' }}
              />

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100">
                    <ColorIcon name={product.iconName || 'workflow'} size={44} />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {product.badge && (
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#E6F7F4] text-[#00B894] border border-[#00B894]/30">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{product.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                {/* Features & Pricing */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">Tier / Price:</span>
                    <span className="font-bold text-slate-900">{product.price || 'Contact Sales'}</span>
                  </div>

                  {product.features && product.features.length > 0 && (
                    <ul className="space-y-1 pt-1">
                      {product.features.slice(0, 2).map((f, fi) => (
                        <li key={fi} className="text-[11px] text-slate-600 flex items-center gap-1.5 truncate">
                          <CheckCircle2 size={12} className="text-[#00B894] shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400">
                CTA: {product.ctaText || 'Learn More'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(product)}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <Edit3 size={13} />
                  Edit
                </button>

                {products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
                        deleteProduct(product.id);
                        showToast(`Deleted product "${product.title}"`);
                      }
                    }}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                    title="Delete product"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── MODAL: ADD PRODUCT ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add New AI Product</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish a new SaaS product or platform offering
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newForm.title}
                    onChange={e => handleTitleChangeForNew(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                    placeholder="e.g. Encelion Neural Search"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={newForm.category}
                    onChange={e => setNewForm({ ...newForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    placeholder="e.g. Vector Search & RAG"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Badge / Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={newForm.badge}
                    onChange={e => setNewForm({ ...newForm, badge: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    placeholder="e.g. Popular, New, Enterprise"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Price / Tier
                  </label>
                  <input
                    type="text"
                    value={newForm.price}
                    onChange={e => setNewForm({ ...newForm, price: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    placeholder="e.g. From $399/mo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Product Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newForm.desc}
                  onChange={e => setNewForm({ ...newForm, desc: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed"
                  placeholder="Clear description explaining capabilities and business value..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Product Icon
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
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newForm.color}
                      onChange={e => setNewForm({ ...newForm, color: e.target.value })}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={newForm.color}
                      onChange={e => setNewForm({ ...newForm, color: e.target.value })}
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
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: EDIT PRODUCT ── */}
      {editingProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Edit Product: {editingProduct.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update product features, pricing tier, and descriptions
                </p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateProductSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title}
                    onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Price / Tier
                  </label>
                  <input
                    type="text"
                    value={editingProduct.price || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.desc}
                  onChange={e => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Product Icon
                  </label>
                  <select
                    value={editingProduct.iconName}
                    onChange={e => setEditingProduct({ ...editingProduct, iconName: e.target.value })}
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
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingProduct.color || '#00B894'}
                      onChange={e => setEditingProduct({ ...editingProduct, color: e.target.value })}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={editingProduct.color || '#00B894'}
                      onChange={e => setEditingProduct({ ...editingProduct, color: e.target.value })}
                      className="w-28 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
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
