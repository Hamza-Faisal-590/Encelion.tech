import jwt from 'jsonwebtoken';

export interface AccessTokenPayload {
  sub: string; // userId
  orgId?: string;
  roles: string[];
  type: 'access';
}

export interface RefreshTokenPayload {
  sub: string;
  family: string;
  type: 'refresh';
}

function getSecret(): string {
  const secret = process.env['JWT_SECRET'];
  if (!secret) throw new Error('JWT_SECRET is not set');
  return secret;
}

export function signAccessToken(payload: Omit<AccessTokenPayload, 'type'>): string {
  return jwt.sign({ ...payload, type: 'access' }, getSecret(), {
    expiresIn: (process.env['JWT_ACCESS_EXPIRES_IN'] ?? '15m') as jwt.SignOptions['expiresIn'],
    issuer: 'encelion.tech',
    audience: 'encelion-api',
  });
}

export function signRefreshToken(payload: Omit<RefreshTokenPayload, 'type'>): string {
  return jwt.sign({ ...payload, type: 'refresh' }, getSecret(), {
    expiresIn: (process.env['JWT_REFRESH_EXPIRES_IN'] ?? '7d') as jwt.SignOptions['expiresIn'],
    issuer: 'encelion.tech',
    audience: 'encelion-api',
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const payload = jwt.verify(token, getSecret(), {
    issuer: 'encelion.tech',
    audience: 'encelion-api',
  });
  if (typeof payload !== 'object' || payload['type'] !== 'access') {
    throw new Error('Invalid token type');
  }
  return payload as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const payload = jwt.verify(token, getSecret(), {
    issuer: 'encelion.tech',
    audience: 'encelion-api',
  });
  if (typeof payload !== 'object' || payload['type'] !== 'refresh') {
    throw new Error('Invalid token type');
  }
  return payload as RefreshTokenPayload;
}

export function decodeToken(token: string): jwt.JwtPayload | null {
  const decoded = jwt.decode(token);
  return typeof decoded === 'object' ? decoded : null;
}
