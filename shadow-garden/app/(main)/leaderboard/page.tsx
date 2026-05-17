import { prisma } from "@/lib/db";
import { rankLabel, formatNumber } from "@/lib/utils";
import { Trophy, Medal, Crown } from "lucide-react";

async function getLeaderboard() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { xp: "desc" },
      take: 50,
      select: {
        phone: true,
        name: true,
        level: true,
        xp: true,
        title: true,
        membership: true,
        _count: { select: { userCards: true } },
        guildMember: {
          select: {
            guild: { select: { name: true } },
          },
        },
      },
    });
    return users;
  } catch {
    return [];
  }
}

export default async function LeaderboardPage() {
  const users = await getLeaderboard();

  const rankIcon = (i: number) => {
    if (i === 0) return <Crown size={16} className="text-yellow-400" />;
    if (i === 1) return <Medal size={16} className="text-gray-300" />;
    if (i === 2) return <Medal size={16} className="text-orange-400" />;
    return null;
  };

  return (
    <div className="max-w-3xl space-y-6 animate-slide-up">
      <div>
        <h1 className="page-header">Leaderboard</h1>
        <p className="page-sub">Top players ranked by XP</p>
      </div>

      <div className="card-base overflow-hidden">
        <div className="p-4 border-b border-[#1e3d28] flex items-center gap-2">
          <Trophy size={16} className="text-[#4a8c5c]" />
          <span className="text-sm font-medium text-white">Global Rankings</span>
        </div>

        {users.length === 0 ? (
          <div className="p-8 text-center text-[#9ca3af] text-sm">
            No players yet. Be the first to register!
          </div>
        ) : (
          <div className="divide-y divide-[#1e3d28]">
            {users.map((user, i) => {
              const rank = rankLabel(user.level);
              const isTop3 = i < 3;

              return (
                <div
                  key={user.phone}
                  className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#1a3324]/40 ${
                    isTop3 ? "bg-[#1a3324]/20" : ""
                  }`}
                >
                  <div className="w-8 flex items-center justify-center shrink-0">
                    {rankIcon(i) || (
                      <span className="text-sm text-[#9ca3af] font-mono">
                        {i + 1}
                      </span>
                    )}
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#2d5a3d]/40 border border-[#2d5a3d]/60 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white">
                      {(user.name || user.phone).charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white font-medium text-sm truncate">
                        {user.name || `Player_${user.phone.slice(-4)}`}
                      </span>
                      {user.membership === "elite" && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-900/40 text-yellow-300 border border-yellow-700/40 shrink-0">
                          Elite
                        </span>
                      )}
                      {user.membership === "premium" && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-700/40 shrink-0">
                          Premium
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#9ca3af]">
                      <span>{rank}</span>
                      {user.guildMember?.guild?.name && (
                        <span className="text-[#6ea882] truncate">
                          {user.guildMember.guild.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-white text-sm font-semibold">
                      Lv. {user.level}
                    </p>
                    <p className="text-xs text-[#9ca3af]">
                      {formatNumber(Number(user.xp))} XP
                    </p>
                  </div>

                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-[#4a8c5c] text-sm font-semibold">
                      {user._count.userCards}
                    </p>
                    <p className="text-xs text-[#9ca3af]">cards</p>
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
