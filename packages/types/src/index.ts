// ─────────────────────────────────────────────────────────────────────────────
// @encelion/types — Shared TypeScript enums and types
// Mirrors all Prisma enums so client code can import without the Prisma client
// ─────────────────────────────────────────────────────────────────────────────

// ─── Identity & Tenancy ───────────────────────────────────────────────────────

export enum RoleName {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SALES = 'SALES',
  ENGINEER = 'ENGINEER',
  AI_ENGINEER = 'AI_ENGINEER',
  SUPPORT = 'SUPPORT',
  CONTENT_MANAGER = 'CONTENT_MANAGER',
  CUSTOMER = 'CUSTOMER',
  CUSTOMER_ADMIN = 'CUSTOMER_ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}

export enum OrgPlan {
  FREE = 'FREE',
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
}

export enum OrgRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER',
  BILLING = 'BILLING',
}

// ─── CRM ─────────────────────────────────────────────────────────────────────

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  WON = 'WON',
  LOST = 'LOST',
}

export enum LeadSource {
  WEBSITE_FORM = 'WEBSITE_FORM',
  AI_AGENT = 'AI_AGENT',
  AI_AGENT_CONSULTATION = 'AI_AGENT_CONSULTATION',
  MANUAL = 'MANUAL',
  WEBHOOK = 'WEBHOOK',
  PARTNER = 'PARTNER',
  OTHER = 'OTHER',
}

export enum LeadActivityType {
  CREATED = 'CREATED',
  STATUS_CHANGED = 'STATUS_CHANGED',
  NOTE = 'NOTE',
  EMAIL_SENT = 'EMAIL_SENT',
  CALL = 'CALL',
  MEETING = 'MEETING',
  FORM_SUBMIT = 'FORM_SUBMIT',
  AI_QUALIFIED = 'AI_QUALIFIED',
  ASSIGNED = 'ASSIGNED',
}

// ─── Projects ────────────────────────────────────────────────────────────────

export enum ProjectStatus {
  INQUIRY = 'INQUIRY',
  DISCOVERY = 'DISCOVERY',
  PLANNING = 'PLANNING',
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  DEPLOYMENT = 'DEPLOYMENT',
  MAINTENANCE = 'MAINTENANCE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  BLOCKED = 'BLOCKED',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

// ─── Catalogue ───────────────────────────────────────────────────────────────

export enum ProductStatus {
  PLANNED = 'PLANNED',
  IN_DEVELOPMENT = 'IN_DEVELOPMENT',
  BETA = 'BETA',
  LIVE = 'LIVE',
  RETIRED = 'RETIRED',
}

export enum BillingInterval {
  MONTH = 'MONTH',
  ANNUAL = 'ANNUAL',
  USAGE = 'USAGE',
}

// ─── Billing ─────────────────────────────────────────────────────────────────

export enum SubscriptionStatus {
  TRIALING = 'TRIALING',
  ACTIVE = 'ACTIVE',
  PAST_DUE = 'PAST_DUE',
  CANCELED = 'CANCELED',
  UNPAID = 'UNPAID',
  INCOMPLETE = 'INCOMPLETE',
  PAUSED = 'PAUSED',
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  PAID = 'PAID',
  VOID = 'VOID',
  UNCOLLECTIBLE = 'UNCOLLECTIBLE',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

// ─── AI Agents ───────────────────────────────────────────────────────────────

export enum AgentKind {
  INTERNAL_ASSISTANT = 'INTERNAL_ASSISTANT',
  CUSTOMER_AGENT = 'CUSTOMER_AGENT',
  VOICE_AGENT = 'VOICE_AGENT',
}

export enum AgentModality {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
  TEXT_VOICE = 'TEXT_VOICE',
}

export enum AgentStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  ARCHIVED = 'ARCHIVED',
}

export enum ConversationChannel {
  WEB = 'WEB',
  HOMEPAGE_WIDGET = 'HOMEPAGE_WIDGET',
  DASHBOARD = 'DASHBOARD',
  API = 'API',
  WIDGET_EMBED = 'WIDGET_EMBED',
  VOICE = 'VOICE',
}

export enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
  TOOL = 'TOOL',
}

export enum MessageModality {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
}

// ─── Robot State Machine ─────────────────────────────────────────────────────

export enum RobotState {
  IDLE = 'IDLE',
  LISTENING = 'LISTENING',
  PROCESSING = 'PROCESSING',
  SPEAKING = 'SPEAKING',
  ERROR = 'ERROR',
}

// ─── RAG ─────────────────────────────────────────────────────────────────────

export enum KBScope {
  PUBLIC = 'PUBLIC',
  COMPANY = 'COMPANY',
  INTERNAL = 'INTERNAL',
  CUSTOMER = 'CUSTOMER',
}

export enum DocStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  READY = 'READY',
  FAILED = 'FAILED',
}

// ─── Automation ───────────────────────────────────────────────────────────────

export enum WorkflowStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  ARCHIVED = 'ARCHIVED',
}

export enum ExecutionStatus {
  QUEUED = 'QUEUED',
  RUNNING = 'RUNNING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  WAITING_APPROVAL = 'WAITING_APPROVAL',
}

export enum NodeType {
  TRIGGER = 'TRIGGER',
  AI = 'AI',
  HTTP_REQUEST = 'HTTP_REQUEST',
  WEBHOOK = 'WEBHOOK',
  DATABASE = 'DATABASE',
  EMAIL = 'EMAIL',
  CONDITION = 'CONDITION',
  DELAY = 'DELAY',
  APPROVAL = 'APPROVAL',
  TRANSFORM = 'TRANSFORM',
  OUTPUT = 'OUTPUT',
}

// ─── Voice ────────────────────────────────────────────────────────────────────

export enum VoiceProviderKind {
  BROWSER = 'BROWSER',
  OPENAI = 'OPENAI',
  ELEVENLABS = 'ELEVENLABS',
  GOOGLE = 'GOOGLE',
  DEEPGRAM = 'DEEPGRAM',
  CLOUD = 'CLOUD',
}

export enum VoiceDirection {
  INBOUND = 'INBOUND',
  STT = 'STT',
  TTS = 'TTS',
}

// ─── Vision ──────────────────────────────────────────────────────────────────

export enum VisionTask {
  CLASSIFY = 'CLASSIFY',
  DETECT = 'DETECT',
  OCR = 'OCR',
  INSPECT = 'INSPECT',
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
}

export enum VisionJobStatus {
  QUEUED = 'QUEUED',
  RUNNING = 'RUNNING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

// ─── Support ──────────────────────────────────────────────────────────────────

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING = 'WAITING',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum TicketPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

// ─── Notifications ────────────────────────────────────────────────────────────

export enum NotificationType {
  LEAD = 'LEAD',
  PROJECT = 'PROJECT',
  AGENT = 'AGENT',
  WORKFLOW = 'WORKFLOW',
  PAYMENT = 'PAYMENT',
  SUBSCRIPTION = 'SUBSCRIPTION',
  SUPPORT = 'SUPPORT',
  SYSTEM = 'SYSTEM',
}

export enum NotificationChannel {
  IN_APP = 'IN_APP',
  EMAIL = 'EMAIL',
}

// ─── AI Intent ───────────────────────────────────────────────────────────────

export enum ConversationIntent {
  GREETING = 'greeting',
  PRODUCT_INQUIRY = 'product_inquiry',
  PRICING = 'pricing',
  DEMO_REQUEST = 'demo_request',
  SUPPORT = 'support',
  LEAD_READY = 'lead_ready',
  OFF_TOPIC = 'off_topic',
  UNKNOWN = 'unknown',
}

// ─── Shared value types ───────────────────────────────────────────────────────

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
}

export interface StreamChunk {
  type: 'delta' | 'done' | 'error' | 'citation';
  content?: string;
  citations?: Citation[];
  error?: string;
}

export interface Citation {
  chunkId: string;
  documentTitle: string;
  excerpt: string;
  score: number;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
  totalTokens: number;
  costMicros: number;
}
