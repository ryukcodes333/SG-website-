import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function Empty({ icon: Icon, title, description, action, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <div className="w-16 h-16 bg-[#13261a] border border-[#1e3d28] rounded-2xl flex items-center justify-center mb-4">
        <Icon size={28} className="text-[#4a8c5c]" />
      </div>
      <h3 className="text-white font-semibold font-display mb-1">{title}</h3>
      {description && <p className="text-[#9ca3af] text-sm max-w-xs mb-4">{description}</p>}
      {action}
    </div>
  );
}
