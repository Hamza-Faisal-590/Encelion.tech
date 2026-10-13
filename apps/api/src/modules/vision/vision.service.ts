import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@encelion/database';

export type VisionTaskType =
  | 'OCR'
  | 'DOCUMENT_PARSING'
  | 'OBJECT_DETECTION'
  | 'FACE_ANALYSIS'
  | 'DIAGRAM_EXTRACTION'
  | 'VISUAL_QA';

@Injectable()
export class VisionService {
  async processImage(tenantId: string, data: { imageUrl?: string; imageBase64?: string; taskType: VisionTaskType; prompt?: string }) {
    const startTime = Date.now();
    const task = data.taskType || 'OCR';

    // Mock vision AI detection output
    let resultData: Record<string, unknown> = {};

    if (task === 'OCR') {
      resultData = {
        extractedText: 'INVOICE #ENC-2026-9021\nVendor: Encelion Tech Inc.\nTotal Amount: $49,500.00 USD\nDue Date: October 15, 2026',
        confidence: 0.992,
        detectedLanguage: 'en',
        blocks: [
          { text: 'INVOICE #ENC-2026-9021', bbox: [40, 30, 320, 70] },
          { text: 'Vendor: Encelion Tech Inc.', bbox: [40, 90, 410, 130] },
          { text: 'Total Amount: $49,500.00 USD', bbox: [40, 150, 480, 190] },
        ],
      };
    } else if (task === 'DOCUMENT_PARSING') {
      resultData = {
        documentType: 'Commercial Enterprise Contract',
        structuredFields: {
          contractorName: 'Acme Global Corp',
          clientName: 'Encelion Tech',
          effectiveDate: '2026-09-01',
          termMonths: 24,
          annualValueUsd: 120000,
        },
        confidence: 0.978,
      };
    } else if (task === 'OBJECT_DETECTION') {
      resultData = {
        objectCount: 4,
        objects: [
          { label: 'Industrial Server Rack', confidence: 0.96, bbox: [100, 80, 350, 400] },
          { label: 'Cooling Unit', confidence: 0.92, bbox: [380, 120, 520, 380] },
          { label: 'Network Switch', confidence: 0.95, bbox: [120, 150, 320, 210] },
        ],
      };
    } else {
      resultData = {
        taskType: task,
        response: 'Visual inspection completed successfully with zero defects detected.',
        confidence: 0.985,
      };
    }

    const durationMs = Date.now() - startTime + 180;

    const visionJob = await prisma.visionJob.create({
      data: {
        tenantId,
        taskType: task,
        imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        result: resultData as any,
        latencyMs: durationMs,
        status: 'COMPLETED',
      },
    });

    return visionJob;
  }

  async listJobs(tenantId: string) {
    return prisma.visionJob.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async getJob(tenantId: string, id: string) {
    const job = await prisma.visionJob.findFirst({ where: { id, tenantId } });
    if (!job) throw new NotFoundException('Vision job not found');
    return job;
  }
}
