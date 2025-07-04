import { Suspense } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import Comments from '@/components/Comments';

interface Backlink {
  title: string;
  slug: string;
  type: 'post' | 'project' | 'garden_note';
}

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  published_at: string;
  backlinks: Backlink[];
}

async function getPost(slug: string): Promise<Post> {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${slug}`;
  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch post from ${apiUrl}: ${res.statusText}`);
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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <div className="bg-background text-text-primary min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <article className="prose prose-invert lg:prose-xl max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Published on {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </header>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ href, children }) => {
                if (href && href.startsWith('[[') && href.endsWith(']]')) {
                  const slug = href.slice(2, -2);
                  // This is still a simplification, but better.
                  // We need a way to know the type of the linked content.
                  // For now, assume posts link to posts.
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
            {post.content}
          </ReactMarkdown>
        </article>

        {post.backlinks && post.backlinks.length > 0 && (
          <aside className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-700">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Referred in</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {post.backlinks.map((backlink) => (
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

        <Suspense fallback={<div>Loading comments...</div>}>
          <Comments postSlug={post.slug} />
        </Suspense>
      </div>
    </div>
  );
}