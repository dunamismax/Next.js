import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    // Clear the invalid cookie
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('auth_token', '', { maxAge: -1 }); 
    return response;
  }
}

export const config = {
  matcher: '/admin/:path*',
};
