"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {
    const response = await fetch("/api/shorten", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok) {
      setShortUrl(data.shortUrl);
      setError("");
    } else {
      setError(data.error);
      setShortUrl("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 min-h-screen bg-gray-50">
      <div className="space-y-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">URL Shortener</h1>
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          onClick={handleShorten}
          className="py-3 w-full font-semibold text-white bg-blue-500 rounded-lg transition hover:bg-blue-600"
        >
          Shorten
        </button>

        {error && (
          <div className="p-4 text-center text-red-600 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="p-4 text-center bg-green-100 rounded-lg">
            <p className="mb-2 font-medium text-green-700">Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline break-words"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
