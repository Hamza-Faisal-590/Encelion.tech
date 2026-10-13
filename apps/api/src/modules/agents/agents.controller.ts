import {
  Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, Request
} from '@nestjs/common';
import { AgentsService } from './agents.service';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Request() req: any, @Body() body: {
    name: string;
    description?: string;
    type?: string;
    config?: Record<string, unknown>;
  }) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.agentsService.create(tenantId, body);
  }

  @Get()
  findAll(@Request() req: any) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.agentsService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.agentsService.findOne(tenantId, id);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() body: {
    name?: string;
    description?: string;
    config?: Record<string, unknown>;
    isPublic?: boolean;
  }) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.agentsService.update(tenantId, id, body);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.agentsService.remove(tenantId, id);
  }

  @Get(':id/embed-code')
  getEmbedCode(@Request() req: any, @Param('id') id: string) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.agentsService.getWidgetEmbedCode(tenantId, id);
  }
}
