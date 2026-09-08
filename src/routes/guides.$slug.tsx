import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Container, Prose } from "@/components/resources/Prose";
import { publishedGuides } from "@/lib/content";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = publishedGuides().find((g) => g.slug === params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Unavailable | Leasedrop" }, { name: "robots", content: "noindex" }],
      };
    const { guide } = loaderData;
    return {
      meta: [
        { title: `${guide.title} | Leasedrop` },
        { name: "description", content: guide.description },
        { property: "og:title", content: guide.title },
        { property: "og:description", content: guide.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { guide } = Route.useLoaderData();

  return (
    <main>
      <Container className="py-20 lg:py-28">
        <article className="mx-auto max-w-2xl">
          <p className="eyebrow">{guide.category}</p>
          <h1 className="mt-5 text-3xl font-[490] leading-tight lg:text-[2.75rem]">{guide.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{guide.description}</p>
          <span className="mt-6 inline-flex rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
            {guide.format}
          </span>
          <div className="mt-10">
            <Prose blocks={guide.body} />
          </div>
          <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-10">
            <Link to="/book-a-demo" className="btn-base btn-primary px-6 py-3.5">
              Book a Demo
            </Link>
            <Link to="/guides" className="btn-base btn-outline px-6 py-3.5">
              All guides
            </Link>
          </div>
        </article>
      </Container>
    </main>
  );
}
