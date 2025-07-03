
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
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-extrabold">Text Analysis</h1>
        <div className="mt-12">
          <textarea
            className="w-full h-48 p-4 bg-gray-800 border border-gray-700 rounded-2xl text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze..."
          />
          <button onClick={analyzeText} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300">
            Analyze Text
          </button>
          {analysis && (
            <div className="mt-8 bg-gray-800 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold">Analysis Results</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-4xl font-bold">{analysis.wordCount}</p>
                  <p className="text-gray-400">Words</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">{analysis.characterCount}</p>
                  <p className="text-gray-400">Characters</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
