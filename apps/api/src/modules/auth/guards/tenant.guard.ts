import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const tenantIdHeader = request.headers['x-tenant-id'] || request.query.tenantId;

    if (!user) {
      throw new ForbiddenException('User authentication required');
    }

    if (user.roles?.includes('SUPER_ADMIN')) {
      request.tenantId = tenantIdHeader || user.orgId;
      return true;
    }

    if (tenantIdHeader && tenantIdHeader !== user.orgId) {
      throw new ForbiddenException('Tenant isolation violation: Access denied to tenant');
    }

    request.tenantId = user.orgId;
    return true;
  }
}
