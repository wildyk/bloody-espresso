import { Pool } from 'pg'; // Import Pool dari pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Wajib false untuk Neon!
  },
});

export default pool;
