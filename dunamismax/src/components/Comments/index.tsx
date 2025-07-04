'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: number;
  author_name: string;
  content: string;
  created_at: string;
  replies: Comment[];
}

interface CommentFormProps {
  postSlug: string;
  parentId?: number | null;
  onCommentSubmitted: (newComment: Comment) => void;
}

function CommentForm({ postSlug, parentId = null, onCommentSubmitted }: CommentFormProps) {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/posts/${postSlug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author_name: authorName, content, parent_id: parentId }),
      });
      if (!res.ok) throw new Error('Failed to submit comment');
      const newComment = await res.json();
      onCommentSubmitted(newComment);
      setAuthorName('');
      setContent('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 mt-4 ${parentId ? 'ml-8 border-l-2 border-gray-700 pl-4' : ''}`}>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Your Name"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        required
        className="w-full px-3 py-2 text-text-primary bg-background border border-gray-600 rounded-md"
      />
      <textarea
        placeholder="Your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={3}
        className="w-full px-3 py-2 text-text-primary bg-background border border-gray-600 rounded-md"
      />
      <button type="submit" disabled={submitting} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-500">
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}


interface CommentListProps {
  comments: Comment[];
  postSlug: string;
  onReplySubmitted: (newReply: Comment, parentId: number) => void;
}

function CommentList({ comments, postSlug, onReplySubmitted }: CommentListProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="p-4 bg-secondary rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-text-primary">{comment.author_name}</p>
              <p className="text-xs text-text-accent">{new Date(comment.created_at).toLocaleString()}</p>
            </div>
            <button onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} className="text-sm text-blue-400 hover:underline">
              {replyingTo === comment.id ? 'Cancel' : 'Reply'}
            </button>
          </div>
          <p className="mt-2 text-text-secondary">{comment.content}</p>
          {replyingTo === comment.id && (
            <CommentForm
              postSlug={postSlug}
              parentId={comment.id}
              onCommentSubmitted={(newReply) => {
                onReplySubmitted(newReply, comment.id);
                setReplyingTo(null);
              }}
            />
          )}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 pl-8 border-l-2 border-gray-700">
              <CommentList comments={comment.replies} postSlug={postSlug} onReplySubmitted={onReplySubmitted} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


export default function Comments({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/posts/${postSlug}/comments`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        const data = await res.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postSlug]);

  const handleCommentSubmitted = (newComment: Comment) => {
    setComments([newComment, ...comments]);
  };

  const handleReplySubmitted = (newReply: Comment, parentId: number) => {
    const addReply = (allComments: Comment[]): Comment[] => {
      return allComments.map(c => {
        if (c.id === parentId) {
          return { ...c, replies: [newReply, ...c.replies] };
        }
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: addReply(c.replies) };
        }
        return c;
      });
    };
    setComments(addReply(comments));
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="mt-16 pt-8 border-t border-gray-700">
      <h3 className="text-3xl font-bold text-text-primary mb-6">Comments ({comments.length})</h3>
      <CommentForm postSlug={postSlug} onCommentSubmitted={handleCommentSubmitted} />
      <div className="mt-8">
        <CommentList comments={comments} postSlug={postSlug} onReplySubmitted={handleReplySubmitted} />
      </div>
    </div>
  );
}
