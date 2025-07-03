import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-extrabold text-text-primary">API Playground</h1>
      <p className="mt-6 max-w-2xl text-xl text-text-secondary">
        A collection of fun and interactive APIs to explore.
      </p>
      <div className="w-full max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/random-data" className="bg-secondary p-8 rounded-2xl transition-transform transform hover:scale-105 hover:bg-accent cursor-pointer">
          <h2 className="text-2xl font-bold text-text-primary">Random Data API</h2>
          <p className="mt-2 text-text-secondary">Generate random numbers, strings, and more.</p>
        </Link>
        <Link href="/text-analysis" className="bg-secondary p-8 rounded-2xl transition-transform transform hover:scale-105 hover:bg-accent cursor-pointer">
          <h2 className="text-2xl font-bold text-text-primary">Text Analysis API</h2>
          <p className="mt-2 text-text-secondary">Analyze text for word count, character count, and more.</p>
        </Link>
        <Link href="/qr-code" className="bg-secondary p-8 rounded-2xl transition-transform transform hover:scale-105 hover:bg-accent cursor-pointer">
          <h2 className="text-2xl font-bold text-text-primary">QR Code Generator</h2>
          <p className="mt-2 text-text-secondary">Create and view QR codes instantly.</p>
        </Link>
        <Link href="/markdown-previewer" className="bg-secondary p-8 rounded-2xl transition-transform transform hover:scale-105 hover:bg-accent cursor-pointer">
          <h2 className="text-2xl font-bold text-text-primary">Markdown Previewer</h2>
          <p className="mt-2 text-text-secondary">Render Markdown text in real-time.</p>
        </Link>
      </div>
    </div>
  );
}
