"use client";

import Image from "next/image";
import { tierLabel, tierColor, tierBg, cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Props {
  card: {
    id?: string;
    name?: string;
    title?: string;
    tier: string;
    series?: string | null;
    imageUrl?: string | null;
    url?: string;
    price?: number;
  };
  showPrice?: boolean;
  compact?: boolean;
  className?: string;
}

export function CardItem({ card, showPrice, compact, className }: Props) {
  const name = card.name || card.title || "Unknown";
  const imageUrl = card.imageUrl || card.url;
  const tier = tierLabel(card.tier);
  const colorClass = tierColor(card.tier);
  const bgClass = tierBg(card.tier);

  if (compact) {
    return (
      <div
        className={cn(
          "card-base border rounded-lg overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer",
          bgClass,
          className
        )}
      >
        <div className="relative aspect-[3/4] bg-[#0b1a12]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Star size={24} className="text-[#2d5a3d]" />
            </div>
          )}
          <div className="absolute top-1.5 right-1.5">
            <span className={cn("text-xs font-bold bg-black/60 px-1.5 py-0.5 rounded", colorClass)}>
              {tier}
            </span>
          </div>
        </div>
        <div className="p-2">
          <p className="text-white text-xs font-medium truncate">{name}</p>
          {card.series && (
            <p className="text-[#6ea882] text-xs truncate">{card.series}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "card-base border rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-200 cursor-pointer group",
        bgClass,
        className
      )}
    >
      <div className="relative aspect-[3/4] bg-[#0b1a12]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Star size={32} className="text-[#2d5a3d]" />
            <span className="text-xs text-[#6ea882]">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute top-2 right-2">
          <span
            className={cn(
              "text-xs font-bold bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md border",
              colorClass,
              bgClass.split(" ")[1]
            )}
          >
            {tier}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white font-semibold text-sm leading-tight line-clamp-2">
            {name}
          </p>
          {card.series && (
            <p className="text-[#6ea882] text-xs mt-0.5 truncate">{card.series}</p>
          )}
        </div>
      </div>
      {showPrice && card.price !== undefined && (
        <div className="px-3 py-2 border-t border-[#1e3d28]/60 flex items-center justify-between">
          <span className="text-xs text-[#9ca3af]">Price</span>
          <span className="text-sm font-semibold text-[#4a8c5c]">
            ${card.price.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
