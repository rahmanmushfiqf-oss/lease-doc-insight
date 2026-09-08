import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container, Prose } from "@/components/resources/Prose";
import { normalizeBlocks } from "@/lib/markdown";
import { formatDate, helpCategorySlug, publishedHelp } from "@/lib/content";

export const Route = createFileRoute("/help-centre/$category/$slug")({
  loader: ({ params }) => {
    const article = publishedHelp().find(
      (a) => a.slug === params.slug && helpCategorySlug(a.category) === params.category,
    );
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Unavailable | Leasedrop" }, { name: "robots", content: "noindex" }],
      };
    const { article } = loaderData;
    const description = `${article.title} — a Leasedrop Help Centre article in ${article.category}.`.replace(
      "—",
      "-",
    );
    return {
      meta: [
        { title: `${article.title} | Help Centre | Leasedrop` },
        { name: "description", content: description },
        { property: "og:title", content: article.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { article } = Route.useLoaderData();
  const [helpful, setHelpful] = useState<null | boolean>(null);

  const related = publishedHelp()
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);
  const headings = normalizeBlocks(article.body as never).filter(
    (b) => b.type === "h2" || b.type === "h1",
  );

  return (
    <main>
      <Container className="py-20 lg:py-28">
        <article className="mx-auto max-w-2xl">
          <nav className="text-xs text-muted-foreground">
            <Link to="/help-centre" className="link-underline">
              Help Centre
            </Link>
            <span className="px-2">/</span>
            <span>{article.category}</span>
          </nav>
          <h1 className="mt-5 text-3xl font-[490] leading-tight lg:text-4xl">{article.title}</h1>
          <p className="mt-3 text-xs text-muted-foreground">
            Last updated {formatDate(article.updated)}
          </p>

          {headings.length > 1 ? (
            <div className="mt-8 rounded-xl border border-border bg-secondary/50 p-5">
              <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                On this page
              </p>
              <ul className="mt-3 space-y-2">
                {headings.map((h, i) => (
                  <li key={i}>
                    <a href={`#s${i}`} className="link-underline text-sm text-muted-foreground">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-10">
            <Prose blocks={article.body} />
          </div>

          {related.length ? (
            <div className="mt-14 border-t border-border pt-8">
              <h2 className="text-base font-medium">Related articles</h2>
              <ul className="mt-4 divide-y divide-border">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      to="/help-centre/$category/$slug"
                      params={{ category: helpCategorySlug(r.category), slug: r.slug }}
                      className="group flex items-center justify-between gap-6 py-3.5 text-sm"
                    >
                      <span className="group-hover:text-primary">{r.title}</span>
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border pt-8">
            <span className="text-sm text-muted-foreground">Was this helpful?</span>
            {helpful === null ? (
              <>
                <button
                  type="button"
                  onClick={() => setHelpful(true)}
                  className="btn-base btn-outline px-5 py-2"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHelpful(false)}
                  className="btn-base btn-outline px-5 py-2"
                >
                  No
                </button>
              </>
            ) : (
              <span className="text-sm text-foreground">Thank you for the feedback.</span>
            )}
          </div>
        </article>
      </Container>
    </main>
  );
}
