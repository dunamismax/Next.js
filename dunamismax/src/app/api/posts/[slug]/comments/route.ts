import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET all comments for a post
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const postResult = await query({ query: 'SELECT id FROM posts WHERE slug = ?', values: [params.slug] });
    if (postResult.length === 0) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    const postId = postResult[0].id;

    const comments = await query({
      query: 'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC',
      values: [postId],
    });

    // A simple way to nest comments
    const commentsById = {};
    comments.forEach(comment => commentsById[comment.id] = { ...comment, replies: [] });
    const nestedComments = [];
    comments.forEach(comment => {
      if (comment.parent_id && commentsById[comment.parent_id]) {
        commentsById[comment.parent_id].replies.push(commentsById[comment.id]);
      } else {
        nestedComments.push(commentsById[comment.id]);
      }
    });

    return NextResponse.json(nestedComments, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

// POST a new comment to a post
export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { author_name, content, parent_id } = await request.json();

    if (!author_name || !content) {
      return NextResponse.json({ message: 'Author name and content are required' }, { status: 400 });
    }

    const postResult = await query({ query: 'SELECT id FROM posts WHERE slug = ?', values: [params.slug] });
    if (postResult.length === 0) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    const postId = postResult[0].id;

    const result = await query({
      query: 'INSERT INTO comments (post_id, parent_id, author_name, content) VALUES (?, ?, ?, ?)',
      values: [postId, parent_id || null, author_name, content],
    });

    const newComment = {
      id: result.insertId,
      post_id: postId,
      parent_id: parent_id || null,
      author_name,
      content,
      created_at: new Date().toISOString(),
      replies: []
    };

    return NextResponse.json(newComment, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
