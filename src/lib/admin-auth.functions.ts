import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminRole = "owner" | "admin" | "editor";

export type AdminAccount = {
  userId: string;
  email: string;
  name: string;
  role: AdminRole;
  mustChangePassword: boolean;
  twoFactorConfirmedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
};

const DEMO_EMAIL = "admin@leasedrop.ai";
const DEMO_PASSWORD = "leasedrop2024";
const DEMO_NAME = "Mushfiqur Rahman";

type AdminRow = {
  user_id: string;
  email: string;
  name: string;
  role: AdminRole;
  must_change_password: boolean;
  two_factor_confirmed_at: string | null;
  last_login_at: string | null;
  created_at: string;
};

const toAccount = (row: AdminRow): AdminAccount => ({
  userId: row.user_id,
  email: row.email,
  name: row.name,
  role: row.role,
  mustChangePassword: row.must_change_password,
  twoFactorConfirmedAt: row.two_factor_confirmed_at,
  lastLoginAt: row.last_login_at,
  createdAt: row.created_at,
});

async function loadAdmin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/** Creates the demo admin account the first time it is needed. */
export const ensureDemoAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const admin = await loadAdmin();
  const { data: existing } = await admin
    .from("admin_users")
    .select("user_id")
    .eq("email", DEMO_EMAIL)
    .maybeSingle();
  if (existing) return { ok: true };

  const created = await admin.auth.admin.createUser({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    email_confirm: true,
    user_metadata: { name: DEMO_NAME },
  });

  let userId = created.data.user?.id ?? null;
  if (!userId) {
    const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    userId = list?.users.find((u) => u.email?.toLowerCase() === DEMO_EMAIL)?.id ?? null;
  }
  if (!userId) return { ok: false };

  await admin.from("admin_users").upsert(
    {
      user_id: userId,
      email: DEMO_EMAIL,
      name: DEMO_NAME,
      role: "owner",
      must_change_password: false,
    },
    { onConflict: "user_id" },
  );
  return { ok: true };
});

/**
 * Step one of sign in: the password is checked on the server only. No browser
 * session is created here, so the emailed code is the required second factor.
 */
export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => ({
    email: String(data.email ?? "").trim().toLowerCase(),
    password: String(data.password ?? ""),
  }))
  .handler(async ({ data }) => {
    if (!data.email || !data.password) {
      return { ok: false as const, error: "Enter your email and password." };
    }

    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const checkClient = createClient(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { data: signIn, error } = await checkClient.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error || !signIn.user) {
      return { ok: false as const, error: "Those details do not match an account." };
    }
    await checkClient.auth.signOut();

    const admin = await loadAdmin();
    const { data: row } = await admin
      .from("admin_users")
      .select("user_id")
      .eq("user_id", signIn.user.id)
      .maybeSingle();
    if (!row) {
      return { ok: false as const, error: "This account does not have admin access." };
    }
    return { ok: true as const };
  });

/** Returns the signed in admin account, or null when the user is not an admin. */
export const getAdminAccount = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const admin = await loadAdmin();
    const { data } = await admin
      .from("admin_users")
      .select("*")
      .eq("user_id", context.userId)
      .maybeSingle();
    return data ? toAccount(data as AdminRow) : null;
  });

/** Called once the emailed second factor has been completed. */
export const confirmTwoFactor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const admin = await loadAdmin();
    const now = new Date().toISOString();
    const { data } = await admin
      .from("admin_users")
      .update({ two_factor_confirmed_at: now, last_login_at: now })
      .eq("user_id", context.userId)
      .select("*")
      .maybeSingle();
    return data ? toAccount(data as AdminRow) : null;
  });

async function requireManager(userId: string) {
  const admin = await loadAdmin();
  const { data } = await admin
    .from("admin_users")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();
  const role = (data?.role ?? null) as AdminRole | null;
  if (role !== "owner" && role !== "admin") throw new Error("Forbidden");
  return { admin, role };
}

export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { admin } = await requireManager(context.userId);
    const { data } = await admin
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: true });
    return (data ?? []).map((row) => toAccount(row as AdminRow));
  });

export const createAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { email: string; name: string; role: AdminRole; password: string }) => ({
    email: String(data.email ?? "").trim().toLowerCase(),
    name: String(data.name ?? "").trim(),
    role: (["owner", "admin", "editor"] as const).includes(data.role) ? data.role : "editor",
    password: String(data.password ?? ""),
  }))
  .handler(async ({ data, context }) => {
    const { admin } = await requireManager(context.userId);
    if (!data.email || data.password.length < 10) {
      return { ok: false as const, error: "Enter an email and a password of at least 10 characters." };
    }

    const created = await admin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { name: data.name },
    });
    if (created.error || !created.data.user) {
      return { ok: false as const, error: created.error?.message ?? "Could not create that account." };
    }

    const { error } = await admin.from("admin_users").insert({
      user_id: created.data.user.id,
      email: data.email,
      name: data.name,
      role: data.role,
      invited_by: context.userId,
      must_change_password: true,
    });
    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const };
  });

export const updateAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { userId: string; name?: string; role?: AdminRole }) => data)
  .handler(async ({ data, context }) => {
    const { admin } = await requireManager(context.userId);
    if (data.userId === context.userId && data.role) {
      return { ok: false as const, error: "You cannot change your own access level." };
    }
    const patch: { name?: string; role?: AdminRole } = {};
    if (typeof data.name === "string") patch.name = data.name.trim();
    if (data.role) patch.role = data.role;
    const { error } = await admin.from("admin_users").update(patch).eq("user_id", data.userId);
    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const };
  });

export const removeAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data, context }) => {
    const { admin } = await requireManager(context.userId);
    if (data.userId === context.userId) {
      return { ok: false as const, error: "You cannot remove your own access." };
    }
    await admin.from("admin_users").delete().eq("user_id", data.userId);
    await admin.auth.admin.deleteUser(data.userId);
    return { ok: true as const };
  });

/** Clears the first login password change requirement. */
export const completePasswordChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const admin = await loadAdmin();
    await admin
      .from("admin_users")
      .update({ must_change_password: false })
      .eq("user_id", context.userId);
    return { ok: true as const };
  });
