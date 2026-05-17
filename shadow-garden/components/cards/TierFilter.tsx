"use client";

import { cn } from "@/lib/utils";

const TIERS = ["All", "T1", "T2", "T3", "T4", "T5", "T6", "TS"];

interface Props {
  selected: string;
  onChange: (tier: string) => void;
}

const tierColors: Record<string, string> = {
  All: "text-white",
  T1: "text-gray-400",
  T2: "text-green-400",
  T3: "text-blue-400",
  T4: "text-purple-400",
  T5: "text-yellow-400",
  T6: "text-orange-400",
  TS: "text-rose-400",
};

export function TierFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {TIERS.map((tier) => (
        <button
          key={tier}
          onClick={() => onChange(tier)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150",
            selected === tier
              ? "bg-[#2d5a3d]/60 border-[#4a8c5c]/60 text-white"
              : "bg-[#13261a] border-[#1e3d28] text-[#9ca3af] hover:border-[#2d5a3d] hover:text-white",
            selected === tier && tierColors[tier]
          )}
        >
          {tier}
        </button>
      ))}
    </div>
  );
}
