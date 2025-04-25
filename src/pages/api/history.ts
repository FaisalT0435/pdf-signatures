import { PrismaClient } from '@prisma/client';
import AWS from 'aws-sdk';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Konfigurasi AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch upload history from Prisma
    const uploads = await prisma.uploads.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Fetch file URLs from S3
    const uploadsWithUrls = await Promise.all(
      uploads.map(async (upload) => {
        const url = s3.getSignedUrl('getObject', {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: upload.fileKey, // Assuming `fileKey` is stored in your database
          Expires: 60 * 60, // URL valid for 1 hour
        });
        return { ...upload, fileUrl: url };
      })
    );

    res.status(200).json(uploadsWithUrls);
  } catch (error) {
    console.error('Error fetching upload history:', error);
    res.status(500).json({ error: 'Failed to fetch upload history' });
  }
}