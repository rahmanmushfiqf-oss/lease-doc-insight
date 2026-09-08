import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/resources/Prose";
import { formatDate, publishedBlog } from "@/lib/content";
import { contentImage } from "@/lib/content-images";


export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Leasedrop" },
      {
        name: "description",
        content:
          "The Leasedrop blog. Articles on lease intelligence, dilapidations, asset management and commercial real estate document intelligence for property professionals.",
      },
      { property: "og:title", content: "Blog | Leasedrop" },
      {
        property: "og:description",
        content:
          "The Leasedrop blog. Articles on lease intelligence, dilapidations, asset management and commercial real estate document intelligence for property professionals.",
      },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/blog" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/blog" }],
  }),
  component: Page,
});

const PER_PAGE = 4;

function Page() {
  const all = publishedBlog();
  const [page, setPage] = useState(1);

  const [latest, ...rest] = all;
  const pages = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = rest.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <main>
<Container className="pt-24 pb-14 text-center lg:pt-32 lg:pb-16">
        <h1 className="font-[490] text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          Blogs
        </h1>
      </Container>

      {latest ? (
        <Container className="border-b border-border py-14 lg:py-20">
          <Link
            to="/blog/$slug"
            params={{ slug: latest.slug }}
            className="group grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14"
          >
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src={contentImage(latest.id).src}
                alt={contentImage(latest.id).alt}
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div>
              <p className="eyebrow">{latest.category}</p>
              <h2 className="mt-4 text-3xl font-[490] leading-tight group-hover:text-primary lg:text-4xl">
                {latest.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {latest.excerpt}
              </p>
              <p className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-foreground text-[10px] text-background">
                  {latest.author.charAt(0)}
                </span>
                {formatDate(latest.date)} · {latest.readTime}
              </p>
            </div>
          </Link>
        </Container>
      ) : null}

      <Container className="py-16 lg:py-20">
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
          {shown.map((post) => {
            const img = contentImage(post.id);
            return (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block"
              >
                <div className="overflow-hidden rounded-xl border border-border">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <span className="mt-6 inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {post.category}
                </span>
                <h3 className="mt-4 text-2xl font-[490] leading-snug group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <p className="mt-5 text-xs text-muted-foreground">
                  {formatDate(post.date)} · {post.readTime}
                </p>
              </Link>
            );
          })}
        </div>


        {pages > 1 ? (
          <nav className="mt-16 flex gap-2" aria-label="Pagination">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === current ? "page" : undefined}
                className={`btn-base size-9 rounded-md text-sm ${
                  n === current
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {n}
              </button>
            ))}
          </nav>
        ) : null}
      </Container>
    </main>
  );
}
