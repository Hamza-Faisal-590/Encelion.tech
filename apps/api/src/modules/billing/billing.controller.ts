import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { TenantGuard } from '../auth/guards/tenant.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('subscription')
  @UseGuards(TenantGuard)
  getSubscription(@CurrentUser('tenantId') tenantId: string) {
    return this.billingService.getSubscriptionDetails(tenantId);
  }

  @Post('checkout')
  @UseGuards(TenantGuard)
  createCheckout(
    @CurrentUser('tenantId') tenantId: string,
    @Body() body: { plan: 'STARTER' | 'GROWTH' | 'ENTERPRISE' }
  ) {
    return this.billingService.createCheckoutSession(tenantId, body.plan);
  }

  @Post('portal')
  @UseGuards(TenantGuard)
  createPortal(@CurrentUser('tenantId') tenantId: string) {
    return this.billingService.createPortalSession(tenantId);
  }

  @Post('webhook')
  stripeWebhook(@Body() body: any) {
    return this.billingService.handleStripeWebhook(body);
  }
}
