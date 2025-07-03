import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

async function getProject(id) {
  const res = await fetch(`http://localhost:3000/api/projects/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

export default async function Project({ params }) {
  const project = await getProject(params.id);

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-text-primary">{project.title}</h1>
          <div className="mt-8">
            <Image
              src={project.image_url}
              alt={project.title}
              width={1200}
              height={800}
              className="rounded-2xl shadow-lg"
            />
            <p className="mt-8 text-xl text-text-secondary">{project.description}</p>
            <div className="mt-8">
              <Link href={project.project_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
                View Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
