import { SetMetadata } from '@nestjs/common';
import { RoleName } from '@encelion/types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: (RoleName | string)[]) => SetMetadata(ROLES_KEY, roles);
