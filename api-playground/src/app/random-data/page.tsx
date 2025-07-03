
'use client';

import { useState } from 'react';

export default function RandomData() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [randomString, setRandomString] = useState(null);

  const fetchRandomNumber = async () => {
    const res = await fetch('/api/random/number');
    const data = await res.json();
    setRandomNumber(data.number);
  };

  const fetchRandomString = async () => {
    const res = await fetch('/api/random/string');
    const data = await res.json();
    setRandomString(data.string);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-extrabold">Random Data Generator</h1>
        <div className="mt-12 space-y-8">
          <div className="bg-gray-800 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold">Random Number</h2>
            <p className="mt-2 text-gray-400">Generate a random number between 0 and 100.</p>
            <div className="mt-6 flex items-center space-x-4">
              <button onClick={fetchRandomNumber} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
                Generate
              </button>
              {randomNumber !== null && <p className="text-2xl font-mono bg-gray-700 p-3 rounded-lg">{randomNumber}</p>}
            </div>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold">Random String</h2>
            <p className="mt-2 text-gray-400">Generate a random string of characters.</p>
            <div className="mt-6 flex items-center space-x-4">
              <button onClick={fetchRandomString} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
                Generate
              </button>
              {randomString && <p className="text-2xl font-mono bg-gray-700 p-3 rounded-lg">{randomString}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
