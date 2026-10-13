import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

let _s3Client: S3Client | null = null;

export function getStorageClient(): S3Client {
  if (!_s3Client) {
    const endpoint = process.env['R2_ENDPOINT'] || process.env['S3_ENDPOINT'];
    const accessKeyId = process.env['R2_ACCESS_KEY_ID'] || process.env['AWS_ACCESS_KEY_ID'] || '';
    const secretAccessKey = process.env['R2_SECRET_ACCESS_KEY'] || process.env['AWS_SECRET_ACCESS_KEY'] || '';
    
    _s3Client = new S3Client({
      region: 'auto',
      endpoint: endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
  return _s3Client;
}

export async function uploadFile(
  bucket: string,
  key: string,
  body: Buffer | Uint8Array | string,
  contentType: string
): Promise<string> {
  const client = getStorageClient();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  const publicUrl = process.env['STORAGE_PUBLIC_URL'] || '';
  return publicUrl ? `${publicUrl}/${key}` : key;
}

export async function getPresignedUploadUrl(
  bucket: string,
  key: string,
  contentType: string,
  expiresInSeconds = 3600
): Promise<string> {
  const client = getStorageClient();
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

export async function deleteFile(bucket: string, key: string): Promise<void> {
  const client = getStorageClient();
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );
}
