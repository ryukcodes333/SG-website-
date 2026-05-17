import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();

interface RawCard {
  tier: string;
  title: string;
  url: string;
  series?: string;
}

function normalizeTier(tier: string): string {
  const map: Record<string, string> = {
    "1": "T1", "2": "T2", "3": "T3", "4": "T4",
    "5": "T5", "6": "T6", "S": "TS", "Z": "TZ",
    T1: "T1", T2: "T2", T3: "T3", T4: "T4",
    T5: "T5", T6: "T6", TS: "TS", TZ: "TZ",
  };
  return map[tier] || tier;
}

async function main() {
  console.log("Seeding Shadow Garden database...");

  // 1. Seed cards from card.json
  const cardJsonPath = join(process.cwd(), "public", "card.json");
  let cards: RawCard[] = [];

  try {
    const raw = readFileSync(cardJsonPath, "utf-8");
    cards = JSON.parse(raw);
    console.log(`Found ${cards.length} cards to seed`);
  } catch (e) {
    console.warn("card.json not found or invalid. Skipping card seeding.");
  }

  if (cards.length > 0) {
    const BATCH = 500;
    let seeded = 0;
    for (let i = 0; i < cards.length; i += BATCH) {
      const batch = cards.slice(i, i + BATCH);
      await prisma.$transaction(
        batch.map((c, j) =>
          prisma.card.upsert({
            where: { externalId: `card_${i + j}` },
            update: {},
            create: {
              externalId: `card_${i + j}`,
              name: c.title || "Unknown",
              tier: normalizeTier(c.tier),
              series: c.series || null,
              imageUrl: c.url || null,
              price: tierPrice(normalizeTier(c.tier)),
            },
          })
        )
      );
      seeded += batch.length;
      if (seeded % 5000 === 0) console.log(`  Seeded ${seeded}/${cards.length} cards...`);
    }
    console.log(`Cards seeded: ${seeded}`);
  }

  // 2. Demo users
  const demoUsers = [
    { phone: "27821000001", name: "ShadowLord", level: 50, xp: 500000, title: "Shadow Lord", membership: "elite" },
    { phone: "27821000002", name: "CardMaster", level: 35, xp: 200000, title: "Garden Knight", membership: "premium" },
    { phone: "27821000003", name: "AnimeKing", level: 28, xp: 120000, title: "Apprentice", membership: "premium" },
    { phone: "27821000004", name: "SilentBlade", level: 20, xp: 60000, title: "Initiate", membership: "free" },
    { phone: "27821000005", name: "PhantomCard", level: 15, xp: 30000, title: "Newcomer", membership: "free" },
  ];

  for (const u of demoUsers) {
    await prisma.user.upsert({
      where: { phone: u.phone },
      update: {},
      create: {
        phone: u.phone,
        name: u.name,
        level: u.level,
        xp: u.xp,
        wallet: 50000,
        bank: 200000,
        gems: 100,
        title: u.title,
        membership: u.membership,
        premium: u.membership !== "free",
        streak: Math.floor(Math.random() * 30),
      },
    });
  }
  console.log("Demo users seeded");

  // 3. Demo guilds
  const guilds = [
    { name: "Shadow Council", leaderPhone: "27821000001", description: "The elite of Shadow Garden", emblem: "⚔", level: 10, wins: 50, losses: 10 },
    { name: "Anime Legends", leaderPhone: "27821000002", description: "United by anime", emblem: "🐉", level: 7, wins: 30, losses: 15 },
    { name: "Card Collectors", leaderPhone: "27821000003", description: "Collectors unite", emblem: "🌿", level: 5, wins: 20, losses: 8 },
  ];

  for (const g of guilds) {
    const existing = await prisma.guild.findUnique({ where: { name: g.name } });
    if (!existing) {
      const guild = await prisma.guild.create({
        data: {
          name: g.name,
          leaderPhone: g.leaderPhone,
          description: g.description,
          emblem: g.emblem,
          level: g.level,
          wins: g.wins,
          losses: g.losses,
          memberCount: 1,
          treasury: BigInt(g.level * 50000),
        },
      });

      const alreadyInGuild = await prisma.guildMember.findUnique({ where: { phone: g.leaderPhone } });
      if (!alreadyInGuild) {
        await prisma.guildMember.create({
          data: { guildId: guild.id, phone: g.leaderPhone, isLeader: true },
        });
      }
    }
  }
  console.log("Demo guilds seeded");

  console.log("Seeding complete!");
}

function tierPrice(tier: string): number {
  const prices: Record<string, number> = {
    T1: 100, T2: 500, T3: 2000, T4: 10000, T5: 50000, T6: 200000, TS: 500000, TZ: 1000000,
  };
  return prices[tier] || 100;
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
