'use client';

import { useState, useEffect } from 'react';
import ProjectForm from '@/components/ProjectForm';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  project_url?: string;
  status: 'draft' | 'published';
}

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch project');
        const data = await res.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!project) return <div>Project not found.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
