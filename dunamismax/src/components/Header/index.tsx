import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-secondary shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-text-primary hover:text-blue-400 transition-colors duration-300">
          Dunamismax
        </Link>
        <nav className="flex items-center space-x-8">
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
          <div className="flex space-x-4">
            <a href="https://twitter.com/dunamismax" target="_blank" rel="noopener noreferrer">
              <Image src="/twitter.png" alt="Twitter" width={24} height={24} />
            </a>
            <a href="https://www.reddit.com/user/dunamismax" target="_blank" rel="noopener noreferrer">
              <Image src="/reddit.png" alt="Reddit" width={24} height={24} />
            </a>
            <a href="https://github.com/dunamismax" target="_blank" rel="noopener noreferrer">
              <Image src="/github.png" alt="GitHub" width={24} height={24} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
