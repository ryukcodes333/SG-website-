import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  CreditCard,
  Zap,
  Shield,
  Trophy,
  ArrowRight,
  Users,
  Star,
  Leaf,
} from "lucide-react";

async function getStats() {
  try {
    const [cards, users, guilds] = await Promise.all([
      prisma.card.count(),
      prisma.user.count(),
      prisma.guild.count(),
    ]);
    return { cards, users, guilds };
  } catch {
    return { cards: 35314, users: 0, guilds: 0 };
  }
}

export default async function HomePage() {
  const session = await getSession();
  const stats = await getStats();

  const features = [
    {
      icon: CreditCard,
      title: "Anime Card Collection",
      description:
        "Browse and collect over 35,000 unique anime cards spanning hundreds of series. Each card has its own tier and rarity.",
      href: "/cards",
      color: "text-green-400",
    },
    {
      icon: Zap,
      title: "Pokémon System",
      description:
        "Catch and train Pokémon, build your party, and battle other trainers. Level them up and track their stats.",
      href: "/pokemons",
      color: "text-yellow-400",
    },
    {
      icon: Shield,
      title: "Guilds",
      description:
        "Create or join a guild with other players. Work together, compete in guild battles, and climb the rankings.",
      href: "/guilds",
      color: "text-blue-400",
    },
    {
      icon: Trophy,
      title: "Leaderboards",
      description:
        "See how you stack up against other collectors globally or within your guild. Rise to the top.",
      href: "/leaderboard",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-12 animate-slide-up">
      <section className="relative overflow-hidden rounded-2xl bg-[#13261a] border border-[#1e3d28] p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#2d5a3d] rounded-lg flex items-center justify-center">
              <Leaf size={16} className="text-[#6ea882]" />
            </div>
            <span className="text-[#6ea882] text-sm font-medium">
              Shadow Garden
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display leading-tight mb-4">
            Collect. Battle.
            <br />
            <span className="text-[#4a8c5c]">Rise.</span>
          </h1>
          <p className="text-[#9ca3af] text-lg mb-8 max-w-lg">
            The ultimate anime card RPG. Discover rare cards, build your
            collection, join guilds, and compete for the top spot on the
            leaderboard.
          </p>
          <div className="flex flex-wrap gap-3">
            {session ? (
              <>
                <Link href="/cards" className="btn-primary flex items-center gap-2 text-sm">
                  Browse Cards <ArrowRight size={14} />
                </Link>
                <Link href="/profile" className="btn-ghost text-sm">
                  My Profile
                </Link>
              </>
            ) : (
              <>
                <Link href="/register" className="btn-primary flex items-center gap-2 text-sm">
                  Get Started <ArrowRight size={14} />
                </Link>
                <Link href="/login" className="btn-ghost text-sm">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden md:flex items-center justify-center opacity-5">
          <Leaf size={280} />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            {
              value: stats.cards.toLocaleString(),
              label: "Total Cards",
              icon: CreditCard,
            },
            { value: stats.users.toLocaleString(), label: "Players", icon: Users },
            { value: stats.guilds.toLocaleString(), label: "Guilds", icon: Shield },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="card-base p-5 text-center">
              <Icon size={20} className="text-[#4a8c5c] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white font-display">{value}</p>
              <p className="text-xs text-[#9ca3af] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="section-title">Explore Shadow Garden</h2>
          <p className="text-[#9ca3af] text-sm -mt-3">
            Everything you need in one place
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, title, description, href, color }) => (
            <Link
              key={href}
              href={href}
              className="card-base p-5 hover:border-[#2d5a3d]/60 hover:-translate-y-0.5 transition-all duration-200 group block"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a3324] rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className={color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-semibold font-display text-sm">
                      {title}
                    </h3>
                    <ArrowRight
                      size={14}
                      className="text-[#4a8c5c] opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <p className="text-[#9ca3af] text-xs leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="card-base p-6 md:p-8 text-center">
        <div className="w-12 h-12 bg-[#2d5a3d]/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Star size={24} className="text-[#4a8c5c]" />
        </div>
        <h2 className="text-2xl font-bold text-white font-display mb-2">
          Membership Perks
        </h2>
        <p className="text-[#9ca3af] text-sm max-w-md mx-auto mb-6">
          Unlock exclusive cards, higher card spawn rates, priority in guild
          battles, and much more with a Shadow Garden membership.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6 text-left">
          {[
            {
              tier: "Free",
              color: "text-gray-300",
              bg: "bg-gray-800/30",
              perks: ["Basic card collection", "Join one guild", "Global leaderboard"],
            },
            {
              tier: "Premium",
              color: "text-purple-300",
              bg: "bg-purple-900/20 border-purple-700/40",
              perks: ["2x card drop rate", "Custom profile frame", "Guild leader perks"],
            },
            {
              tier: "Elite",
              color: "text-yellow-300",
              bg: "bg-yellow-900/20 border-yellow-700/40",
              perks: ["Exclusive TS/TZ cards", "Priority spawns", "All Premium perks"],
            },
          ].map(({ tier, color, bg, perks }) => (
            <div key={tier} className={`card-base p-4 ${bg}`}>
              <p className={`font-bold font-display mb-3 ${color}`}>{tier}</p>
              <ul className="space-y-1.5">
                {perks.map((p) => (
                  <li key={p} className="text-xs text-[#9ca3af] flex items-start gap-1.5">
                    <span className="text-[#4a8c5c] mt-0.5">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {!session && (
          <Link href="/register" className="btn-primary text-sm inline-flex items-center gap-2">
            Create Free Account <ArrowRight size={14} />
          </Link>
        )}
      </section>
    </div>
  );
}
