'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id?: number;
  title: string;
  description: string;
  image_url?: string;
  project_url?: string;
  status: 'draft' | 'published';
}

interface ProjectFormProps {
  project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setImageUrl(project.image_url || '');
      setProjectUrl(project.project_url || '');
      setStatus(project.status);
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const method = project ? 'PUT' : 'POST';
    const url = project ? `/api/projects/${project.id}` : '/api/projects';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image_url: imageUrl, project_url: projectUrl, status }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to save project');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text-secondary">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 text-text-primary bg-background border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text-secondary">
          Description (Markdown)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={10}
          className="w-full px-3 py-2 mt-1 text-text-primary bg-background border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-text-secondary">
          Image URL
        </label>
        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-3 py-2 mt-1 text-text-primary bg-background border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="projectUrl" className="block text-sm font-medium text-text-secondary">
          Project URL
        </label>
        <input
          id="projectUrl"
          type="text"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          className="w-full px-3 py-2 mt-1 text-text-primary bg-background border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-text-secondary">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
          className="w-full px-3 py-2 mt-1 text-text-primary bg-background border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500"
        >
          {submitting ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}
