import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container, PageHead } from "@/components/resources/Prose";
import { publishedStories } from "@/lib/content";
import { contentImage } from "@/lib/content-images";


export const Route = createFileRoute("/customer-stories/")({
  head: () => ({
    meta: [
      { title: "Customer Stories | Leasedrop" },
      {
        name: "description",
        content:
          "Real outcomes from commercial real estate teams using Leasedrop. Asset managers, building surveyors, investment managers and due diligence teams.",
      },
      { property: "og:title", content: "Customer Stories | Leasedrop" },
      {
        property: "og:description",
        content:
          "Real outcomes from commercial real estate teams using Leasedrop. Asset managers, building surveyors, investment managers and due diligence teams.",
      },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/customer-stories" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/customer-stories" }],
  }),
  component: Page,
});

function Page() {
  const stories = publishedStories();

  return (
    <main>
      <Container className="pt-24 pb-14 lg:pt-32 lg:pb-16">
        <PageHead
          eyebrow="Customer Stories"
          title="What asset intelligence looks like in practice."
          subtitle="How commercial real estate teams use Leasedrop to work with property documents differently."
        />
      </Container>

      <Container className="pb-24 lg:pb-32">
        <div className="border-t border-border">
          {stories.map((s) => {
            const img = contentImage(s.id);
            return (
              <article
                key={s.id}
                className="grid gap-8 border-b border-border py-14 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:py-16"
              >
                <Link
                  to="/customer-stories/$slug"
                  params={{ slug: s.slug }}
                  className="group block overflow-hidden rounded-xl border border-border"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </Link>
                <div>
                  <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {s.organisation} · {s.sector}
                  </p>
                  <h2 className="mt-5 text-2xl font-[490] leading-snug lg:text-[2rem]">{s.outcome}</h2>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <blockquote className="border-l-2 border-primary pl-6 font-serif text-xl leading-snug lg:text-2xl">
                    {s.quote}
                  </blockquote>
                  <Link
                    to="/customer-stories/$slug"
                    params={{ slug: s.slug }}
                    className="link-arrow mt-6 inline-flex items-center gap-2 pl-6 text-sm font-medium text-primary"
                  >
                    Read the full story <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

      </Container>
    </main>
  );
}
