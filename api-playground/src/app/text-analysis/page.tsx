
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
    <div>
      <h1 className="text-4xl font-bold text-gray-800">Text Analysis</h1>
      <div className="mt-8">
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={analyzeText} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Analyze Text
        </button>
        {analysis && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
            <p className="mt-2 text-lg text-gray-800">Word Count: {analysis.wordCount}</p>
            <p className="text-lg text-gray-800">Character Count: {analysis.characterCount}</p>
          </div>
        )}
      </div>
    </div>
  );
}
