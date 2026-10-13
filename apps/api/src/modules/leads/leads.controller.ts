import {
  Controller, Get, Post, Patch, Body, Param, Query, HttpCode, HttpStatus, Request
} from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  capture(@Request() req: any, @Body() body: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    agentSessionId?: string;
    intentScore?: number;
    customData?: Record<string, unknown>;
  }) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.leadsService.capture(tenantId, body);
  }

  @Get()
  list(@Request() req: any, @Query('status') status?: string) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.leadsService.list(tenantId, status);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.leadsService.findOne(tenantId, id);
  }

  @Patch(':id/status')
  updateStatus(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: { status: string; notes?: string }
  ) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.leadsService.updateStatus(tenantId, id, body.status, body.notes);
  }
}
