import { hashPassword, verifyPassword, signAccessToken, verifyToken } from '../index';

describe('@encelion/auth', () => {
  it('should hash and verify passwords correctly', async () => {
    const password = 'SecretPassword123!';
    const hash = await hashPassword(password);
    expect(hash).not.toEqual(password);

    const isValid = await verifyPassword(password, hash);
    expect(isValid).toBe(true);

    const isInvalid = await verifyPassword('WrongPassword', hash);
    expect(isInvalid).toBe(false);
  });

  it('should sign and verify JWT access tokens', () => {
    const payload = {
      userId: 'usr-123',
      tenantId: 'tenant-456',
      email: 'admin@encelion.tech',
      roles: ['ORG_ADMIN'],
    };

    const secret = 'super-secret-test-key-32-chars-long!!';
    const token = signAccessToken(payload, secret);
    expect(token).toBeDefined();

    const decoded = verifyToken(token, secret);
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.tenantId).toBe(payload.tenantId);
    expect(decoded.email).toBe(payload.email);
  });
});
