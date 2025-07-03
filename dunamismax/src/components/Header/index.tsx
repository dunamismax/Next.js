import Link from 'next/link';

const Header = () => {
  return (
    <header className='bg-white shadow-md'>
      <div className='container mx-auto px-4 py-6 flex justify-between items-center'>
        <Link href='/' className='text-2xl font-bold text-gray-800'>
          Dunamismax
        </Link>
        <nav>
          <ul className='flex space-x-6'>
            <li>
              <Link href='/' className='text-gray-600 hover:text-gray-800'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/blog' className='text-gray-600 hover:text-gray-800'>
                Blog
              </Link>
            </li>
            <li>
              <Link href='/portfolio' className='text-gray-600 hover:text-gray-800'>
                Portfolio
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
