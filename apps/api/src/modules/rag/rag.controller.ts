import {
  Controller, Get, Post, Delete, Body, Param, Query, HttpCode, HttpStatus, Request
} from '@nestjs/common';
import { RagService } from './rag.service';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  // ── Knowledge Bases ─────────────────────────────────────────────────────────

  @Post('knowledge-bases')
  @HttpCode(HttpStatus.CREATED)
  async createKB(@Request() req: any, @Body() body: { name: string; description?: string }) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.ragService.createKnowledgeBase(tenantId, body);
  }

  @Get('knowledge-bases')
  async listKBs(@Request() req: any) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.ragService.listKnowledgeBases(tenantId);
  }

  @Get('knowledge-bases/:id')
  async getKB(@Request() req: any, @Param('id') id: string) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.ragService.getKnowledgeBase(tenantId, id);
  }

  @Delete('knowledge-bases/:id')
  async deleteKB(@Request() req: any, @Param('id') id: string) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.ragService.deleteKnowledgeBase(tenantId, id);
  }

  // ── Document Ingestion ──────────────────────────────────────────────────────

  @Post('knowledge-bases/:kbId/ingest')
  @HttpCode(HttpStatus.CREATED)
  async ingest(
    @Request() req: any,
    @Param('kbId') kbId: string,
    @Body() body: { title: string; content: string; mimeType?: string; sourceUrl?: string }
  ) {
    const tenantId = req.tenantId || req.user?.orgId;
    return this.ragService.ingestDocument(tenantId, kbId, body);
  }

  // ── Retrieval ───────────────────────────────────────────────────────────────

  @Get('retrieve')
  async retrieve(
    @Request() req: any,
    @Query('q') query: string,
    @Query('kbIds') kbIds: string,
    @Query('topK') topK: string
  ) {
    const tenantId = req.tenantId || req.user?.orgId;
    const kbIdArray = kbIds ? kbIds.split(',') : [];
    return this.ragService.retrieve(tenantId, query, kbIdArray, topK ? parseInt(topK, 10) : 5);
  }
}
