"use client";

import { useEffect, useState } from "react";
import type { SessionPayload } from "@/types";

export function useSession() {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) {
          setSession({
            userId: data.user.id,
            phone: data.user.phone,
            name: data.user.name,
            role: data.user.role,
            premium: data.user.premium,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { session, loading };
}
