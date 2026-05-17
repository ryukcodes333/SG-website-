import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import type { CardData } from "@/types";

let cardCache: CardData[] | null = null;

function loadCards(): CardData[] {
  if (cardCache) return cardCache;
  try {
    const filePath = join(process.cwd(), "public", "card.json");
    const raw = readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as CardData[];
    cardCache = data.map((c, i) => ({
      ...c,
      id: `card_${i}`,
      tier: normalizeTier(c.tier),
    }));
    return cardCache;
  } catch {
    return [];
  }
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "40");
  const tier = searchParams.get("tier");
  const search = searchParams.get("search")?.toLowerCase();
  const series = searchParams.get("series");

  let cards = loadCards();

  if (tier && tier !== "All") {
    cards = cards.filter((c) => normalizeTier(c.tier) === tier);
  }

  if (search) {
    cards = cards.filter(
      (c) =>
        c.title?.toLowerCase().includes(search) ||
        c.series?.toLowerCase().includes(search)
    );
  }

  if (series) {
    cards = cards.filter((c) => c.series === series);
  }

  const total = cards.length;
  const offset = (page - 1) * limit;
  const paged = cards.slice(offset, offset + limit);

  return NextResponse.json({ cards: paged, total, page, limit });
}
