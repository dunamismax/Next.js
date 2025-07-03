
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const string = uuidv4();
  return NextResponse.json({ string });
}
