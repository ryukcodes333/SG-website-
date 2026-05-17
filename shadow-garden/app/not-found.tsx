import Link from "next/link";
import { Home, Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
      <div className="space-y-6">
        <div className="w-16 h-16 bg-[#13261a] border border-[#1e3d28] rounded-2xl flex items-center justify-center mx-auto">
          <Leaf size={28} className="text-[#4a8c5c]" />
        </div>
        <div>
          <h1 className="text-6xl font-bold text-white font-display mb-2">404</h1>
          <p className="text-xl text-[#9ca3af] mb-1">Page not found</p>
          <p className="text-sm text-[#6ea882]">
            This page doesn&apos;t exist in the Shadow Garden
          </p>
        </div>
        <Link
          href="/"
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          <Home size={14} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
