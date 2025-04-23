import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [rows] = await pool.query('SELECT * FROM uploads ORDER BY id DESC');
  res.status(200).json(rows);
}
