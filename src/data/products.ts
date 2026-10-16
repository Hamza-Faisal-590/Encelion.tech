export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  desc: string;
  iconName: string;
  category: string;
  badge?: string;
  price?: string;
  features: string[];
  ctaText?: string;
  ctaLink?: string;
  color?: string;
  status?: 'ACTIVE' | 'DRAFT';
}

export const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    slug: 'ai-automation-suite',
    title: 'AI Automation Suite',
    desc: 'Autonomous multi-step pipeline orchestration connecting CRM, ERP, and databases with sub-second execution.',
    iconName: 'workflow',
    category: 'Enterprise Automation',
    badge: 'Popular',
    price: 'From $499/mo',
    features: [
      'Multi-agent workflow triggers',
      'No-code visual flow builder',
      '500+ pre-built SaaS connectors',
      'SOC-2 Type II compliant audit logs',
    ],
    ctaText: 'Explore Suite',
    ctaLink: '/contact',
    color: '#00B894',
    status: 'ACTIVE',
  },
  {
    id: 'prod-2',
    slug: 'ai-chat-platform',
    title: 'AI Chat Platform',
    desc: 'Context-aware conversational intelligence engineered for high-volume customer support & automated sales triage.',
    iconName: 'chatbot',
    category: 'Conversational AI',
    badge: 'Top Rated',
    price: 'From $199/mo',
    features: [
      'Retrieval-augmented RAG engine',
      'Multi-channel: Web, WhatsApp, Slack',
      'Real-time human agent handoff',
      'Deep CRM data synchronization',
    ],
    ctaText: 'Start Free Trial',
    ctaLink: '/contact',
    color: '#6366F1',
    status: 'ACTIVE',
  },
  {
    id: 'prod-3',
    slug: 'computer-vision-pro',
    title: 'Computer Vision Pro',
    desc: 'Real-time neural object detection, optical inspection, and visual anomaly tracking for industrial hardware.',
    iconName: 'vision',
    category: 'Visual AI',
    badge: 'Industrial Grade',
    price: 'Custom SLA',
    features: [
      'Edge & cloud inference pipeline',
      'Defect detection accuracy 99.4%',
      'RTSP camera video stream parser',
      'Automated alert timestamping',
    ],
    ctaText: 'Request Demo',
    ctaLink: '/contact',
    color: '#F59E0B',
    status: 'ACTIVE',
  },
  {
    id: 'prod-4',
    slug: 'data-intelligence',
    title: 'Data Intelligence',
    desc: 'Vector embedding engine turning unstructured enterprise documentation into searchable, semantic knowledge graph.',
    iconName: 'database',
    category: 'Data & RAG',
    badge: 'Enterprise',
    price: 'From $349/mo',
    features: [
      'Hybrid semantic vector search',
      'Automated document chunking',
      'Cross-lingual neural retrieval',
      'RBAC access control policies',
    ],
    ctaText: 'Learn More',
    ctaLink: '/contact',
    color: '#00F0FF',
    status: 'ACTIVE',
  },
  {
    id: 'prod-5',
    slug: 'ai-analytics',
    title: 'AI Analytics',
    desc: 'Predictive forecasting and automated financial trend detection transforming raw telemetry into growth levers.',
    iconName: 'analytics',
    category: 'BI & Forecasting',
    badge: 'Analytics',
    price: 'From $299/mo',
    features: [
      'Predictive churn modeling',
      'Token consumption heatmaps',
      'Automated revenue anomaly alerts',
      'Exportable executive PDF briefs',
    ],
    ctaText: 'View Metrics',
    ctaLink: '/contact',
    color: '#EC4899',
    status: 'ACTIVE',
  },
  {
    id: 'prod-6',
    slug: 'custom-ai-studio',
    title: 'Custom AI Studio',
    desc: 'Full-stack MLOps deployment canvas to fine-tune open-source LLMs on private, proprietary corporate datasets.',
    iconName: 'studio',
    category: 'Developer Platform',
    badge: 'New',
    price: 'Custom Pricing',
    features: [
      'LoRA fine-tuning canvas',
      'Private single-tenant hosting',
      'Zero data leakage guarantee',
      'API endpoint auto-scaling',
    ],
    ctaText: 'Deploy Studio',
    ctaLink: '/contact',
    color: '#8B5CF6',
    status: 'ACTIVE',
  },
];

const STORAGE_KEY = 'encelion_products_catalog_v1';
export const PRODUCTS_UPDATED_EVENT = 'encelion:products_updated';

export function getStoredProducts(): ProductItem[] {
  if (typeof window === 'undefined') {
    return DEFAULT_PRODUCTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PRODUCTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Error reading products from localStorage:', err);
  }

  return DEFAULT_PRODUCTS;
}

export function saveStoredProducts(products: ProductItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT, { detail: products }));
  } catch (err) {
    console.error('Error saving products to localStorage:', err);
  }
}

export function resetStoredProducts(): ProductItem[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT, { detail: DEFAULT_PRODUCTS }));
    } catch (err) {
      console.error('Error resetting products:', err);
    }
  }
  return DEFAULT_PRODUCTS;
}
