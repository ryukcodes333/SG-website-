import { xpProgress, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
  xp: number;
  level: number;
  className?: string;
  showLabel?: boolean;
}

export function XpBar({ xp, level, className, showLabel = true }: Props) {
  const { current, needed, percent } = xpProgress(Number(xp), level);

  return (
    <div className={cn("space-y-1.5", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-[#9ca3af]">
          <span>Level {level}</span>
          <span>
            {formatNumber(current)} / {formatNumber(needed)} XP
          </span>
        </div>
      )}
      <div className="h-1.5 bg-[#1a3324] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#2d5a3d] to-[#4a8c5c] rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
