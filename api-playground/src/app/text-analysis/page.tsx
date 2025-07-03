
'use client';

import { useState } from 'react';

export default function TextAnalysis() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeText = async () => {
    const res = await fetch('/api/text/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setAnalysis(data);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-extrabold text-text-primary">Text Analysis</h1>
        <div className="mt-12">
          <textarea
            className="w-full h-48 p-4 bg-secondary border border-accent rounded-2xl text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze..."
          />
          <button onClick={analyzeText} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300">
            Analyze Text
          </button>
          {analysis && (
            <div className="mt-8 bg-secondary p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-text-primary">Analysis Results</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-4xl font-bold text-text-primary">{analysis.wordCount}</p>
                  <p className="text-text-secondary">Words</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-text-primary">{analysis.characterCount}</p>
                  <p className="text-text-secondary">Characters</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
