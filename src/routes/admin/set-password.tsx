import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AdminButton, AdminInput, Field } from "@/components/admin/ui";
import { supabase } from "@/integrations/supabase/client";
import { completePasswordChange } from "@/lib/admin-auth.functions";
import { useAdminSession } from "@/lib/admin-session";

export const Route = createFileRoute("/admin/set-password")({
  component: SetPasswordPage,
});

function SetPasswordPage() {
  const navigate = useNavigate();
  const { refresh } = useAdminSession();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 10) {
      setError("Use at least 10 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Both passwords must match.");
      return;
    }
    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setBusy(false);
      return;
    }
    await completePasswordChange();
    await refresh();
    setBusy(false);
    void navigate({ to: "/admin" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 font-sans">
      <form onSubmit={submit} className="w-full max-w-[380px] space-y-5 rounded-xl border border-[rgba(26,26,26,0.08)] p-6">
        <div>
          <h1 className="text-[16px] font-semibold text-[#1C1C1C]">Choose your password</h1>
          <p className="mt-1 text-[12px] text-[#6B6B6B]">
            This is your first sign in, so please set a password only you know.
          </p>
        </div>
        <Field label="New password">
          <AdminInput
            type="password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Field label="Confirm password">
          <AdminInput
            type="password"
            value={confirm}
            autoComplete="new-password"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </Field>
        {error ? <p className="text-[12px] text-[#DC2626]">{error}</p> : null}
        <AdminButton type="submit" variant="primary" className="w-full" disabled={busy}>
          {busy ? "Saving..." : "Save password"}
        </AdminButton>
      </form>
    </div>
  );
}
