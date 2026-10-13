import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@encelion/database';
import { sendEmail } from '@encelion/email';

@Injectable()
export class LeadsService {
  async capture(tenantId: string, data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    agentSessionId?: string;
    intentScore?: number;
    customData?: Record<string, unknown>;
  }) {
    const lead = await prisma.lead.create({
      data: {
        tenantId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        agentSessionId: data.agentSessionId,
        intentScore: data.intentScore || 0,
        customData: (data.customData as any) || {},
        status: 'NEW',
      },
    });

    // Log the capture activity
    await prisma.leadActivity.create({
      data: {
        leadId: lead.id,
        action: 'CAPTURED',
        details: { source: 'agent_chat', sessionId: data.agentSessionId } as any,
      },
    });

    // Send notification email to tenant admin (non-blocking)
    this.sendLeadNotification(lead).catch(() => {});

    return lead;
  }

  private async sendLeadNotification(lead: any) {
    try {
      const tenant = await prisma.tenant.findUnique({ where: { id: lead.tenantId } });
      if (!tenant) return;

      const adminUsers = await prisma.tenantUser.findMany({
        where: { tenantId: lead.tenantId, role: 'ORG_ADMIN' },
        include: { user: { select: { email: true, firstName: true } } },
      });

      if (adminUsers.length === 0) return;

      const adminEmail = adminUsers[0].user.email;
      const adminName = adminUsers[0].user.firstName || 'Admin';

      await sendEmail({
        to: adminEmail,
        subject: `New Lead Captured: ${lead.name} (${lead.company || 'Unknown Company'})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #111827; color: #F8FAFC; padding: 32px; border-radius: 12px;">
            <h2 style="color: #00F0FF;">🤖 New Lead Captured</h2>
            <p>Hi ${adminName},</p>
            <p>A new lead has been captured by your Encelion AI agent.</p>
            <div style="background: #1E293B; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p><strong>Name:</strong> ${lead.name}</p>
              <p><strong>Email:</strong> ${lead.email}</p>
              ${lead.phone ? `<p><strong>Phone:</strong> ${lead.phone}</p>` : ''}
              ${lead.company ? `<p><strong>Company:</strong> ${lead.company}</p>` : ''}
              <p><strong>Intent Score:</strong> ${(lead.intentScore * 100).toFixed(0)}%</p>
            </div>
            <a href="https://app.encelion.tech/leads/${lead.id}" style="background: #00F0FF; color: #0B0F19; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              View Lead in Dashboard →
            </a>
          </div>
        `,
      });
    } catch {
      // Silent fail — email is non-critical
    }
  }

  async list(tenantId: string, status?: string) {
    return prisma.lead.findMany({
      where: {
        tenantId,
        ...(status ? { status: status as any } : {}),
      },
      include: { activities: { take: 3, orderBy: { createdAt: 'desc' } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const lead = await prisma.lead.findFirst({
      where: { id, tenantId },
      include: { activities: { orderBy: { createdAt: 'desc' } } },
    });
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async updateStatus(tenantId: string, id: string, status: string, notes?: string) {
    const lead = await prisma.lead.findFirst({ where: { id, tenantId } });
    if (!lead) throw new NotFoundException('Lead not found');

    await prisma.leadActivity.create({
      data: {
        leadId: id,
        action: `STATUS_CHANGED_TO_${status}`,
        details: { notes, previousStatus: lead.status } as any,
      },
    });

    return prisma.lead.update({
      where: { id },
      data: { status: status as any, updatedAt: new Date() },
    });
  }
}
