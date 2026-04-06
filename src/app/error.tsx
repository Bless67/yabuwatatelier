"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1e8] p-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a4d3e] mb-4">Something went wrong</h1>
        <p className="text-gray-700 mb-6">{error?.message || "An error occurred."}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-lg bg-[#b8a876] text-[#1a4d3e] font-semibold hover:bg-[#1a4d3e] hover:text-white transition"
          >
            Retry
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg border border-[#b8a876] text-[#1a4d3e] hover:bg-[#b8a876] hover:text-white transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
