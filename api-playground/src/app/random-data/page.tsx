
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
    <div>
      <h1 className="text-4xl font-bold text-gray-800">Random Data Generator</h1>
      <div className="mt-8">
        <div className="flex items-center space-x-4">
          <button onClick={fetchRandomNumber} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Generate Random Number
          </button>
          {randomNumber && <p className="text-lg text-gray-800">{randomNumber}</p>}
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <button onClick={fetchRandomString} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Generate Random String
          </button>
          {randomString && <p className="text-lg text-gray-800">{randomString}</p>}
        </div>
      </div>
    </div>
  );
}
