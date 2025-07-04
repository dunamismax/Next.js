import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-text-primary mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Manage Posts */}
        <Link href="/admin/posts">
          <a className="block p-6 bg-secondary rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-text-primary">Manage Posts</h2>
            <p className="mt-2 text-text-secondary">Create, edit, and delete blog posts.</p>
          </a>
        </Link>

        {/* Manage Projects */}
        <Link href="/admin/projects">
          <a className="block p-6 bg-secondary rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-text-primary">Manage Projects</h2>
            <p className="mt-2 text-text-secondary">Update your portfolio and showcase your work.</p>
          </a>
        </Link>

        {/* Manage Garden Notes */}
        <Link href="/admin/garden">
          <a className="block p-6 bg-secondary rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-text-primary">Manage Garden Notes</h2>
            <p className="mt-2 text-text-secondary">Tend to your collection of evolving ideas.</p>
          </a>
        </Link>

      </div>
    </div>
  );
}
