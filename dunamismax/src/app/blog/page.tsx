import Link from 'next/link';
import { payload } from 'payload';

export default async function Blog() {
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
  });

  return (
    <div>
      <h1 className='text-4xl font-bold text-gray-800'>Blog</h1>
      <div className='mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => (
          <Link
            href={`/blog/${post.id}`}
            key={post.id}
            className='block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'
          >
            <h2 className='text-2xl font-bold text-gray-800'>{post.title}</h2>
            <p className='mt-2 text-gray-600'>
              {new Date(post.publishedDate).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
