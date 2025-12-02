"use client";

import { LoginForm } from "@/components/shadcn-blocks/login-01/login-form";
import { useLogin } from "@/hooks/use-login";
import { useState, FormEvent, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function LoginPageInner() {
  const { login, isLoading, error, success } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  const search = useSearchParams();
  const redirect = search?.get("redirect") ?? "/admin";

  useEffect(() => {
    if (success) {
      router.push(redirect);
    }
  }, [success, router, redirect]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    const supabase = getSupabaseClient();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecoveryMode(true);
        setResetMessage(null);
      }
    });
    return () => {
      sub?.subscription.unsubscribe();
    };
  }, []);

  const handleResetPassword = async (emailAddr: string) => {
    setResetMessage(null);
    if (!emailAddr || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailAddr)) {
      setResetMessage("Masukkan email yang valid");
      return;
    }
    try {
      const supabase = getSupabaseClient();
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const { error: err } = await supabase.auth.resetPasswordForEmail(emailAddr, { redirectTo: `${origin}/login` });
      if (err) {
        setResetMessage(err.message);
        return;
      }
      setResetMessage("Tautan reset telah dikirim. Periksa email Anda.");
    } catch {
      setResetMessage("Gagal mengirim tautan reset");
    }
  };

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) return;
    if (newPassword !== confirmPassword) return;
    try {
      setUpdating(true);
      const supabase = getSupabaseClient();
      const { error: err } = await supabase.auth.updateUser({ password: newPassword });
      if (err) {
        setResetMessage(err.message);
        setUpdating(false);
        return;
      }
      setRecoveryMode(false);
      setResetMessage("Password berhasil diperbarui. Silakan login.");
    } catch {
      setResetMessage("Gagal memperbarui password");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {recoveryMode ? (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Password Baru</label>
              <input
                type="password"
                className="w-full rounded border px-3 py-2"
                placeholder="Password minimal 8 karakter"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={updating}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Konfirmasi Password</label>
              <input
                type="password"
                className="w-full rounded border px-3 py-2"
                placeholder="Ulangi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={updating}
              />
            </div>
            {resetMessage && <p className="text-sm text-muted-foreground">{resetMessage}</p>}
            <button type="submit" className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-60" disabled={updating}>
              {updating ? "Memproses..." : "Simpan Password"}
            </button>
          </form>
        ) : (
          <LoginForm
            email={email}
            password={password}
            isLoading={isLoading}
            error={error}
            success={success}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
            onResetPassword={handleResetPassword}
            resetMessage={resetMessage}
          />
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Memuat...</div>}>
      <LoginPageInner />
    </Suspense>
  );
}
