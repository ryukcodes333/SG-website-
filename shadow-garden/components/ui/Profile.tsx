import { useState, useEffect, useRef } from "react";
import {
  Leaf, Home as HomeIcon, CreditCard, Zap, Shield, Trophy, Users, User,
  Info, Sun, Moon, Menu, X, Camera, ImagePlus, Star, Swords, BookOpen,
  ChevronRight, Edit3, Upload,
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

const TIER_COLORS: Record<string, string> = {
  C: "#9ca3af", UC: "#22c55e", R: "#60a5fa", SR: "#a78bfa",
  SSR: "#fbbf24", UR: "#f97316", TS: "#ec4899", TZ: "#ef4444",
};

const COLLECTION = [
  { name: "Gojo Satoru", series: "JJK", tier: "UR" },
  { name: "Naruto", series: "Naruto", tier: "SSR" },
  { name: "Zero Two", series: "FranXX", tier: "TS" },
  { name: "Levi", series: "AoT", tier: "SR" },
  { name: "Rimuru", series: "Slime", tier: "UR" },
  { name: "Rem", series: "Re:Zero", tier: "SSR" },
  { name: "Itachi", series: "Naruto", tier: "TS" },
  { name: "Ainz", series: "Overlord", tier: "TZ" },
  { name: "Asuna", series: "SAO", tier: "SR" },
  { name: "Emilia", series: "Re:Zero", tier: "R" },
  { name: "Kirito", series: "SAO", tier: "SR" },
  { name: "Luffy", series: "One Piece", tier: "SSR" },
];

const DECK = [
  { name: "Gojo Satoru", series: "JJK", tier: "UR", atk: 980, def: 720 },
  { name: "Itachi", series: "Naruto", tier: "TS", atk: 870, def: 640 },
  { name: "Zero Two", series: "FranXX", tier: "TS", atk: 910, def: 580 },
  { name: "Rimuru", series: "Slime", tier: "UR", atk: 950, def: 800 },
  { name: "Ainz", series: "Overlord", tier: "TZ", atk: 999, def: 900 },
];

type Theme = "dark" | "light";
type Tab = "collection" | "deck" | "stats";

const T = {
  dark: {
    bg: "#060e09", sidebar: "#080f0b", sidebarBorder: "#0f2016",
    card: "#0d1a12", cardBorder: "#162a1e", elevated: "#122018",
    accent: "#16a34a", highlight: "#22c55e", accentGlow: "rgba(22,163,74,0.25)",
    text: "#f1f5f9", textSubtle: "#9ca3af",
    navActive: "rgba(22,163,74,0.18)", navActiveBorder: "rgba(22,163,74,0.4)",
    inputBg: "#0d1a12", glass: "rgba(6,14,9,0.85)",
  },
  light: {
    bg: "#f0faf2", sidebar: "#ffffff", sidebarBorder: "#d1fae5",
    card: "#ffffff", cardBorder: "#bbf7d0", elevated: "#f0fdf4",
    accent: "#16a34a", highlight: "#15803d", accentGlow: "rgba(22,163,74,0.2)",
    text: "#111827", textSubtle: "#6b7280",
    navActive: "rgba(22,163,74,0.12)", navActiveBorder: "rgba(22,163,74,0.35)",
    inputBg: "#f0fdf4", glass: "rgba(240,250,242,0.92)",
  },
};

export default function SgProfile() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("collection");
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [ppImage, setPpImage] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const c = T[theme];
  const bgRef = useRef<HTMLInputElement>(null);
  const ppRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setter(url);
  }

  const xpCurrent = 7340;
  const xpTotal = 10000;
  const xpPct = (xpCurrent / xpTotal) * 100;

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
            const isActive = href === "/profile";
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
      <main style={{ flex: 1, marginLeft: isMobile ? 0 : 220, overflowY: "auto", maxHeight: "100vh", transition: "margin 0.3s" }}>

        {/* Banner */}
        <div style={{ position: "relative", height: isMobile ? 140 : 200, overflow: "hidden" }}>
          {bgImage
            ? <img src={bgImage} alt="bg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #081408, #0a2010, #060e09)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ opacity: 0.08 }}><Leaf size={isMobile ? 100 : 160} /></div>
              </div>
          }
          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,14,9,0.9) 0%, transparent 60%)" }} />

          {/* Change background button */}
          <button onClick={() => bgRef.current?.click()} style={{
            position: "absolute", top: isMobile ? 46 : 12, right: 12,
            display: "flex", alignItems: "center", gap: 5,
            padding: "6px 12px", borderRadius: 8,
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", fontSize: 11, fontWeight: 500, cursor: "pointer",
          }}>
            <ImagePlus size={12} /> Change Background
          </button>
          <input ref={bgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e, setBgImage)} />
        </div>

        {/* Profile info row */}
        <div style={{ position: "relative", padding: isMobile ? "0 16px 16px" : "0 28px 20px", marginTop: -48 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14, flexWrap: "wrap" }}>

            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: isMobile ? 76 : 96, height: isMobile ? 76 : 96, borderRadius: "50%",
                border: `3px solid ${c.highlight}`,
                overflow: "hidden", background: c.card,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 20px ${c.accentGlow}`,
              }}>
                {ppImage
                  ? <img src={ppImage} alt="pp" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <User size={isMobile ? 32 : 42} style={{ color: c.textSubtle }} />
                }
              </div>
              <button onClick={() => ppRef.current?.click()} style={{
                position: "absolute", bottom: 2, right: 2,
                width: 22, height: 22, borderRadius: "50%",
                background: c.highlight, border: `2px solid ${c.bg}`,
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Camera size={10} color="#fff" />
              </button>
              <input ref={ppRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e, setPpImage)} />
            </div>

            {/* Name + level */}
            <div style={{ paddingBottom: 4, flex: 1, minWidth: 180 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <h1 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 800, color: c.text, letterSpacing: -0.5, margin: 0 }}>Ryuk_Collector</h1>
                <span style={{
                  padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 700,
                  background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
                  color: "#fff", boxShadow: `0 2px 8px ${c.accentGlow}`,
                }}>Lv. 47</span>
                <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 700, background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.35)", color: "#c084fc" }}>Premium</span>
              </div>
              <p style={{ fontSize: 12, color: c.textSubtle, marginTop: 3 }}>Shadow Garden · Guild: <span style={{ color: c.highlight }}>Phantom Aces</span></p>
            </div>

            <button style={{
              display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8,
              border: `1px solid ${c.cardBorder}`, background: c.card, color: c.textSubtle,
              cursor: "pointer", fontSize: 12, fontWeight: 500, alignSelf: "flex-end", marginBottom: 4,
            }}>
              <Edit3 size={12} /> Edit Profile
            </button>
          </div>

          {/* XP bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: c.textSubtle }}>XP Progress</span>
              <span style={{ fontSize: 11, color: c.highlight, fontWeight: 600 }}>{xpCurrent.toLocaleString()} / {xpTotal.toLocaleString()}</span>
            </div>
            <div style={{ height: 7, borderRadius: 10, background: theme === "dark" ? "rgba(255,255,255,0.06)" : "#e5e7eb", overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${xpPct}%`, borderRadius: 10,
                background: `linear-gradient(90deg, ${c.accent}, ${c.highlight})`,
                boxShadow: `0 0 12px ${c.accentGlow}`,
                transition: "width 0.5s ease",
              }} />
            </div>
            <p style={{ fontSize: 10, color: c.textSubtle, marginTop: 3 }}>{(xpTotal - xpCurrent).toLocaleString()} XP to Level 48</p>
          </div>

          {/* Quick stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 14 }}>
            {[
              { label: "Cards", value: "214" },
              { label: "Rank", value: "#38" },
              { label: "Wins", value: "92" },
              { label: "Coins", value: "4,200" },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center", padding: "10px 6px", borderRadius: 10, background: c.card, border: `1px solid ${c.cardBorder}` }}>
                <p style={{ fontSize: isMobile ? 14 : 18, fontWeight: 800, color: c.text, letterSpacing: -0.5 }}>{value}</p>
                <p style={{ fontSize: 9, color: c.textSubtle, marginTop: 2 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ padding: isMobile ? "0 16px" : "0 28px", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 4, background: c.card, borderRadius: 10, padding: 4, border: `1px solid ${c.cardBorder}` }}>
            {([
              { key: "collection", label: "Collection", icon: BookOpen },
              { key: "deck", label: "Active Deck", icon: Swords },
              { key: "stats", label: "Stats", icon: Trophy },
            ] as { key: Tab; label: string; icon: typeof Trophy }[]).map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setActiveTab(key)} style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                padding: "7px 4px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer",
                border: "none",
                background: activeTab === key ? `linear-gradient(135deg, ${c.accent}, ${c.highlight})` : "transparent",
                color: activeTab === key ? "#fff" : c.textSubtle,
                transition: "all 0.15s",
              }}>
                <Icon size={12} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ padding: isMobile ? "0 16px 24px" : "0 28px 28px" }}>

          {/* Collection */}
          {activeTab === "collection" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <p style={{ fontSize: 13, color: c.textSubtle }}>214 cards collected</p>
                <button style={{ fontSize: 11, color: c.highlight, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>View All <ChevronRight size={11} /></button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)", gap: 8 }}>
                {COLLECTION.map((card, i) => {
                  const col = TIER_COLORS[card.tier] || "#9ca3af";
                  return (
                    <div key={i} style={{ borderRadius: 10, overflow: "hidden", cursor: "pointer", border: `1px solid ${c.cardBorder}`, background: c.card }}>
                      <div style={{
                        aspectRatio: "3/4", position: "relative",
                        background: theme === "dark" ? "linear-gradient(160deg,#0a1a10,#060e09)" : "linear-gradient(160deg,#f0fdf4,#dcfce7)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Star size={13} style={{ color: col }} />
                        </div>
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent 50%)" }} />
                        <span style={{ position: "absolute", top: 4, right: 4, fontSize: 8, fontWeight: 700, padding: "1px 5px", borderRadius: 5, background: "rgba(0,0,0,0.7)", color: col }}>{card.tier}</span>
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "5px 5px" }}>
                          <p style={{ color: "#fff", fontSize: 8, fontWeight: 600, lineHeight: 1.3 }}>{card.name}</p>
                          <p style={{ color: c.highlight, fontSize: 7 }}>{card.series}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Deck */}
          {activeTab === "deck" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <p style={{ fontSize: 13, color: c.textSubtle }}>Active battle deck · {DECK.length}/5 slots</p>
                <button style={{
                  padding: "5px 12px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer",
                  background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`, color: "#fff", border: "none",
                }}>Edit Deck</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {DECK.map((card, i) => {
                  const col = TIER_COLORS[card.tier] || "#9ca3af";
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 14px", borderRadius: 12,
                      background: c.card, border: `1px solid ${c.cardBorder}`,
                    }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: c.textSubtle, width: 16, textAlign: "center" }}>{i + 1}</span>
                      <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Star size={14} style={{ color: col }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{card.name}</p>
                          <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 5, fontWeight: 700, background: "rgba(0,0,0,0.2)", color: col }}>{card.tier}</span>
                        </div>
                        <p style={{ fontSize: 11, color: c.textSubtle }}>{card.series}</p>
                      </div>
                      <div style={{ display: "flex", gap: 12, textAlign: "right" }}>
                        <div>
                          <p style={{ fontSize: 11, color: "#f97316", fontWeight: 700 }}>⚔ {card.atk}</p>
                          <p style={{ fontSize: 9, color: c.textSubtle }}>ATK</p>
                        </div>
                        <div>
                          <p style={{ fontSize: 11, color: "#60a5fa", fontWeight: 700 }}>🛡 {card.def}</p>
                          <p style={{ fontSize: 9, color: c.textSubtle }}>DEF</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stats */}
          {activeTab === "stats" && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 10 }}>
              {[
                { label: "Total Cards", value: "214", sub: "35,314 available", color: c.highlight },
                { label: "Global Rank", value: "#38", sub: "Top 3%", color: "#a78bfa" },
                { label: "Battle Wins", value: "92", sub: "12 losses", color: "#f97316" },
                { label: "Guild Rank", value: "Officer", sub: "Phantom Aces", color: "#fbbf24" },
                { label: "Coins", value: "4,200", sub: "Earned this week: 320", color: "#22c55e" },
                { label: "Pokémon", value: "17", sub: "Caught", color: "#60a5fa" },
                { label: "SSR+ Cards", value: "31", sub: "Rarest tier owned: TZ", color: "#ec4899" },
                { label: "Streak", value: "14 days", sub: "Daily login", color: "#34d399" },
                { label: "Member Since", value: "Jan 2024", sub: "16 months", color: c.textSubtle },
              ].map(({ label, value, sub, color }) => (
                <div key={label} style={{ padding: "14px 14px", borderRadius: 12, background: c.card, border: `1px solid ${c.cardBorder}` }}>
                  <p style={{ fontSize: isMobile ? 18 : 22, fontWeight: 800, color, letterSpacing: -0.5 }}>{value}</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: c.text, marginTop: 2 }}>{label}</p>
                  <p style={{ fontSize: 10, color: c.textSubtle, marginTop: 1 }}>{sub}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
