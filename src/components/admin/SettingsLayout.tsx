import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { Panel } from "@/components/admin/ui";
import { useAdmin } from "@/lib/admin-store";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/admin/settings/general", label: "General" },
  { to: "/admin/settings/team", label: "Team" },
  { to: "/admin/settings/forms", label: "Forms" },
  { to: "/admin/settings/seo", label: "SEO" },
  { to: "/admin/settings/integrations", label: "Integrations" },
] as const;

export function SettingsLayout({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  const { pathname } = useLocation();
  const { currentUser } = useAdmin();

  if (currentUser?.role !== "admin") {
    return (
      <AdminShell title="Settings">
        <Panel>
          <p className="text-[14px] text-[#6B6B6B]">
            Settings are available to administrators only.
          </p>
        </Panel>
      </AdminShell>
    );
  }

  return (
    <AdminShell title={`Settings — ${title}`} action={action}>
      <div className="mb-6 flex flex-wrap gap-2 border-b border-[rgba(26,26,26,0.07)] pb-3">
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className={cn(
              "rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-[background-color,color] duration-150",
              pathname === t.to ? "bg-[#0340F3] text-white" : "text-[#6B6B6B] hover:bg-[#F5F5F5] hover:text-[#1C1C1C]",
            )}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <div className="max-w-3xl space-y-5">{children}</div>
    </AdminShell>
  );
}
