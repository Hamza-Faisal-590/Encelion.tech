import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { TenantGuard } from '../auth/guards/tenant.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('workflows')
@UseGuards(TenantGuard)
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Post()
  create(
    @CurrentUser('tenantId') tenantId: string,
    @Body() body: { name: string; description?: string; nodes?: any[]; edges?: any[] }
  ) {
    return this.workflowsService.create(tenantId, body);
  }

  @Get()
  findAll(@CurrentUser('tenantId') tenantId: string) {
    return this.workflowsService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.workflowsService.findOne(tenantId, id);
  }

  @Put(':id')
  update(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string; nodes?: any[]; edges?: any[]; isActive?: boolean }
  ) {
    return this.workflowsService.update(tenantId, id, body);
  }

  @Delete(':id')
  remove(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.workflowsService.remove(tenantId, id);
  }

  @Post(':id/execute')
  execute(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() body: { triggerPayload?: Record<string, unknown> }
  ) {
    return this.workflowsService.executeSimulatedRun(tenantId, id, body.triggerPayload || {});
  }
}
