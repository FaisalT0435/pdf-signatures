import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST, // Endpoint RDS
  user: process.env.DB_USER, // Username RDS
  password: process.env.DB_PASS, // Password RDS
  database: process.env.DB_NAME, // Nama database
  waitForConnections: true,
  connectionLimit: 10, // Jumlah koneksi maksimum
  queueLimit: 0,
});