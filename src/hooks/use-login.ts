"use client";

import { useState } from "react";

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok || json.success !== true) {
        setError(json.message || "Terjadi kesalahan");
        setSuccess(false);
        return;
      }
      setSuccess(true);
    } catch (e) {
      setError("Terjadi kesalahan jaringan");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, success };
}