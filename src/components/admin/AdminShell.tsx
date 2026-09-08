import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  FileText,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  Quote,
  Settings,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { RoleBadge } from "@/components/admin/ui";
import { useAdmin } from "@/lib/admin-store";
import { cn } from "@/lib/utils";

const nav = [
  { section: "Content", items: [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/blog", label: "Blog Posts", icon: FileText },
    { to: "/admin/resources", label: "Resources", icon: BookOpen },
    { to: "/admin/stories", label: "Customer Stories", icon: Quote },
    { to: "/admin/help", label: "Help Articles", icon: LifeBuoy },
  ] },
  { section: "Operations", items: [
    { to: "/admin/submissions", label: "Form Submissions", icon: Inbox },
  ] },
  { section: "Settings", items: [
    { to: "/admin/settings/general", label: "General", icon: Settings },
    { to: "/admin/settings/team", label: "Team", icon: Settings },
    { to: "/admin/settings/forms", label: "Forms", icon: Settings },
    { to: "/admin/settings/seo", label: "SEO", icon: Settings },
    { to: "/admin/settings/integrations", label: "Integrations", icon: Settings },
  ] },
];

export function AdminShell({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const { currentUser, signOut } = useAdmin();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const SidebarBody = (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5 text-[15px] font-semibold tracking-[-0.02em] text-[#1C1C1C]">
        Lease<span className="text-[#0340F3]">drop</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {nav.map((group) => (
          <div key={group.section}>
            <div className="px-[14px] pb-1.5 pt-4 text-[10px] font-medium uppercase tracking-[0.1em] text-[#A0A0A0]">
              {group.section}
            </div>
            {group.items.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={item.to as any}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md border-l-2 border-transparent px-[14px] py-2 text-[13px] transition-colors duration-150",
                    active
                      ? "border-[#0340F3] bg-[rgba(3,64,243,0.05)] font-medium text-[#0340F3]"
                      : "text-[#6B6B6B] hover:bg-[#F0F0F0] hover:text-[#1C1C1C]",
                  )}
                >
                  <item.icon className="h-[15px] w-[15px]" strokeWidth={1.6} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="flex items-center gap-3 border-t border-[rgba(26,26,26,0.08)] p-[14px]">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1C1C1C] text-[12px] font-medium text-white">
          {currentUser?.name?.charAt(0) ?? "A"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-medium text-[#1C1C1C]">{currentUser?.name}</div>
          <RoleBadge role={currentUser?.role ?? "viewer"} />
        </div>
        <button
          type="button"
          onClick={signOut}
          className="text-[12px] text-[#A0A0A0] transition-colors hover:text-[#1C1C1C]"
        >
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white font-sans text-[#1C1C1C]">
      <aside className="hidden w-[240px] shrink-0 border-r border-[rgba(26,26,26,0.08)] bg-[#FAFAFA] lg:block">
        <div className="sticky top-0 h-screen">{SidebarBody}</div>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-[rgba(26,26,26,0.4)]" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[260px] border-r border-[rgba(26,26,26,0.08)] bg-[#FAFAFA]">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 text-[#6B6B6B]"
            >
              <X className="h-4 w-4" />
            </button>
            {SidebarBody}
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-[rgba(26,26,26,0.08)] bg-white px-4 lg:px-8">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="text-[#6B6B6B] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="flex-1 truncate text-[15px] font-semibold text-[#1C1C1C]">{title}</h1>
          {action}
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
