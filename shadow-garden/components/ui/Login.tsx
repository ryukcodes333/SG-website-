import { useState } from "react";
import { Phone, ArrowRight, Leaf, RotateCcw, CheckCircle, Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

const T = {
  dark: {
    bg: "#060e09", card: "#0d1a12", cardBorder: "#162a1e", elevated: "#122018",
    accent: "#16a34a", highlight: "#22c55e", accentGlow: "rgba(22,163,74,0.25)",
    text: "#f1f5f9", textSubtle: "#9ca3af", inputBg: "#0a1508", inputBorder: "#162a1e",
    errorBg: "rgba(239,68,68,0.08)", errorBorder: "rgba(239,68,68,0.25)",
    devBg: "#0f2016",
  },
  light: {
    bg: "#f0faf2", card: "#ffffff", cardBorder: "#bbf7d0", elevated: "#f0fdf4",
    accent: "#16a34a", highlight: "#15803d", accentGlow: "rgba(22,163,74,0.2)",
    text: "#111827", textSubtle: "#6b7280", inputBg: "#f0fdf4", inputBorder: "#bbf7d0",
    errorBg: "rgba(239,68,68,0.05)", errorBorder: "rgba(239,68,68,0.2)",
    devBg: "#dcfce7",
  },
};

export default function SgLogin() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const c = T[theme];

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: c.bg, fontFamily: "'Inter', system-ui, sans-serif",
      padding: 24, boxSizing: "border-box", transition: "all 0.3s",
      position: "relative",
    }}>
      {/* Theme toggle */}
      <button
        onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
        style={{
          position: "absolute", top: 16, right: 16,
          background: c.card, border: `1px solid ${c.cardBorder}`,
          borderRadius: 8, padding: "6px 10px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
          color: c.textSubtle, fontSize: 12, fontWeight: 500,
        }}
      >
        {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
        {theme === "dark" ? "Light" : "Dark"}
      </button>

      {/* Subtle background glow */}
      {theme === "dark" && (
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none",
        }} />
      )}

      <div style={{ width: "100%", maxWidth: 380, position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16, margin: "0 auto 16px",
            background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 8px 24px ${c.accentGlow}`,
          }}>
            <Leaf size={24} color="#fff" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: c.text, marginBottom: 6, letterSpacing: -0.5 }}>
            {step === "phone" ? "Welcome back" : "Check your phone"}
          </h1>
          <p style={{ fontSize: 14, color: c.textSubtle }}>
            {step === "phone" ? "Sign in with your phone number" : "Enter the 6-digit code we sent you"}
          </p>
        </div>

        {/* Card */}
        <div style={{
          padding: 24, borderRadius: 18,
          background: c.card, border: `1px solid ${c.cardBorder}`,
          boxShadow: theme === "dark" ? "0 8px 40px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.06)",
        }}>
          {step === "phone" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: c.textSubtle, marginBottom: 6, letterSpacing: 0.6, textTransform: "uppercase" }}>
                  Phone Number
                </label>
                <div style={{ position: "relative" }}>
                  <Phone size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: c.highlight }} />
                  <input
                    type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 27821234567"
                    style={{
                      width: "100%", padding: "12px 12px 12px 36px", borderRadius: 10,
                      background: c.inputBg, border: `1px solid ${c.inputBorder}`,
                      color: c.text, fontSize: 14, outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
                <p style={{ fontSize: 11, color: c.highlight, marginTop: 5 }}>
                  Include country code (e.g. 27 for South Africa)
                </p>
              </div>
              <button
                onClick={() => setStep("otp")}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "13px 20px", borderRadius: 10, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
                  background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
                  color: "#fff", boxShadow: `0 4px 16px ${c.accentGlow}`,
                }}>
                Send OTP <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", margin: "0 auto 10px",
                  background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <CheckCircle size={20} style={{ color: c.highlight }} />
                </div>
                <p style={{ fontWeight: 600, color: c.text, fontSize: 14, marginBottom: 4 }}>OTP Sent!</p>
                <p style={{ fontSize: 12, color: c.textSubtle }}>Enter the 6-digit code sent to your phone</p>

                {/* Dev mode hint */}
                <div style={{
                  marginTop: 10, padding: "8px 12px", borderRadius: 8,
                  background: c.devBg, border: `1px solid rgba(22,163,74,0.2)`,
                }}>
                  <p style={{ fontSize: 11, color: c.textSubtle }}>
                    Dev mode OTP: <strong style={{ color: c.highlight, letterSpacing: 2 }}>482 951</strong>
                  </p>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: c.textSubtle, marginBottom: 6, letterSpacing: 0.6, textTransform: "uppercase" }}>
                  OTP Code
                </label>
                <input
                  type="text" value={otp} maxLength={6}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  style={{
                    width: "100%", padding: "14px", borderRadius: 10,
                    background: c.inputBg, border: `1px solid ${otp.length === 6 ? c.accent : c.inputBorder}`,
                    color: c.text, fontSize: 26, fontWeight: 700, letterSpacing: "0.3em",
                    textAlign: "center", outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>

              <button style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "13px 20px", borderRadius: 10, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
                background: otp.length === 6 ? `linear-gradient(135deg, ${c.accent}, ${c.highlight})` : c.elevated,
                color: otp.length === 6 ? "#fff" : c.textSubtle,
                boxShadow: otp.length === 6 ? `0 4px 16px ${c.accentGlow}` : "none",
                transition: "all 0.2s",
              }}>
                Verify &amp; Sign In <ArrowRight size={15} />
              </button>

              <button
                onClick={() => { setStep("phone"); setOtp(""); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  background: "none", border: "none", cursor: "pointer", color: c.textSubtle, fontSize: 12,
                }}>
                <RotateCcw size={12} /> Change number
              </button>
            </div>
          )}

          <div style={{ borderTop: `1px solid ${c.cardBorder}`, marginTop: 20, paddingTop: 16, textAlign: "center" }}>
            <p style={{ fontSize: 12, color: c.textSubtle }}>
              No account? <span style={{ color: c.highlight, cursor: "pointer", fontWeight: 600 }}>Register here</span>
            </p>
          </div>
        </div>

        {/* Brand */}
        <div style={{ textAlign: "center", marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Leaf size={11} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: c.text }}>
            Shadow<span style={{ color: c.highlight }}>Garden</span>
          </span>
        </div>
      </div>
    </div>
  );
}
