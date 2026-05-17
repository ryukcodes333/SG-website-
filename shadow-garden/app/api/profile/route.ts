import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { phone: session.phone },
      include: {
        _count: { select: { userCards: true, userPokemon: true } },
        guildMember: { include: { guild: true } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id.toString(),
        phone: user.phone,
        name: user.name,
        wallet: Number(user.wallet),
        bank: Number(user.bank),
        gems: user.gems,
        xp: Number(user.xp),
        level: user.level,
        rpgXp: user.rpgXp,
        rpgLevel: user.rpgLevel,
        streak: user.streak,
        banned: user.banned,
        premium: user.premium,
        membership: user.membership,
        role: user.role,
        title: user.title,
        bio: user.bio,
        profilePp: user.profilePp,
        pokemonBadges: user.pokemonBadges,
        pokemonWins: user.pokemonWins,
        pokemonLosses: user.pokemonLosses,
        team: user.team,
        cardCount: user._count.userCards,
        pokemonCount: user._count.userPokemon,
        guild: user.guildMember?.guild || null,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const allowed = ["name", "bio", "profilePp"];
    const update: Record<string, unknown> = {};

    for (const key of allowed) {
      if (key in body) update[key] = body[key];
    }

    const user = await prisma.user.update({
      where: { phone: session.phone },
      data: update,
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id.toString(), name: user.name, bio: user.bio },
    });
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
