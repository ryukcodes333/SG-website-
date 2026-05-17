import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search");

  try {
    const where = search
      ? { name: { contains: search, mode: "insensitive" as const } }
      : {};

    const [guilds, total] = await Promise.all([
      prisma.guild.findMany({
        where,
        orderBy: [{ level: "desc" }, { wins: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.guild.count({ where }),
    ]);

    return NextResponse.json({ guilds, total });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch guilds" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, emblem } = await req.json();

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Guild name is required" }, { status: 400 });
    }

    const existing = await prisma.guildMember.findUnique({
      where: { phone: session.phone },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You are already in a guild" },
        { status: 400 }
      );
    }

    const guild = await prisma.$transaction(async (tx) => {
      const newGuild = await tx.guild.create({
        data: {
          name: name.trim(),
          leaderPhone: session.phone,
          description: description?.trim() || "",
          emblem: emblem || null,
          memberCount: 1,
        },
      });
      await tx.guildMember.create({
        data: {
          guildId: newGuild.id,
          phone: session.phone,
          isLeader: true,
        },
      });
      return newGuild;
    });

    return NextResponse.json({ guild, success: true });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json(
        { error: "A guild with this name already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Failed to create guild" }, { status: 500 });
  }
}
