import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { slugify, parseInternalLinks } from '@/lib/utils';

// GET all garden notes
export async function GET() {
  try {
    const results = await query({
      query: 'SELECT id, title, slug, created_at, updated_at FROM garden_notes ORDER BY updated_at DESC',
      values: [],
    });
    return NextResponse.json(results, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

// POST a new garden note
export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const slug = slugify(title);

    const result = await query({
      query: 'INSERT INTO garden_notes (title, slug, content) VALUES (?, ?, ?)',
      values: [title, slug, content],
    });
    const noteId = result.insertId;

    const linkedSlugs = parseInternalLinks(content);
    if (linkedSlugs.length > 0) {
      const linkValues = linkedSlugs.map(targetSlug => [noteId, 'garden_note', targetSlug]);
      await query({
        query: 'INSERT INTO content_links (source_id, source_type, target_slug) VALUES ?',
        values: [linkValues],
      });
    }

    return NextResponse.json({ id: noteId, title, slug, content }, { status: 201 });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: 'A garden note with this title already exists.' }, { status: 409 });
    }
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}