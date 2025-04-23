import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { pool } from '@/lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err || !files.pdf || Array.isArray(files.pdf)) {
      return res.status(400).json({ error: 'Invalid file upload' });
    }

    const pdfPath = files.pdf.filepath;
    const fileBuffer = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(fileBuffer);

    const hasSignature = pdfDoc.getForm() ? 1 : 0;
    const pages = pdfDoc.getPages();
    const lastPage = pages[pages.length - 1];

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const message = hasSignature
      ? 'Result : Pdf originall Signature'
      : 'Result : Pdf Edited Signature';

    lastPage.drawText(`${message} by PDF Checker`, {
      x: 50,
      y: 20,
      size: 10,
      font,
      color: rgb(0.67, 0.65, 0.68),
    });

    const finalPdf = await pdfDoc.save();

    await pool.query('INSERT INTO uploads (filename, has_signature) VALUES (?, ?)', [
      files.pdf.originalFilename,
      hasSignature,
    ]);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${files.pdf.originalFilename}"`);
    res.end(finalPdf);
  });
}
