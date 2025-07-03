
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { text } = await request.json();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const characterCount = text.length;
  return NextResponse.json({ wordCount, characterCount });
}
