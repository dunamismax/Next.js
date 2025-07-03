import { payload } from 'payload';
import { notFound } from 'next/navigation';
import RichText from '../../components/RichText';

export default async function Post({ params }) {
  const { id } = params;
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      id: {
        equals: id,
      },
    },
  });

  const post = posts[0];

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1 className='text-4xl font-bold text-gray-800'>{post.title}</h1>
      <p className='mt-2 text-gray-600'>{new Date(post.publishedDate).toLocaleDateString()}</p>
      <div className='mt-8'>
        <RichText content={post.content} />
      </div>
    </div>
  );
}
