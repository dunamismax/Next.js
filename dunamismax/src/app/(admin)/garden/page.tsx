'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface GardenNote {
  id: number;
  title: string;
  content: string;
  updated_at: string;
}

export default function ManageGardenPage() {
  const [notes, setNotes] = useState<GardenNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('/api/garden-notes');
        if (!res.ok) throw new Error('Failed to fetch notes');
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/garden-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });
      if (!res.ok) throw new Error('Failed to create note');
      const newNote = await res.json();
      setNotes([newNote, ...notes]);
      setNewTitle('');
      setNewContent('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        const res = await fetch(`/api/garden-notes/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete note');
        setNotes(notes.filter((note) => note.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (note: GardenNote) => {
    setEditingNoteId(note.id);
    setEditingTitle(note.title);
    setEditingContent(note.content);
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditingTitle('');
    setEditingContent('');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNoteId) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/garden-notes/${editingNoteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editingTitle, content: editingContent }),
      });
      if (!res.ok) throw new Error('Failed to update note');
      const updatedNote = await res.json();
      setNotes(notes.map(n => n.id === editingNoteId ? { ...n, ...updatedNote, updated_at: new Date().toISOString() } : n));
      handleCancelEdit();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Garden Notes</h1>
      
      <div className="mb-12 p-6 bg-secondary rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add a New Note</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
            className="w-full px-3 py-2 text-text-primary bg-background border border-gray-600 rounded-md"
          />
          <textarea
            placeholder="Note Content (Markdown)"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            required
            rows={5}
            className="w-full px-3 py-2 text-text-primary bg-background border border-gray-600 rounded-md"
          />
          <button type="submit" disabled={submitting} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-500">
            {submitting ? 'Adding...' : 'Add Note'}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {notes.map((note) => (
          <div key={note.id} className="p-6 bg-secondary rounded-lg shadow-md">
            {editingNoteId === note.id ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-text-primary bg-background border border-gray-600 rounded-md"
                />
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  required
                  rows={8}
                  className="w-full px-3 py-2 text-text-primary bg-background border border-gray-600 rounded-md"
                />
                <div className="flex justify-end space-x-4">
                  <button type="button" onClick={handleCancelEdit} className="text-gray-400 hover:text-white">Cancel</button>
                  <button type="submit" disabled={submitting} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-500">
                    {submitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h3 className="text-xl font-bold">{note.title}</h3>
                <p className="text-sm text-text-accent mb-2">
                  Last updated: {new Date(note.updated_at).toLocaleDateString()}
                </p>
                <div className="prose prose-invert max-w-none mb-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
                </div>
                <div className="flex justify-end space-x-4">
                  <button onClick={() => handleEdit(note)} className="text-blue-400 hover:text-blue-600 text-sm">Edit</button>
                  <button onClick={() => handleDelete(note.id)} className="text-red-400 hover:text-red-600 text-sm">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
