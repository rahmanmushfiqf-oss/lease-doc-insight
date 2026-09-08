import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CreditCard,
  FileUp,
  MessageSquareText,
  Network,
  Rocket,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/resources/Prose";
import { formatDate, helpCategories, helpCategorySlug, publishedHelp } from "@/lib/content";

export const Route = createFileRoute("/help-centre/")({
  head: () => ({
    meta: [
      { title: "Help Centre | Leasedrop" },
      {
        name: "description",
        content:
          "The Leasedrop Help Centre. Answers on uploading documents, asking questions, verifying answers, managing assets, security, integrations and billing.",
      },
      { property: "og:title", content: "Help Centre | Leasedrop" },
      {
        property: "og:description",
        content:
          "The Leasedrop Help Centre. Answers on uploading documents, asking questions, verifying answers, managing assets, security, integrations and billing.",
      },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/help-centre" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/help-centre" }],
  }),
  component: Page,
});

const categoryIcons: Record<string, typeof Rocket> = {
  "Getting Started": Rocket,
  "Uploading Documents": FileUp,
  "Asking Questions": MessageSquareText,
  "Verifying Answers": BadgeCheck,
  "Managing Your Portfolio": Building2,
  "Security & Access": ShieldCheck,
  Integrations: Network,
  "Billing & Account": CreditCard,
};

function Page() {
  const articles = publishedHelp();
  const [query, setQuery] = useState("");
  const results = query.trim()
    ? articles.filter((a) => a.title.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  const popular = articles.filter((a) => a.isFeatured).slice(0, 8);
  const recent = [...articles]
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .slice(0, 4);

  return (
    <main>
      <Container className="py-24 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-[490] leading-tight lg:text-5xl">How can we help?</h1>
          <div className="relative mt-10">
            <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the Help Centre"
              aria-label="Search the Help Centre"
              className="w-full rounded-full border border-border bg-secondary py-4 pr-6 pl-14 text-base text-foreground placeholder:text-muted-foreground"
            />
          </div>
          {query.trim() ? (
            <ul className="mt-6 divide-y divide-border rounded-xl border border-border text-left">
              {results.slice(0, 8).map((a) => (
                <li key={a.id}>
                  <Link
                    to="/help-centre/$category/$slug"
                    params={{ category: helpCategorySlug(a.category), slug: a.slug }}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm hover:text-primary"
                  >
                    {a.title}
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
              {results.length === 0 ? (
                <li className="px-5 py-4 text-sm text-muted-foreground">No articles found.</li>
              ) : null}
            </ul>
          ) : null}
        </div>
      </Container>

      <Container className="pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {helpCategories.map((cat) => {
            const Icon = categoryIcons[cat] ?? Rocket;
            const count = articles.filter((a) => a.category === cat).length;
            return (
              <Link
                key={cat}
                to="/help-centre/$category/$slug"
                params={{
                  category: helpCategorySlug(cat),
                  slug: articles.find((a) => a.category === cat)?.slug ?? "",
                }}
                className="card-interactive rounded-xl border border-border p-6"
              >
                <Icon className="size-5 text-primary" strokeWidth={1.5} />
                <p className="mt-5 text-base font-medium">{cat}</p>
                <p className="mt-1 text-xs text-muted-foreground">{count} articles</p>
              </Link>
            );
          })}
        </div>
      </Container>

      <Container className="pb-20">
        <h2 className="text-xl font-[490]">Popular articles</h2>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {popular.map((a) => (
            <li key={a.id}>
              <Link
                to="/help-centre/$category/$slug"
                params={{ category: helpCategorySlug(a.category), slug: a.slug }}
                className="group flex items-center justify-between gap-6 py-4 text-base"
              >
                <span className="group-hover:text-primary">{a.title}</span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <section className="border-t border-border bg-secondary/40">
        <Container className="py-14">
          <h2 className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Recently updated
          </h2>
          <ul className="mt-6 space-y-3">
            {recent.map((a) => (
              <li key={a.id} className="flex flex-wrap gap-x-6 text-sm">
                <span className="w-32 shrink-0 text-muted-foreground">{formatDate(a.updated)}</span>
                <Link
                  to="/help-centre/$category/$slug"
                  params={{ category: helpCategorySlug(a.category), slug: a.slug }}
                  className="link-underline"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
