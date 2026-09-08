import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { supabase } from "@/integrations/supabase/client";
import { getAdminAccount, type AdminAccount } from "@/lib/admin-auth.functions";

type SessionCtx = {
  account: AdminAccount | null;
  hasSession: boolean;
  ready: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<SessionCtx | null>(null);

const REMEMBER_KEY = "ld-admin-remember-until";
const ACTIVE_KEY = "ld-admin-active";
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

/** Records whether this sign in should survive closing the browser. */
export function setRememberChoice(remember: boolean) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(ACTIVE_KEY, "1");
  if (remember) {
    window.localStorage.setItem(REMEMBER_KEY, String(Date.now() + THIRTY_DAYS));
  } else {
    window.localStorage.removeItem(REMEMBER_KEY);
  }
}

function rememberExpired() {
  if (typeof window === "undefined") return false;
  if (window.sessionStorage.getItem(ACTIVE_KEY) === "1") {
    const until = Number(window.localStorage.getItem(REMEMBER_KEY) ?? 0);
    return until > 0 && Date.now() > until;
  }
  const until = Number(window.localStorage.getItem(REMEMBER_KEY) ?? 0);
  if (!until) return true; // not remembered and the browser session ended
  if (Date.now() > until) return true;
  window.sessionStorage.setItem(ACTIVE_KEY, "1");
  return false;
}

export function AdminSessionProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<AdminAccount | null>(null);
  const [hasSession, setHasSession] = useState(false);
  const [ready, setReady] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setHasSession(false);
      setAccount(null);
      return;
    }
    if (rememberExpired()) {
      window.localStorage.removeItem(REMEMBER_KEY);
      await supabase.auth.signOut();
      setHasSession(false);
      setAccount(null);
      return;
    }
    setHasSession(true);
    try {
      setAccount(await getAdminAccount());
    } catch {
      setAccount(null);
    }
  }, []);


  useEffect(() => {
    let active = true;
    void load().finally(() => {
      if (active) setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      void load();
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [load]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    window.localStorage.removeItem(REMEMBER_KEY);
    window.sessionStorage.removeItem(ACTIVE_KEY);
    setAccount(null);
    setHasSession(false);
  }, []);


  const value = useMemo(
    () => ({ account, hasSession, ready, refresh: load, signOut }),
    [account, hasSession, ready, load, signOut],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAdminSession() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdminSession must be used inside AdminSessionProvider");
  return ctx;
}
