import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/resources/Prose";
import { featuredGuide, publishedGuides } from "@/lib/content";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: "Guides | Leasedrop" },
      {
        name: "description",
        content:
          "Practical reference guides on lease intelligence, dilapidations, asset document review, rights and obligations, critical dates and due diligence for property teams.",
      },
      { property: "og:title", content: "Guides | Leasedrop" },
      {
        property: "og:description",
        content:
          "Practical reference guides on lease intelligence, dilapidations, asset document review, rights and obligations, critical dates and due diligence for property teams.",
      },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/guides" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/guides" }],
  }),
  component: Page,
});

function FormatPill({ format }: { format: string }) {
  return (
    <span className="inline-flex shrink-0 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
      {format}
    </span>
  );
}

function Page() {
  const all = publishedGuides();
  const lead = featuredGuide();
  const rest = all.filter((g) => g.id !== lead.id);
  const categories = [...new Set(all.map((g) => g.category))];

  return (
    <main>
<Container className="pt-24 pb-14 text-center lg:pt-32 lg:pb-16">
        <h1 className="font-[490] text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          Guides
        </h1>
      </Container>

      <Container className="pb-24 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div>
            <article className="border-y border-border py-10">
              <p className="eyebrow">{lead.category}</p>
              <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-3xl">
                  <h2 className="text-3xl font-[490] leading-tight lg:text-4xl">{lead.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {lead.description}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <FormatPill format={lead.format} />
                  <Link
                    to="/guides/$slug"
                    params={{ slug: lead.slug }}
                    className="link-arrow inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    {lead.format === "PDF" ? "Download" : "Read the guide"}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>

            <div className="mt-4">
              {categories.map((cat) => {
                const items = rest.filter((g) => g.category === cat);
                if (!items.length) return null;
                return (
                  <section key={cat} id={cat.toLowerCase().replace(/[^a-z]+/g, "-")}>
                    <h3 className="pt-12 pb-2 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                      {cat}
                    </h3>
                    <ul>
                      {items.map((g) => (
                        <li
                          key={g.id}
                          className="flex flex-wrap items-start justify-between gap-6 border-t border-border py-8"
                        >
                          <div className="max-w-2xl">
                            <h4 className="text-xl font-[490] leading-snug">{g.title}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {g.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <FormatPill format={g.format} />
                            <Link
                              to="/guides/$slug"
                              params={{ slug: g.slug }}
                              className="link-arrow inline-flex items-center gap-2 text-sm font-medium text-primary"
                            >
                              {g.format === "PDF" ? "Download" : "Read"}
                              <ArrowRight className="size-4" />
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>

          <aside className="hidden lg:block">
            <nav className="sticky top-28" aria-label="Guide topics">
              <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Topics
              </p>
              <ul className="mt-4 space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <a
                      href={`#${cat.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className="link-underline text-sm text-muted-foreground hover:text-foreground"
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </Container>
    </main>
  );
}
