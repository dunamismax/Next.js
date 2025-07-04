import { GET, POST } from '@/app/api/garden-notes/route';
import { GET as GET_BY_SLUG, PUT, DELETE } from '@/app/api/garden-notes/[slug]/route';
import { query } from '@/lib/db';

describe('Garden Notes API', () => {

  beforeAll(async () => {
    // Clear the garden_notes table before all tests
    await query({ query: 'DELETE FROM garden_notes', values: [] });
  });

  afterEach(async () => {
    // Clear the garden_notes table after each test
    await query({ query: 'DELETE FROM garden_notes', values: [] });
  });

  it('should create a new garden note', async () => {
    const request = new Request('http://localhost/api/garden-notes', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test Note', content: 'This is a test note.', status: 'published' }),
    });
    const response = await POST(request);
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.title).toBe('Test Note');
  });

  it('should fetch all garden notes', async () => {
    // First, create a note to fetch
    await query({
      query: 'INSERT INTO garden_notes (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Note', 'test-note', 'This is a test note.', 'published'],
    });

    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.length).toBe(1);
    expect(data[0].title).toBe('Test Note');
  });

  it('should fetch a single garden note by slug', async () => {
    await query({
      query: 'INSERT INTO garden_notes (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Note', 'test-note', 'This is a test note.', 'published'],
    });

    const response = await GET_BY_SLUG(new Request('http://localhost'), { params: { slug: 'test-note' } });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.title).toBe('Test Note');
  });

  it('should update a garden note', async () => {
    await query({
      query: 'INSERT INTO garden_notes (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Note', 'test-note', 'This is a test note.', 'published'],
    });

    const request = new Request('http://localhost', {
      method: 'PUT',
      body: JSON.stringify({ title: 'Updated Note', content: 'Updated content.', status: 'draft' }),
    });
    const response = await PUT(request, { params: { slug: 'test-note' } });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.title).toBe('Updated Note');
    expect(data.slug).toBe('updated-note');
  });

  it('should delete a garden note', async () => {
    await query({
      query: 'INSERT INTO garden_notes (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Note', 'test-note', 'This is a test note.', 'published'],
    });

    const response = await DELETE(new Request('http://localhost'), { params: { slug: 'test-note' } });
    expect(response.status).toBe(204);

    const result = await query({ query: 'SELECT * FROM garden_notes WHERE slug = ?', values: ['test-note'] });
    expect(result.length).toBe(0);
  });
});
