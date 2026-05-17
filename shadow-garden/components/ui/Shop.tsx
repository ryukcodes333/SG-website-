import { useState, useEffect } from "react";
import {
  Leaf, Home as HomeIcon, CreditCard, Zap, Shield, Trophy, Users, User,
  Info, Sun, Moon, Menu, X, ShoppingBag, Gem, Coins, Star, Sparkles,
  Package, Tag, ChevronRight, Check,
} from "lucide-react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

const NAV = [
  { label: "Home", icon: HomeIcon, href: "/" },
  { label: "Cards", icon: CreditCard, href: "/cards" },
  { label: "Pokémon", icon: Zap, href: "/pokemons" },
  { label: "Leaderboard", icon: Trophy, href: "/leaderboard" },
  { label: "Guilds", icon: Shield, href: "/guilds" },
  { label: "Guild Ranks", icon: Users, href: "/guilds/leaderboard" },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "About", icon: Info, href: "/about" },
];

type Theme = "dark" | "light";
type ShopTab = "packs" | "gems" | "boosts" | "premium";

const T = {
  dark: {
    bg: "#060e09", sidebar: "#080f0b", sidebarBorder: "#0f2016",
    card: "#0d1a12", cardBorder: "#162a1e", elevated: "#122018",
    accent: "#16a34a", highlight: "#22c55e", accentGlow: "rgba(22,163,74,0.25)",
    text: "#f1f5f9", textSubtle: "#9ca3af",
    navActive: "rgba(22,163,74,0.18)", navActiveBorder: "rgba(22,163,74,0.4)",
  },
  light: {
    bg: "#f0faf2", sidebar: "#ffffff", sidebarBorder: "#d1fae5",
    card: "#ffffff", cardBorder: "#bbf7d0", elevated: "#f0fdf4",
    accent: "#16a34a", highlight: "#15803d", accentGlow: "rgba(22,163,74,0.2)",
    text: "#111827", textSubtle: "#6b7280",
    navActive: "rgba(22,163,74,0.12)", navActiveBorder: "rgba(22,163,74,0.35)",
  },
};

const PACKS = [
  { name: "Standard Pack", desc: "5 random cards (C–SR)", price: 200, currency: "coins", color: "#60a5fa", tag: null, cards: 5 },
  { name: "Premium Pack", desc: "5 cards (SR–UR guaranteed)", price: 500, currency: "coins", color: "#a78bfa", tag: "Popular", cards: 5 },
  { name: "Elite Pack", desc: "3 cards (SSR–UR only)", price: 80, currency: "gems", color: "#fbbf24", tag: "Best Value", cards: 3 },
  { name: "Legendary Pack", desc: "1 guaranteed TS or TZ card", price: 200, currency: "gems", color: "#ec4899", tag: "Limited", cards: 1 },
];

const GEM_BUNDLES = [
  { gems: 50, price: "$0.99", bonus: null },
  { gems: 150, price: "$2.99", bonus: "+20 bonus" },
  { gems: 400, price: "$6.99", bonus: "+80 bonus", popular: true },
  { gems: 900, price: "$14.99", bonus: "+200 bonus" },
  { gems: 2000, price: "$29.99", bonus: "+600 bonus" },
];

const BOOSTS = [
  { name: "Drop Rate Boost", desc: "+50% card drop chance for 24h", price: 30, currency: "gems", color: "#22c55e" },
  { name: "XP Boost", desc: "Double XP for 24h", price: 25, currency: "gems", color: "#fbbf24" },
  { name: "Coin Boost", desc: "+25% coin gains for 48h", price: 20, currency: "gems", color: "#f97316" },
  { name: "Battle Boost", desc: "Free 5 ranked battles", price: 40, currency: "gems", color: "#a78bfa" },
];

const PREMIUM_PLANS = [
  {
    name: "Premium", color: "#a78bfa", border: "rgba(167,139,250,0.35)", accent: "rgba(167,139,250,0.1)",
    price: "$4.99/mo", perks: ["2× card drop rate", "Custom profile frame", "Guild leader perks", "+500 coins/day"],
  },
  {
    name: "Elite", color: "#fbbf24", border: "rgba(251,191,36,0.35)", accent: "rgba(251,191,36,0.1)",
    price: "$9.99/mo", perks: ["All Premium perks", "Exclusive TS/TZ cards", "Priority spawns", "+100 gems/week", "Custom badge"],
    featured: true,
  },
];

export default function SgShop() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ShopTab>("packs");
  const [bought, setBought] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const c = T[theme];

  function buy(key: string) {
    setBought(key);
    setTimeout(() => setBought(null), 1600);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: c.bg, color: c.text, fontFamily: "'Inter', system-ui, sans-serif", transition: "background 0.3s" }}>

      {isMobile && mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 30 }} />
      )}
      {isMobile && (
        <button onClick={() => setMobileOpen(v => !v)} style={{
          position: "fixed", top: 12, left: 12, zIndex: 50,
          background: c.card, border: `1px solid ${c.cardBorder}`,
          borderRadius: 8, padding: 8, cursor: "pointer", color: c.textSubtle,
          display: "flex", boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}>
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      )}

      {/* Sidebar */}
      <aside style={{
        position: "fixed", left: 0, top: 0, height: "100vh", zIndex: 40,
        width: 220, display: "flex", flexDirection: "column",
        background: c.sidebar, borderRight: `1px solid ${c.sidebarBorder}`,
        transition: "transform 0.3s ease, background 0.3s",
        transform: isMobile ? (mobileOpen ? "translateX(0)" : "translateX(-100%)") : "translateX(0)",
        boxShadow: theme === "dark" ? "4px 0 24px rgba(0,0,0,0.5)" : "4px 0 16px rgba(0,0,0,0.07)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, padding: "0 14px", borderBottom: `1px solid ${c.sidebarBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 12px ${c.accentGlow}` }}>
              <Leaf size={14} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: -0.5 }}>Shadow<span style={{ color: c.highlight }}>Garden</span></span>
          </div>
          {isMobile && <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: c.textSubtle, display: "flex" }}><X size={16} /></button>}
        </div>
        <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const isActive = false;
            return (
              <button key={href} onClick={() => { if (isMobile) setMobileOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                borderRadius: 8, border: `1px solid ${isActive ? c.navActiveBorder : "transparent"}`,
                background: isActive ? c.navActive : "transparent",
                color: isActive ? c.text : c.textSubtle,
                cursor: "pointer", fontSize: 13, fontWeight: isActive ? 600 : 400, width: "100%", textAlign: "left",
              }}>
                <Icon size={16} style={{ color: isActive ? c.highlight : "currentColor", flexShrink: 0 }} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
        <div style={{ padding: 12, borderTop: `1px solid ${c.sidebarBorder}`, display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "7px 10px",
            borderRadius: 8, border: `1px solid ${c.cardBorder}`,
            background: c.elevated, color: c.textSubtle, cursor: "pointer", fontSize: 12, fontWeight: 500,
          }}>
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: isMobile ? 0 : 220, padding: isMobile ? "60px 14px 28px" : "28px 32px", overflowY: "auto", maxHeight: "100vh", transition: "margin 0.3s" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: c.text, letterSpacing: -0.5, margin: 0 }}>Shop</h1>
              <p style={{ fontSize: 12, color: c.textSubtle, marginTop: 2 }}>Spend coins and gems to power up your collection</p>
            </div>
            {/* Wallet */}
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, background: c.card, border: `1px solid ${c.cardBorder}` }}>
                <span style={{ fontSize: 13 }}>🪙</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>4,200</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, background: c.card, border: `1px solid rgba(167,139,250,0.35)` }}>
                <Gem size={12} style={{ color: "#a78bfa" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#a78bfa" }}>340</span>
              </div>
            </div>
          </div>

          {/* Featured banner */}
          <div style={{
            borderRadius: 16, padding: isMobile ? "20px 18px" : "22px 28px", marginBottom: 20,
            background: "linear-gradient(135deg, #1a0a2e, #0e0a28, #060e09)",
            border: "1px solid rgba(167,139,250,0.25)", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(167,139,250,0.12), transparent 60%)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, background: "rgba(236,72,153,0.15)", border: "1px solid rgba(236,72,153,0.3)", marginBottom: 10 }}>
                <Sparkles size={10} style={{ color: "#ec4899" }} />
                <span style={{ fontSize: 10, fontWeight: 600, color: "#ec4899" }}>Limited Time</span>
              </div>
              <h2 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: -0.3 }}>Legendary Pack — Double Drop Weekend</h2>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>2× chance to pull a TZ card this weekend only. Ends Sunday 11:59PM.</p>
              <button onClick={() => buy("featured")} style={{
                display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px",
                borderRadius: 9, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff", boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
              }}>
                {bought === "featured" ? <><Check size={13} /> Purchased!</> : <>Buy for 200 💎 <ChevronRight size={12} /></>}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, background: c.card, borderRadius: 10, padding: 4, border: `1px solid ${c.cardBorder}`, marginBottom: 18, overflowX: "auto" }}>
            {([
              { key: "packs", label: "Card Packs", icon: Package },
              { key: "gems", label: "Get Gems", icon: Gem },
              { key: "boosts", label: "Boosts", icon: Zap },
              { key: "premium", label: "Membership", icon: Star },
            ] as { key: ShopTab; label: string; icon: typeof Star }[]).map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setActiveTab(key)} style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                padding: "7px 6px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer",
                border: "none", whiteSpace: "nowrap",
                background: activeTab === key ? `linear-gradient(135deg, ${c.accent}, ${c.highlight})` : "transparent",
                color: activeTab === key ? "#fff" : c.textSubtle, transition: "all 0.15s",
              }}>
                <Icon size={11} /> {label}
              </button>
            ))}
          </div>

          {/* Packs */}
          {activeTab === "packs" && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12 }}>
              {PACKS.map((pack, i) => (
                <div key={i} style={{ borderRadius: 14, overflow: "hidden", background: c.card, border: `1px solid ${c.cardBorder}`, display: "flex", flexDirection: "column" }}>
                  <div style={{
                    height: isMobile ? 90 : 110, position: "relative",
                    background: `linear-gradient(160deg, ${pack.color}18, ${pack.color}06)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    borderBottom: `1px solid ${c.cardBorder}`,
                  }}>
                    <Package size={isMobile ? 28 : 36} style={{ color: pack.color, opacity: 0.8 }} />
                    {pack.tag && (
                      <span style={{
                        position: "absolute", top: 7, right: 7,
                        fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 6,
                        background: pack.tag === "Limited" ? "rgba(236,72,153,0.2)" : "rgba(22,163,74,0.2)",
                        border: `1px solid ${pack.tag === "Limited" ? "rgba(236,72,153,0.35)" : "rgba(22,163,74,0.35)"}`,
                        color: pack.tag === "Limited" ? "#ec4899" : c.highlight,
                      }}>{pack.tag}</span>
                    )}
                  </div>
                  <div style={{ padding: "10px 10px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: c.text, marginBottom: 2 }}>{pack.name}</p>
                    <p style={{ fontSize: 10, color: c.textSubtle, marginBottom: 10, lineHeight: 1.4, flex: 1 }}>{pack.desc}</p>
                    <button onClick={() => buy(pack.name)} style={{
                      width: "100%", padding: "7px", borderRadius: 8, border: "none",
                      fontSize: 11, fontWeight: 700, cursor: "pointer",
                      background: bought === pack.name ? "#15803d" : `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
                      color: "#fff", transition: "all 0.2s",
                    }}>
                      {bought === pack.name ? "✓ Got it!" : `${pack.price} ${pack.currency === "gems" ? "💎" : "🪙"}`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Gems */}
          {activeTab === "gems" && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 12 }}>
              {GEM_BUNDLES.map((bundle, i) => (
                <div key={i} style={{
                  borderRadius: 14, padding: "16px 14px",
                  background: bundle.popular ? "linear-gradient(135deg, rgba(167,139,250,0.12), rgba(167,139,250,0.04))" : c.card,
                  border: `1px solid ${bundle.popular ? "rgba(167,139,250,0.35)" : c.cardBorder}`,
                  display: "flex", flexDirection: "column", gap: 8, position: "relative",
                }}>
                  {bundle.popular && (
                    <span style={{ position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 700, padding: "2px 10px", borderRadius: 10, background: "#7c3aed", color: "#fff", whiteSpace: "nowrap" }}>Most Popular</span>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Gem size={22} style={{ color: "#a78bfa" }} />
                    <p style={{ fontSize: 22, fontWeight: 900, color: "#a78bfa", letterSpacing: -0.5 }}>{bundle.gems}</p>
                    {bundle.bonus && <span style={{ fontSize: 10, fontWeight: 600, color: "#22c55e", background: "rgba(22,163,74,0.12)", padding: "2px 6px", borderRadius: 6 }}>{bundle.bonus}</span>}
                  </div>
                  <p style={{ fontSize: 10, color: c.textSubtle }}>Gems bundle</p>
                  <button onClick={() => buy(`gem-${i}`)} style={{
                    width: "100%", padding: "8px", borderRadius: 8, border: "none",
                    fontSize: 12, fontWeight: 700, cursor: "pointer",
                    background: bought === `gem-${i}` ? "#15803d" : "linear-gradient(135deg, #7c3aed, #a78bfa)",
                    color: "#fff",
                  }}>
                    {bought === `gem-${i}` ? "✓ Purchased!" : bundle.price}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Boosts */}
          {activeTab === "boosts" && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 12 }}>
              {BOOSTS.map((boost, i) => (
                <div key={i} style={{
                  padding: "14px 16px", borderRadius: 14,
                  background: c.card, border: `1px solid ${c.cardBorder}`,
                  display: "flex", alignItems: "center", gap: 14,
                }}>
                  <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, background: `${boost.color}18`, border: `1px solid ${boost.color}35`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Zap size={18} style={{ color: boost.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{boost.name}</p>
                    <p style={{ fontSize: 11, color: c.textSubtle, marginTop: 1 }}>{boost.desc}</p>
                  </div>
                  <button onClick={() => buy(`boost-${i}`)} style={{
                    padding: "7px 14px", borderRadius: 8, border: "none",
                    fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                    background: bought === `boost-${i}` ? "#15803d" : `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
                    color: "#fff",
                  }}>
                    {bought === `boost-${i}` ? "✓ Active!" : `${boost.price} 💎`}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Premium */}
          {activeTab === "premium" && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
              {PREMIUM_PLANS.map((plan, i) => (
                <div key={i} style={{
                  borderRadius: 16, padding: "22px 20px",
                  background: plan.accent, border: `1px solid ${plan.border}`,
                  display: "flex", flexDirection: "column", gap: 14, position: "relative", overflow: "hidden",
                }}>
                  {plan.featured && (
                    <span style={{ position: "absolute", top: 12, right: 12, fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 8, background: "#fbbf24", color: "#000" }}>Best Value</span>
                  )}
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 800, color: plan.color }}>{plan.name}</p>
                    <p style={{ fontSize: 24, fontWeight: 900, color: c.text, letterSpacing: -0.5, marginTop: 4 }}>{plan.price}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {plan.perks.map(p => (
                      <div key={p} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: plan.accent, border: `1px solid ${plan.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Check size={9} style={{ color: plan.color }} />
                        </div>
                        <span style={{ fontSize: 12, color: c.text }}>{p}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => buy(`plan-${i}`)} style={{
                    padding: "10px", borderRadius: 10, border: "none",
                    fontSize: 13, fontWeight: 700, cursor: "pointer",
                    background: bought === `plan-${i}` ? "#15803d" : `linear-gradient(135deg, ${plan.color}cc, ${plan.color})`,
                    color: "#fff", boxShadow: `0 4px 16px ${plan.border}`,
                  }}>
                    {bought === `plan-${i}` ? "✓ Subscribed!" : `Subscribe — ${plan.price}`}
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
