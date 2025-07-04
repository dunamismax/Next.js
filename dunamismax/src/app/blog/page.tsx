import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// Define the type for our posts
interface Post {
  id: number;
  title: string;
  content: string; // This will be the full Markdown content
  published_at: string;
}

async function getPublishedPosts(): Promise<Post[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/posts`;
  const res = await fetch(apiUrl, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts from ${apiUrl}: ${res.statusText}`);
  }

  const allPosts: Post[] = await res.json();
  
  // This is a temporary solution. The API should be updated to filter by status.
  // For now, we assume the API returns all posts and we filter here.
  // The correct approach is: `http://localhost:3000/api/posts?status=published`
  return allPosts;
}

// Function to create a short snippet from Markdown
const createSnippet = (markdown: string, maxLength: number = 150) => {
  // This is a simplified snippet generator. For more accuracy,
  // you might want a more sophisticated Markdown parser to remove all syntax.
  const plainText = markdown.replace(/(\*\*|__|\*|_|`|#+\s*)/g, ''); // Basic Markdown removal
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + '...';
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="bg-background text-text-primary min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Digital Garden
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-text-secondary">
            A collection of articles, notes, and thoughts in constant bloom.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <a className="block p-8 bg-secondary rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out group">
                <h2 className="text-2xl font-bold text-text-primary group-hover:text-blue-400 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-text-accent">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <div className="mt-4 text-text-secondary prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {createSnippet(post.content)}
                  </ReactMarkdown>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}