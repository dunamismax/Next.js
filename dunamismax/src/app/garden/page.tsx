import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface GardenNote {
  id: number;
  title: string;
  slug: string;
  content: string;
  updated_at: string;
}

async function getGardenNotes(): Promise<GardenNote[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/garden-notes`;
  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch garden notes from ${apiUrl}: ${res.statusText}`);
  return res.json();
}

export default async function GardenPage() {
  const notes = await getGardenNotes();

  return (
    <div className="bg-background text-text-primary min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
            The Garden
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-text-secondary">
            A collection of evolving notes, ideas, and snippets.
          </p>
        </header>

        <div className="space-y-12 max-w-4xl mx-auto">
          {notes.map((note) => (
            <article key={note.id} id={note.slug} className="p-8 bg-secondary rounded-xl shadow-lg scroll-mt-24">
              <h2 className="text-3xl font-bold text-text-primary mb-2">
                {note.title}
              </h2>
              <p className="text-sm text-text-accent mb-4">
                Last tended on {new Date(note.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children }) => {
                      if (href && href.startsWith('[[') && href.endsWith(']]')) {
                        const slug = href.slice(2, -2);
                        return <Link href={`/garden#${slug}`}><a>{children}</a></Link>;
                      }
                      return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
                    },
                  }}
                >
                  {note.content}
                </ReactMarkdown>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}