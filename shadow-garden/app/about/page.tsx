import { Leaf, Shield, CreditCard, Zap, Users, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-3xl space-y-10 animate-slide-up">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Leaf size={18} className="text-[#4a8c5c]" />
          <span className="text-[#6ea882] text-sm font-medium">About</span>
        </div>
        <h1 className="page-header">Shadow Garden</h1>
        <p className="text-[#9ca3af] leading-relaxed">
          Shadow Garden is an anime card RPG platform built around collecting,
          trading, and battling with anime characters. Originally launched as a
          WhatsApp bot, it has grown into a full web platform with a rich economy,
          guild system, and Pokémon integration.
        </p>
      </div>

      <div className="card-base p-6 space-y-6">
        <h2 className="section-title">What is Shadow Garden?</h2>
        <div className="space-y-4 text-[#9ca3af] text-sm leading-relaxed">
          <p>
            Shadow Garden started as a WhatsApp-based card collection game where
            players could spawn, collect, and trade anime cards from hundreds of
            series. Cards range from tier T1 (common) all the way to TZ (ultra
            rare), with each tier having distinct visual styles.
          </p>
          <p>
            Beyond cards, Shadow Garden features a full RPG economy — players can
            earn gold, gamble, duel, and level up. The Pokémon system lets you
            catch and train Pokémon, adding another layer of depth to gameplay.
          </p>
          <p>
            The guild system allows players to form teams, collaborate, and compete
            in guild battles. Guild leaderboards track the most powerful guilds
            globally.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            icon: CreditCard,
            title: "35,000+ Cards",
            description:
              "An enormous library of anime cards spanning hundreds of series, from classic shonen to modern isekai.",
            color: "text-green-400",
          },
          {
            icon: Zap,
            title: "Pokémon Integration",
            description:
              "Catch Pokémon, train them, build your party, and battle other players' teams.",
            color: "text-yellow-400",
          },
          {
            icon: Shield,
            title: "Guild Battles",
            description:
              "Form guilds, recruit members, and compete in strategic guild battles for territory and rankings.",
            color: "text-blue-400",
          },
          {
            icon: Users,
            title: "Global Community",
            description:
              "Join thousands of players collecting cards, trading, and climbing the leaderboard together.",
            color: "text-purple-400",
          },
        ].map(({ icon: Icon, title, description, color }) => (
          <div key={title} className="card-base p-5">
            <Icon size={20} className={`${color} mb-3`} />
            <h3 className="text-white font-semibold font-display text-sm mb-2">
              {title}
            </h3>
            <p className="text-[#9ca3af] text-xs leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>

      <div className="card-base p-6">
        <h2 className="section-title">Card Tier System</h2>
        <div className="space-y-3">
          {[
            { tier: "T1", label: "Common", color: "text-gray-400", desc: "Widely available, easy to collect" },
            { tier: "T2", label: "Uncommon", color: "text-green-400", desc: "Slightly rare, found in most series" },
            { tier: "T3", label: "Rare", color: "text-blue-400", desc: "Notable characters with real value" },
            { tier: "T4", label: "Epic", color: "text-purple-400", desc: "Popular characters from top series" },
            { tier: "T5", label: "Legendary", color: "text-yellow-400", desc: "Iconic anime legends" },
            { tier: "T6", label: "Mythic", color: "text-orange-400", desc: "Extremely rare, high-demand cards" },
            { tier: "TS", label: "Special", color: "text-rose-400", desc: "Event cards and limited editions" },
          ].map(({ tier, label, color, desc }) => (
            <div
              key={tier}
              className="flex items-center gap-4 p-3 rounded-lg bg-[#1a3324]/40"
            >
              <span className={`text-sm font-bold w-8 shrink-0 ${color}`}>
                {tier}
              </span>
              <div>
                <span className="text-white text-sm font-medium">{label}</span>
                <p className="text-[#9ca3af] text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-base p-6">
        <h2 className="section-title">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Next.js 14",
            "TypeScript",
            "Tailwind CSS",
            "Prisma ORM",
            "Supabase (PostgreSQL)",
            "Zustand",
            "Lucide Icons",
            "JWT Auth",
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 bg-[#1a3324] border border-[#1e3d28] rounded-lg text-xs text-[#9ca3af]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
