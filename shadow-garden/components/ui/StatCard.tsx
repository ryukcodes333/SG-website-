import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  className?: string;
  iconClass?: string;
}

export function StatCard({ icon: Icon, label, value, sub, className, iconClass }: Props) {
  return (
    <div className={cn("card-base p-4 space-y-2", className)}>
      <div className="flex items-center gap-2 text-[#9ca3af]">
        <Icon size={16} className={cn("text-[#4a8c5c]", iconClass)} />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-xl font-bold text-white font-display">{value}</p>
      {sub && <p className="text-xs text-[#6ea882]">{sub}</p>}
    </div>
  );
}
