"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Settings, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { SessionPayload } from "@/types";

interface Props {
  session: SessionPayload | null;
}

export function Topbar({ session }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/");
  };

  return (
    <header className="h-16 border-b border-[#1e3d28] bg-[#0d1f14]/80 backdrop-blur-sm sticky top-0 z-20 flex items-center justify-end px-6 gap-3">
      {session && (
        <button className="p-2 rounded-lg hover:bg-[#1a3324] text-[#9ca3af] hover:text-white transition-colors relative">
          <Bell size={18} />
        </button>
      )}

      {session ? (
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1a3324] transition-colors"
          >
            <div className="w-7 h-7 bg-[#2d5a3d] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {(session.name || session.phone).charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-white hidden sm:block">
              {session.name || "User"}
            </span>
            <ChevronDown size={14} className="text-[#9ca3af]" />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-[#13261a] border border-[#1e3d28] rounded-xl shadow-xl py-1 z-50 animate-slide-up">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#9ca3af] hover:text-white hover:bg-[#1a3324] transition-colors"
                onClick={() => setOpen(false)}
              >
                <Settings size={14} />
                Profile
              </Link>
              <div className="border-t border-[#1e3d28] my-1" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-[#1a3324] transition-colors w-full"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-ghost text-sm py-2">
            Sign In
          </Link>
          <Link href="/register" className="btn-primary text-sm py-2">
            Register
          </Link>
        </div>
      )}
    </header>
  );
}
