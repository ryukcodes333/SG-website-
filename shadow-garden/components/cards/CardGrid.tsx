"use client";

import { CardItem } from "./CardItem";
import { cn } from "@/lib/utils";

interface CardLike {
  id?: string;
  name?: string;
  title?: string;
  tier: string;
  series?: string | null;
  imageUrl?: string | null;
  url?: string;
  price?: number;
}

interface Props {
  cards: CardLike[];
  showPrice?: boolean;
  compact?: boolean;
  className?: string;
  cols?: 2 | 3 | 4 | 5 | 6;
}

const colMap = {
  2: "grid-cols-2 sm:grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6",
};

export function CardGrid({ cards, showPrice, compact, className, cols = 4 }: Props) {
  return (
    <div className={cn("grid gap-3 md:gap-4", colMap[cols], className)}>
      {cards.map((card, i) => (
        <CardItem
          key={card.id || i}
          card={card}
          showPrice={showPrice}
          compact={compact}
        />
      ))}
    </div>
  );
}
