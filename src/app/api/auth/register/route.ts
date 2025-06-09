import { NextRequest, NextResponse } from 'next/server';
import pool from "@/app/lib/db";
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Semua field harus diisi' }, { status: 400 });
  }

  const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    return NextResponse.json({ message: 'Email sudah terdaftar' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    [name, email, hashedPassword]
  );

  return NextResponse.json({ message: 'Registrasi berhasil' }, { status: 201 });
}
