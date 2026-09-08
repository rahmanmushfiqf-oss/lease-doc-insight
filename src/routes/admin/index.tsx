import { createFileRoute, Link } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { Panel, StatusBadge } from "@/components/admin/ui";
import { formatDate } from "@/lib/content";
import { useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

const quick = [
  { to: "/admin/blog/new", label: "New blog post" },
  { to: "/admin/resources/new", label: "New resource" },
  { to: "/admin/stories/new", label: "New customer story" },
  { to: "/admin/help/new", label: "New help article" },
];

function Dashboard() {
  const { state } = useAdmin();

  const stats = [
    { label: "Published blog posts", value: state.blogPosts.filter((b) => b.status === "published").length },
    { label: "Published resources", value: state.resources.filter((r) => r.status === "published").length },
    { label: "Published customer stories", value: state.customerStories.filter((s) => s.status === "published").length },
    { label: "Form submissions", value: state.formSubmissions.length },
  ];

  const recent = [
    ...state.blogPosts.map((b) => ({ type: "Blog", title: b.title, status: b.status, date: b.date })),
    ...state.resources.map((r) => ({ type: "Resource", title: r.title, status: r.status, date: "2026-08-01" })),
    ...state.customerStories.map((s) => ({ type: "Story", title: s.outcome, status: s.status, date: "2026-07-20" })),
    ...state.helpArticles.map((a) => ({ type: "Help", title: a.title, status: a.status, date: a.updated })),
  ]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 10);

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Panel key={s.label}>
            <div className="text-[28px] font-bold text-[#1C1C1C]">{s.value}</div>
            <div className="mt-1 text-[13px] text-[#6B6B6B]">{s.label}</div>
          </Panel>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Panel className="p-0">
          <div className="border-b border-[rgba(26,26,26,0.07)] px-6 py-4 text-[13px] font-medium text-[#1C1C1C]">
            Recent activity
          </div>
          <ul>
            {recent.map((item, i) => (
              <li
                key={i}
                className="flex flex-wrap items-center gap-3 border-b border-[rgba(26,26,26,0.06)] px-6 py-3 last:border-b-0"
              >
                <span className="rounded-full bg-[#F3F3F3] px-2.5 py-1 text-[11px] font-medium text-[#6B6B6B]">
                  {item.type}
                </span>
                <span className="min-w-0 flex-1 truncate text-[14px] text-[#1C1C1C]">{item.title}</span>
                <StatusBadge status={item.status} />
                <span className="text-[12px] text-[#A0A0A0]">{formatDate(item.date)}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <div className="mb-4 text-[13px] font-medium text-[#1C1C1C]">Quick actions</div>
          <div className="space-y-2">
            {quick.map((q) => (
              <Link
                key={q.to}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={q.to as any}
                className="block rounded-md border border-[rgba(26,26,26,0.18)] px-4 py-2.5 text-[13px] font-medium text-[#1C1C1C] transition-colors hover:border-[rgba(26,26,26,0.4)]"
              >
                {q.label}
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}
