import { payload } from 'payload';
import { NextRequest, NextResponse } from 'next/server';

async function handler(req: NextRequest): Promise<NextResponse> {
  const response = await payload.handle({
    req,
    res: new NextResponse(),
  });

  return response;
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
