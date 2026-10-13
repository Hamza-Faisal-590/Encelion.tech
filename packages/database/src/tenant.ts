import { RoleName } from '@encelion/types';
import { NotFoundException } from './errors';
import prisma from './client';

// ─────────────────────────────────────────────────────────────────────────────
// Tenant Context — derived from authenticated session, never from HTTP input
// ─────────────────────────────────────────────────────────────────────────────

export interface TenantContext {
  orgId: string;
  userId: string;
  roles: RoleName[];
}

export interface AdminContext {
  userId: string;
  roles: RoleName[];
  isSuperAdmin: true;
}

// ─── Scoped helpers ───────────────────────────────────────────────────────────
// These helpers accept TenantContext and always filter by tenantId.
// They return 404 (not 403) to prevent IDOR information leakage.

export async function scopedAgent(ctx: TenantContext, agentId: string) {
  const agent = await prisma.agent.findFirst({
    where: { id: agentId, tenantId: ctx.orgId },
  });
  if (!agent) throw new NotFoundException('Agent');
  return agent;
}

export async function scopedOrg(ctx: TenantContext) {
  const tenant = await prisma.tenant.findFirst({
    where: { id: ctx.orgId },
    include: { users: { where: { userId: ctx.userId } } },
  });
  if (!tenant) throw new NotFoundException('Tenant Organization');
  return tenant;
}

export async function scopedKnowledgeBase(ctx: TenantContext, kbId: string) {
  const kb = await prisma.knowledgeBase.findFirst({
    where: { id: kbId, tenantId: ctx.orgId },
  });
  if (!kb) throw new NotFoundException('KnowledgeBase');
  return kb;
}

export async function scopedWorkflow(ctx: TenantContext, workflowId: string) {
  const wf = await prisma.workflow.findFirst({
    where: { id: workflowId, tenantId: ctx.orgId },
  });
  if (!wf) throw new NotFoundException('Workflow');
  return wf;
}

export async function scopedLead(ctx: TenantContext, leadId: string) {
  const lead = await prisma.lead.findFirst({
    where: { id: leadId, tenantId: ctx.orgId },
  });
  if (!lead) throw new NotFoundException('Lead');
  return lead;
}

/**
 * Resolve the TenantContext from a userId.
 * Picks the first active tenant membership (or the tenant passed explicitly).
 */
export async function resolveTenantContext(
  userId: string,
  orgId?: string,
): Promise<TenantContext | null> {
  const tenantUser = await prisma.tenantUser.findFirst({
    where: {
      userId,
      ...(orgId ? { tenantId: orgId } : {}),
    },
    include: {
      tenant: { select: { id: true } },
    },
    orderBy: { createdAt: 'asc' },
  });

  if (!tenantUser) return null;

  return {
    userId,
    orgId: tenantUser.tenantId,
    roles: [tenantUser.role as unknown as RoleName],
  };
}
