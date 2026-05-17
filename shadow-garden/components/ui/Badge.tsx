import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  variant?: "default" | "green" | "purple" | "blue" | "yellow" | "red" | "gray";
  className?: string;
  size?: "sm" | "md";
}

const variants = {
  default: "bg-[#2d5a3d]/40 text-[#6ea882] border-[#2d5a3d]/60",
  green: "bg-green-900/40 text-green-300 border-green-700/50",
  purple: "bg-purple-900/40 text-purple-300 border-purple-700/50",
  blue: "bg-blue-900/40 text-blue-300 border-blue-700/50",
  yellow: "bg-yellow-900/40 text-yellow-300 border-yellow-700/50",
  red: "bg-red-900/40 text-red-300 border-red-700/50",
  gray: "bg-gray-800/60 text-gray-400 border-gray-700/50",
};

export function Badge({ children, variant = "default", className, size = "sm" }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium border rounded-full",
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
