import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';

interface Backlink {
  title: string;
  slug: string;
  type: 'post' | 'project' | 'garden_note';
}

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  project_url: string;
  backlinks: Backlink[];
}

async function getProject(slug: string): Promise<Project> {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/projects/${slug}`;
  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch project from ${apiUrl}: ${res.statusText}`);
  return res.json();
}

const getLinkForType = (type: Backlink['type'], slug: string) => {
  switch (type) {
    case 'post':
      return `/blog/${slug}`;
    case 'project':
      return `/portfolio/${slug}`;
    case 'garden_note':
      return `/garden#${slug}`;
    default:
      return '/';
  }
};

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  return (
    <div className="bg-background text-text-primary min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-600">
              {project.title}
            </h1>
          </header>

          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-2xl mb-12">
            <Image
              src={project.image_url || '/placeholder.png'}
              alt={project.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          
          {project.project_url && (
            <div className="text-center mb-12">
              <Link href={project.project_url} passHref>
                <a target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  View Project Live
                </a>
              </Link>
            </div>
          )}

          <div className="prose prose-invert lg:prose-xl max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                a: ({ href, children }) => {
                  if (href && href.startsWith('[[') && href.endsWith(']]')) {
                    const slug = href.slice(2, -2);
                    return <Link href={`/blog/${slug}`}><a>{children}</a></Link>;
                  }
                  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
                },
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {project.description}
            </ReactMarkdown>
          </div>
        </article>

        {project.backlinks && project.backlinks.length > 0 && (
          <aside className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-700">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Referred in</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.backlinks.map((backlink) => (
                <Link href={getLinkForType(backlink.type, backlink.slug)} key={`${backlink.type}-${backlink.slug}`}>
                  <a className="block p-4 bg-secondary rounded-lg hover:bg-gray-700 transition-colors">
                    <p className="font-semibold text-text-primary">{backlink.title}</p>
                    <p className="text-sm text-text-accent capitalize">{backlink.type.replace('_', ' ')}</p>
                  </a>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}