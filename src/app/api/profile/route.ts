import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/app/lib/db';

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const token = auth?.split(" ")[1];

  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  const userId = typeof decoded === 'object' && decoded !== null && 'id' in decoded ? (decoded as { id: string }).id : null;
  if (!userId) return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  const user = await pool.query("SELECT name, email FROM users WHERE id = $1", [userId]);

  return NextResponse.json(user.rows[0]);
}

export async function PUT(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const token = auth?.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  const userId = typeof decoded === 'object' && decoded !== null && 'id' in decoded ? (decoded as { id: string }).id : null;
  if (!userId) return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  const { name, email } = await req.json();

  await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [name, email, userId]);
  return NextResponse.json({ message: "Profil diperbarui" });
}
