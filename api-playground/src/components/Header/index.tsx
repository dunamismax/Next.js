
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          API Playground
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/random-data" className="text-gray-600 hover:text-gray-800">
                Random Data
              </Link>
            </li>
            <li>
              <Link href="/text-analysis" className="text-gray-600 hover:text-gray-800">
                Text Analysis
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
