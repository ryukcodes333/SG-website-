import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number | bigint): string {
  const num = typeof n === "bigint" ? Number(n) : n;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}

export function xpToNextLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function xpProgress(
  xp: number,
  level: number
): { current: number; needed: number; percent: number } {
  const needed = xpToNextLevel(level);
  const prevNeeded = level > 1 ? xpToNextLevel(level - 1) : 0;
  const current = xp - prevNeeded;
  const total = needed - prevNeeded;
  return {
    current: Math.max(0, current),
    needed: total,
    percent: Math.min(100, Math.floor((Math.max(0, current) / total) * 100)),
  };
}

export function tierLabel(tier: string): string {
  const map: Record<string, string> = {
    "1": "T1",
    "2": "T2",
    "3": "T3",
    "4": "T4",
    "5": "T5",
    "6": "T6",
    S: "TS",
    Z: "TZ",
    T1: "T1",
    T2: "T2",
    T3: "T3",
    T4: "T4",
    T5: "T5",
    T6: "T6",
    TS: "TS",
    TZ: "TZ",
  };
  return map[tier] || tier;
}

export function tierColor(tier: string): string {
  const label = tierLabel(tier);
  const map: Record<string, string> = {
    T1: "text-gray-400",
    T2: "text-green-400",
    T3: "text-blue-400",
    T4: "text-purple-400",
    T5: "text-yellow-400",
    T6: "text-orange-400",
    TS: "text-rose-400",
    TZ: "text-cyan-400",
  };
  return map[label] || "text-gray-400";
}

export function tierBg(tier: string): string {
  const label = tierLabel(tier);
  const map: Record<string, string> = {
    T1: "bg-gray-800/60 border-gray-600/40",
    T2: "bg-green-900/30 border-green-700/40",
    T3: "bg-blue-900/30 border-blue-700/40",
    T4: "bg-purple-900/30 border-purple-700/40",
    T5: "bg-yellow-900/30 border-yellow-700/40",
    T6: "bg-orange-900/30 border-orange-700/40",
    TS: "bg-rose-900/30 border-rose-700/40",
    TZ: "bg-cyan-900/30 border-cyan-700/40",
  };
  return map[label] || "bg-gray-800/60 border-gray-600/40";
}

export function rankLabel(level: number): string {
  if (level >= 50) return "Shadow Lord";
  if (level >= 40) return "Shadow Master";
  if (level >= 30) return "Elite Guardian";
  if (level >= 20) return "Garden Knight";
  if (level >= 15) return "Shadow Warrior";
  if (level >= 10) return "Apprentice";
  if (level >= 5) return "Initiate";
  return "Newcomer";
}

export function membershipBadge(membership: string): {
  label: string;
  color: string;
  bg: string;
} {
  switch (membership) {
    case "elite":
      return {
        label: "Elite",
        color: "text-yellow-300",
        bg: "bg-yellow-900/40 border-yellow-700/50",
      };
    case "premium":
      return {
        label: "Premium",
        color: "text-purple-300",
        bg: "bg-purple-900/40 border-purple-700/50",
      };
    default:
      return {
        label: "Free",
        color: "text-gray-400",
        bg: "bg-gray-800/40 border-gray-700/50",
      };
  }
}
