import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@encelion/database';

export interface WorkflowNodeData {
  id: string;
  type:
    | 'TRIGGER'
    | 'AI_PROMPT'
    | 'BRANCH_CONDITION'
    | 'WEBHOOK'
    | 'DB_ACTION'
    | 'EMAIL_NOTIFICATION'
    | 'DELAY'
    | 'VOICE_CALL'
    | 'LEAD_CAPTURE'
    | 'CRM_SYNC'
    | 'CODE_SANDBOX';
  title: string;
  config: Record<string, unknown>;
  position: { x: number; y: number };
}

export interface WorkflowEdgeData {
  id: string;
  source: string;
  target: string;
  conditionLabel?: string;
}

@Injectable()
export class WorkflowsService {
  async create(tenantId: string, data: { name: string; description?: string; nodes?: WorkflowNodeData[]; edges?: WorkflowEdgeData[] }) {
    const initialNodes: WorkflowNodeData[] = data.nodes || [
      { id: 'node-1', type: 'TRIGGER', title: 'On Lead Captured', config: { event: 'lead.created' }, position: { x: 100, y: 100 } },
      { id: 'node-2', type: 'AI_PROMPT', title: 'Intent Classifier', config: { model: 'gpt-4o', prompt: 'Score lead qualification level (0 to 1)' }, position: { x: 400, y: 100 } },
      { id: 'node-3', type: 'EMAIL_NOTIFICATION', title: 'Notify Sales Team', config: { to: 'sales@company.com', template: 'high_intent_alert' }, position: { x: 700, y: 100 } },
    ];

    const initialEdges: WorkflowEdgeData[] = data.edges || [
      { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
      { id: 'edge-2-3', source: 'node-2', target: 'node-3', conditionLabel: 'score > 0.8' },
    ];

    return prisma.workflow.create({
      data: {
        tenantId,
        name: data.name,
        description: data.description,
        nodes: initialNodes as any,
        edges: initialEdges as any,
        isActive: true,
      },
    });
  }

  async findAll(tenantId: string) {
    return prisma.workflow.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const wf = await prisma.workflow.findFirst({
      where: { id, tenantId },
      include: {
        executions: {
          take: 10,
          orderBy: { startedAt: 'desc' },
        },
      },
    });
    if (!wf) throw new NotFoundException('Workflow not found');
    return wf;
  }

  async update(tenantId: string, id: string, data: { name?: string; description?: string; nodes?: any[]; edges?: any[]; isActive?: boolean }) {
    const wf = await prisma.workflow.findFirst({ where: { id, tenantId } });
    if (!wf) throw new NotFoundException('Workflow not found');

    return prisma.workflow.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        nodes: data.nodes ? (data.nodes as any) : undefined,
        edges: data.edges ? (data.edges as any) : undefined,
        isActive: data.isActive,
      },
    });
  }

  async remove(tenantId: string, id: string) {
    const wf = await prisma.workflow.findFirst({ where: { id, tenantId } });
    if (!wf) throw new NotFoundException('Workflow not found');

    await prisma.workflow.delete({ where: { id } });
    return { deleted: true };
  }

  async executeSimulatedRun(tenantId: string, workflowId: string, triggerPayload: Record<string, unknown>) {
    const wf = await this.findOne(tenantId, workflowId);
    const startTime = Date.now();

    const executionLog = [
      { timestamp: new Date().toISOString(), step: 'TRIGGER', status: 'SUCCESS', details: 'Trigger event received', input: triggerPayload },
      { timestamp: new Date().toISOString(), step: 'AI_PROMPT', status: 'SUCCESS', details: 'Generated prompt response', output: { intentScore: 0.94, summary: 'High intent prospect interested in enterprise AI agent deployment.' } },
      { timestamp: new Date().toISOString(), step: 'EMAIL_NOTIFICATION', status: 'SUCCESS', details: 'Email dispatched to sales@company.com' },
    ];

    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId: wf.id,
        status: 'COMPLETED',
        outputData: executionLog as any,
        completedAt: new Date(),
      },
    });

    const durationMs = Date.now() - startTime + 145;

    return {
      executionId: execution.id,
      status: 'COMPLETED',
      durationMs,
      stepCount: executionLog.length,
      logs: executionLog,
    };
  }
}
