import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { VisionService, VisionTaskType } from './vision.service';
import { TenantGuard } from '../auth/guards/tenant.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('vision')
@UseGuards(TenantGuard)
export class VisionController {
  constructor(private readonly visionService: VisionService) {}

  @Post('analyze')
  analyze(
    @CurrentUser('tenantId') tenantId: string,
    @Body() body: { imageUrl?: string; imageBase64?: string; taskType: VisionTaskType; prompt?: string }
  ) {
    return this.visionService.processImage(tenantId, body);
  }

  @Get('jobs')
  listJobs(@CurrentUser('tenantId') tenantId: string) {
    return this.visionService.listJobs(tenantId);
  }

  @Get('jobs/:id')
  getJob(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.visionService.getJob(tenantId, id);
  }
}
