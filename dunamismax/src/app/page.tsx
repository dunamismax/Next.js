import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-extrabold text-text-primary">Welcome to Dunamismax</h1>
      <p className="mt-6 max-w-2xl text-xl text-text-secondary">
        I'm a software engineer who loves building beautiful and functional websites.
      </p>
      <div className="mt-10">
        <Link href="/portfolio" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
          View My Work
        </Link>
      </div>
    </div>
  );
}
