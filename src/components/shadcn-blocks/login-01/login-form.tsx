"use client";

import React, { FormEvent } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps extends React.ComponentProps<"form"> {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: FormEvent) => void;
  onResetPassword?: (email: string) => void;
  resetMessage?: string | null;
}

export function LoginForm({
  email,
  password,
  isLoading,
  error,
  success,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onResetPassword,
  resetMessage,
  ...props
}: LoginFormProps) {
  const [siteName, setSiteName] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [showPwd, setShowPwd] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/site", { cache: "no-store" });
        const json = await res.json();
        const data = json?.data || {};
        setSiteName(String(data?.siteName || ""));
        setLogoUrl(String(data?.logoUrl || ""));
      } catch {}
    })();
  }, []);
  const invalidEmail = !!email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  return (
    <div className="rounded-2xl border bg-card/40 p-6 shadow-lg backdrop-blur-md">
      <div className="mb-4 text-center">
        {logoUrl ? (
          <Image src={logoUrl} alt={siteName || "Logo"} width={32} height={32} className="rounded-sm inline-block" />
        ) : (
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 ring-1 ring-accent/40">
            <span className="inline-block h-3 w-3 rounded-full bg-accent" />
          </span>
        )}
        <h2 className="mt-3 text-lg font-semibold tracking-tight">{siteName || "Masuk"}</h2>
      </div>
      <form onSubmit={onSubmit} {...props} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full rounded-lg border bg-input/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            placeholder="you@example.com"
            disabled={isLoading}
            required
          />
          {invalidEmail && <p className="text-xs text-red-600">Email tidak valid</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              className="w-full rounded-lg border bg-input/30 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              placeholder="••••••••"
              disabled={isLoading}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-1 text-muted-foreground hover:text-accent"
              onClick={() => setShowPwd((v) => !v)}
              aria-label={showPwd ? "Sembunyikan password" : "Tampilkan password"}
              disabled={isLoading}
            >
              {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <div className="mt-1 text-right">
            <button
              type="button"
              onClick={() => onResetPassword && onResetPassword(email)}
              className="text-xs text-muted-foreground hover:text-accent"
              disabled={isLoading}
            >
              Lupa password?
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {resetMessage && <p className="text-sm text-muted-foreground">{resetMessage}</p>}
        {success && <p className="text-sm text-green-600">Login berhasil</p>}
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          disabled={isLoading || invalidEmail}
        >
          {isLoading ? "Memproses..." : "Masuk"}
        </button>
        <p className="text-center text-xs text-muted-foreground">Belum punya akun? Hubungi admin.</p>
      </form>
    </div>
  );
}
