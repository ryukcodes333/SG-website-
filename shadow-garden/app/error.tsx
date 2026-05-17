"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
      <div className="space-y-6">
        <div className="w-16 h-16 bg-[#13261a] border border-red-800/40 rounded-2xl flex items-center justify-center mx-auto">
          <AlertTriangle size={28} className="text-red-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white font-display mb-2">
            Something went wrong
          </h1>
          <p className="text-[#9ca3af] text-sm max-w-xs">
            An unexpected error occurred. Try refreshing the page.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="btn-primary text-sm">
            Try Again
          </button>
          <Link href="/" className="btn-ghost text-sm flex items-center gap-1.5">
            <Home size={14} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
