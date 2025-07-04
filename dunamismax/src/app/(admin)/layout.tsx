import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="bg-secondary shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard">
            <a className="text-2xl font-bold text-text-primary hover:text-blue-400">
              Dunamismax Admin
            </a>
          </Link>
          <div>
            {/* Add a logout button here later */}
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
