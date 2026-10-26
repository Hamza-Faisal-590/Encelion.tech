import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate mime type
    const mimeType = file.type;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(mimeType)) {
      return NextResponse.json({ error: 'Unsupported file type. Please upload a PNG, JPG, WEBP, or SVG image.' }, { status: 400 });
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Clean filename
    const safeName = file.name.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
    const baseFilename = `founder_${Date.now()}_${safeName}`;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // For raster images, convert/resize to WebP for optimal performance
    let publicUrl: string;
    if (mimeType !== 'image/svg+xml') {
      const webpFilename = `${baseFilename}.webp`;
      const webpFilepath = path.join(uploadsDir, webpFilename);
      
      await sharp(buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(webpFilepath);

      // Also save original as png fallback for Founders component
      const pngFilename = `${baseFilename}.png`;
      const pngFilepath = path.join(uploadsDir, pngFilename);
      await sharp(buffer).resize({ width: 800, withoutEnlargement: true }).png({ compressionLevel: 8 }).toFile(pngFilepath);

      publicUrl = `/uploads/${pngFilename}`;
    } else {
      // SVG — save as-is
      const filename = `${baseFilename}.svg`;
      const filepath = path.join(uploadsDir, filename);
      fs.writeFileSync(filepath, buffer);
      publicUrl = `/uploads/${filename}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: path.basename(publicUrl),
      size: file.size,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error?.message || 'Upload failed' }, { status: 500 });
  }
}
