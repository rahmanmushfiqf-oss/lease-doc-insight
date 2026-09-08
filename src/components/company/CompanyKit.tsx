import { Link } from "@tanstack/react-router";
import { ArrowRight, Maximize2, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { LeadForm } from "@/components/solutions/SolutionKit";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.488638425356!2d-0.2033391!3d51.4859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760f90e2af631d%3A0x330d83dd594d7140!2s1%2C%20Bramber%20Court%2C%202%20Bramber%20Rd%2C%20London%20W14%209PW%2C%20UK!5e0!3m2!1sen!2sbd!4v1788512474523!5m2!1sen!2sbd";

export function CompanyHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden bg-mist">
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-[-22rem] size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(3,64,243,0.09),transparent_65%)]" />
      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:py-32 lg:py-40">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-6 font-[490] text-[2.4rem] leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.8rem]">
          {title}
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export function ExpandableMap({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function openMap() {
    setOpen(true);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMap();
    }
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={openMap}
        onKeyDown={handleKeyDown}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-soft)] transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/25 active:scale-[0.99]"
        aria-label={`Expand map: ${title}`}
      >
        <iframe
          title={title}
          src={MAP_EMBED_URL}
          className="pointer-events-none aspect-[4/3] w-full bg-muted"
          style={{ border: 0 }}
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm backdrop-blur-sm transition-colors duration-150 group-hover:bg-white">
          <Maximize2 className="size-4" />
        </span>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Map of ${title}`}
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm backdrop-blur-sm transition-colors duration-150 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/25"
            aria-label="Close map"
          >
            <X className="size-5" />
          </button>
          <iframe
            title={title}
            src={MAP_EMBED_URL}
            className="h-full w-full"
            style={{ border: 0 }}
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
}

export function LabelBodyRows({
  items,
}: {
  items: { label: string; body: string }[];
}) {
  return (
    <div>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`grid gap-4 py-8 sm:grid-cols-12 sm:gap-10 ${
            i > 0 ? "border-t border-border" : ""
          }`}
        >
          <p className="font-display text-xs uppercase tracking-[0.16em] text-electric sm:col-span-4">
            {item.label}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:col-span-8">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export function FounderCard({
  initials,
  name,
  role,
  bio,
  quote,
  credentials,
}: {
  initials: string;
  name: string;
  role: string;
  bio: ReactNode;
  quote: string;
  credentials: string[];
}) {
  return (
    <article className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10">
      <div
        aria-hidden="true"
        className="flex aspect-square w-full items-center justify-center rounded-2xl border border-border bg-mist"
      >
        <span className="font-display text-5xl tracking-tight text-electric/70">{initials}</span>
      </div>
      <h3 className="mt-7 font-[490] text-xl">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{role}</p>
      <hr className="my-6 border-border" />
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">{bio}</div>
      <blockquote className="mt-7 font-serif text-lg italic leading-relaxed text-foreground sm:text-xl">
        “{quote}”
      </blockquote>
      <ul className="mt-6 space-y-1.5">
        {credentials.map((c) => (
          <li key={c} className="text-xs text-muted-foreground/80">
            {c}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function CompanyCta({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-[96rem] items-center gap-14 px-5 py-24 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-32">
        <div>
          <span className="eyebrow">Get Started</span>
          <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
            {heading}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">{body}</p>
          <Link
            to="/book-a-demo"
            className="btn-base btn-outline link-arrow mt-10 inline-flex px-7 py-4"
          >
            Book a Demo
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
