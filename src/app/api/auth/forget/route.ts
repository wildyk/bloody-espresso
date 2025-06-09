import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (user.rows.length === 0) {
    return NextResponse.json({ message: 'Email tidak ditemukan' }, { status: 400 });
  }

  return NextResponse.json({ message: 'Link reset telah dikirim ke email (dummy)' }, { status: 200 });
}
