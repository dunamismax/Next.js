import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}
const JWT_SECRET = process.env.JWT_SECRET;
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    const users = await query({
      query: 'SELECT * FROM users WHERE username = ?',
      values: [username],
    });

    if (users.length === 0) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: MAX_AGE,
    });

    const cookie = serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: MAX_AGE,
      path: '/',
    });

    const response = new NextResponse(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    response.headers.set('Set-Cookie', cookie);

    return response;

  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
