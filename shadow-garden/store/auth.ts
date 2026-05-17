"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SessionPayload } from "@/types";

interface AuthState {
  session: SessionPayload | null;
  setSession: (session: SessionPayload | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      logout: () => {
        set({ session: null });
        fetch("/api/auth/logout", { method: "POST" });
      },
    }),
    {
      name: "sg-auth",
    }
  )
);
