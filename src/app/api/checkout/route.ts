import pool from '@/lib/types/pg';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW()');
    return NextResponse.json({ time: result.rows[0] }); // Gunakan NextResponse, bukan Response
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 }); // Tangkap error dengan NextResponse
  } finally {
    client.release();
  }
}
