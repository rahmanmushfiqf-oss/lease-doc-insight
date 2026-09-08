import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import shorfulImg from "@/assets/dr-shorful-islam.webp.asset.json";
import siddiqueImg from "@/assets/siddique-miah.webp.asset.json";
import { Container } from "@/components/resources/Prose";
import { contentImage } from "@/lib/content-images";
import { allBlogPosts, allGuides, authors, formatDate } from "@/lib/content";

export const Route = createFileRoute("/authors/$slug")({
  loader: ({ params }) => {
    const author = authors.find((item) => item.slug === params.slug);
    if (!author) throw notFound();
    return { author };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Author unavailable | Leasedrop" }, { name: "robots", content: "noindex" }] };
    const description = `${loaderData.author.name}, ${loaderData.author.role} at Leasedrop. Read their latest writing and publications.`;
    return { meta: [
      { title: `${loaderData.author.name} | Leasedrop` },
      { name: "description", content: description },
      { property: "og:title", content: `${loaderData.author.name} | Leasedrop` },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: AuthorPage,
});

function AuthorPage() {
  const { author } = Route.useLoaderData();
  const image = author.image === "siddique" ? siddiqueImg : shorfulImg;
  const posts = allBlogPosts().filter((post) => post.status === "published" && post.author === author.name);
  const publications = allGuides().filter((guide) => author.guideIds.includes(guide.id) && guide.status === "published");

  return (
    <main>
      <Container className="py-16 lg:py-24">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="size-4" />Blogs</Link>
        <header className="mt-10 grid max-w-6xl gap-10 border-b border-border pb-16 md:grid-cols-[15rem_minmax(0,1fr)] md:items-start lg:gap-16 lg:pb-20">
          <img src={image.url} alt={`${author.name}, ${author.role} at Leasedrop`} className="aspect-square w-full max-w-60 rounded-lg border border-border object-cover" />
          <div>
            <p className="eyebrow">Author</p>
            <h1 className="mt-4 text-4xl font-[490] leading-tight sm:text-5xl">{author.name}</h1>
            <p className="mt-2 text-base text-primary">{author.role}</p>
            <div className="mt-7 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">{author.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <ul className="mt-7 space-y-1.5">{author.credentials.map((credential) => <li key={credential} className="text-xs text-muted-foreground">{credential}</li>)}</ul>
          </div>
        </header>

        <section className="max-w-6xl py-16 lg:py-20">
          <p className="eyebrow">Published Work</p>
          <h2 className="mt-4 text-3xl font-[490]">Articles by {author.name}</h2>
          <div className="mt-9 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const postImage = contentImage(post.id);
              return <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} className="group block">
                <div className="overflow-hidden rounded-lg border border-border"><img src={postImage.src} alt={postImage.alt} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div>
                <p className="mt-4 text-xs text-muted-foreground">{post.category} · {formatDate(post.date)}</p>
                <h3 className="mt-2 text-xl font-[490] leading-snug transition-colors group-hover:text-primary">{post.title}</h3>
              </Link>;
            })}
          </div>
        </section>

        <section className="max-w-6xl border-t border-border py-16 lg:py-20">
          <h2 className="text-3xl font-[490]">Guides and publications</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {publications.map((guide) => <Link key={guide.id} to="/guides/$slug" params={{ slug: guide.slug }} className="group flex items-center justify-between gap-6 py-6">
              <div><p className="text-xs text-muted-foreground">{guide.format} · {guide.category}</p><h3 className="mt-1 text-lg font-[490] group-hover:text-primary">{guide.title}</h3></div><ArrowRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>)}
          </div>
        </section>
      </Container>
    </main>
  );
}