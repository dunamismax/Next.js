'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  status: 'draft' | 'published';
  updated_at: string;
}

export default function ManagePostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete post');
        setPosts(posts.filter((post) => post.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Posts</h1>
        <Link href="/admin/posts/new">
          <a className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">
            New Post
          </a>
        </Link>
      </div>
      <div className="bg-secondary shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    post.status === 'published' ? 'bg-green-500 text-green-100' : 'bg-yellow-500 text-yellow-100'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(post.updated_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/posts/edit/${post.id}`}>
                    <a className="text-blue-400 hover:text-blue-600 mr-4">Edit</a>
                  </Link>
                  <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
