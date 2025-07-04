'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id?: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
}

interface PostFormProps {
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setStatus(post.status);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const method = post ? 'PUT' : 'POST';
    const url = post ? `/api/posts/${post.id}` : '/api/posts';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, status }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to save post');
      }

      router.push('/admin/posts');
      router.refresh(); // Refresh the posts list
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text-secondary">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 text-text-primary bg-background border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-text-secondary">
          Content (Markdown)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={15}
          className="w-full px-3 py-2 mt-1 text-text-primary bg-background border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-text-secondary">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
          className="w-full px-3 py-2 mt-1 text-text-primary bg-background border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500"
        >
          {submitting ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  );
}
