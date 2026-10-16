export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  iconName: string;
  heroColor: string;
  description: string;
  longDescription: string;
  benefits: string[];
  features?: { title: string; desc: string }[];
  techStack?: string[];
  stats?: { value: string; label: string }[];
  status?: 'ACTIVE' | 'DRAFT';
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'ai-agents',
    title: 'AI Agents',
    tagline: 'Autonomous intelligence that thinks, plans, and executes complex tasks end-to-end.',
    iconName: 'agents',
    heroColor: '#00B894',
    description: 'Build autonomous AI agents that can research, reason, and act — 24/7.',
    longDescription: 'Our AI Agents go beyond simple chatbots. We design and deploy fully autonomous systems that can browse the web, execute code, manage files, communicate with APIs, and complete multi-step workflows without human intervention.',
    benefits: [
      '24/7 autonomous operation with zero downtime',
      'Multi-step task completion with human-like reasoning',
      'Seamless API and tool integrations',
      'Built-in safety guardrails and oversight controls',
      'Continuous learning and self-improvement',
      'Full audit logs and transparency',
    ],
    techStack: ['LangChain', 'AutoGPT', 'Python', 'OpenAI', 'Claude 3.5'],
    stats: [
      { value: '10x', label: 'Faster Task Execution' },
      { value: '99.9%', label: 'Uptime Reliability' },
      { value: '60%', label: 'Cost Savings' },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'srv-2',
    slug: 'chatbots',
    title: 'Chatbots',
    tagline: 'Conversational AI that delights customers and automates support 24/7.',
    iconName: 'chatbot',
    heroColor: '#6366F1',
    description: 'Customer-facing AI chatbots that handle queries, support, and sales.',
    longDescription: 'Our AI chatbots are not just FAQ bots — they understand context, maintain conversation history, handle complex queries, and integrate deeply with your CRM, helpdesk, and e-commerce platforms.',
    benefits: [
      'Instant response to customer queries around the clock',
      'Deep integration with CRM, Shopify, Zendesk, and more',
      'Multilingual support across 50+ languages',
      'Sentiment analysis and intelligent human handoff',
      'Continuous training on your company knowledge base',
      'Omnichannel deployment: Web, WhatsApp, Slack, Messenger',
    ],
    techStack: ['Next.js', 'FastAPI', 'Pinecone', 'Whisper', 'Rasa'],
    stats: [
      { value: '< 2s', label: 'Response Time' },
      { value: '88%', label: 'First Contact Resolution' },
      { value: '4.8/5', label: 'Customer CSAT' },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'srv-3',
    slug: 'workflow-automation',
    title: 'Workflow Automation',
    tagline: 'Connect your tools, eliminate manual tasks, and accelerate business operations.',
    iconName: 'workflow',
    heroColor: '#EC4899',
    description: 'Streamline your operations with intelligent, trigger-based AI workflows.',
    longDescription: 'Transform repetitive, time-consuming business processes into seamless, automated pipelines. We connect your ERP, CRM, databases, and third-party SaaS tools with AI-driven logic.',
    benefits: [
      'Eliminate 80%+ of repetitive manual data entry',
      'Reduce operational errors to near-zero',
      'Trigger-based execution with real-time webhooks',
      'Scales horizontally to handle massive data bursts',
      'End-to-end auditability and compliance logging',
      'Fast ROI with deployment in weeks, not months',
    ],
    techStack: ['n8n', 'Zapier', 'Airflow', 'Temporal', 'Celery'],
    stats: [
      { value: '85%', label: 'Manual Work Reduced' },
      { value: '0.01%', label: 'Error Margin' },
      { value: '3.5x', label: 'Operational Speed' },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'srv-4',
    slug: 'computer-vision',
    title: 'Computer Vision',
    tagline: 'Extract actionable intelligence from images, video streams, and visual data.',
    iconName: 'vision',
    heroColor: '#F59E0B',
    description: 'See, analyze, and make smarter decisions with custom vision AI models.',
    longDescription: 'From defect detection on factory floors to real-time security surveillance and medical imaging analysis, our computer vision solutions process visual data with superhuman accuracy and speed.',
    benefits: [
      'Sub-millisecond inference at the edge or in cloud',
      'High-precision object detection, segmentation, and tracking',
      'Custom dataset annotation and model fine-tuning',
      'Automated visual quality control inspection',
      'Real-time anomaly alerts with video timestamping',
      'Supports thermal, multispectral, and standard RGB sensors',
    ],
    techStack: ['PyTorch', 'YOLOv10', 'OpenCV', 'TensorRT', 'NVIDIA DeepStream'],
    stats: [
      { value: '99.4%', label: 'Inspection Accuracy' },
      { value: '< 15ms', label: 'Edge Latency' },
      { value: '1M+', label: 'Frames/Day Processed' },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'srv-5',
    slug: 'custom-ai',
    title: 'Custom AI Development',
    tagline: 'Bespoke machine learning architectures engineered for your proprietary enterprise domain.',
    iconName: 'custom',
    heroColor: '#8B5CF6',
    description: 'Tailored AI solutions engineered from scratch for your unique business needs.',
    longDescription: 'Every business has unique data, processes, and competitive advantages. Our custom AI development service designs, trains, and deploys proprietary AI models fine-tuned specifically for your domain.',
    benefits: [
      'Proprietary models trained on your confidential data',
      'Full IP ownership — you own everything we build',
      'End-to-end pipeline: data -> training -> deployment',
      'Continuous retraining as your data evolves',
      'Production-grade MLOps infrastructure included',
      'Explainable AI for regulated industries',
    ],
    techStack: ['Transformers', 'vLLM', 'Ray', 'Kubernetes', 'MLflow'],
    stats: [
      { value: '100%', label: 'Client IP Ownership' },
      { value: 'SOC2', label: 'Enterprise Compliant' },
      { value: '5x', label: 'Inference Efficiency' },
    ],
    status: 'ACTIVE',
  },
];

const STORAGE_KEY = 'encelion_services_catalog_v1';
export const SERVICES_UPDATED_EVENT = 'encelion:services_updated';

export function getStoredServices(): ServiceItem[] {
  if (typeof window === 'undefined') {
    return DEFAULT_SERVICES;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SERVICES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Error reading services from localStorage:', err);
  }

  return DEFAULT_SERVICES;
}

export function saveStoredServices(services: ServiceItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    window.dispatchEvent(new CustomEvent(SERVICES_UPDATED_EVENT, { detail: services }));
  } catch (err) {
    console.error('Error saving services to localStorage:', err);
  }
}

export function resetStoredServices(): ServiceItem[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(SERVICES_UPDATED_EVENT, { detail: DEFAULT_SERVICES }));
    } catch (err) {
      console.error('Error resetting services:', err);
    }
  }
  return DEFAULT_SERVICES;
}
