import { FormEvent, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container, headingId, Prose } from "@/components/resources/Prose";
import { contentImage } from "@/lib/content-images";
import { normalizeBlocks } from "@/lib/markdown";
import { allBlogPosts, authorByName, formatDate, publishedBlog } from "@/lib/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = publishedBlog().find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Unavailable | Leasedrop" }, { name: "robots", content: "noindex" }],
      };
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Leasedrop` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { post } = Route.useLoaderData();
  const image = contentImage(post.id);
  const author = authorByName(post.author);
  const headings = normalizeBlocks(post.body as never).filter(
    (block) => block.type === "h2" || block.type === "h1",
  );
  const related = post.related
    .map((id) => allBlogPosts().find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p) && p!.status === "published")
    .slice(0, 3);

  return (
    <main>
      <Container className="py-16 lg:py-24">
        <article className="max-w-4xl lg:ml-[7%]">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            All articles
          </Link>

          <p className="eyebrow mt-10">{post.category}</p>
          <h1 className="mt-5 text-3xl font-[490] leading-[1.12] tracking-[-0.01em] sm:text-4xl lg:text-[2.9rem]">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-4 border-y border-border py-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">{post.author.charAt(0)}</span>
            <span className="text-sm">
              {author ? (
                <Link
                  to="/authors/$slug"
                  params={{ slug: author.slug }}
                  className="block font-medium text-foreground transition-colors hover:text-primary"
                >
                  {post.author}
                </Link>
              ) : (
                <span className="block font-medium text-foreground">{post.author}</span>
              )}
              <span className="block text-xs text-muted-foreground">
                {formatDate(post.date)} · {post.readTime}
              </span>
            </span>
          </div>
        </article>

        <div className="mt-10 max-w-6xl lg:ml-[7%]">
          <img
            src={image.src}
            alt={image.alt}
            className="aspect-[2/1] w-full rounded-xl border border-border object-cover"
          />
        </div>

        <div className="mt-12 grid max-w-6xl gap-12 lg:ml-[7%] lg:grid-cols-[minmax(0,46rem)_15rem] lg:items-start lg:gap-16 lg:mt-16">
          <article>
            <Prose blocks={post.body} />

            <CommentForm />

            <div className="mt-14 rounded-xl bg-secondary p-8 lg:p-10">
              <p className="eyebrow">Get Started</p>
              <h2 className="mt-4 text-2xl font-[490] leading-tight">See what your own documents can answer.</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Book a short walkthrough and see Leasedrop structure a real asset record, with every answer traced back to the document and page it came from.
              </p>
              <Link to="/book-a-demo" className="btn-base btn-primary mt-6 px-6 py-3">Book a Demo</Link>
            </div>
          </article>

          {headings.length ? (
            <aside className="border-t border-border pt-6 lg:sticky lg:top-28 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0" aria-label="Table of contents">
              <p className="text-sm font-medium text-foreground">Table of contents</p>
              <nav className="mt-4 space-y-3">
                {headings.map((heading) => (
                  <a key={heading.text} href={`#${headingId(heading.text)}`} className="block text-sm leading-snug text-muted-foreground transition-colors hover:text-primary">
                    {heading.text}
                  </a>
                ))}
              </nav>
            </aside>
          ) : null}
        </div>
      </Container>

      {related.length ? (
        <section className="border-t border-border">
          <Container className="py-16 lg:py-20">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-2xl font-[490]">Related reading</h2>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:underline"
              >
                View all
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const ri = contentImage(r.id);
                return (
                  <Link
                    key={r.id}
                    to="/blog/$slug"
                    params={{ slug: r.slug }}
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-lg border border-border">
                      <img
                        src={ri.src}
                        alt={ri.alt}
                        loading="lazy"
                        className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                      {r.category} · {formatDate(r.date)}
                    </p>
                    <h3 className="mt-1.5 text-lg font-[490] leading-snug transition-colors group-hover:text-primary">
                      {r.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {r.excerpt}
                    </p>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}

function CommentForm() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <section className="mt-16 border-t border-border pt-10" aria-labelledby="comment-heading">
      <div className="flex items-center gap-3">
        <MessageSquare className="size-5 text-primary" aria-hidden="true" />
        <h2 id="comment-heading" className="text-2xl font-[490]">Join the conversation</h2>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Share your perspective. Comments are reviewed before appearing.</p>
      {submitted ? (
        <div role="status" className="mt-7 border border-border bg-secondary p-6 text-sm text-foreground">Thank you. Your comment has been submitted for review.</div>
      ) : (
        <form onSubmit={submit} className="mt-7 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium text-foreground">Name<input required name="name" className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm font-normal outline-none focus:border-primary" /></label>
          <label className="text-sm font-medium text-foreground">Work email<input required type="email" name="email" className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm font-normal outline-none focus:border-primary" /></label>
          <label className="text-sm font-medium text-foreground sm:col-span-2">Comment<textarea required name="comment" rows={5} className="mt-2 w-full resize-y rounded-md border border-input bg-background px-4 py-3 text-sm font-normal outline-none focus:border-primary" /></label>
          <div className="sm:col-span-2"><Button type="submit" size="lg">Submit comment</Button></div>
        </form>
      )}
    </section>
  );
}
