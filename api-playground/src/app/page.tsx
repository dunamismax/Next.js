import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-extrabold text-text-primary">API Playground</h1>
      <p className="mt-6 max-w-2xl text-xl text-text-secondary">
        A collection of fun and interactive APIs to explore.
      </p>
      <div className="mt-10">
        <Link href="/random-data" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
          Get Started
        </Link>
      </div>
      <div className="w-full max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-secondary p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-text-primary">Random Data API</h2>
          <p className="mt-2 text-text-secondary">Generate random numbers, strings, and more.</p>
        </div>
        <div className="bg-secondary p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-text-primary">Text Analysis API</h2>
          <p className="mt-2 text-text-secondary">Analyze text for word count, character count, and more.</p>
        </div>
      </div>
    </div>
  );
}
