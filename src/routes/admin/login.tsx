import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AdminButton, AdminInput, Field } from "@/components/admin/ui";
import { supabase } from "@/integrations/supabase/client";
import { setRememberChoice, useAdminSession } from "@/lib/admin-session";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { account, refresh } = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (account) void navigate({ to: "/admin" });
  }, [account, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (signInError) {
        setError("Those details do not match an account.");
        return;
      }
      setRememberChoice(remember);
      await refresh();
      void navigate({ to: "/admin" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 font-sans">
      <div className="w-full max-w-[380px]">
        <div className="mb-8 text-center text-[20px] font-semibold tracking-[-0.025em] text-[#1C1C1C]">
          Lease<span className="text-[#0340F3]">drop</span>
        </div>

        <form onSubmit={submit} className="space-y-5 rounded-xl border border-[rgba(26,26,26,0.08)] p-6">
          <div>
            <h1 className="text-[16px] font-semibold text-[#1C1C1C]">Admin sign in</h1>
            <p className="mt-1 text-[12px] text-[#6B6B6B]">Sign in with your email and password.</p>
          </div>
          <Field label="Email">
            <AdminInput
              type="email"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@leasedrop.ai"
            />
          </Field>
          <Field label="Password">
            <AdminInput
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Field>
          <label className="flex items-center gap-2 text-[12px] text-[#6B6B6B]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3.5 w-3.5 accent-[#0340F3]"
            />
            Remember me for 30 days
          </label>
          {error ? <p className="text-[12px] text-[#DC2626]">{error}</p> : null}
          <AdminButton type="submit" variant="primary" className="w-full" disabled={busy}>
            {busy ? "Signing in..." : "Sign in"}
          </AdminButton>
        </form>
      </div>
    </div>
  );
}
