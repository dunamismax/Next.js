
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-secondary shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-text-primary hover:text-blue-400 transition-colors duration-300">
          API Playground
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/random-data" className="text-text-secondary hover:text-text-primary transition-colors duration-300">
                Random Data
              </Link>
            </li>
            <li>
              <Link href="/text-analysis" className="text-text-secondary hover:text-text-primary transition-colors duration-300">
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
