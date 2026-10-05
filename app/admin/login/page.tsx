"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LoaderCircle, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // Deliberately vague: don't reveal whether the address exists.
      setError("That email and password don't match. Please try again.");
      setBusy(false);
      return;
    }

    const next = params.get("next");
    router.push(next && next.startsWith("/admin") ? next : "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <span className="mx-auto mb-5 inline-flex size-12 items-center justify-center rounded-full bg-light-blue text-smile-blue">
          <Lock aria-hidden className="size-5" />
        </span>
        <h1 className="font-display text-3xl tracking-[-0.03em] text-ink">Smile Admin</h1>
        <p className="mt-2 text-sm text-ink-soft">Sign in to manage the website.</p>
      </div>

      <label className="block">
        <span className="font-ui text-xs uppercase tracking-[0.18em] text-ink-muted">Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-[var(--radius)] border border-line bg-background px-4 py-3 text-ink outline-none transition focus:border-smile-blue"
        />
      </label>

      <label className="mt-5 block">
        <span className="font-ui text-xs uppercase tracking-[0.18em] text-ink-muted">Password</span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-[var(--radius)] border border-line bg-background px-4 py-3 text-ink outline-none transition focus:border-smile-blue"
        />
      </label>

      {error && (
        <p role="alert" className="mt-5 rounded-[var(--radius)] bg-[#fdf2f2] px-4 py-3 text-sm text-[#c2410c] dark:bg-[#2a1618]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-smile-blue px-6 py-3.5 font-ui text-[15px] text-white transition hover:bg-smile-blue-dark disabled:opacity-60"
      >
        {busy && <LoaderCircle aria-hidden className="size-4 animate-spin" />}
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-off-white px-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
