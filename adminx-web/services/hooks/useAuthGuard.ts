"use client";

import { useRouter } from "next/navigation"; // App Router usa 'next/navigation'
import { useEffect, useState } from "react";
import api from "../api";

/**
 * Types
 */
type UserRes = { data: { id?: string } };
// ====================

export default function useAuthGuard() {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const response = await api.get("/auth/checkToken", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userId = response as UserRes;

        if (!userId.data.id) throw new Error();

        setUserId(userId.data.id);
      } catch {
        localStorage.removeItem("token");
        router.push("/login");
      }
    })();
  }, [router]);

  return userId;
}
