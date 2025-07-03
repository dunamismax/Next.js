import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-6xl font-extrabold">API Playground</h1>
        <p className="mt-4 text-xl text-gray-400">
          A collection of fun and interactive APIs to explore.
        </p>
        <div className="mt-12">
          <Link href="/random-data" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
            Get Started
          </Link>
        </div>
      </div>
      <div className="w-full max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold">Random Data API</h2>
          <p className="mt-2 text-gray-400">Generate random numbers, strings, and more.</p>
        </div>
        <div className="bg-gray-800 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold">Text Analysis API</h2>
          <p className="mt-2 text-gray-400">Analyze text for word count, character count, and more.</p>
        </div>
      </div>
    </div>
  );
}
