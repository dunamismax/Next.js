import { POST } from '@/app/api/auth/login/route';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

describe('Auth API', () => {
  beforeAll(async () => {
    // Clear the users table and insert a test user
    await query({ query: 'DELETE FROM users', values: [] });
    const hashedPassword = await bcrypt.hash('password123', 10);
    await query({
      query: 'INSERT INTO users (username, password) VALUES (?, ?)',
      values: ['testuser', hashedPassword],
    });
  });

  afterAll(async () => {
    // Clear the users table after all tests
    await query({ query: 'DELETE FROM users', values: [] });
  });

  it('should return a 401 for invalid credentials', async () => {
    const request = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'testuser', password: 'wrongpassword' }),
    });
    const response = await POST(request);
    expect(response.status).toBe(401);
  });
});
