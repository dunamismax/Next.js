'use client';

import { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState('# Hello, world!');

  const sanitizedHtml = DOMPurify.sanitize(marked(markdown));

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-text-primary text-center">Markdown Previewer</h1>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-secondary p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-text-primary">Markdown</h2>
            <textarea
              className="w-full h-96 mt-4 p-4 bg-accent border border-accent rounded-2xl text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter Markdown..."
            />
          </div>
          <div className="bg-secondary p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-text-primary">Preview</h2>
            <div
              className="prose prose-invert mt-4 p-4 bg-accent rounded-2xl"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}