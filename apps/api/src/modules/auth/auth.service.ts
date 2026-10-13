import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { hashPassword, verifyPassword, signAccessToken, signRefreshToken, verifyToken } from '@encelion/auth';
import { RegisterDto, LoginDto, RefreshTokenDto } from '@encelion/validation';
import { prisma } from '@encelion/database';

@Injectable()
export class AuthService {
  async register(dto: RegisterDto) {
    const existing = await prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await hashPassword(dto.password);

    // Create Tenant & User transactionally
    const slug = (dto.organizationName || dto.email.split('@')[0])
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');

    let tenant = await prisma.tenant.findUnique({ where: { slug } });
    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: {
          name: dto.organizationName || `${dto.name || 'User'}'s Org`,
          slug: `${slug}-${Math.floor(Math.random() * 10000)}`,
        },
      });
    }

    const user = await prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.name,
      },
    });

    await prisma.tenantUser.create({
      data: {
        tenantId: tenant.id,
        userId: user.id,
        role: 'ORG_ADMIN',
      },
    });

    const accessToken = signAccessToken({
      sub: user.id,
      orgId: tenant.id,
      roles: ['ORG_ADMIN'],
    });

    const refreshToken = signRefreshToken({
      sub: user.id,
      family: user.id,
    });

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: await hashPassword(refreshToken),
        family: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      },
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
      },
      accessToken,
      refreshToken,
    };
  }

  async login(dto: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: dto.email },
      include: { tenants: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValid = await verifyPassword(dto.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tenantUser = user.tenants[0];
    const roles = user.isSuperAdmin ? ['SUPER_ADMIN'] : tenantUser ? [tenantUser.role] : ['END_USER'];
    const orgId = tenantUser?.tenantId;

    const accessToken = signAccessToken({
      sub: user.id,
      orgId,
      roles,
    });

    const refreshToken = signRefreshToken({
      sub: user.id,
      family: user.id,
    });

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: await hashPassword(refreshToken),
        family: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isSuperAdmin: user.isSuperAdmin,
      },
      orgId,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload = verifyToken(dto.refreshToken, process.env['JWT_REFRESH_SECRET'] || 'refresh_secret') as any;
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
        include: { tenants: true },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tenantUser = user.tenants[0];
      const roles = user.isSuperAdmin ? ['SUPER_ADMIN'] : tenantUser ? [tenantUser.role] : ['END_USER'];
      const orgId = tenantUser?.tenantId;

      const newAccessToken = signAccessToken({
        sub: user.id,
        orgId,
        roles,
      });

      const newRefreshToken = signRefreshToken({
        sub: user.id,
        family: user.id,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
