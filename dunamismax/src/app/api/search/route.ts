import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ message: 'Query parameter "q" is required' }, { status: 400 });
  }

  const searchQuery = `
    SELECT title, slug, 'post' as type, MATCH(title, content) AGAINST(?) as relevance
    FROM posts
    WHERE MATCH(title, content) AGAINST(?) > 0 AND status = 'published'
    UNION ALL
    SELECT title, slug, 'project' as type, MATCH(title, description) AGAINST(?) as relevance
    FROM projects
    WHERE MATCH(title, description) AGAINST(?) > 0 AND status = 'published'
    UNION ALL
    SELECT title, slug, 'garden_note' as type, MATCH(title, content) AGAINST(?) as relevance
    FROM garden_notes
    WHERE MATCH(title, content) AGAINST(?) > 0
    ORDER BY relevance DESC
    LIMIT 20;
  `;

  try {
    const results = await query({
      query: searchQuery,
      values: [q, q, q, q, q, q],
    });
    return NextResponse.json(results, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
