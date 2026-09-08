import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import { Toaster } from "@/components/ui/sonner";
import { AdminSessionProvider, useAdminSession } from "@/lib/admin-session";
import { AdminProvider } from "@/lib/admin-store";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin | Leasedrop" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Content management for the Leasedrop website." },
    ],
  }),
  component: AdminLayout,
});

function Gate() {
  const { account, ready } = useAdminSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isLogin = pathname === "/admin/login";
  const isSetPassword = pathname === "/admin/set-password";

  useEffect(() => {
    if (!ready) return;
    if (!account && !isLogin) {
      void navigate({ to: "/admin/login" });
      return;
    }
    if (account && account.mustChangePassword && !isSetPassword) {
      void navigate({ to: "/admin/set-password" });
      return;
    }
    if (account && !account.mustChangePassword && (isLogin || isSetPassword)) {
      void navigate({ to: "/admin" });
    }
  }, [ready, account, isLogin, isSetPassword, navigate]);

  if (!ready) return <div className="min-h-screen bg-white" />;
  if (!account && !isLogin) return <div className="min-h-screen bg-white" />;

  return <Outlet />;
}

function AdminLayout() {
  return (
    <AdminSessionProvider>
      <AdminProvider>
        <Gate />
        <Toaster />
      </AdminProvider>
    </AdminSessionProvider>
  );
}
