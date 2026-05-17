import { useState, useEffect } from "react";
import {
  CreditCard, Zap, Shield, Trophy, ArrowRight, Users, Star, Leaf,
  Home as HomeIcon, User, Info, Menu, X, Sun, Moon, ChevronLeft, ChevronRight,
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

const FEATURES = [
  { icon: CreditCard, title: "Anime Card Collection", color: "#22c55e", desc: "Browse and collect over 35,000 unique anime cards spanning hundreds of series." },
  { icon: Zap, title: "Pokémon System", color: "#eab308", desc: "Catch and train Pokémon, build your party, and battle other trainers." },
  { icon: Shield, title: "Guilds", color: "#3b82f6", desc: "Create or join a guild. Work together, compete, and climb the rankings." },
  { icon: Trophy, title: "Leaderboards", color: "#a855f7", desc: "See how you stack up against other collectors globally." },
];

const TIERS = [
  { tier: "Free", color: "#9ca3af", perks: ["Basic card collection", "Join one guild", "Global leaderboard"] },
  { tier: "Premium", color: "#c084fc", accent: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.35)", perks: ["2x card drop rate", "Custom profile frame", "Guild leader perks"] },
  { tier: "Elite", color: "#fbbf24", accent: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.35)", perks: ["Exclusive TS/TZ cards", "Priority spawns", "All Premium perks"] },
];

type Theme = "dark" | "light";
const T = {
  dark: {
    bg: "#060e09", sidebar: "#080f0b", sidebarBorder: "#0f2016",
    card: "#0d1a12", cardBorder: "#162a1e", elevated: "#122018",
    accent: "#16a34a", highlight: "#22c55e", accentGlow: "rgba(22,163,74,0.25)",
    text: "#f1f5f9", textSubtle: "#9ca3af",
    navActive: "rgba(22,163,74,0.18)", navActiveBorder: "rgba(22,163,74,0.4)",
    heroGradient: "linear-gradient(135deg, #0d1a12 0%, #0a1a10 50%, #060e09 100%)",
    statCard: "linear-gradient(135deg, #0d1a12, #0f1e14)",
  },
  light: {
    bg: "#f0faf2", sidebar: "#ffffff", sidebarBorder: "#d1fae5",
    card: "#ffffff", cardBorder: "#bbf7d0", elevated: "#f0fdf4",
    accent: "#16a34a", highlight: "#15803d", accentGlow: "rgba(22,163,74,0.2)",
    text: "#111827", textSubtle: "#6b7280",
    navActive: "rgba(22,163,74,0.12)", navActiveBorder: "rgba(22,163,74,0.35)",
    heroGradient: "linear-gradient(135deg, #dcfce7 0%, #d1fae5 50%, #ecfdf5 100%)",
    statCard: "linear-gradient(135deg, #ffffff, #f0fdf4)",
  },
};

export default function SgHome() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("/");
  const isMobile = useIsMobile();
  const c = T[theme];

  const sidebarWidth = collapsed && !isMobile ? 64 : 240;
  const sidebarVisible = isMobile ? mobileOpen : true;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: c.bg, color: c.text, fontFamily: "'Inter', system-ui, sans-serif", transition: "background 0.3s, color 0.3s" }}>

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 30 }} />
      )}

      {/* Hamburger — mobile only */}
      {isMobile && (
        <button onClick={() => setMobileOpen(v => !v)} style={{
          position: "fixed", top: 12, left: 12, zIndex: 50,
          background: c.card, border: `1px solid ${c.cardBorder}`,
          borderRadius: 8, padding: 8, cursor: "pointer", color: c.textSubtle,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}>
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      )}

      {/* Sidebar */}
      <aside style={{
        position: "fixed", left: 0, top: 0, height: "100vh", zIndex: 40,
        width: sidebarWidth,
        display: "flex", flexDirection: "column",
        background: c.sidebar,
        borderRight: `1px solid ${c.sidebarBorder}`,
        transition: "transform 0.3s ease, width 0.3s ease, background 0.3s",
        transform: sidebarVisible ? "translateX(0)" : "translateX(-100%)",
        boxShadow: theme === "dark" ? "4px 0 24px rgba(0,0,0,0.5)" : "4px 0 16px rgba(0,0,0,0.07)",
      }}>
        {/* Logo row */}
        <div style={{
          display: "flex", alignItems: "center", height: 60, padding: "0 14px",
          borderBottom: `1px solid ${c.sidebarBorder}`,
          justifyContent: collapsed && !isMobile ? "center" : "space-between",
        }}>
          {(!collapsed || isMobile) && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 12px ${c.accentGlow}`, flexShrink: 0,
              }}>
                <Leaf size={14} color="#fff" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: -0.5, whiteSpace: "nowrap" }}>
                Shadow<span style={{ color: c.highlight }}>Garden</span>
              </span>
            </div>
          )}
          {collapsed && !isMobile && (
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 12px ${c.accentGlow}`,
            }}>
              <Leaf size={14} color="#fff" />
            </div>
          )}
          {/* Desktop collapse toggle */}
          {!isMobile && (
            <button onClick={() => setCollapsed(v => !v)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: c.textSubtle, padding: 4, borderRadius: 4, display: "flex",
            }}>
              {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          )}
          {/* Mobile close X */}
          {isMobile && (
            <button onClick={() => setMobileOpen(false)} style={{
              background: "none", border: "none", cursor: "pointer", color: c.textSubtle, padding: 4, display: "flex",
            }}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const isActive = active === href;
            const showLabel = !collapsed || isMobile;
            return (
              <button key={href} onClick={() => { setActive(href); if (isMobile) setMobileOpen(false); }}
                style={{
                  display: "flex", alignItems: "center",
                  gap: showLabel ? 10 : 0,
                  padding: showLabel ? "9px 12px" : "9px 0",
                  justifyContent: showLabel ? "flex-start" : "center",
                  borderRadius: 8,
                  border: `1px solid ${isActive ? c.navActiveBorder : "transparent"}`,
                  background: isActive ? c.navActive : "transparent",
                  color: isActive ? c.text : c.textSubtle,
                  cursor: "pointer", fontSize: 13, fontWeight: isActive ? 600 : 400,
                  width: "100%", textAlign: "left", transition: "all 0.15s",
                }}>
                <Icon size={16} style={{ color: isActive ? c.highlight : "currentColor", flexShrink: 0 }} />
                {showLabel && <span>{label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer: theme toggle + sign in */}
        {(!collapsed || isMobile) && (
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
        )}
      </aside>

      {/* Page content */}
      <main style={{
        flex: 1,
        marginLeft: isMobile ? 0 : sidebarWidth,
        padding: isMobile ? "60px 16px 28px" : "28px 32px",
        overflowY: "auto", maxHeight: "100vh",
        transition: "margin 0.3s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Hero */}
          <section style={{
            borderRadius: 18, padding: isMobile ? "28px 20px" : "44px 40px",
            position: "relative", overflow: "hidden",
            background: c.heroGradient, border: `1px solid ${c.cardBorder}`,
            boxShadow: theme === "dark" ? "0 0 60px rgba(22,163,74,0.08)" : "0 4px 24px rgba(0,0,0,0.06)",
          }}>
            <div style={{ position: "relative", zIndex: 1, maxWidth: 520 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 18,
                padding: "4px 12px", borderRadius: 20,
                background: theme === "dark" ? "rgba(22,163,74,0.15)" : "rgba(22,163,74,0.1)",
                border: "1px solid rgba(22,163,74,0.3)",
              }}>
                <Leaf size={12} style={{ color: c.highlight }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: c.highlight }}>Shadow Garden</span>
              </div>
              <h1 style={{ fontSize: isMobile ? 34 : 52, fontWeight: 900, lineHeight: 1.08, marginBottom: 14, letterSpacing: -1.5 }}>
                Collect. Battle.<br />
                <span style={{ color: c.highlight, textShadow: theme === "dark" ? "0 0 40px rgba(34,197,94,0.4)" : "none" }}>Rise.</span>
              </h1>
              <p style={{ fontSize: isMobile ? 14 : 16, lineHeight: 1.65, color: c.textSubtle, marginBottom: 24, maxWidth: 440 }}>
                The ultimate anime card RPG. Discover rare cards, build your collection, join guilds, and compete for the top spot.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "10px 20px",
                  borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer",
                  background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
                  color: "#fff", boxShadow: `0 4px 20px ${c.accentGlow}`,
                }}>Get Started <ArrowRight size={14} /></button>
                <button style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "10px 20px",
                  borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
                  background: "transparent", color: c.textSubtle, border: `1px solid ${c.cardBorder}`,
                }}>Sign In</button>
              </div>
            </div>
            <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", opacity: 0.04, pointerEvents: "none" }}>
              <Leaf size={isMobile ? 160 : 280} />
            </div>
          </section>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { value: "35,314", label: "Total Cards", icon: CreditCard },
              { value: "1,248", label: "Players", icon: Users },
              { value: "87", label: "Guilds", icon: Shield },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} style={{
                padding: isMobile ? "14px 10px" : "20px 16px", textAlign: "center", borderRadius: 14,
                background: c.statCard, border: `1px solid ${c.cardBorder}`,
              }}>
                <Icon size={16} style={{ color: c.highlight, margin: "0 auto 6px" }} />
                <p style={{ fontSize: isMobile ? 20 : 26, fontWeight: 800, color: c.text, letterSpacing: -0.5 }}>{value}</p>
                <p style={{ fontSize: 10, color: c.textSubtle, marginTop: 2 }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, color: c.text }}>Explore Shadow Garden</h2>
            <p style={{ fontSize: 12, color: c.textSubtle, marginBottom: 14 }}>Everything you need in one place</p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 12 }}>
              {FEATURES.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} style={{
                  padding: 16, borderRadius: 14, cursor: "pointer",
                  background: c.card, border: `1px solid ${c.cardBorder}`,
                }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#f0fdf4",
                      border: `1px solid ${c.cardBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{title}</p>
                        <ArrowRight size={12} style={{ color: c.highlight }} />
                      </div>
                      <p style={{ fontSize: 12, color: c.textSubtle, lineHeight: 1.5 }}>{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Membership */}
          <div style={{
            padding: isMobile ? "24px 16px" : "32px 28px", borderRadius: 18, textAlign: "center",
            background: c.card, border: `1px solid ${c.cardBorder}`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14, margin: "0 auto 14px",
              background: theme === "dark" ? "rgba(22,163,74,0.12)" : "rgba(22,163,74,0.08)",
              border: "1px solid rgba(22,163,74,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Star size={20} style={{ color: c.highlight }} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: c.text }}>Membership Perks</h2>
            <p style={{ fontSize: 13, color: c.textSubtle, maxWidth: 400, margin: "0 auto 20px", lineHeight: 1.6 }}>
              Unlock exclusive cards, higher spawn rates, priority in guild battles, and more.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 12, marginBottom: 20, textAlign: "left" }}>
              {TIERS.map(({ tier, color, accent, border, perks }) => (
                <div key={tier} style={{
                  padding: 14, borderRadius: 12,
                  background: accent || (theme === "dark" ? "rgba(255,255,255,0.02)" : "#f9fafb"),
                  border: `1px solid ${border || c.cardBorder}`,
                }}>
                  <p style={{ fontWeight: 700, color, marginBottom: 8, fontSize: 13 }}>{tier}</p>
                  {perks.map(p => (
                    <div key={p} style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 5 }}>
                      <span style={{ color: c.highlight, fontSize: 9, marginTop: 3 }}>●</span>
                      <span style={{ fontSize: 11, color: c.textSubtle, lineHeight: 1.4 }}>{p}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px",
              borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer",
              background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
              color: "#fff", boxShadow: `0 4px 16px ${c.accentGlow}`,
            }}>
              Create Free Account <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
