import { GET, POST } from '@/app/api/projects/route';
import { GET as GET_BY_SLUG, PUT, DELETE } from '@/app/api/projects/[slug]/route';
import { query } from '@/lib/db';

describe('Projects API', () => {

  beforeAll(async () => {
    // Clear the projects table before all tests
    await query({ query: 'DELETE FROM projects', values: [] });
  });

  afterEach(async () => {
    // Clear the projects table after each test
    await query({ query: 'DELETE FROM projects', values: [] });
  });

  it('should create a new project', async () => {
    const request = new Request('http://localhost/api/projects', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test Project', content: 'This is a test project.', status: 'published' }),
    });
    const response = await POST(request);
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.title).toBe('Test Project');
  });

  it('should fetch all projects', async () => {
    // First, create a project to fetch
    await query({
      query: 'INSERT INTO projects (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Project', 'test-project', 'This is a test project.', 'published'],
    });

    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.length).toBe(1);
    expect(data[0].title).toBe('Test Project');
  });

  it('should fetch a single project by slug', async () => {
    await query({
      query: 'INSERT INTO projects (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Project', 'test-project', 'This is a test project.', 'published'],
    });

    const response = await GET_BY_SLUG(new Request('http://localhost'), { params: { slug: 'test-project' } });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.title).toBe('Test Project');
  });

  it('should update a project', async () => {
    await query({
      query: 'INSERT INTO projects (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Project', 'test-project', 'This is a test project.', 'published'],
    });

    const request = new Request('http://localhost', {
      method: 'PUT',
      body: JSON.stringify({ title: 'Updated Project', content: 'Updated content.', status: 'draft' }),
    });
    const response = await PUT(request, { params: { slug: 'test-project' } });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.title).toBe('Updated Project');
    expect(data.slug).toBe('updated-project');
  });

  it('should delete a project', async () => {
    await query({
      query: 'INSERT INTO projects (title, slug, content, status) VALUES (?, ?, ?, ?)',
      values: ['Test Project', 'test-project', 'This is a test project.', 'published'],
    });

    const response = await DELETE(new Request('http://localhost'), { params: { slug: 'test-project' } });
    expect(response.status).toBe(204);

    const result = await query({ query: 'SELECT * FROM projects WHERE slug = ?', values: ['test-project'] });
    expect(result.length).toBe(0);
  });
});
