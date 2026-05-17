"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Zap, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Empty } from "@/components/ui/Empty";
import { Badge } from "@/components/ui/Badge";

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  stats: { base_stat: number; stat: { name: string } }[];
  base_experience: number;
}

const typeColors: Record<string, string> = {
  fire: "red",
  water: "blue",
  grass: "green",
  electric: "yellow",
  psychic: "purple",
  ice: "blue",
  dragon: "purple",
  dark: "gray",
  fairy: "purple",
  normal: "gray",
  fighting: "red",
  poison: "purple",
  ground: "yellow",
  flying: "blue",
  bug: "green",
  rock: "gray",
  ghost: "purple",
  steel: "gray",
};

const PAGE_SIZE = 40;

export default function PokemonsPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const total = 1025;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      if (query) {
        try {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`
          );
          if (res.ok) {
            const data = await res.json();
            setPokemon([data]);
          } else {
            setPokemon([]);
          }
        } catch {
          setPokemon([]);
        }
      } else {
        try {
          const offset = (page - 1) * PAGE_SIZE;
          const listRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
          );
          const list = await listRes.json();
          const details = await Promise.all(
            list.results.map((p: { url: string }) =>
              fetch(p.url).then((r) => r.json())
            )
          );
          setPokemon(details);
        } catch {
          setPokemon([]);
        }
      }
      setLoading(false);
    };
    fetchPokemon();
  }, [page, query]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(search);
    setPage(1);
  };

  const statShort: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="page-header">Pokémon</h1>
        <p className="page-sub">Discover all {total.toLocaleString()} Pokémon</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6ea882]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or number..."
            className="input-base pl-9 h-10"
          />
        </div>
        <button type="submit" className="btn-primary h-10 px-4 text-sm">
          Search
        </button>
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(""); setSearch(""); }}
            className="btn-ghost h-10 px-3 text-sm"
          >
            Clear
          </button>
        )}
      </form>

      {selected && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="card-base p-6 max-w-sm w-full space-y-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white font-display capitalize">
                  {selected.name}
                </h2>
                <p className="text-[#9ca3af] text-sm">
                  #{String(selected.id).padStart(3, "0")}
                </p>
              </div>
              <div className="flex gap-1">
                {selected.types.map((t) => (
                  <Badge
                    key={t.type.name}
                    variant={(typeColors[t.type.name] as "blue" | "red" | "green" | "yellow" | "purple" | "gray") || "gray"}
                  >
                    {t.type.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-32 h-32 bg-[#0b1a12] rounded-2xl border border-[#1e3d28] flex items-center justify-center">
                <img
                  src={selected.sprites.front_default}
                  alt={selected.name}
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-[#9ca3af] uppercase tracking-wide">
                Base Stats
              </p>
              {selected.stats.map((s) => (
                <div key={s.stat.name} className="flex items-center gap-3">
                  <span className="text-xs text-[#9ca3af] w-10 shrink-0">
                    {statShort[s.stat.name] || s.stat.name}
                  </span>
                  <div className="flex-1 h-1.5 bg-[#1a3324] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2d5a3d] to-[#4a8c5c] rounded-full"
                      style={{ width: `${Math.min(100, (s.base_stat / 255) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-white w-8 text-right">
                    {s.base_stat}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-xs text-[#9ca3af]">
                Base XP: <span className="text-white">{selected.base_experience}</span>
              </p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="btn-ghost w-full text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-[#4a8c5c]" />
        </div>
      ) : pokemon.length === 0 ? (
        <Empty
          icon={Zap}
          title="No Pokémon found"
          description="Try a different search term"
        />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {pokemon.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="card-base p-3 hover:-translate-y-1 transition-transform duration-200 text-left group"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 bg-[#0b1a12] rounded-xl border border-[#1e3d28] flex items-center justify-center group-hover:border-[#2d5a3d]/60 transition-colors">
                    <img
                      src={p.sprites.front_default}
                      alt={p.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>
                <p className="text-white text-xs font-medium capitalize text-center truncate">
                  {p.name}
                </p>
                <p className="text-[#9ca3af] text-xs text-center">
                  #{String(p.id).padStart(3, "0")}
                </p>
                <div className="flex justify-center gap-1 mt-1.5 flex-wrap">
                  {p.types.map((t) => (
                    <span
                      key={t.type.name}
                      className="text-xs px-1.5 py-0.5 rounded bg-[#1a3324] text-[#6ea882] border border-[#1e3d28] capitalize"
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {!query && totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-[#9ca3af]">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-ghost p-2 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-white px-2">{page}</span>
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
