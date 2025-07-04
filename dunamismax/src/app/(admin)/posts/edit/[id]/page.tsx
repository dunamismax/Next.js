'use client';

import { useState, useEffect } from 'react';
import PostForm from '@/components/PostForm';

interface Post {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
}

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
