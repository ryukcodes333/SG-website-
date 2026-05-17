import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "xp";
  const limit = parseInt(searchParams.get("limit") || "50");

  try {
    const orderBy =
      type === "cards"
        ? undefined
        : type === "level"
        ? { level: "desc" as const }
        : { xp: "desc" as const };

    const users = await prisma.user.findMany({
      orderBy: orderBy || { xp: "desc" },
      take: limit,
      select: {
        phone: true,
        name: true,
        level: true,
        xp: true,
        title: true,
        membership: true,
        _count: { select: { userCards: true } },
        guildMember: {
          select: { guild: { select: { name: true } } },
        },
      },
    });

    const ranked = users.map((u, i) => ({
      rank: i + 1,
      phone: u.phone.replace(/(\d{3})\d+(\d{4})/, "$1***$2"),
      name: u.name || `Player_${u.phone.slice(-4)}`,
      level: u.level,
      xp: Number(u.xp),
      title: u.title,
      membership: u.membership,
      cardCount: u._count.userCards,
      guildName: u.guildMember?.guild?.name || null,
    }));

    return NextResponse.json({ leaderboard: ranked });
  } catch {
    return NextResponse.json({ leaderboard: [] });
  }
}
