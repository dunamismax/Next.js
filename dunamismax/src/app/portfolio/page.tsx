import Link from 'next/link';
import Image from 'next/image';

async function getProjects() {
  const res = await fetch('http://localhost:3000/api/projects', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-900">My Work</h1>
        <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500">
          A collection of my favorite projects.
        </p>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {projects.map((project) => (
            <Link href={`/portfolio/${project.id}`} key={project.id} className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
              <Image
                src={project.image_url}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover"
              />
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{project.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
