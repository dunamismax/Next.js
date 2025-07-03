import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to the API Playground</h1>
      <p className="mt-4 text-lg text-gray-600">
        Explore and interact with a variety of fun and interesting APIs.
      </p>
      <div className="mt-8">
        <Link href="/random-data" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full">
          Get Started
        </Link>
      </div>
    </div>
  );
}
