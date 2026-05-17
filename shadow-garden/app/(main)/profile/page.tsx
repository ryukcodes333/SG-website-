import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { CardItem } from "@/components/cards/CardItem";
import { XpBar } from "@/components/ui/XpBar";
import { Badge } from "@/components/ui/Badge";
import {
  CreditCard,
  Zap,
  Shield,
  LogOut,
  Calendar,
  Star,
} from "lucide-react";
import Link from "next/link";
import { rankLabel, formatNumber } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  let user;
  let deckCards: { id: string; card: { id: string; name: string; tier: string; series: string | null; imageUrl: string | null } }[] = [];
  let pokemon: { id: string; name: string; level: number; types: unknown; pokemonId: number }[] = [];
  let guild = null;

  try {
    user = await prisma.user.findUnique({
      where: { phone: session.phone },
      include: {
        _count: { select: { userCards: true, userPokemon: true } },
      },
    });

    deckCards = (await prisma.userDeck.findMany({
      where: { phone: session.phone },
      include: {
        userCard: {
          include: {
            card: {
              select: { id: true, name: true, tier: true, series: true, imageUrl: true },
            },
          },
        },
      },
      orderBy: { slot: "asc" },
      take: 6,
    })).map((d) => ({
      id: d.id.toString(),
      card: {
        id: d.userCard.card.id.toString(),
        name: d.userCard.card.name,
        tier: d.userCard.card.tier,
        series: d.userCard.card.series,
        imageUrl: d.userCard.card.imageUrl,
      },
    }));

    pokemon = (await prisma.userPokemon.findMany({
      where: { phone: session.phone, inParty: true },
      orderBy: { slot: "asc" },
      take: 6,
    })).map((p) => ({
      id: p.id.toString(),
      name: p.name,
      level: p.level,
      types: p.types,
      pokemonId: p.pokemonId,
    }));

    const memberData = await prisma.guildMember.findUnique({
      where: { phone: session.phone },
      include: { guild: true },
    });
    guild = memberData?.guild ?? null;
  } catch {
    // DB not set up yet
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-[#9ca3af]">Profile not found. Please contact support.</p>
      </div>
    );
  }

  const profile = {
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
    profileFrame: user.profileFrame,
    profilePp: user.profilePp,
    profileBg: user.profileBg,
    pokemonBadges: user.pokemonBadges,
    pokemonWins: user.pokemonWins,
    pokemonLosses: user.pokemonLosses,
    team: user.team,
    createdAt: user.createdAt.toISOString(),
  };

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="max-w-4xl space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">My Profile</h1>
          <p className="page-sub flex items-center gap-1.5">
            <Calendar size={12} />
            Member since {memberSince}
          </p>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="btn-ghost text-sm flex items-center gap-1.5 text-red-400 hover:text-red-300"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </form>
      </div>

      <ProfileCard user={profile} />

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card-base p-4 space-y-1 text-center">
          <p className="text-2xl font-bold text-white font-display">
            {(user._count.userCards || 0).toLocaleString()}
          </p>
          <p className="text-xs text-[#9ca3af] flex items-center gap-1 justify-center">
            <CreditCard size={11} />
            Cards Collected
          </p>
        </div>
        <div className="card-base p-4 space-y-1 text-center">
          <p className="text-2xl font-bold text-white font-display">
            {user._count.userPokemon || 0}
          </p>
          <p className="text-xs text-[#9ca3af] flex items-center gap-1 justify-center">
            <Zap size={11} />
            Pokémon
          </p>
        </div>
        <div className="card-base p-4 space-y-1 text-center">
          <p className="text-2xl font-bold text-white font-display">
            {guild?.name || "None"}
          </p>
          <p className="text-xs text-[#9ca3af] flex items-center gap-1 justify-center">
            <Shield size={11} />
            Guild
          </p>
        </div>
      </div>

      {deckCards.length > 0 && (
        <div className="card-base p-5">
          <h2 className="section-title">Equipped Deck</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {deckCards.map((d) => (
              <CardItem
                key={d.id}
                card={{
                  id: d.card.id,
                  name: d.card.name,
                  tier: d.card.tier,
                  series: d.card.series,
                  imageUrl: d.card.imageUrl,
                }}
                compact
              />
            ))}
          </div>
        </div>
      )}

      {pokemon.length > 0 && (
        <div className="card-base p-5">
          <h2 className="section-title">Active Pokémon Party</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pokemon.map((p) => {
              const types = Array.isArray(p.types) ? p.types as string[] : [];
              return (
                <div
                  key={p.id}
                  className="bg-[#1a3324]/60 rounded-lg p-3 flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-[#0b1a12] rounded-lg overflow-hidden shrink-0">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.pokemonId}.png`}
                      alt={p.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium capitalize truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-[#9ca3af]">Lv. {p.level}</p>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {types.slice(0, 2).map((t: string) => (
                        <span
                          key={t}
                          className="text-xs px-1.5 py-0.5 rounded bg-[#2d5a3d]/40 text-[#6ea882] border border-[#2d5a3d]/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {guild && (
        <div className="card-base p-5">
          <h2 className="section-title">Guild</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#2d5a3d]/40 border border-[#2d5a3d]/60 rounded-xl flex items-center justify-center">
              {guild.emblem ? (
                <span className="text-2xl">{guild.emblem}</span>
              ) : (
                <Shield size={22} className="text-[#4a8c5c]" />
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold font-display">
                {guild.name}
              </h3>
              <p className="text-xs text-[#9ca3af] mt-0.5">
                Level {guild.level} &middot; {guild.memberCount} members &middot;{" "}
                {guild.wins}W / {guild.losses}L
              </p>
              {guild.description && (
                <p className="text-xs text-[#6ea882] mt-1">{guild.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="card-base p-5">
        <h2 className="section-title">RPG Stats</h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-[#9ca3af] mb-1.5">RPG Level {user.rpgLevel}</p>
            <XpBar xp={user.rpgXp} level={user.rpgLevel} showLabel={false} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            {[
              { label: "Pokémon Wins", value: user.pokemonWins, icon: "⚔" },
              { label: "Pokémon Losses", value: user.pokemonLosses, icon: "🛡" },
              { label: "Badges", value: user.pokemonBadges, icon: "★" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-[#1a3324]/40 rounded-lg p-3">
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-xs text-[#9ca3af]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
