"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  Shield,
  Trophy,
  Users,
  Zap,
  User,
  Info,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import type { SessionPayload } from "@/types";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/cards", label: "Cards", icon: CreditCard },
  { href: "/pokemons", label: "Pokémon", icon: Zap },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/guilds", label: "Guilds", icon: Shield },
  { href: "/guilds/leaderboard", label: "Guild Ranks", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/about", label: "About", icon: Info },
];

interface Props {
  session: SessionPayload | null;
}

export function Sidebar({ session }: Props) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#13261a] border border-[#1e3d28] p-2 rounded-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <ChevronRight
          size={18}
          className={cn("transition-transform", mobileOpen && "rotate-180")}
        />
      </button>

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen z-40 flex flex-col bg-[#0d1f14] border-r border-[#1e3d28] transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div
          className={cn(
            "flex items-center border-b border-[#1e3d28] h-16 px-4",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#2d5a3d] rounded-lg flex items-center justify-center">
                <Leaf size={14} className="text-[#6ea882]" />
              </div>
              <span className="font-bold text-white font-display text-lg leading-none">
                Shadow<span className="text-[#4a8c5c]">Garden</span>
              </span>
            </Link>
          )}
          {collapsed && (
            <div className="w-7 h-7 bg-[#2d5a3d] rounded-lg flex items-center justify-center">
              <Leaf size={14} className="text-[#6ea882]" />
            </div>
          )}
          <button
            className={cn(
              "hidden lg:flex p-1.5 rounded-md hover:bg-[#1a3324] text-[#6ea882] transition-colors",
              collapsed && "ml-0"
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-[#2d5a3d]/60 text-white border border-[#2d5a3d]/60"
                    : "text-[#9ca3af] hover:text-white hover:bg-[#1a3324]",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? label : undefined}
              >
                <Icon
                  size={18}
                  className={cn(
                    "shrink-0",
                    isActive ? "text-[#4a8c5c]" : "text-current"
                  )}
                />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="p-4 border-t border-[#1e3d28]">
            {session ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#2d5a3d] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-white">
                    {(session.name || session.phone)
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {session.name || "User"}
                  </p>
                  <p className="text-xs text-[#6ea882] truncate">
                    {session.phone.replace(/(\d{3})\d+(\d{4})/, "$1***$2")}
                  </p>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn-primary w-full text-center text-sm block"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
