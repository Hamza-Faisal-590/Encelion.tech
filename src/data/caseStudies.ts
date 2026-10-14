export interface CaseStudy {
  slug: string;
  category: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  duration: string;
  heroImage: string;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  solutionSteps: { step: string; title: string; desc: string }[];
  results: { metric: string; label: string; desc: string }[];
  techStack: string[];
  testimonial: { quote: string; author: string; role: string; company: string };
}

export const caseStudiesData: Record<string, CaseStudy> = {
  'ai-chatbot-automation': {
    slug: 'ai-chatbot-automation',
    category: 'AI AUTOMATION',
    title: 'AI Chatbot & Support Automation',
    client: 'StyleHive E-Commerce',
    industry: 'E-Commerce & Retail',
    location: 'Austin, TX',
    duration: '4 Weeks',
    heroImage: '/case_ecommerce.png',
    tagline: 'Reducing support costs by 70% while boosting customer satisfaction and conversion rates.',
    summary: 'StyleHive, a rapidly growing online fashion retailer with over 500,000 active monthly customers, faced overwhelmed support teams during peak shopping seasons. Encelion.tech deployed an AI-driven conversational agent integrated with Shopify and Zendesk, automating 80% of routine inquiries and driving sales through personalized product recommendations.',
    challenge: 'Support ticket volumes increased by 300% during Q4 holiday sales, leading to average response times exceeding 24 hours. High cart abandonment rates and negative customer reviews were eroding brand loyalty. Traditional rule-based chatbots failed to comprehend open-ended customer queries about order tracking, returns, and sizing advice.',
    solution: 'Encelion designed and deployed a multi-lingual AI chatbot powered by fine-tuned large language models and RAG (Retrieval-Augmented Generation). The bot connects directly with Shopify APIs for live order status updates, automates return label generation, and suggests complementary outfits based on customer browse history.',
    solutionSteps: [
      { step: '01', title: 'Knowledge Base & Integration', desc: 'Ingested 5,000+ support docs, product catalogs, and policy guidelines into vector storage; connected real-time REST endpoints for Shopify & Zendesk.' },
      { step: '02', title: 'Intent Recognition & Personas', desc: 'Configured natural conversational flows matching StyleHive brand voice across English, Spanish, and French.' },
      { step: '03', title: 'Human-in-the-Loop Handoff', desc: 'Built intelligent escalation logic that transfers complex billing or edge-case refund disputes smoothly to human agents with full context.' },
      { step: '04', title: 'Continuous Training & Testing', desc: 'Ran automated synthetic tests on 1,000 real ticket scenarios to ensure 99.4% intent resolution accuracy before rollout.' },
    ],
    results: [
      { metric: '70%', label: 'Support Cost Reduction', desc: 'Saved $340,000 annually in support overhead while handling 4x transaction volume.' },
      { metric: '< 10 sec', label: 'Avg Response Time', desc: 'Reduced ticket wait time from 24 hours to instant sub-10 second resolution.' },
      { metric: '+35%', label: 'Conversion Rate Boost', desc: 'In-chat personalized product suggestions drove $1.2M in incremental sales.' },
      { metric: '4.8/5', label: 'CSAT Rating', desc: 'Achieved top-tier customer satisfaction rating across 150,000 bot interactions.' },
    ],
    techStack: ['GPT-4o', 'LangChain', 'Pinecone Vector DB', 'Shopify API', 'Zendesk API', 'Next.js', 'FastAPI'],
    testimonial: {
      quote: 'Encelion transformed our customer experience overnight. During Black Friday, the AI chatbot handled over 45,000 customer conversations with zero downtime and incredible accuracy.',
      author: 'Sarah Jenkins',
      role: 'VP of Customer Experience',
      company: 'StyleHive E-Commerce',
    },
  },

  'computer-vision-health': {
    slug: 'computer-vision-health',
    category: 'COMPUTER VISION',
    title: 'Computer Vision Medical Imaging',
    client: 'DiagnoAI Health',
    industry: 'Healthcare & Diagnostics',
    location: 'Boston, MA',
    duration: '12 Weeks',
    heroImage: '/case_healthcare.png',
    tagline: 'Superhuman diagnostic precision for rapid X-ray and MRI anomaly detection.',
    summary: 'DiagnoAI partnered with Encelion.tech to engineer an FDA-compliant computer vision platform capable of identifying micro-fractures, lung nodules, and early-stage tumors from diagnostic radiological scans in seconds, accelerating clinician review speed fivefold.',
    challenge: 'Radiology departments facing acute staffing shortages experienced backlogs of up to 48 hours for routine chest X-ray interpretations. Critical early detections were occasionally delayed, highlighting an urgent need for automated, ultra-precise visual triage assistants.',
    solution: 'Encelion developed a deep convolutional neural network architecture (CNN + Vision Transformers) fine-tuned on over 250,000 anonymized DICOM medical scans. The system auto-highlights suspicious regions, calculates risk probabilities, and generates pre-drafted structured radiological reports.',
    solutionSteps: [
      { step: '01', title: 'Data Anonymization & DICOM Pipeline', desc: 'Established HIPAA-compliant data pipelines handling high-resolution 3D DICOM medical imagery securely.' },
      { step: '02', title: 'Ensemble Model Training', desc: 'Trained multi-scale vision transformers combining bounding-box detection and semantic segmentation.' },
      { step: '03', title: 'PACS & EHR Integration', desc: 'Embedded visual inference overlays directly into existing hospital Picture Archiving and Communication Systems (PACS).' },
      { step: '04', title: 'Clinical Validation', desc: 'Validated performance alongside board-certified radiologists over a 60-day blind clinical trial.' },
    ],
    results: [
      { metric: '99.2%', label: 'Diagnostic Sensitivity', desc: 'Matched top-tier radiologist accuracy on lung nodule and fracture detection.' },
      { metric: '5x', label: 'Faster Review Speed', desc: 'Cut radiologist report drafting time from 15 minutes down to 3 minutes per case.' },
      { metric: '0%', label: 'Critical Delay Incidents', desc: 'Emergency triage queue automatically prioritized high-risk scans instantly.' },
      { metric: '250k+', label: 'Scans Analyzed', desc: 'Processed quarter-million scans seamlessly with zero downtime.' },
    ],
    techStack: ['PyTorch', 'YOLOv10', 'MONAI Medical Framework', 'TensorRT', 'DICOM Web API', 'NVIDIA Tensor Core GPUs'],
    testimonial: {
      quote: 'The precision and speed of Encelion’s computer vision system is astounding. It acts as an tireless expert second pair of eyes for our radiologist team every single day.',
      author: 'Dr. Marcus Vance',
      role: 'Chief Medical Officer',
      company: 'DiagnoAI Health',
    },
  },

  'predictive-maintenance': {
    slug: 'predictive-maintenance',
    category: 'MANUFACTURING',
    title: 'Industrial Predictive Maintenance',
    client: 'ManuCore Industries',
    industry: 'Industrial Manufacturing',
    location: 'Chicago, IL',
    duration: '8 Weeks',
    heroImage: '/case_manufacturing.png',
    tagline: 'Eliminating unplanned factory downtime with IoT telemetry and machine learning.',
    summary: 'ManuCore operates 12 heavy industrial manufacturing plants across North America. Unplanned machinery breakdowns previously cost up to $150,000 per hour in idle production lines. Encelion implemented an edge-to-cloud predictive maintenance platform that detects mechanical anomalies weeks before failure occurs.',
    challenge: 'Vibration sensors and thermal telemetry on CNC mills, stamping presses, and robotic arms generated vast data streams that plant engineers had to inspect manually. Sudden bearing failures and motor burnouts led to expensive emergency repairs and missed delivery deadlines.',
    solution: 'Encelion deployed an end-to-end IoT data ingestion system coupled with time-series anomaly detection algorithms. Edge processors stream sensor readings (vibration, heat, acoustics, power draw) into an ML pipeline that forecasts Remaining Useful Life (RUL) for every critical component.',
    solutionSteps: [
      { step: '01', title: 'Edge Sensor Ingestion', desc: 'Connected 1,200+ vibration and thermal sensors via MQTT protocol to local edge gateways.' },
      { step: '02', title: 'Time-Series Anomaly Detection', desc: 'Built LSTM and XGBoost models trained on 3 years of historical sensor logs and failure events.' },
      { step: '03', title: 'Automated Work Orders', desc: 'Integrated predictive alerts with SAP Plant Maintenance to auto-generate technician work orders.' },
      { step: '04', title: 'Plant Manager Dashboard', desc: 'Created real-time 3D twin visualization of factory floor status with health status indicators.' },
    ],
    results: [
      { metric: '60%', label: 'Downtime Reduction', desc: 'Prevented 42 unplanned factory outages in the first year alone.' },
      { metric: '$2.4M', label: 'Annual Cost Savings', desc: 'Drastically reduced emergency parts ordering and lost production shifts.' },
      { metric: '14 Days', label: 'Early Failure Warning', desc: 'Average advance alert lead time given prior to component failure.' },
      { metric: '1,200+', label: 'Connected Machines', desc: 'Scaled across 12 manufacturing facilities effortlessly.' },
    ],
    techStack: ['IoT MQTT', 'Apache Kafka', 'XGBoost', 'TensorFlow TimeSeries', 'Grafana', 'SAP Integration', 'Python'],
    testimonial: {
      quote: 'Encelion gave us complete visibility into the health of our factory floors. We went from reactive fire-fighting to precision scheduled maintenance.',
      author: 'Robert Sterling',
      role: 'Head of Global Operations',
      company: 'ManuCore Industries',
    },
  },

  'demand-forecasting': {
    slug: 'demand-forecasting',
    category: 'DATA ANALYTICS',
    title: 'Smart Demand & Inventory Analytics',
    client: 'Global Supply Chain Group',
    industry: 'Logistics & Supply Chain',
    location: 'Seattle, WA',
    duration: '6 Weeks',
    heroImage: '/prod_automation.png',
    tagline: 'AI-driven forecasting that optimizes inventory levels and eliminates stockouts.',
    summary: 'Global Supply Chain Group manages logistics across 85 regional distribution centers. Encelion built a custom predictive analytics engine that analyzes macroeconomic trends, weather patterns, historical sales data, and promotional campaigns to predict demand with 95% accuracy.',
    challenge: 'Over-stocking led to $4M in annual warehousing holding costs and inventory write-offs, while under-stocking caused lost revenue during sudden demand spikes. Excel-based forecasting methods failed to capture multi-variable market shifts.',
    solution: 'Encelion deployed an automated machine learning forecasting pipeline using Prophet, LightGBM, and transformer-based time series models. The platform automatically adjusts inventory reorder points for over 50,000 SKUs.',
    solutionSteps: [
      { step: '01', title: 'Multi-Source Data Pipelines', desc: 'Aggregated ERP sales history, supplier lead times, regional weather trends, and economic indicators.' },
      { step: '02', title: 'Hierarchical Forecasting', desc: 'Built models predicting demand at national, regional, warehouse, and individual SKU levels.' },
      { step: '03', title: 'Automated Reorder Triggers', desc: 'Set up automated purchase order proposals for procurement managers based on safety stock logic.' },
      { step: '04', title: 'Executive Analytics Hub', desc: 'Delivered intuitive interactive web dashboards for executive planning sessions.' },
    ],
    results: [
      { metric: '45%', label: 'Forecast Accuracy Gain', desc: 'Improved SKU-level demand prediction precision from 62% to 95%.' },
      { metric: '30%', label: 'Inventory Holding Cut', desc: 'Freed up $3.8M in working capital by eliminating buffer inventory.' },
      { metric: '99.1%', label: 'Fulfillment Rate', desc: 'Virtually eliminated stockout incidents during regional demand surges.' },
      { metric: '50,000+', label: 'SKUs Automated', desc: 'Full automated reordering across all regional distribution hubs.' },
    ],
    techStack: ['Python', 'LightGBM', 'Prophet', 'PostgreSQL', 'FastAPI', 'Docker', 'React Analytics Dashboard'],
    testimonial: {
      quote: 'Working with Encelion transformed our supply chain agility. We now anticipate demand spikes weeks before our competitors even react.',
      author: 'David Chen',
      role: 'Director of Logistics Strategy',
      company: 'Global Supply Chain Group',
    },
  },

  'autonomous-sales-agent': {
    slug: 'autonomous-sales-agent',
    category: 'AI AGENTS',
    title: 'Autonomous B2B Sales Prospecting Agent',
    client: 'NovaTech Solutions',
    industry: 'B2B Software & SaaS',
    location: 'San Francisco, CA',
    duration: '6 Weeks',
    heroImage: '/dashboard_product.png',
    tagline: 'AI agents that research target accounts, craft hyper-personalized outreach, and book meetings.',
    summary: 'NovaTech needed to scale outbound enterprise sales without doubling sales development representative (SDR) headcount. Encelion built an autonomous sales agent fleet that continuously monitors web signals, qualifies prospects against ideal customer profiles (ICP), and conducts hyper-personalized multi-touch email outreach.',
    challenge: 'Human SDRs spent 75% of their working hours manually researching prospects on LinkedIn, web searches, and SEC filings. Personalization quality suffered as representatives rushed to meet activity quotas, resulting in low reply rates (under 2%).',
    solution: 'Encelion deployed autonomous AI agents with web search capabilities, CRM read/write access, and LLM reasoning. The agent reads prospect company news, recent press releases, and funding announcements to compose individualized, highly relevant outreach emails.',
    solutionSteps: [
      { step: '01', title: 'ICP & Web Signal Scrapers', desc: 'Configured agents to monitor funding news, job postings, and technology stack shifts for target accounts.' },
      { step: '02', title: 'Personalized Email Generation', desc: 'Generated custom value propositions referencing exact pain points found in recent company announcements.' },
      { step: '03', title: 'HubSpot & Salesforce Sync', desc: 'Auto-populated CRM records with rich account intelligence notes and engagement tracking.' },
      { step: '04', title: 'Automated Meeting Booking', desc: 'Handled incoming replies, answered preliminary FAQs, and scheduled demo calls directly onto rep calendars.' },
    ],
    results: [
      { metric: '10x', label: 'Faster Prospecting', desc: 'Agent fleet researches 500 targeted accounts per day vs 15 accounts per SDR.' },
      { metric: '+40%', label: 'Qualified Demos Booked', desc: 'High-touch personalization increased response rates from 1.8% to 8.4%.' },
      { metric: '75%', label: 'Time Saved for Reps', desc: 'Account Executives focus 100% of their time on live closing calls.' },
      { metric: '$1.8M', label: 'New Pipeline Value', desc: 'Generated in the first 90 days of autonomous sales operation.' },
    ],
    techStack: ['Claude 3.5 Sonnet', 'LangGraph', 'HubSpot API', 'Apollo.io API', 'FastAPI', 'Redis Queue'],
    testimonial: {
      quote: 'The quality of outreach generated by Encelion’s AI agents is better than most senior SDRs. It expanded our sales pipeline dramatically.',
      author: 'Elena Rostova',
      role: 'Chief Commercial Officer',
      company: 'NovaTech Solutions',
    },
  },

  'invoice-ocr-automation': {
    slug: 'invoice-ocr-automation',
    category: 'WORKFLOW AUTOMATION',
    title: 'Smart Invoice OCR & Accounts Payable',
    client: 'FinServe Financial Group',
    industry: 'Financial Services',
    location: 'New York, NY',
    duration: '5 Weeks',
    heroImage: '/prod_chat.png',
    tagline: 'End-to-end intelligent document processing for accounts payable.',
    summary: 'FinServe processed over 15,000 multi-page vendor invoices monthly across 20 global subsidiaries. Encelion built an intelligent document extraction workflow that ingests PDFs, scans, and email attachments, parses complex line items with 99.8% accuracy, and posts entries directly into SAP.',
    challenge: 'Manual data entry was slow, error-prone, and required an offshore team of 25 full-time data operators. Invoices in non-standard formats or multiple currencies frequently stalled in approval queues, missing vendor early-payment discounts.',
    solution: 'Encelion implemented Vision-LLM document parsing coupled with custom validation rules. The system automatically cross-checks invoice line items against PO agreements, flags duplicate charges, and routes approved vouchers directly to payment.',
    solutionSteps: [
      { step: '01', title: 'Multi-Channel Ingestion', desc: 'Monitored AP email inboxes and web portals, auto-ingesting PDF, PNG, TIFF, and Word invoice attachments.' },
      { step: '02', title: 'Vision-LLM Extraction', desc: 'Extracted invoice numbers, line item descriptions, tax codes, bank details, and totals without rigid template rules.' },
      { step: '03', title: 'PO Matching & Validation', desc: 'Cross-referenced ERP purchase orders and 3-way matching rules automatically.' },
      { step: '04', title: 'Straight-Through SAP Posting', desc: 'Approved clean invoices with zero human intervention within 45 seconds of receipt.' },
    ],
    results: [
      { metric: '99.8%', label: 'Extraction Accuracy', desc: 'Handled 500+ different vendor invoice layouts flawlessly.' },
      { metric: '200 hrs', label: 'Saved Monthly', desc: 'Reduced invoice processing time from 3 days down to 45 seconds.' },
      { metric: '$180,000', label: 'Early Payment Discounts', desc: 'Captured early payment vendor discounts previously lost to processing delays.' },
      { metric: '15,000+', label: 'Monthly Invoices', desc: 'Processed automatically with 92% straight-through processing rate.' },
    ],
    techStack: ['GPT-4o Vision', 'Tesseract OCR', 'SAP ERP Connector', 'Python', 'AWS S3', 'FastAPI'],
    testimonial: {
      quote: 'Encelion transformed our accounts payable from a tedious bottleneck into a frictionless automated workflow. The ROI was immediate.',
      author: 'Alexander Vance',
      role: 'Chief Financial Officer',
      company: 'FinServe Financial Group',
    },
  },
};
