import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

async function getPost(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

export default async function Post({ params }) {
  const post = await getPost(params.id);

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-text-primary">{post.title}</h1>
          <p className="mt-4 text-xl text-text-secondary">{new Date(post.published_at).toLocaleDateString()}</p>
          <div className="mt-8 prose prose-invert lg:prose-xl">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
