"use client";

import React, { FormEvent } from "react";

interface LoginFormProps extends React.ComponentProps<"form"> {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: FormEvent) => void;
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
  ...props
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} {...props} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="you@example.com"
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="••••••••"
          disabled={isLoading}
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">Login berhasil</p>}
      <button
        type="submit"
        className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-60"
        disabled={isLoading}
      >
        {isLoading ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}