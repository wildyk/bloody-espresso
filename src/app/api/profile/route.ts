import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/app/lib/db";

export async function GET(req: NextRequest) {
  let token: string | undefined;

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    token = auth.split(" ")[1];
  } else {
    const cookie = req.cookies.get("token");
    token = cookie?.value;
  }

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = typeof decoded === "object" && "id" in decoded ? decoded.id : null;

    if (!userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const result = await pool.query("SELECT name, email FROM users WHERE id = $1", [userId]);
    return NextResponse.json(result.rows[0] || {});
  } catch (err) {
    console.error("Token error:", err);
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  let token: string | undefined;

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    token = auth.split(" ")[1];
  } else {
    const cookie = req.cookies.get("token");
    token = cookie?.value;
  }

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = typeof decoded === "object" && "id" in decoded ? decoded.id : null;

    if (!userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const { name, email } = await req.json();
    await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [
      name,
      email,
      userId,
    ]);

    return NextResponse.json({ message: "Profil diperbarui" });
  } catch (err) {
    console.error("PUT profile error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
