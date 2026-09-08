import { Link } from "@tanstack/react-router";

export function PlaceholderPage({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-60" />
      <div className="relative mx-auto max-w-[96rem] px-5 py-28 lg:px-8 lg:py-40">
        <div className="max-w-2xl rise">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {intro ?? "This page is being prepared. In the meantime, our team can walk you through Leasedrop against your own assets."}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/book-a-demo"
              className="btn-base btn-primary px-6 py-3.5"
            >
              Book a Demo
            </Link>
            <Link
              to="/"
              className="btn-base btn-outline px-6 py-3.5"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
