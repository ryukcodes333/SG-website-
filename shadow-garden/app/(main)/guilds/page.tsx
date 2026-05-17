import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { GuildCard } from "@/components/guilds/GuildCard";
import { Shield, Plus, Trophy } from "lucide-react";
import { Empty } from "@/components/ui/Empty";

async function getGuilds() {
  try {
    return await prisma.guild.findMany({
      orderBy: [{ level: "desc" }, { treasury: "desc" }],
      take: 30,
    });
  } catch {
    return [];
  }
}

export default async function GuildsPage() {
  const [session, guilds] = await Promise.all([getSession(), getGuilds()]);

  return (
    <div className="max-w-3xl space-y-6 animate-slide-up">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-header">Guilds</h1>
          <p className="page-sub">
            {guilds.length} active guilds — join one or create your own
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link href="/guilds/leaderboard" className="btn-ghost text-sm flex items-center gap-1.5">
            <Trophy size={14} />
            <span className="hidden sm:inline">Leaderboard</span>
          </Link>
          {session && (
            <Link href="/guilds/create" className="btn-primary text-sm flex items-center gap-1.5">
              <Plus size={14} />
              Create
            </Link>
          )}
        </div>
      </div>

      {guilds.length === 0 ? (
        <Empty
          icon={Shield}
          title="No guilds yet"
          description="Be the first to create a guild and recruit members"
          action={
            session ? (
              <Link href="/guilds/create" className="btn-primary text-sm">
                Create Guild
              </Link>
            ) : (
              <Link href="/register" className="btn-primary text-sm">
                Join Shadow Garden
              </Link>
            )
          }
        />
      ) : (
        <div className="space-y-3">
          {guilds.map((guild) => (
            <GuildCard
              key={guild.id.toString()}
              guild={{
                id: guild.id.toString(),
                name: guild.name,
                leaderPhone: guild.leaderPhone,
                description: guild.description,
                emblem: guild.emblem,
                level: guild.level,
                treasury: Number(guild.treasury),
                gems: guild.gems,
                wins: guild.wins,
                losses: guild.losses,
                memberCount: guild.memberCount,
                createdAt: guild.createdAt.toISOString(),
              }}
            />
          ))}
        </div>
      )}

      {!session && (
        <div className="card-base p-5 text-center">
          <p className="text-[#9ca3af] text-sm mb-3">
            Sign in to create or join a guild
          </p>
          <div className="flex items-center justify-center gap-2">
            <Link href="/login" className="btn-ghost text-sm">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary text-sm">
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
