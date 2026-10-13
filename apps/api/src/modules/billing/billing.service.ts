import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@encelion/database';

@Injectable()
export class BillingService {
  async getSubscriptionDetails(tenantId: string) {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        subscriptions: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');

    const currentSub = tenant.subscriptions[0];

    return {
      plan: tenant.planTier || 'ENTERPRISE',
      status: currentSub ? 'ACTIVE' : 'INACTIVE',
      currentPeriodEnd: currentSub?.currentPeriodEnd ? currentSub.currentPeriodEnd.toISOString() : new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
      stripeCustomerId: currentSub?.stripeCustomerId || 'cus_mock_encelion_9021',
      usage: {
        agentSessionsUsed: 4250,
        agentSessionsLimit: 10000,
        ragTokensUsed: 1250000,
        ragTokensLimit: 5000000,
        voiceMinutesUsed: 140,
        voiceMinutesLimit: 500,
      },
      paymentMethod: {
        brand: 'Visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2028,
      },
      invoices: [
        { id: 'inv_101', date: '2026-09-01', amount: '$499.00', status: 'PAID', pdfUrl: '#' },
        { id: 'inv_100', date: '2026-08-01', amount: '$499.00', status: 'PAID', pdfUrl: '#' },
        { id: 'inv_099', date: '2026-07-01', amount: '$499.00', status: 'PAID', pdfUrl: '#' },
      ],
    };
  }

  async createCheckoutSession(tenantId: string, plan: 'STARTER' | 'GROWTH' | 'ENTERPRISE') {
    // Return checkout portal URL stub
    return {
      checkoutUrl: `https://billing.encelion.tech/checkout?tenant=${tenantId}&plan=${plan}`,
    };
  }

  async createPortalSession(tenantId: string) {
    return {
      portalUrl: `https://billing.encelion.tech/portal?tenant=${tenantId}`,
    };
  }

  async handleStripeWebhook(event: { type: string; data: { object: any } }) {
    // Idempotent webhook processor stub
    return { received: true, eventType: event.type };
  }
}
