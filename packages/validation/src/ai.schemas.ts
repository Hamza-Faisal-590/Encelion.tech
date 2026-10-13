import { z } from 'zod';

// ─── Agent Chat ───────────────────────────────────────────────────────────────

export const sendMessageSchema = z.object({
  message: z.string().min(1).max(4000).trim(),
  sessionId: z.string().cuid().optional(),
  conversationId: z.string().cuid().optional(),
  modality: z.enum(['TEXT', 'VOICE']).default('TEXT'),
});

export const createConversationSchema = z.object({
  agentId: z.string().cuid(),
  channel: z
    .enum(['WEB', 'HOMEPAGE_WIDGET', 'DASHBOARD', 'API', 'WIDGET_EMBED', 'VOICE'])
    .default('WEB'),
  sessionId: z.string().optional(),
});

// ─── Knowledge Base ───────────────────────────────────────────────────────────

export const createKnowledgeBaseSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  description: z.string().max(500).optional(),
  scope: z.enum(['PUBLIC', 'COMPANY', 'INTERNAL', 'CUSTOMER']).default('CUSTOMER'),
  embeddingModel: z.string().default('text-embedding-3-large'),
  chunkSize: z.number().int().min(200).max(2000).default(800),
  chunkOverlap: z.number().int().min(0).max(400).default(120),
});

export const ingestDocumentSchema = z.object({
  title: z.string().min(1).max(255).trim(),
  sourceType: z.enum(['url', 'file', 'text', 'sitemap']),
  sourceUrl: z.string().url().optional(),
  content: z.string().optional(),
  language: z.string().length(2).default('en'),
});

// ─── Agent Builder ────────────────────────────────────────────────────────────

export const createAgentSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  description: z.string().max(500).optional(),
  kind: z.enum(['INTERNAL_ASSISTANT', 'CUSTOMER_AGENT', 'VOICE_AGENT']).default('CUSTOMER_AGENT'),
  modality: z.enum(['TEXT', 'VOICE', 'TEXT_VOICE']).default('TEXT'),
  systemPrompt: z.string().min(10).max(8000),
  modelId: z.string().cuid().optional(),
  temperature: z.number().min(0).max(2).default(0.3),
  maxTokens: z.number().int().min(100).max(4096).default(800),
  topK: z.number().int().min(1).max(20).default(6),
  similarityThreshold: z.number().min(0).max(1).default(0.75),
  greeting: z.string().max(500).optional(),
  fallbackMessage: z.string().max(500).optional(),
  allowedDomains: z.array(z.string()).default([]),
});

export const updateAgentSchema = createAgentSchema.partial();

// ─── Lead Capture ─────────────────────────────────────────────────────────────

export const captureLeadSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z.string().max(30).optional(),
  company: z.string().max(100).optional(),
  industry: z.string().max(100).optional(),
  service: z.string().max(100).optional(),
  budgetRange: z.string().max(50).optional(),
  timeline: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
  conversationId: z.string().cuid().optional(),
  source: z
    .enum([
      'WEBSITE_FORM',
      'AI_AGENT',
      'AI_AGENT_CONSULTATION',
      'MANUAL',
      'WEBHOOK',
      'PARTNER',
      'OTHER',
    ])
    .default('AI_AGENT'),
});

// ─── Contact Form ─────────────────────────────────────────────────────────────

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z.string().max(30).optional(),
  company: z.string().max(100).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
});

// ─── Pagination ───────────────────────────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().max(200).optional(),
  sortBy: z.string().max(50).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type SendMessageDto = z.infer<typeof sendMessageSchema>;
export type CreateConversationDto = z.infer<typeof createConversationSchema>;
export type CreateKnowledgeBaseDto = z.infer<typeof createKnowledgeBaseSchema>;
export type IngestDocumentDto = z.infer<typeof ingestDocumentSchema>;
export type CreateAgentDto = z.infer<typeof createAgentSchema>;
export type UpdateAgentDto = z.infer<typeof updateAgentSchema>;
export type CaptureLeadDto = z.infer<typeof captureLeadSchema>;
export type ContactFormDto = z.infer<typeof contactFormSchema>;
export type PaginationDto = z.infer<typeof paginationSchema>;
