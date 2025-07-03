import Link from 'next/link';
import { payload } from 'payload';
import Image from 'next/image';

export default async function Portfolio() {
  const { docs: projects } = await payload.find({
    collection: 'projects',
  });

  return (
    <div>
      <h1 className='text-4xl font-bold text-gray-800'>Portfolio</h1>
      <div className='mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <Link
            href={`/portfolio/${project.id}`}
            key={project.id}
            className='block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'
          >
            <Image
              src={project.image.url}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              className='rounded-lg'
            />
            <h2 className='mt-4 text-2xl font-bold text-gray-800'>{project.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
