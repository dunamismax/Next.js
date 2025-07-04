import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { slugify, parseInternalLinks } from '@/lib/utils';

// GET a single project by slug, including backlinks
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const [projectResults, backlinkResults] = await Promise.all([
      query({
        query: 'SELECT * FROM projects WHERE slug = ?',
        values: [params.slug],
      }),
      query({
        query: `
          SELECT s.title, s.slug, 'post' as type FROM posts s JOIN content_links l ON s.id = l.source_id WHERE l.source_type = 'post' AND l.target_slug = ?
          UNION
          SELECT s.title, s.slug, 'project' as type FROM projects s JOIN content_links l ON s.id = l.source_id WHERE l.source_type = 'project' AND l.target_slug = ?
          UNION
          SELECT s.title, s.slug, 'garden_note' as type FROM garden_notes s JOIN content_links l ON s.id = l.source_id WHERE l.source_type = 'garden_note' AND l.target_slug = ?
        `,
        values: [params.slug, params.slug, params.slug],
      })
    ]);

    if (projectResults.length === 0) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    const project = projectResults[0];
    project.backlinks = backlinkResults;

    return NextResponse.json(project, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

// PUT (update) a project by slug
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { title, description, image_url, project_url, status } = await request.json();
    const newSlug = slugify(title);

    const projectResult = await query({ query: 'SELECT id FROM projects WHERE slug = ?', values: [params.slug] });
    if (projectResult.length === 0) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    const projectId = projectResult[0].id;

    await query({
      query: 'UPDATE projects SET title = ?, slug = ?, description = ?, image_url = ?, project_url = ?, status = ? WHERE id = ?',
      values: [title, newSlug, description, image_url, project_url, status, projectId],
    });

    await query({
      query: 'DELETE FROM content_links WHERE source_id = ? AND source_type = ?',
      values: [projectId, 'project'],
    });

    const linkedSlugs = parseInternalLinks(description);
    if (linkedSlugs.length > 0) {
      const linkValues = linkedSlugs.map(targetSlug => [projectId, 'project', targetSlug]);
      await query({
        query: 'INSERT INTO content_links (source_id, source_type, target_slug) VALUES ?',
        values: [linkValues],
      });
    }

    return NextResponse.json({ id: projectId, title, slug: newSlug, description, image_url, project_url, status }, { status: 200 });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: 'A project with this title already exists.' }, { status: 409 });
    }
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

// DELETE a project by slug
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const projectResult = await query({ query: 'SELECT id FROM projects WHERE slug = ?', values: [params.slug] });
    if (projectResult.length === 0) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    const projectId = projectResult[0].id;

    await query({
      query: 'DELETE FROM content_links WHERE source_id = ? AND source_type = ?',
      values: [projectId, 'project'],
    });

    const result = await query({
      query: 'DELETE FROM projects WHERE id = ?',
      values: [projectId],
    });

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return new Response(null, { status: 204 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}