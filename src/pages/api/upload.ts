import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { prisma } from '../../lib/db'; // Pastikan prisma diimpor dengan benar

export const config = {
  api: {
    bodyParser: false, // Nonaktifkan bodyParser bawaan Next.js untuk menangani file upload
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Endpoint /api/upload called'); // Log untuk memastikan endpoint dipanggil
  console.log('Request method:', req.method); // Log metode HTTP

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ uploadDir: './public/uploads', keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing file:', err);
      return res.status(500).json({ error: 'Error parsing file' });
    }

    const file = files.file as formidable.File;
    const filePath = `/uploads/${path.basename(file.filepath)}`;
    const signatureStatus = 'original'; // Simulasi status tanda tangan

    try {
      // Simpan metadata file ke database
      const upload = await prisma.uploads.create({
        data: {
          fileName: file.originalFilename || 'unknown',
          filePath,
          signatureStatus,
        },
      });

      console.log('File metadata saved:', upload); // Log untuk debugging
      res.status(200).json({
        fileName: upload.fileName,
        filePath: upload.filePath,
        signatureStatus: upload.signatureStatus,
      });
    } catch (error) {
      console.error('Error saving to database:', error); // Log untuk debugging
      res.status(500).json({ error: 'Failed to save file metadata to database' });
    }
  });
}