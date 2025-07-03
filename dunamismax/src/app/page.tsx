import Link from 'next/link';

export default function Home() {
  return (
    <div className='text-center'>
      <h1 className='text-4xl font-bold text-gray-800'>Welcome to Dunamismax</h1>
      <p className='mt-4 text-lg text-gray-600'>
        I'm a software engineer who loves building beautiful and functional websites.
      </p>
      <div className='mt-8'>
        <Link
          href='/portfolio'
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full'
        >
          View My Work
        </Link>
      </div>
    </div>
  );
}
