import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export interface TOTPSetup {
  secret: string;
  qrCodeDataUrl: string;
  backupCodes: string[];
  otpauthUrl: string;
}

/**
 * Generate a new TOTP secret + QR code for 2FA enrollment.
 */
export async function generateTOTPSetup(
  email: string,
  issuer = 'Encelion',
): Promise<TOTPSetup> {
  const secret = speakeasy.generateSecret({
    name: `${issuer} (${email})`,
    issuer,
    length: 32,
  });

  const otpauthUrl = secret.otpauth_url ?? '';
  const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);

  // Generate 8 one-time backup codes
  const backupCodes = Array.from({ length: 8 }, () =>
    Math.random().toString(36).slice(2, 10).toUpperCase(),
  );

  return {
    secret: secret.base32,
    qrCodeDataUrl,
    backupCodes,
    otpauthUrl,
  };
}

/**
 * Verify a TOTP code against a stored secret.
 * Window of 1 allows for 30-second clock drift.
 */
export function verifyTOTP(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1,
  });
}
