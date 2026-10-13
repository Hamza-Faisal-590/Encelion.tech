import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { prisma } from '@encelion/database';

@Injectable()
export class AgentsService {
  async create(tenantId: string, data: {
    name: string;
    description?: string;
    type?: string;
    config?: Record<string, unknown>;
  }) {
    return prisma.agent.create({
      data: {
        tenantId,
        name: data.name,
        description: data.description,
        type: (data.type as any) || 'CUSTOMER_SUPPORT',
        config: (data.config as any) || {},
      },
    });
  }

  async findAll(tenantId: string) {
    return prisma.agent.findMany({
      where: { tenantId },
      include: {
        _count: { select: { sessions: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const agent = await prisma.agent.findFirst({
      where: { id, tenantId },
      include: {
        sessions: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        promptVersions: {
          where: { isCurrent: true },
          take: 1,
        },
      },
    });
    if (!agent) throw new NotFoundException('Agent not found');
    return agent;
  }

  async update(tenantId: string, id: string, data: {
    name?: string;
    description?: string;
    config?: Record<string, unknown>;
    isPublic?: boolean;
  }) {
    const agent = await prisma.agent.findFirst({ where: { id, tenantId } });
    if (!agent) throw new NotFoundException('Agent not found');
    return prisma.agent.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        config: data.config as any,
        isPublic: data.isPublic,
      },
    });
  }

  async remove(tenantId: string, id: string) {
    const agent = await prisma.agent.findFirst({ where: { id, tenantId } });
    if (!agent) throw new NotFoundException('Agent not found');
    await prisma.agent.delete({ where: { id } });
    return { deleted: true };
  }

  async getWidgetEmbedCode(tenantId: string, agentId: string) {
    const agent = await prisma.agent.findFirst({ where: { id: agentId, tenantId } });
    if (!agent) throw new NotFoundException('Agent not found');

    const embedCode = `<!-- Encelion AI Widget -->
<script>
  window.EncelionConfig = {
    agentId: "${agentId}",
    tenantId: "${tenantId}",
    theme: "dark",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.encelion.tech/widget.js" async defer></script>`;

    return { agentId, embedCode };
  }
}
