"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, User, ArrowRight, Leaf, RotateCcw, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"info" | "otp">("info");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [devOtp, setDevOtp] = useState("");

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const cleaned = phone.replace(/\s+/g, "").replace(/^0/, "27");
    if (!/^\d{10,15}$/.test(cleaned)) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleaned }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        return;
      }

      if (data.devOtp) setDevOtp(data.devOtp);
      setStep("otp");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cleaned = phone.replace(/\s+/g, "").replace(/^0/, "27");
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleaned, code: otp, name: name.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid OTP");
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#2d5a3d] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Leaf size={22} className="text-[#6ea882]" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display">
            Join Shadow Garden
          </h1>
          <p className="text-[#9ca3af] text-sm mt-1">
            Create your account to start collecting
          </p>
        </div>

        <div className="card-base p-6 space-y-5">
          {step === "info" ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#9ca3af] block mb-1.5 uppercase tracking-wide">
                  Display Name
                </label>
                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6ea882]"
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="input-base pl-9"
                    required
                    minLength={2}
                    maxLength={30}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#9ca3af] block mb-1.5 uppercase tracking-wide">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6ea882]"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 27821234567"
                    className="input-base pl-9"
                    required
                  />
                </div>
                <p className="text-xs text-[#6ea882] mt-1">
                  Include country code (e.g. 27 for South Africa)
                </p>
              </div>

              {error && (
                <p className="text-red-400 text-xs bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Continue"}
                <ArrowRight size={14} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center py-2">
                <CheckCircle size={24} className="text-[#4a8c5c] mx-auto mb-2" />
                <p className="text-white text-sm font-medium">OTP Sent</p>
                <p className="text-[#9ca3af] text-xs mt-0.5">
                  Enter the 6-digit code sent to {phone}
                </p>
                {devOtp && (
                  <div className="mt-2 p-2 bg-[#1a3324] rounded-lg">
                    <p className="text-xs text-[#6ea882]">
                      Dev mode OTP:{" "}
                      <strong className="text-white">{devOtp}</strong>
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-[#9ca3af] block mb-1.5 uppercase tracking-wide">
                  OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="000000"
                  maxLength={6}
                  className="input-base text-center text-2xl tracking-widest font-bold"
                  required
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("info");
                  setOtp("");
                  setError("");
                  setDevOtp("");
                }}
                className="flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-white transition-colors mx-auto"
              >
                <RotateCcw size={12} />
                Go back
              </button>
            </form>
          )}

          <div className="divider" />
          <p className="text-center text-xs text-[#9ca3af]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#4a8c5c] hover:text-[#6ea882] transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
