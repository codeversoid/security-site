"use client";

import { LoginForm } from "@/components/shadcn-blocks/login-01/login-form";
import { useLogin } from "@/hooks/use-login";
import { useState, FormEvent, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function LoginPageInner() {
  const { login, isLoading, error, success } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          email={email}
          password={password}
          isLoading={isLoading}
          error={error}
          success={success}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
        />
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