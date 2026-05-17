"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

const EMBLEMS = ["⚔", "🛡", "🌿", "🌑", "🔥", "💧", "⚡", "🌸", "🗡", "🏰", "🦅", "🐉"];

export default function CreateGuildPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emblem, setEmblem] = useState(EMBLEMS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/guilds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim(), emblem }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create guild");
        return;
      }

      router.push("/guilds");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/guilds" className="btn-ghost p-2">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="page-header mb-0">Create Guild</h1>
          <p className="text-xs text-[#9ca3af]">Build your own guild and recruit members</p>
        </div>
      </div>

      <div className="card-base p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-medium text-[#9ca3af] block mb-1.5 uppercase tracking-wide">
              Guild Emblem
            </label>
            <div className="flex flex-wrap gap-2">
              {EMBLEMS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmblem(e)}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center border transition-all duration-150 ${
                    emblem === e
                      ? "bg-[#2d5a3d]/60 border-[#4a8c5c]/60"
                      : "bg-[#1a3324] border-[#1e3d28] hover:border-[#2d5a3d]"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#9ca3af] block mb-1.5 uppercase tracking-wide">
              Guild Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Shield size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6ea882]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Shadow Wolves"
                className="input-base pl-9"
                required
                minLength={2}
                maxLength={30}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#9ca3af] block mb-1.5 uppercase tracking-wide">
              Description{" "}
              <span className="text-[#6ea882] normal-case font-normal">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell others what your guild is about..."
              className="input-base resize-none h-24"
              maxLength={200}
            />
            <p className="text-xs text-[#9ca3af] mt-1 text-right">
              {description.length}/200
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <Link href="/guilds" className="btn-ghost flex-1 text-center text-sm">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || name.trim().length < 2}
              className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <>
                  Create Guild <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
