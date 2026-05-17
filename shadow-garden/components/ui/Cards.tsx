import { useState, useEffect } from "react";
import {
  CreditCard, Search, ChevronLeft, ChevronRight, Star, Leaf,
  Home as HomeIcon, Zap, Shield, Trophy, Users, User, Info, Sun, Moon, Menu, X,
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

const TIERS = ["All", "C", "UC", "R", "SR", "SSR", "UR", "TS", "TZ"];
const TIER_COLORS: Record<string, string> = {
  C: "#9ca3af", UC: "#22c55e", R: "#60a5fa", SR: "#a78bfa",
  SSR: "#fbbf24", UR: "#f97316", TS: "#ec4899", TZ: "#ef4444",
};

const SAMPLE_CARDS = [
  { name: "Naruto Uzumaki", series: "Naruto", tier: "SSR" },
  { name: "Gojo Satoru", series: "Jujutsu Kaisen", tier: "UR" },
  { name: "Levi Ackerman", series: "Attack on Titan", tier: "SR" },
  { name: "Zero Two", series: "Darling in FranXX", tier: "TS" },
  { name: "Monkey D. Luffy", series: "One Piece", tier: "SSR" },
  { name: "Rimuru Tempest", series: "Reincarnated as Slime", tier: "UR" },
  { name: "Asuna Yuuki", series: "Sword Art Online", tier: "SR" },
  { name: "Itachi Uchiha", series: "Naruto", tier: "TS" },
  { name: "Emilia", series: "Re:Zero", tier: "R" },
  { name: "Kirito", series: "Sword Art Online", tier: "SR" },
  { name: "Rem", series: "Re:Zero", tier: "SSR" },
  { name: "Ainz Ooal Gown", series: "Overlord", tier: "TZ" },
];

type Theme = "dark" | "light";
const T = {
  dark: {
    bg: "#060e09", sidebar: "#080f0b", sidebarBorder: "#0f2016",
    card: "#0d1a12", cardBorder: "#162a1e", elevated: "#122018",
    accent: "#16a34a", highlight: "#22c55e", accentGlow: "rgba(22,163,74,0.25)",
    text: "#f1f5f9", textSubtle: "#9ca3af",
    navActive: "rgba(22,163,74,0.18)", navActiveBorder: "rgba(22,163,74,0.4)",
    inputBg: "#0d1a12",
  },
  light: {
    bg: "#f0faf2", sidebar: "#ffffff", sidebarBorder: "#d1fae5",
    card: "#ffffff", cardBorder: "#bbf7d0", elevated: "#f0fdf4",
    accent: "#16a34a", highlight: "#15803d", accentGlow: "rgba(22,163,74,0.2)",
    text: "#111827", textSubtle: "#6b7280",
    navActive: "rgba(22,163,74,0.12)", navActiveBorder: "rgba(22,163,74,0.35)",
    inputBg: "#f0fdf4",
  },
};

export default function SgCards() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [selectedTier, setSelectedTier] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const c = T[theme];

  const filtered = SAMPLE_CARDS.filter(
    (card) =>
      (selectedTier === "All" || card.tier === selectedTier) &&
      (search === "" || card.name.toLowerCase().includes(search.toLowerCase()))
  );

  const cols = isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(150px, 1fr))";

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
          display: "flex", alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
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
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 12px ${c.accentGlow}`,
            }}>
              <Leaf size={14} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: -0.5 }}>
              Shadow<span style={{ color: c.highlight }}>Garden</span>
            </span>
          </div>
          {isMobile && (
            <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: c.textSubtle, display: "flex" }}>
              <X size={16} />
            </button>
          )}
        </div>

        <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/cards";
            return (
              <button key={href} onClick={() => { if (isMobile) setMobileOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                borderRadius: 8, border: `1px solid ${isActive ? c.navActiveBorder : "transparent"}`,
                background: isActive ? c.navActive : "transparent",
                color: isActive ? c.text : c.textSubtle,
                cursor: "pointer", fontSize: 13, fontWeight: isActive ? 600 : 400,
                width: "100%", textAlign: "left",
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
          <button style={{
            padding: "9px 12px", borderRadius: 8, border: "none",
            background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
            color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer",
            boxShadow: `0 4px 16px ${c.accentGlow}`,
          }}>Sign In</button>
        </div>
      </aside>

      {/* Main */}
      <main style={{
        flex: 1,
        marginLeft: isMobile ? 0 : 220,
        padding: isMobile ? "60px 14px 24px" : "28px 32px",
        overflowY: "auto", maxHeight: "100vh",
        transition: "margin 0.3s",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: c.text, marginBottom: 2, letterSpacing: -0.5 }}>Card Library</h1>
          <p style={{ fontSize: 12, color: c.textSubtle, marginBottom: 20 }}>Browse 35,314 anime cards across all tiers and series</p>

          {/* Search */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: c.highlight }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cards..."
                style={{
                  width: "100%", padding: "9px 10px 9px 32px", borderRadius: 10,
                  background: c.inputBg, border: `1px solid ${c.cardBorder}`,
                  color: c.text, fontSize: 13, outline: "none", boxSizing: "border-box",
                }} />
            </div>
            <button style={{
              padding: "9px 16px", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
              background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`, color: "#fff",
            }}>Search</button>
          </div>

          {/* Tier filters */}
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 20 }}>
            {TIERS.map(t => (
              <button key={t} onClick={() => setSelectedTier(t)} style={{
                padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer",
                background: selectedTier === t ? `linear-gradient(135deg, ${c.accent}, ${c.highlight})` : c.card,
                border: `1px solid ${selectedTier === t ? "transparent" : c.cardBorder}`,
                color: selectedTier === t ? "#fff" : (TIER_COLORS[t] || c.textSubtle),
                transition: "all 0.15s",
              }}>{t}</button>
            ))}
          </div>

          {/* Card grid */}
          <div style={{ display: "grid", gridTemplateColumns: cols, gap: 10, marginBottom: 20 }}>
            {filtered.map((card, i) => {
              const tierColor = TIER_COLORS[card.tier] || "#9ca3af";
              return (
                <div key={i} style={{
                  borderRadius: 12, overflow: "hidden", cursor: "pointer",
                  background: c.card, border: `1px solid ${c.cardBorder}`,
                }}>
                  <div style={{
                    position: "relative", aspectRatio: "3/4",
                    background: theme === "dark" ? "linear-gradient(160deg, #0a1a10, #060e09)" : "linear-gradient(160deg, #f0fdf4, #dcfce7)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Star size={18} style={{ color: tierColor }} />
                    </div>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent 50%)" }} />
                    <div style={{ position: "absolute", top: 7, right: 7 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 6, background: "rgba(0,0,0,0.7)", color: tierColor }}>
                        {card.tier}
                      </span>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px" }}>
                      <p style={{ color: "#fff", fontSize: 11, fontWeight: 600, lineHeight: 1.3, marginBottom: 1 }}>{card.name}</p>
                      <p style={{ color: c.highlight, fontSize: 10 }}>{card.series}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: 11, color: c.textSubtle }}>Page {page} of 883</p>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{
                padding: 6, borderRadius: 8, border: `1px solid ${c.cardBorder}`,
                background: c.card, cursor: "pointer", color: c.textSubtle, opacity: page === 1 ? 0.4 : 1,
              }}><ChevronLeft size={14} /></button>
              <span style={{ fontSize: 13, color: c.text, minWidth: 20, textAlign: "center" }}>{page}</span>
              <button onClick={() => setPage(p => Math.min(883, p + 1))} disabled={page === 883} style={{
                padding: 6, borderRadius: 8, border: `1px solid ${c.cardBorder}`,
                background: c.card, cursor: "pointer", color: c.textSubtle, opacity: page === 883 ? 0.4 : 1,
              }}><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
