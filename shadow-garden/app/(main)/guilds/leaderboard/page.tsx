import { prisma } from "@/lib/db";
import { Shield, Crown, Medal, Trophy } from "lucide-react";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";

async function getGuildLeaderboard() {
  try {
    return await prisma.guild.findMany({
      orderBy: [{ wins: "desc" }, { level: "desc" }, { treasury: "desc" }],
      take: 50,
    });
  } catch {
    return [];
  }
}

export default async function GuildLeaderboardPage() {
  const guilds = await getGuildLeaderboard();

  const rankIcon = (i: number) => {
    if (i === 0) return <Crown size={16} className="text-yellow-400" />;
    if (i === 1) return <Medal size={16} className="text-gray-300" />;
    if (i === 2) return <Medal size={16} className="text-orange-400" />;
    return null;
  };

  return (
    <div className="max-w-3xl space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Guild Leaderboard</h1>
          <p className="page-sub">Top guilds ranked by battle wins</p>
        </div>
        <Link href="/guilds" className="btn-ghost text-sm flex items-center gap-1.5">
          <Shield size={14} />
          All Guilds
        </Link>
      </div>

      <div className="card-base overflow-hidden">
        <div className="p-4 border-b border-[#1e3d28] flex items-center gap-2">
          <Trophy size={16} className="text-[#4a8c5c]" />
          <span className="text-sm font-medium text-white">
            Guild Rankings
          </span>
        </div>

        {guilds.length === 0 ? (
          <div className="p-8 text-center text-[#9ca3af] text-sm">
            No guilds yet. Be the first to create one!
          </div>
        ) : (
          <div className="divide-y divide-[#1e3d28]">
            {guilds.map((guild, i) => {
              const winRate =
                guild.wins + guild.losses > 0
                  ? Math.round((guild.wins / (guild.wins + guild.losses)) * 100)
                  : 0;

              return (
                <div
                  key={guild.id.toString()}
                  className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#1a3324]/40 ${
                    i < 3 ? "bg-[#1a3324]/20" : ""
                  }`}
                >
                  <div className="w-8 flex items-center justify-center shrink-0">
                    {rankIcon(i) || (
                      <span className="text-sm text-[#9ca3af] font-mono">
                        {i + 1}
                      </span>
                    )}
                  </div>

                  <div className="w-10 h-10 bg-[#2d5a3d]/40 border border-[#2d5a3d]/60 rounded-xl flex items-center justify-center shrink-0">
                    {guild.emblem ? (
                      <span className="text-lg">{guild.emblem}</span>
                    ) : (
                      <Shield size={16} className="text-[#4a8c5c]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white font-medium text-sm truncate">
                        {guild.name}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[#1a3324] text-[#6ea882] border border-[#1e3d28] shrink-0">
                        Lv. {guild.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#9ca3af]">
                      <span>{guild.memberCount} members</span>
                      <span className="text-[#6ea882]">{winRate}% win rate</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-white text-sm font-semibold">
                      {guild.wins}W / {guild.losses}L
                    </p>
                    <p className="text-xs text-[#9ca3af]">
                      {formatNumber(Number(guild.treasury))} gold
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
