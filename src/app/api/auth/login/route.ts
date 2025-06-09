import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import { signToken } from '@/app/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    console.log('Login attempt:', { email }); // Debug log
    
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (user.rows.length === 0) {
      return NextResponse.json({ message: 'Email tidak ditemukan' }, { status: 400 });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) {
      return NextResponse.json({ message: 'Password salah' }, { status: 400 });
    }

    const token = signToken({ id: user.rows[0].id, email: user.rows[0].email });

    return NextResponse.json({ token }, { status: 200 });
    
  } catch (error) {
    console.error('Login error:', error); // Debug log
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message: 'Server error: ' + errorMessage }, { status: 500 });
  }
}