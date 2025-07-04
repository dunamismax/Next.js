import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { slugify, parseInternalLinks } from '@/lib/utils';

// GET all projects
export async function GET() {
  try {
    const results = await query({
      query: 'SELECT id, title, slug, status, created_at, updated_at FROM projects ORDER BY updated_at DESC',
      values: [],
    });
    return NextResponse.json(results, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

// POST a new project
export async function POST(request: Request) {
  try {
    const { title, description, image_url, project_url, status } = await request.json();
    const slug = slugify(title);

    const result = await query({
      query: 'INSERT INTO projects (title, slug, description, image_url, project_url, status) VALUES (?, ?, ?, ?, ?, ?)',
      values: [title, slug, description, image_url, project_url, status || 'draft'],
    });
    const projectId = result.insertId;

    const linkedSlugs = parseInternalLinks(description);
    if (linkedSlugs.length > 0) {
      const linkValues = linkedSlugs.map(targetSlug => [projectId, 'project', targetSlug]);
      await query({
        query: 'INSERT INTO content_links (source_id, source_type, target_slug) VALUES ?',
        values: [linkValues],
      });
    }

    return NextResponse.json({ id: projectId, title, slug, description, image_url, project_url, status }, { status: 201 });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: 'A project with this title already exists.' }, { status: 409 });
    }
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
