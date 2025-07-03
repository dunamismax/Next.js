import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-secondary shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-text-primary hover:text-blue-400 transition-colors duration-300">
          Dunamismax
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-text-secondary hover:text-text-primary transition-colors duration-300">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="text-text-secondary hover:text-text-primary transition-colors duration-300">
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
