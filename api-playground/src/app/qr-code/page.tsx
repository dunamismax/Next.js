'use client';

import { useState } from 'react';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generateQrCode = async () => {
    if (!text) return;
    const res = await fetch(`/api/qr-code?text=${encodeURIComponent(text)}`);
    const data = await res.json();
    setQrCode(data.qrCode);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-extrabold text-text-primary">QR Code Generator</h1>
        <div className="mt-12">
          <input
            type="text"
            className="w-full p-4 bg-secondary border border-accent rounded-2xl text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to generate QR code..."
          />
          <button onClick={generateQrCode} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300">
            Generate QR Code
          </button>
          {qrCode && (
            <div className="mt-8 bg-secondary p-8 rounded-2xl flex justify-center">
              <img src={qrCode} alt="Generated QR Code" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}