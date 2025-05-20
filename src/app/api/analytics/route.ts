import { NextResponse } from 'next/server';
import { fetchAnalytics } from '@/app/lib/data';

export async function GET() {
  const data = await fetchAnalytics();
  return NextResponse.json(data);
}
