import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container, Prose } from "@/components/resources/Prose";
import { publishedStories } from "@/lib/content";

export const Route = createFileRoute("/customer-stories/$slug")({
  loader: ({ params }) => {
    const story = publishedStories().find((s) => s.slug === params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Unavailable | Leasedrop" }, { name: "robots", content: "noindex" }],
      };
    const { story } = loaderData;
    return {
      meta: [
        { title: `${story.organisation} | Customer Story | Leasedrop` },
        { name: "description", content: story.outcome },
        { property: "og:title", content: `${story.organisation} | Leasedrop` },
        { property: "og:description", content: story.outcome },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { story } = Route.useLoaderData();
  const related = publishedStories()
    .filter((s) => s.id !== story.id)
    .slice(0, 2);

  return (
    <main>
      <Container className="py-20 lg:py-28">
        <article className="mx-auto max-w-2xl">
          <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
            {story.organisation} · {story.sector}
          </p>
          <h1 className="mt-5 text-3xl font-[490] leading-tight lg:text-[2.75rem]">
            {story.outcome}
          </h1>
          <div className="mt-10">
            <Prose blocks={story.body} />
          </div>
        </article>
      </Container>

      <section className="border-t border-border">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-xl font-[490]">More stories</h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    to="/customer-stories/$slug"
                    params={{ slug: r.slug }}
                    className="group flex items-center justify-between gap-6 py-5"
                  >
                    <span>
                      <span className="block text-xs text-muted-foreground">{r.organisation}</span>
                      <span className="mt-1 block text-base group-hover:text-primary">
                        {r.outcome}
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/book-a-demo" className="btn-base btn-primary mt-10 px-6 py-3.5">
              Book a Demo
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
