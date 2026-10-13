import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { prisma } from '@encelion/database';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'] || request.headers['authorization']?.replace('Bearer ', '');

    if (!apiKey) {
      throw new UnauthorizedException('API key missing');
    }

    const keyRecord = await prisma.apiToken.findFirst({
      where: { tokenPrefix: apiKey },
      include: { tenant: true },
    });

    if (!keyRecord || (keyRecord.expiresAt && keyRecord.expiresAt < new Date())) {
      throw new UnauthorizedException('Invalid or expired API key');
    }

    // Attach tenantId to request object
    request.user = { tenantId: keyRecord.tenantId, keyId: keyRecord.id };
    return true;
  }
}
