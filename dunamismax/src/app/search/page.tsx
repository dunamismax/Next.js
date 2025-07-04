'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

interface SearchResult {
  title: string;
  slug: string;
  type: 'post' | 'project' | 'garden_note';
  relevance: number;
}

const getLinkForType = (type: SearchResult['type'], slug: string) => {
  switch (type) {
    case 'post':
      return `/blog/${slug}`;
    case 'project':
      return `/portfolio/${slug}`;
    case 'garden_note':
      return `/garden#${slug}`;
    default:
      return '/';
  }
};

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (q) {
      const fetchResults = async () => {
        setLoading(true);
        setError('');
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
          if (!res.ok) throw new Error('Failed to fetch search results');
          const data = await res.json();
          setResults(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [q]);

  if (loading) return <div className="text-center mt-8">Searching...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">
          Search Results for "{q}"
        </h1>
      </header>
      {results.length > 0 ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {results.map((result) => (
            <Link href={getLinkForType(result.type, result.slug)} key={`${result.type}-${result.slug}`}>
              <a className="block p-6 bg-secondary rounded-lg hover:bg-gray-700 transition-colors">
                <p className="font-semibold text-xl text-text-primary">{result.title}</p>
                <p className="text-sm text-text-accent capitalize">{result.type.replace('_', ' ')}</p>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-text-secondary">No results found.</p>
      )}
    </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
