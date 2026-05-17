import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-[#4a8c5c]" />
    </div>
  );
}
