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
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-900">From the Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500">
          Stay up to date with the latest news and articles from our team.
        </p>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {posts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group block p-8 bg-white rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h2>
              <p className="mt-3 text-gray-500">{new Date(post.published_at).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
