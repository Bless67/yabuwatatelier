import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1e8] p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-[#1a4d3e] mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Page not found</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-[#b8a876] text-[#1a4d3e] font-semibold hover:bg-[#1a4d3e] hover:text-white transition"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
