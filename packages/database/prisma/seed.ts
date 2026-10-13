import { PrismaClient, PlanTier, UserRole, TenantStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Encelion Tech Database...');

  // 1. Create System / Default Tenant
  const systemTenant = await prisma.tenant.upsert({
    where: { slug: 'system' },
    update: {},
    create: {
      name: 'Encelion System Org',
      slug: 'system',
      domain: 'system.encelion.tech',
      status: TenantStatus.ACTIVE,
      planTier: PlanTier.ENTERPRISE,
    },
  });
  console.log(`✅ Tenant created/verified: ${systemTenant.name} (${systemTenant.id})`);

  // 2. Create Super Admin User
  const adminPasswordHash = await bcrypt.hash('EncelionAdmin2026!', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@encelion.tech' },
    update: {},
    create: {
      email: 'admin@encelion.tech',
      passwordHash: adminPasswordHash,
      firstName: 'Encelion',
      lastName: 'Admin',
      isSuperAdmin: true,
      isEmailVerified: true,
    },
  });
  console.log(`✅ Super Admin created: ${adminUser.email}`);

  // Link Admin to System Tenant
  await prisma.tenantUser.upsert({
    where: {
      tenantId_userId: {
        tenantId: systemTenant.id,
        userId: adminUser.id,
      },
    },
    update: { role: UserRole.SUPER_ADMIN },
    create: {
      tenantId: systemTenant.id,
      userId: adminUser.id,
      role: UserRole.SUPER_ADMIN,
    },
  });

  // 3. Create Subscription Plans
  const plans = [
    {
      name: 'Free Starter',
      tier: PlanTier.FREE,
      monthlyTokens: 50000,
      maxAgents: 1,
      maxStorageGb: 1,
      priceMonthly: 0,
      features: ['1 AI Agent', 'Basic RAG Search', 'Community Support'],
    },
    {
      name: 'Professional',
      tier: PlanTier.PRO,
      monthlyTokens: 2000000,
      maxAgents: 10,
      maxStorageGb: 50,
      priceMonthly: 9900,
      features: ['10 AI Agents', 'Hybrid Vector RAG', 'Voice STT/TTS', 'Automation Builder', 'Priority Support'],
    },
    {
      name: 'Enterprise',
      tier: PlanTier.ENTERPRISE,
      monthlyTokens: 50000000,
      maxAgents: 100,
      maxStorageGb: 1000,
      priceMonthly: 49900,
      features: ['Unlimited Agents', '3D Humanoid Integration', 'Custom Fine-Tuning', 'Dedicated SLA', 'Audit Logs'],
    },
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { tier: plan.tier },
      update: plan,
      create: plan,
    });
  }
  console.log('✅ Subscription plans seeded');

  // 4. Create Global Knowledge Base
  const globalKb = await prisma.knowledgeBase.upsert({
    where: { id: 'encelion-global-kb' },
    update: {},
    create: {
      id: 'encelion-global-kb',
      tenantId: systemTenant.id,
      name: 'Encelion Platform Documentation',
      description: 'Global RAG knowledge base for Encelion tech architecture, API specs, and humanoid robotics',
      isGlobal: true,
    },
  });
  console.log(`✅ Global Knowledge Base created: ${globalKb.name}`);

  // 5. System Configuration
  await prisma.systemConfig.upsert({
    where: { key: 'platform_maintenance_mode' },
    update: { value: false },
    create: { key: 'platform_maintenance_mode', value: false },
  });

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
