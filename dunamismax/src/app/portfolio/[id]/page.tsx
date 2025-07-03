import { payload } from 'payload';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function Project({ params }) {
  const { id } = params;
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      id: {
        equals: id,
      },
    },
  });

  const project = projects[0];

  if (!project) {
    return notFound();
  }

  return (
    <div>
      <h1 className='text-4xl font-bold text-gray-800'>{project.title}</h1>
      <div className='mt-8'>
        <Image
          src={project.image.url}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          className='rounded-lg'
        />
        <p className='mt-4 text-lg text-gray-600'>{project.description}</p>
        <div className='mt-4'>
          <h3 className='text-xl font-bold text-gray-800'>Technologies</h3>
          <ul className='mt-2 flex flex-wrap'>
            {project.technologies.map((tech) => (
              <li
                key={tech.id}
                className='mr-2 mb-2 bg-gray-200 text-gray-800 px-2 py-1 rounded-full'
              >
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
