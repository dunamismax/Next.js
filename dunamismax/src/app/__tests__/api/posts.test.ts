import { GET, POST } from '@/app/api/posts/route';
import { GET as GET_BY_SLUG, PUT, DELETE } from '@/app/api/posts/[slug]/route';
import { query } from '@/lib/db';

describe('Posts API', () => {

  beforeAll(async () => {
    // Clear the posts table before all tests
    await query({ query: 'DELETE FROM posts', values: [] });
  });

  afterEach(async () => {
    // Clear the posts table after each test
    await query({ query: 'DELETE FROM posts', values: [] });
  });

  it('should create a new post', async () => {
    const request = new Request('http://localhost/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test Post', content: 'This is a test post.', status: 'published' }),
    });
    const response = await POST(request);
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.title).toBe('Test Post');
  });

  it('should fetch all posts', async () => {
    // First, create a post to fetch
    await query({
      query: 'INSERT INTO posts (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Post', 'test-post', 'This is a test post.', 'published'],
    });

    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.length).toBe(1);
    expect(data[0].title).toBe('Test Post');
  });

  it('should fetch a single post by slug', async () => {
    await query({
      query: 'INSERT INTO posts (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Post', 'test-post', 'This is a test post.', 'published'],
    });

    const response = await GET_BY_SLUG(new Request('http://localhost'), { params: { slug: 'test-post' } });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.title).toBe('Test Post');
  });

  it('should update a post', async () => {
    await query({
      query: 'INSERT INTO posts (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Post', 'test-post', 'This is a test post.', 'published'],
    });

    const request = new Request('http://localhost', {
      method: 'PUT',
      body: JSON.stringify({ title: 'Updated Post', content: 'Updated content.', status: 'draft' }),
    });
    const response = await PUT(request, { params: { slug: 'test-post' } });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.title).toBe('Updated Post');
    expect(data.slug).toBe('updated-post');
  });

  it('should delete a post', async () => {
    await query({
      query: 'INSERT INTO posts (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Post', 'test-post', 'This is a test post.', 'published'],
    });

    const response = await DELETE(new Request('http://localhost'), { params: { slug: 'test-post' } });
    expect(response.status).toBe(204);

    const result = await query({ query: 'SELECT * FROM posts WHERE slug = ?', values: ['test-post'] });
    expect(result.length).toBe(0);
  });
});
