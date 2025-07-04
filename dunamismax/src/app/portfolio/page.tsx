import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  status: 'draft' | 'published';
}

async function getPublishedProjects(): Promise<Project[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/projects`;
  const res = await fetch(apiUrl, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch projects from ${apiUrl}: ${res.statusText}`);
  }
  
  const allProjects: Project[] = await res.json();
  
  // API should ideally handle filtering, but this is a fallback.
  return allProjects.filter(p => p.status === 'published');
}

const createSnippet = (markdown: string, maxLength: number = 100) => {
  const plainText = markdown.replace(/(\*\*|__|\*|_|`|#+\s*)/g, '');
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + '...';
};

export default async function PortfolioPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="bg-background text-text-primary min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-600">
            Portfolio
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-text-secondary">
            A showcase of my technical projects and creative work.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link href={`/portfolio/${project.id}`} key={project.id}>
              <a className="block bg-secondary rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out group">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image_url || '/placeholder.png'}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-text-primary group-hover:text-green-400 transition-colors duration-300">
                    {project.title}
                  </h2>
                  <div className="mt-3 text-text-secondary prose prose-invert max-w-none text-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {createSnippet(project.description)}
                    </ReactMarkdown>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}