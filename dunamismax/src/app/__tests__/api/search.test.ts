import { GET } from '@/app/api/search/route';
import { query } from '@/lib/db';

describe('Search API', () => {

  beforeAll(async () => {
    // Clear the tables before all tests
    await query({ query: 'DELETE FROM posts', values: [] });
    await query({ query: 'DELETE FROM projects', values: [] });
    await query({ query: 'DELETE FROM garden_notes', values: [] });

    // Insert test data
    await query({
      query: 'INSERT INTO posts (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Post', 'test-post', 'This is a test post about Next.js.', 'published'],
    });
    await query({
      query: 'INSERT INTO projects (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Project', 'test-project', 'This is a test project about React.', 'published'],
    });
    await query({
        query: 'INSERT INTO garden_notes (title, slug, content, status) VALUES (?, ?, ?, ?)',
        values: ['Test Note', 'test-note', 'This is a test note about TypeScript.', 'published'],
      });
  });

  afterAll(async () => {
    // Clear the tables after all tests
    await query({ query: 'DELETE FROM posts', values: [] });
    await query({ query: 'DELETE FROM projects', values: [] });
    await query({ query: 'DELETE FROM garden_notes', values: [] });
  });

  it('should return search results from all tables', async () => {
    const request = new Request('http://localhost/api/search?q=Test');
    const response = await GET(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.posts.length).toBe(1);
    expect(data.projects.length).toBe(1);
    expect(data.garden_notes.length).toBe(1);
  });

  it('should return search results from a specific table', async () => {
    const request = new Request('http://localhost/api/search?q=Next.js');
    const response = await GET(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.posts.length).toBe(1);
    expect(data.projects.length).toBe(0);
    expect(data.garden_notes.length).toBe(0);
  });
});
