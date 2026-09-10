/* Cinephilic - MySQL Database Connection Pool (backend/db.js) */
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cinephilic_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool = null;

try {
  pool = mysql.createPool(dbConfig);
  console.log(`[MySQL] Configured connection pool for database: ${dbConfig.database} at ${dbConfig.host}:${dbConfig.port}`);
} catch (err) {
  console.error('[MySQL] Error initializing connection pool:', err.message);
}

module.exports = pool;
