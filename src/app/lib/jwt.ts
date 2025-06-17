import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
  user
  [key: string]: any;
}

export function signToken(payload: TokenPayload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined in environment variables");

  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

export function verifyToken(token: string): TokenPayload | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined in environment variables");

  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (err) {
    console.warn("Token tidak valid atau expired:", err);
    return null;
  }
}
