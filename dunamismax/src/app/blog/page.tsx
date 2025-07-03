import Link from 'next/link';

async function getPosts() {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-center text-text-primary">From the Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-text-secondary">
          Stay up to date with the latest news and articles from our team.
        </p>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {posts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group block p-8 bg-secondary rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <h2 className="text-2xl font-bold text-text-primary group-hover:text-blue-400 transition-colors duration-300">{post.title}</h2>
              <p className="mt-3 text-text-secondary">{new Date(post.published_at).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
