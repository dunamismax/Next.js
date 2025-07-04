import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { slugify, parseInternalLinks } from '@/lib/utils';

// GET a single garden note by slug, including backlinks
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const [noteResults, backlinkResults] = await Promise.all([
      query({
        query: 'SELECT * FROM garden_notes WHERE slug = ?',
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

    if (noteResults.length === 0) {
      return NextResponse.json({ message: 'Garden note not found' }, { status: 404 });
    }

    const note = noteResults[0];
    note.backlinks = backlinkResults;

    return NextResponse.json(note, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

// PUT (update) a garden note by slug
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { title, content } = await request.json();
    const newSlug = slugify(title);

    const noteResult = await query({ query: 'SELECT id FROM garden_notes WHERE slug = ?', values: [params.slug] });
    if (noteResult.length === 0) {
      return NextResponse.json({ message: 'Garden note not found' }, { status: 404 });
    }
    const noteId = noteResult[0].id;

    await query({
      query: 'UPDATE garden_notes SET title = ?, slug = ?, content = ? WHERE id = ?',
      values: [title, newSlug, content, noteId],
    });

    await query({
      query: 'DELETE FROM content_links WHERE source_id = ? AND source_type = ?',
      values: [noteId, 'garden_note'],
    });

    const linkedSlugs = parseInternalLinks(content);
    if (linkedSlugs.length > 0) {
      const linkValues = linkedSlugs.map(targetSlug => [noteId, 'garden_note', targetSlug]);
      await query({
        query: 'INSERT INTO content_links (source_id, source_type, target_slug) VALUES ?',
        values: [linkValues],
      });
    }

    return NextResponse.json({ id: noteId, title, slug: newSlug, content }, { status: 200 });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: 'A garden note with this title already exists.' }, { status: 409 });
    }
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

// DELETE a garden note by slug
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const noteResult = await query({ query: 'SELECT id FROM garden_notes WHERE slug = ?', values: [params.slug] });
    if (noteResult.length === 0) {
      return NextResponse.json({ message: 'Garden note not found' }, { status: 404 });
    }
    const noteId = noteResult[0].id;

    await query({
      query: 'DELETE FROM content_links WHERE source_id = ? AND source_type = ?',
      values: [noteId, 'garden_note'],
    });

    const result = await query({
      query: 'DELETE FROM garden_notes WHERE id = ?',
      values: [noteId],
    });

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Garden note not found' }, { status: 404 });
    }
    return new Response(null, { status: 204 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
