"use client";

import { useState, useEffect, useCallback } from "react";
import { CardItem } from "@/components/cards/CardItem";
import { TierFilter } from "@/components/cards/TierFilter";
import { Empty } from "@/components/ui/Empty";
import { Search, CreditCard, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import type { CardData } from "@/types";

const PAGE_SIZE = 40;

export default function CardsPage() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [tier, setTier] = useState("All");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: PAGE_SIZE.toString(),
        ...(tier !== "All" && { tier }),
        ...(query && { search: query }),
      });
      const res = await fetch(`/api/cards?${params}`);
      const data = await res.json();
      setCards(data.cards || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, tier, query]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(search);
    setPage(1);
  };

  const handleTierChange = (t: string) => {
    setTier(t);
    setPage(1);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="page-header">Card Library</h1>
        <p className="page-sub">
          Browse {total.toLocaleString()} anime cards across all tiers and series
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6ea882]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cards by name..."
              className="input-base pl-9 h-10"
            />
          </div>
          <button type="submit" className="btn-primary h-10 px-4 text-sm">
            Search
          </button>
        </form>
      </div>

      <TierFilter selected={tier} onChange={handleTierChange} />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-[#4a8c5c]" />
        </div>
      ) : cards.length === 0 ? (
        <Empty
          icon={CreditCard}
          title="No cards found"
          description="Try adjusting your search or tier filter"
        />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {cards.map((card, i) => (
              <CardItem
                key={card.id || `${card.title}-${i}`}
                card={{
                  id: card.id,
                  name: card.title,
                  tier: card.tier,
                  imageUrl: card.url,
                  series: card.series,
                }}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-[#9ca3af]">
                Page {page} of {totalPages} &mdash;{" "}
                {total.toLocaleString()} cards
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-ghost p-2 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-white px-2">
                  {page}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn-ghost p-2 disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
