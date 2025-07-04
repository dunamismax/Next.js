'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-secondary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-text-primary hover:text-blue-400 transition-colors duration-300">
          Dunamismax
        </Link>
        <nav className="flex items-center space-x-8">
          <ul className="hidden md:flex items-center space-x-8">
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
            <li>
              <Link href="/garden" className="text-text-secondary hover:text-text-primary transition-colors duration-300">
                Garden
              </Link>
            </li>
          </ul>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 text-sm text-text-primary bg-background border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
          <div className="hidden md:flex space-x-4">
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