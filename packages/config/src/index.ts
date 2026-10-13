import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────────────
// Environment variable schemas — validated at startup
// Each app imports the schema for its own env vars.
// ─────────────────────────────────────────────────────────────────────────────

export const baseEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

export const databaseEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
});

export const redisEnvSchema = z.object({
  REDIS_URL: z.string().url(),
});

export const authEnvSchema = z.object({
  JWT_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  SESSION_SECRET: z.string().min(16),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_REDIRECT_URI: z.string().url().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(16).optional(),
});

export const openAIEnvSchema = z.object({
  OPENAI_API_KEY: z.string().startsWith('sk-'),
  OPENAI_ORG_ID: z.string().optional(),
  OPENAI_CHAT_MODEL: z.string().default('gpt-4o'),
  OPENAI_FAST_MODEL: z.string().default('gpt-4o-mini'),
  OPENAI_EMBEDDING_MODEL: z.string().default('text-embedding-3-large'),
  OPENAI_TTS_VOICE: z
    .enum(['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'])
    .default('nova'),
  OPENAI_TTS_MODEL: z.string().default('tts-1-hd'),
  OPENAI_STT_MODEL: z.string().default('whisper-1'),
});

export const anthropicEnvSchema = z.object({
  ANTHROPIC_API_KEY: z.string().optional(),
  ANTHROPIC_MODEL: z.string().default('claude-3-5-sonnet-20241022'),
});

export const elevenLabsEnvSchema = z.object({
  ELEVENLABS_API_KEY: z.string().optional(),
  ELEVENLABS_VOICE_ID: z.string().optional(),
});

export const stripeEnvSchema = z.object({
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  STRIPE_PRICE_STARTER_MONTHLY: z.string().optional(),
  STRIPE_PRICE_PROFESSIONAL_MONTHLY: z.string().optional(),
  STRIPE_PRICE_ENTERPRISE_MONTHLY: z.string().optional(),
});

export const r2EnvSchema = z.object({
  R2_ACCOUNT_ID: z.string(),
  R2_ACCESS_KEY_ID: z.string(),
  R2_SECRET_ACCESS_KEY: z.string(),
  R2_BUCKET_NAME: z.string().default('encelion-assets'),
  R2_PUBLIC_URL: z.string().url(),
});

export const resendEnvSchema = z.object({
  RESEND_API_KEY: z.string().startsWith('re_'),
  RESEND_FROM_ADDRESS: z.string().email(),
  RESEND_REPLY_TO: z.string().email().optional(),
});

export const apiEnvSchema = baseEnvSchema
  .merge(databaseEnvSchema)
  .merge(redisEnvSchema)
  .merge(authEnvSchema)
  .merge(openAIEnvSchema)
  .merge(anthropicEnvSchema)
  .merge(elevenLabsEnvSchema)
  .merge(stripeEnvSchema)
  .merge(r2EnvSchema)
  .merge(resendEnvSchema);

export type ApiEnv = z.infer<typeof apiEnvSchema>;

export const webEnvSchema = baseEnvSchema.extend({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_').optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(16),
});

export type WebEnv = z.infer<typeof webEnvSchema>;

/**
 * Validate environment variables at startup.
 * Throws a clear error listing all missing/invalid variables.
 */
export function validateEnv<T>(schema: z.ZodType<T>, env: NodeJS.ProcessEnv = process.env): T {
  const result = schema.safeParse(env);
  if (!result.success) {
    const formatted = result.error.issues
      .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`❌ Invalid environment variables:\n${formatted}`);
  }
  return result.data;
}
