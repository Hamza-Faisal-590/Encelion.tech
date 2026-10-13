import { RoleName } from '@encelion/types';

// ─────────────────────────────────────────────────────────────────────────────
// RBAC permission matrix
// Each role has a set of resource:action permissions.
// ─────────────────────────────────────────────────────────────────────────────

type Permission = `${string}:${string}`;

const ROLE_PERMISSIONS: Record<RoleName, Permission[]> = {
  [RoleName.SUPER_ADMIN]: ['*:*'], // all permissions
  [RoleName.ADMIN]: [
    'organization:read', 'organization:update',
    'user:read', 'user:update', 'user:invite',
    'agent:*', 'knowledge:*', 'lead:*', 'project:*',
    'workflow:*', 'analytics:read', 'billing:read',
    'support:*', 'audit:read', 'api-key:*', 'webhook:*',
  ],
  [RoleName.MANAGER]: [
    'organization:read',
    'user:read', 'user:invite',
    'agent:read', 'agent:update',
    'knowledge:*', 'lead:*', 'project:*',
    'workflow:read', 'workflow:update',
    'analytics:read', 'support:*',
  ],
  [RoleName.SALES]: [
    'lead:*', 'project:read', 'analytics:read', 'support:read',
  ],
  [RoleName.ENGINEER]: [
    'agent:read', 'knowledge:read', 'project:*', 'workflow:read',
    'vision:*',
  ],
  [RoleName.AI_ENGINEER]: [
    'agent:*', 'knowledge:*', 'workflow:*', 'vision:*', 'analytics:read',
  ],
  [RoleName.SUPPORT]: [
    'lead:read', 'project:read', 'support:*',
  ],
  [RoleName.CONTENT_MANAGER]: [
    'knowledge:*', 'blog:*', 'case-study:*',
  ],
  [RoleName.CUSTOMER_ADMIN]: [
    'organization:read', 'organization:update',
    'user:read', 'user:invite',
    'agent:*', 'knowledge:*', 'workflow:*',
    'billing:*', 'analytics:read', 'support:*',
    'api-key:*', 'webhook:*',
  ],
  [RoleName.CUSTOMER]: [
    'agent:read', 'knowledge:read',
    'project:read', 'analytics:read',
    'support:create', 'billing:read',
  ],
};

/**
 * Returns true if any of the given roles grants the requested permission.
 * Supports wildcard: '*:*' grants everything; 'resource:*' grants all actions on a resource.
 */
export function hasPermission(
  roles: RoleName[],
  resource: string,
  action: string,
): boolean {
  for (const role of roles) {
    const perms = ROLE_PERMISSIONS[role] ?? [];
    for (const perm of perms) {
      if (perm === '*:*') return true;
      const [r, a] = perm.split(':') as [string, string];
      if (r === resource && (a === '*' || a === action)) return true;
    }
  }
  return false;
}

/**
 * Returns true if the roles array includes SUPER_ADMIN.
 */
export function isSuperAdmin(roles: RoleName[]): boolean {
  return roles.includes(RoleName.SUPER_ADMIN);
}

export { ROLE_PERMISSIONS };
