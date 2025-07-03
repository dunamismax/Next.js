
import { NextResponse } from 'next/server';

export async function GET() {
  const string = Math.random().toString(36).substring(7);
  return NextResponse.json({ string });
}
