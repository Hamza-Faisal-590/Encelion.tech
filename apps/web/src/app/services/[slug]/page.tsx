import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ColorIcon from '@/components/ColorIcon';
import { ArrowRight, CheckCircle, Clock, Star, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';

const servicesData: Record<string, {
  slug: string;
  title: string;
  tagline: string;
  iconName: string;
  heroColor: string;
  description: string;
  longDescription: string;
  benefits: string[];
  features: { title: string; desc: string }[];
  projects: {
    title: string;
    client: string;
    industry: string;
    result: string;
    duration: string;
    image: string;
    tags: string[];
  }[];
  techStack: string[];
  stats: { value: string; label: string }[];
}> = {
  'ai-agents': {
    slug: 'ai-agents',
    title: 'AI Agents',
    tagline: 'Autonomous intelligence that thinks, plans, and executes complex tasks end-to-end.',
    iconName: 'agents',
    heroColor: '#00B894',
    description: 'Build autonomous AI agents that can research, reason, and act — 24/7.',
    longDescription: 'Our AI Agents go beyond simple chatbots. We design and deploy fully autonomous systems that can browse the web, execute code, manage files, communicate with APIs, and complete multi-step workflows without human intervention. Built on the latest large language models and tool-use frameworks, our agents integrate seamlessly into your existing stack.',
    benefits: [
      '24/7 autonomous operation with zero downtime',
      'Multi-step task completion with human-like reasoning',
      'Seamless API and tool integrations',
      'Built-in safety guardrails and oversight controls',
      'Continuous learning and self-improvement',
      'Full audit logs and transparency',
    ],
    features: [
      { title: 'Tool Use & Orchestration', desc: 'Agents that call APIs, execute code, browse the web, and manage files autonomously.' },
      { title: 'Multi-Agent Systems', desc: 'Coordinated fleets of specialized agents that collaborate to complete complex objectives.' },
      { title: 'Memory & Context', desc: 'Long-term memory enabling agents to learn from past interactions and preferences.' },
      { title: 'Human-in-the-Loop', desc: 'Configurable oversight checkpoints for critical decisions requiring human approval.' },
      { title: 'Real-Time Monitoring', desc: 'Live dashboards showing agent activity, task progress, and performance metrics.' },
      { title: 'Custom Personas', desc: 'Agents with distinct personalities and knowledge bases tailored to your brand.' },
    ],
    projects: [
      {
        title: 'Autonomous Sales Research Agent',
        client: 'NovaTech Solutions',
        industry: 'B2B SaaS',
        result: '10x faster lead research & 40% increase in qualified leads',
        duration: '6 weeks',
        image: '/case_ecommerce.png',
        tags: ['Lead Gen', 'Web Scraping', 'CRM Integration'],
      },
      {
        title: 'Legal Document Review Agent',
        client: 'LexAI Partners',
        industry: 'Legal Tech',
        result: '80% reduction in manual document review time',
        duration: '8 weeks',
        image: '/case_healthcare.png',
        tags: ['NLP', 'Document AI', 'Compliance'],
      },
      {
        title: 'Supply Chain Intelligence Agent',
        client: 'ManuCore Industries',
        industry: 'Manufacturing',
        result: '30% reduction in procurement costs via intelligent negotiation',
        duration: '12 weeks',
        image: '/case_manufacturing.png',
        tags: ['Procurement', 'Forecasting', 'ERP Integration'],
      },
    ],
    techStack: ['GPT-4o', 'Claude 3.5', 'LangChain', 'AutoGen', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    stats: [
      { value: '50+', label: 'Agents Deployed' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '10x', label: 'Avg Productivity Gain' },
      { value: '< 6wk', label: 'Avg Time to Deploy' },
    ],
  },
  'chatbots': {
    slug: 'chatbots',
    title: 'AI Chatbots',
    tagline: 'Intelligent conversational AI that delights customers and converts prospects 24/7.',
    iconName: 'chatbot',
    heroColor: '#6366F1',
    description: 'Customer-facing AI chatbots that handle queries, support, and sales.',
    longDescription: 'Our AI chatbots are not just FAQ bots — they understand context, maintain conversation history, handle complex queries, and integrate deeply with your CRM, helpdesk, and e-commerce platforms. We build chatbots that feel genuinely helpful, improving CSAT scores and reducing support costs dramatically.',
    benefits: [
      'Instant response to customer queries around the clock',
      'Deep integration with CRM, Shopify, Zendesk, and more',
      'Multilingual support across 50+ languages',
      'Handoff to human agents when needed',
      'Continuous improvement via feedback loops',
      'GDPR-compliant data handling',
    ],
    features: [
      { title: 'Conversational AI', desc: 'Natural, flowing conversations that understand intent, not just keywords.' },
      { title: 'Deep Integrations', desc: 'Connect to your CRM, ticketing system, and databases for real-time data access.' },
      { title: 'Lead Capture', desc: 'Proactively qualify visitors, capture leads, and schedule appointments.' },
      { title: 'Multilingual', desc: 'Serve global customers in their native language with automatic detection.' },
      { title: 'Analytics Dashboard', desc: 'Track conversation volume, resolution rate, CSAT, and revenue attributed to chatbot.' },
      { title: 'Custom Training', desc: 'Fine-tuned on your product docs, FAQs, and brand voice for perfect alignment.' },
    ],
    projects: [
      {
        title: 'E-Commerce Support Bot',
        client: 'StyleHive Store',
        industry: 'E-Commerce',
        result: '70% reduction in support tickets, 35% increase in conversion rate',
        duration: '4 weeks',
        image: '/case_ecommerce.png',
        tags: ['Shopify', 'Customer Support', 'Lead Gen'],
      },
      {
        title: 'Healthcare Appointment Bot',
        client: 'MedConnect Clinics',
        industry: 'Healthcare',
        result: '90% of appointments booked via bot, saving 15 hrs/week',
        duration: '5 weeks',
        image: '/case_healthcare.png',
        tags: ['HIPAA', 'Scheduling', 'EHR Integration'],
      },
      {
        title: 'HR Onboarding Assistant',
        client: 'GlobalCorp HR',
        industry: 'Enterprise HR',
        result: '60% faster employee onboarding, 95% satisfaction score',
        duration: '6 weeks',
        image: '/case_manufacturing.png',
        tags: ['HR', 'Slack Integration', 'Document Q&A'],
      },
    ],
    techStack: ['GPT-4o', 'Gemini', 'Botpress', 'Dialogflow', 'Next.js', 'Twilio', 'Intercom API', 'Zapier'],
    stats: [
      { value: '80+', label: 'Bots Launched' },
      { value: '4.8/5', label: 'Avg Client Rating' },
      { value: '70%', label: 'Ticket Reduction' },
      { value: '< 4wk', label: 'Avg Deployment' },
    ],
  },
  'workflow-automation': {
    slug: 'workflow-automation',
    title: 'Workflow Automation',
    tagline: 'Eliminate repetitive tasks and unlock team capacity with intelligent AI workflows.',
    iconName: 'workflow',
    heroColor: '#F59E0B',
    description: 'End-to-end AI-powered automation for your business operations.',
    longDescription: 'We design custom AI workflow automation systems that connect your apps, automate decision-making, and eliminate manual bottlenecks. From data entry to complex approval chains, our automations use AI to handle exceptions that traditional RPA cannot, making your entire operation run on autopilot.',
    benefits: [
      'Eliminate up to 80% of manual, repetitive work',
      'AI-powered exception handling beyond standard RPA',
      'Cross-platform orchestration of 200+ apps',
      'Real-time error detection and self-healing workflows',
      'ROI visible within the first month',
      'Scales automatically with business growth',
    ],
    features: [
      { title: 'AI-Powered RPA', desc: 'Robotic process automation enhanced with AI for handling edge cases and unstructured data.' },
      { title: 'Smart Document Processing', desc: 'Automatically extract, classify, and route data from invoices, contracts, and forms.' },
      { title: 'Approval Chain Automation', desc: 'Intelligent routing of approvals based on context, urgency, and authority levels.' },
      { title: 'Cross-App Orchestration', desc: 'Seamlessly connect Salesforce, SAP, HubSpot, Notion, and 200+ other platforms.' },
      { title: 'Reporting Automation', desc: 'Auto-generate and distribute weekly/monthly reports with AI-written insights.' },
      { title: 'Anomaly Detection', desc: 'AI monitors your workflows and flags anomalies before they become problems.' },
    ],
    projects: [
      {
        title: 'Invoice Processing Automation',
        client: 'FinServe Group',
        industry: 'Finance',
        result: 'Processed 10,000+ invoices/month with 99.5% accuracy, saving 200 hrs/month',
        duration: '6 weeks',
        image: '/case_ecommerce.png',
        tags: ['Invoice OCR', 'SAP', 'Accounts Payable'],
      },
      {
        title: 'Patient Data Sync Workflow',
        client: 'HealthBridge Network',
        industry: 'Healthcare',
        result: 'Eliminated 100% of manual data entry between 5 hospital systems',
        duration: '10 weeks',
        image: '/case_healthcare.png',
        tags: ['HL7/FHIR', 'Data Migration', 'HIPAA'],
      },
      {
        title: 'Manufacturing QA Reporting',
        client: 'PrecisionParts Ltd',
        industry: 'Manufacturing',
        result: 'Real-time QA dashboards replacing 40 hrs/week of manual reporting',
        duration: '8 weeks',
        image: '/case_manufacturing.png',
        tags: ['IoT Data', 'ERP', 'Predictive Analytics'],
      },
    ],
    techStack: ['n8n', 'Make.com', 'Zapier', 'Python', 'Apache Airflow', 'OCR APIs', 'REST APIs', 'Webhooks'],
    stats: [
      { value: '200+', label: 'Workflows Built' },
      { value: '80%', label: 'Task Reduction' },
      { value: '$2M+', label: 'Client Cost Saved' },
      { value: '< 6wk', label: 'Avg Delivery' },
    ],
  },
  'computer-vision': {
    slug: 'computer-vision',
    title: 'Computer Vision',
    tagline: 'Give your systems the power to see, understand, and act on the visual world.',
    iconName: 'vision',
    heroColor: '#EC4899',
    description: 'AI-powered visual intelligence for industry-leading image and video analysis.',
    longDescription: 'Our computer vision solutions enable businesses to extract actionable insights from images, video streams, and real-time camera feeds. From quality control on factory floors to real-time analytics in retail, we build custom vision AI that sees with superhuman accuracy and speed.',
    benefits: [
      'Detect defects with >99% accuracy at production speed',
      'Real-time processing of live video streams',
      'Works in challenging lighting and environmental conditions',
      'Edge deployment on cameras and IoT devices',
      'GDPR-compliant with built-in anonymization',
      'Custom model training on your specific visual data',
    ],
    features: [
      { title: 'Object Detection & Tracking', desc: 'Identify, classify, and track multiple objects in real time with high precision.' },
      { title: 'Defect Detection', desc: 'Manufacturing-grade visual QA that catches micro-defects invisible to the human eye.' },
      { title: 'Face & Pose Recognition', desc: 'Biometric identification and body pose estimation for security and fitness applications.' },
      { title: 'OCR & Document AI', desc: 'Extract structured data from handwritten or printed documents at scale.' },
      { title: 'Video Analytics', desc: 'Behavior analysis, crowd counting, and traffic flow monitoring from CCTV feeds.' },
      { title: 'Edge AI Deployment', desc: 'Deploy optimized vision models directly on NVIDIA Jetson, Raspberry Pi, and IP cameras.' },
    ],
    projects: [
      {
        title: 'Retail Shelf Monitoring System',
        client: 'MegaRetail Chain',
        industry: 'Retail',
        result: '95% reduction in out-of-stock incidents, $500K/yr revenue recovered',
        duration: '10 weeks',
        image: '/case_ecommerce.png',
        tags: ['Object Detection', 'CCTV', 'Retail Analytics'],
      },
      {
        title: 'Medical Image Analysis Platform',
        client: 'DiagnoAI Health',
        industry: 'Healthcare',
        result: '97.3% diagnostic accuracy on X-rays, 5x faster than radiologists',
        duration: '16 weeks',
        image: '/case_healthcare.png',
        tags: ['Medical Imaging', 'DICOM', 'FDA Compliance'],
      },
      {
        title: 'PCB Defect Detection',
        client: 'CircuitTech Manufacturing',
        industry: 'Electronics',
        result: '99.7% defect detection rate, replacing 8 manual QA inspectors',
        duration: '8 weeks',
        image: '/case_manufacturing.png',
        tags: ['Quality Control', 'Edge AI', 'Real-time'],
      },
    ],
    techStack: ['YOLOv10', 'OpenCV', 'TensorRT', 'PyTorch', 'NVIDIA Jetson', 'Azure Vision', 'AWS Rekognition', 'FastAPI'],
    stats: [
      { value: '99%+', label: 'Detection Accuracy' },
      { value: '60fps', label: 'Real-time Processing' },
      { value: '30+', label: 'Vision Projects' },
      { value: 'Edge', label: 'to Cloud Deployment' },
    ],
  },
  'custom-ai': {
    slug: 'custom-ai',
    title: 'Custom AI Development',
    tagline: 'Bespoke AI models and systems engineered precisely for your unique business challenge.',
    iconName: 'custom',
    heroColor: '#8B5CF6',
    description: "Tailored AI solutions when off-the-shelf just won't cut it.",
    longDescription: 'Every business has unique data, processes, and competitive advantages. Our custom AI development service designs, trains, and deploys proprietary AI models fine-tuned specifically for your domain. From recommendation engines to predictive analytics to custom LLMs, we own the full pipeline from data to production.',
    benefits: [
      'Proprietary models trained on your confidential data',
      'Full IP ownership — you own everything we build',
      'End-to-end pipeline: data → training → deployment',
      'Continuous retraining as your data evolves',
      'Production-grade MLOps infrastructure included',
      'Explainable AI for regulated industries',
    ],
    features: [
      { title: 'Custom LLM Fine-tuning', desc: 'Fine-tune foundation models on your domain data for superior accuracy and relevance.' },
      { title: 'Predictive Analytics', desc: 'Churn prediction, demand forecasting, and risk scoring models tailored to your metrics.' },
      { title: 'Recommendation Engines', desc: 'Personalization systems that increase engagement, AOV, and lifetime value.' },
      { title: 'NLP Pipelines', desc: 'Custom text classification, sentiment analysis, and information extraction for your domain.' },
      { title: 'MLOps & Model Ops', desc: 'CI/CD for ML models with automated retraining, A/B testing, and monitoring.' },
      { title: 'Data Strategy', desc: 'End-to-end data pipeline design, ETL, feature engineering, and data lake architecture.' },
    ],
    projects: [
      {
        title: 'E-Commerce Recommendation Engine',
        client: 'ShopSmart Platform',
        industry: 'E-Commerce',
        result: '28% increase in AOV and 45% improvement in click-through rate',
        duration: '12 weeks',
        image: '/case_ecommerce.png',
        tags: ['Collaborative Filtering', 'Real-time', 'A/B Testing'],
      },
      {
        title: 'Medical Claims Fraud Detector',
        client: 'InsureGuard Ltd',
        industry: 'Insurance',
        result: '$3.2M in fraudulent claims caught in first 6 months',
        duration: '14 weeks',
        image: '/case_healthcare.png',
        tags: ['Anomaly Detection', 'XGBoost', 'Explainable AI'],
      },
      {
        title: 'Predictive Maintenance Model',
        client: 'PowerGrid Solutions',
        industry: 'Energy',
        result: '60% reduction in unplanned downtime, saving $1.5M/yr',
        duration: '16 weeks',
        image: '/case_manufacturing.png',
        tags: ['IoT Sensors', 'Time Series', 'LSTM'],
      },
    ],
    techStack: ['Python', 'PyTorch', 'TensorFlow', 'Hugging Face', 'MLflow', 'Kubernetes', 'Spark', 'dbt'],
    stats: [
      { value: '100+', label: 'Models Built' },
      { value: '$10M+', label: 'Business Value Created' },
      { value: 'Full IP', label: 'Ownership to You' },
      { value: '12wk', label: 'Avg Custom Delivery' },
    ],
  },
};

// Map URL slug to data key
const slugMap: Record<string, string> = {
  'ai-agents': 'ai-agents',
  'chatbots': 'chatbots',
  'workflow-automation': 'workflow-automation',
  'computer-vision': 'computer-vision',
  'custom-ai': 'custom-ai',
};

export async function generateStaticParams() {
  return Object.keys(slugMap).map((slug) => ({ slug }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const dataKey = slugMap[params.slug];
  if (!dataKey) notFound();
  const service = servicesData[dataKey];
  if (!service) notFound();

  return (
    <div>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        background: `linear-gradient(135deg, #0A1628 0%, #0d1f3c 60%, #0A1628 100%)`,
        padding: '70px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 70% 50%, ${service.heroColor}18 0%, transparent 55%)`,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(${service.heroColor} 0.4px, transparent 0.4px)`,
          backgroundSize: '24px 24px', opacity: 0.04,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/services" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Services</Link>
            <ChevronRight size={14} />
            <span style={{ color: service.heroColor }}>{service.title}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ marginBottom: 16 }}>
                <ColorIcon name={service.iconName} size={64} />
              </div>
              <h1 style={{
                fontSize: 'clamp(36px, 5vw, 58px)',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.05,
                marginBottom: 18,
                letterSpacing: '-0.03em',
              }}>
                {service.title}
              </h1>
              <p style={{
                fontSize: 17,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.75,
                maxWidth: 520,
                marginBottom: 32,
              }}>
                {service.tagline}
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-primary" style={{ padding: '13px 32px', borderRadius: 25 }}>
                  Start a Project <ArrowRight size={16} />
                </Link>
                <Link href="/services" className="btn-outline" style={{ color: '#fff', borderColor: `${service.heroColor}80`, padding: '13px 28px', borderRadius: 25 }}>
                  All Services
                </Link>
              </div>
            </div>

            {/* Stats grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}>
              {service.stats.map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: '24px 20px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: service.heroColor, marginBottom: 6, letterSpacing: '-0.02em' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div className="above-tag" style={{ marginBottom: 12 }}><span>WHAT WE DO</span></div>
              <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0A1628', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Overview
              </h2>
              <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.85, marginBottom: 28 }}>
                {service.longDescription}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {service.benefits.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <CheckCircle size={18} style={{ color: service.heroColor, flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature grid */}
            <div>
              <div className="above-tag" style={{ marginBottom: 12 }}><span>CAPABILITIES</span></div>
              <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0A1628', marginBottom: 24, letterSpacing: '-0.02em' }}>
                What's Included
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {service.features.map((f, i) => (
                  <div key={i} style={{
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: 14,
                    padding: 20,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: `${service.heroColor}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 10,
                    }}>
                      <Star size={16} style={{ color: service.heroColor }} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="section" style={{ background: '#F9FAFB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="above-tag" style={{ margin: '0 auto 12px', display: 'inline-block' }}><span>CASE STUDIES</span></div>
            <h2 className="section-title">Real Projects. Real Results.</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              See how we've delivered measurable impact for clients across industries.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {service.projects.map((project, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: 20,
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              >
                {/* Project image */}
                <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to bottom, transparent 40%, ${service.heroColor}88 100%)`,
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 12, left: 14,
                    fontSize: 11, fontWeight: 600, color: '#fff',
                    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                    borderRadius: 20, padding: '3px 10px',
                  }}>
                    {project.industry}
                  </div>
                </div>

                <div style={{ padding: '20px 20px 24px' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>{project.title}</h3>
                  <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 12 }}>
                    <span style={{ fontWeight: 600, color: '#374151' }}>Client:</span> {project.client}
                  </div>

                  {/* Result badge */}
                  <div style={{
                    background: `${service.heroColor}14`,
                    border: `1px solid ${service.heroColor}30`,
                    borderRadius: 10,
                    padding: '10px 14px',
                    marginBottom: 14,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: service.heroColor, letterSpacing: '0.06em', marginBottom: 3 }}>RESULT</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 600, lineHeight: 1.4 }}>{project.result}</div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {project.tags.map((tag, j) => (
                      <span key={j} style={{
                        fontSize: 11, background: '#F3F4F6', borderRadius: 20, padding: '3px 10px', color: '#374151',
                      }}>{tag}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#9CA3AF' }}>
                    <Clock size={13} />
                    <span>Delivered in {project.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="above-tag" style={{ margin: '0 auto 12px', display: 'inline-block' }}><span>TECHNOLOGY</span></div>
            <h2 className="section-title">Our Tech Stack</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            {service.techStack.map((tech, i) => (
              <div key={i} style={{
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: 12,
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: 600,
                color: '#0A1628',
                transition: 'all 0.2s',
              }}
                >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="above-tag" style={{ margin: '0 auto 16px', display: 'inline-block' }}>
            <span>LET'S WORK TOGETHER</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>
            Ready to Build Your<br />
            <span style={{ color: '#00B894' }}>{service.title} Solution?</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Tell us about your project and we'll respond within 24 hours with a free consultation and proposal.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ padding: '13px 32px', borderRadius: 25 }}>
              Start a Project <ArrowRight size={16} />
            </Link>
            <Link href="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px',
              borderRadius: 25, border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
            }}>
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
