import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { slugify, parseInternalLinks } from '@/lib/utils';

// GET a single post by slug, including backlinks
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const [postResults, backlinkResults] = await Promise.all([
      query({
        query: 'SELECT * FROM posts WHERE slug = ?',
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

    if (postResults.length === 0) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    const post = postResults[0];
    post.backlinks = backlinkResults;

    return NextResponse.json(post, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

// PUT (update) a post by slug
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { title, content, status } = await request.json();
    const newSlug = slugify(title);

    // Find the post ID from the slug
    const postResult = await query({ query: 'SELECT id FROM posts WHERE slug = ?', values: [params.slug] });
    if (postResult.length === 0) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    const postId = postResult[0].id;

    // Update the post
    await query({
      query: 'UPDATE posts SET title = ?, slug = ?, content = ?, status = ? WHERE id = ?',
      values: [title, newSlug, content, status, postId],
    });

    // Update internal links
    await query({
      query: 'DELETE FROM content_links WHERE source_id = ? AND source_type = ?',
      values: [postId, 'post'],
    });

    const linkedSlugs = parseInternalLinks(content);
    if (linkedSlugs.length > 0) {
      const linkValues = linkedSlugs.map(targetSlug => [postId, 'post', targetSlug]);
      await query({
        query: 'INSERT INTO content_links (source_id, source_type, target_slug) VALUES ?',
        values: [linkValues],
      });
    }

    return NextResponse.json({ id: postId, title, slug: newSlug, content, status }, { status: 200 });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: 'A post with this title already exists.' }, { status: 409 });
    }
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

// DELETE a post by slug
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const postResult = await query({ query: 'SELECT id FROM posts WHERE slug = ?', values: [params.slug] });
    if (postResult.length === 0) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    const postId = postResult[0].id;

    // Also delete any links originating from this post
    await query({
      query: 'DELETE FROM content_links WHERE source_id = ? AND source_type = ?',
      values: [postId, 'post'],
    });
    
    const result = await query({
      query: 'DELETE FROM posts WHERE id = ?',
      values: [postId],
    });

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    return new Response(null, { status: 204 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}