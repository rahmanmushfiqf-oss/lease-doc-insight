import { Link } from "@tanstack/react-router";
import { useState, type ComponentType, type FormEvent } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

import {
  IconAccessControl,
  IconAuditTrail,
  IconDataProtection,
  IconInfoSecurity,
} from "@/components/brand/ComplianceIcons";

export type SolutionMockup = {
  path: string;
  assetTitle: string;
  docLabel?: string;
  passage?: string;
  highlight?: string;
  source?: string;
  fields?: { label: string; value: string }[];
  rows?: { label: string; value?: string; source?: string }[];
  footnote?: string;
  ask: string;
};

export type SolutionContent = {
  breadcrumb: string;
  h1: string;
  subheading: string;
  mockup: SolutionMockup;
  challenge: { heading: string; body: string; cards: { title: string; body: string }[] };
  features: {
    heading: string;
    rows: {
      icon: ComponentType<{ className?: string }>;
      label: string;
      title: string;
      body: string;
      image: string;
      alt: string;
    }[];
  };
  audiences: {
    heading: string;
    cards: { icon: ComponentType<{ className?: string }>; title: string; body: string }[];
  };
  quote: { text: string; attribution: string };
  security: { body: string };
  cta: { heading: string; body: string };
};

const controls = [
  { icon: IconInfoSecurity, label: "ISO 27001" },
  { icon: IconAccessControl, label: "Cyber Essentials Plus" },
  { icon: IconDataProtection, label: "UK GDPR" },
  { icon: IconAuditTrail, label: "Audit Trail" },
];

function HeroMockup({ m }: { m: SolutionMockup }) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-xl [perspective:1400px] lg:max-w-none"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)] transition-transform duration-500 ease-out [transform:rotateY(-8deg)_rotateX(3deg)] hover:[transform:rotateY(-3deg)_rotateX(1.5deg)] motion-reduce:transform-none">
        <div className="flex items-center gap-1.5 border-b border-border bg-mist px-4 py-2.5">
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="ml-3 hidden rounded-md bg-background px-3 py-1 text-[10px] text-muted-foreground sm:block">
            {m.path}
          </span>
        </div>
        <div className="flex">
          <div className="hidden w-32 shrink-0 flex-col gap-1 border-r border-border bg-mist/60 p-3 sm:flex">
            <span className="font-display text-[11px] font-semibold">Leasedrop</span>
            {["Assets", "Documents", "Questions", "Dates"].map((item, i) => (
              <span
                key={item}
                className={`mt-1 rounded-md px-2 py-1 text-[10px] ${
                  i === 0 ? "bg-electric/10 text-electric" : "text-muted-foreground"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="min-w-0 flex-1 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-xs font-medium">{m.assetTitle}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-electric/10 px-2 py-0.5 text-[10px] text-electric">
                <span className="size-1 animate-pulse rounded-full bg-electric" />
                Live
              </span>
            </div>

            {m.passage ? (
              <div className="mt-3 rounded-lg border border-border bg-background p-3">
                {m.docLabel ? (
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {m.docLabel}
                  </p>
                ) : null}
                <p className="mt-1.5 text-[11px] leading-relaxed">
                  {m.highlight ? (
                    <mark className="rounded bg-electric/15 px-1 text-foreground">
                      {m.highlight}
                    </mark>
                  ) : null}{" "}
                  {m.passage}
                </p>
                {m.source ? (
                  <p className="mt-2 text-[10px] text-electric">{m.source}</p>
                ) : null}
              </div>
            ) : null}

            {m.rows ? (
              <div className="mt-3 space-y-2">
                {m.rows.map((row) => (
                  <div
                    key={row.label}
                    className="rounded-lg border border-border bg-background px-3 py-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-medium">{row.label}</span>
                      {row.value ? (
                        <span className="shrink-0 text-[10px] text-muted-foreground">
                          {row.value}
                        </span>
                      ) : null}
                    </div>
                    {row.source ? (
                      <p className="mt-0.5 text-[9px] text-electric">{row.source}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            {m.fields ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {m.fields.map((f) => (
                  <div key={f.label} className="rounded-lg border border-border bg-background p-2.5">
                    <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
                      {f.label}
                    </p>
                    <p className="mt-0.5 text-xs font-medium">{f.value}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {m.footnote ? (
              <p className="mt-3 text-[10px] text-muted-foreground">{m.footnote}</p>
            ) : null}

            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
              <span className="text-[10px] text-muted-foreground">{m.ask}</span>
              <ArrowRight className="size-3 text-electric" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LeadForm() {
  const [sent, setSent] = useState(false);
  const field =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors duration-150 placeholder:text-muted-foreground/70 focus:border-electric focus-visible:ring-2 focus-visible:ring-electric/25";

  if (sent) {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-3xl border border-border bg-card p-10 text-center shadow-[var(--shadow-soft)]">
        <span className="flex size-12 items-center justify-center rounded-full bg-electric/10 text-electric">
          <ArrowRight className="size-5" />
        </span>
        <p className="mt-5 font-[490] text-xl">Thank you</p>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          We have received your request and will be in touch shortly.
        </p>
      </div>
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-9"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="name" placeholder="Name" autoComplete="name" className={field} />
        <input
          required
          type="email"
          name="email"
          placeholder="Work email"
          autoComplete="email"
          className={field}
        />
        <input
          required
          name="company"
          placeholder="Company"
          autoComplete="organization"
          className={field}
        />
        <input
          required
          name="role"
          placeholder="Role"
          autoComplete="organization-title"
          className={field}
        />
        <select required name="portfolioSize" defaultValue="" className={field}>
          <option value="" disabled>
            Portfolio size
          </option>
          <option>Under 10 assets</option>
          <option>10 to 50 assets</option>
          <option>50 to 200 assets</option>
          <option>200+ assets</option>
        </select>
        <select required name="useCase" defaultValue="" className={field}>
          <option value="" disabled>
            Primary use case
          </option>
          <option>Lease intelligence</option>
          <option>Critical dates</option>
          <option>Due diligence</option>
          <option>Dilapidations</option>
          <option>Portfolio-wide review</option>
        </select>
      </div>
      <button type="submit" className="btn-base btn-primary link-arrow mt-6 w-full px-7 py-4">
        Request My Demo
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}

export function SolutionPage({ content }: { content: SolutionContent }) {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mist">
        <div className="pointer-events-none absolute inset-0 hairline-grid opacity-70" />
        <div className="pointer-events-none absolute left-1/2 top-[-22rem] size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(3,64,243,0.09),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-[96rem] items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="rise lg:col-span-5">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/"
                    className="text-link transition-colors duration-150 hover:text-electric"
                  >
                    Solutions
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5 text-muted-foreground/60" />
                </li>
                <li className="font-medium text-foreground">{content.breadcrumb}</li>
              </ol>
            </nav>
            <h1 className="mt-8 font-[490] text-[2.3rem] leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              {content.h1}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.subheading}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/book-a-demo" className="btn-base btn-primary link-arrow px-7 py-4">
                Book a Demo
                <ArrowRight className="size-4" />
              </Link>
              <Link to="/platform" className="btn-base btn-outline px-7 py-4">
                Explore the Platform
              </Link>
            </div>
          </div>
          <div className="rise lg:col-span-7">
            <HeroMockup m={content.mockup} />
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow">The Challenge</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              {content.challenge.heading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {content.challenge.body}
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {content.challenge.cards.map((item, i) => (
              <article
                key={item.title}
                className="group rounded-2xl border border-border bg-card p-8 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-electric/40 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="font-display text-xs uppercase tracking-[0.16em] text-electric">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-[490] text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What Leasedrop Does */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow">What Leasedrop Does</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              {content.features.heading}
            </h2>
          </div>
          <div className="mt-16 grid gap-16 lg:gap-20">
            {content.features.rows.map((item, index) => {
              const Icon = item.icon;
              const flipped = index % 2 === 1;
              return (
                <div key={item.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                  <div className={`lg:col-span-6 ${flipped ? "lg:order-2" : ""}`}>
                    <span className="flex size-10 items-center justify-center rounded-xl bg-electric/10 text-electric">
                      <Icon className="size-5" />
                    </span>
                    <p className="mt-5 font-display text-xs uppercase tracking-[0.16em] text-electric">
                      {item.label}
                    </p>
                    <h3 className="mt-3 font-[490] text-2xl leading-[1.12] sm:text-[1.75rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                  <div className={`lg:col-span-6 ${flipped ? "lg:order-1" : ""}`}>
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-soft)] transition-transform duration-500 ease-out hover:scale-[1.01] lg:max-h-72"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who It Supports */}
      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Who It Supports</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              {content.audiences.heading}
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {content.audiences.cards.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-border bg-card p-8 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-electric/40 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-electric/10 text-electric transition-transform duration-200 ease-out group-hover:scale-105">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-[490] text-lg">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote band */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-20 lg:px-8 lg:py-28">
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="font-[490] text-2xl leading-[1.25] tracking-tight sm:text-3xl lg:text-[2.5rem]">
              “{content.quote.text}”
            </blockquote>
            <figcaption className="mt-8 text-sm text-muted-foreground">
              {content.quote.attribution}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Security */}
      <section className="bg-obsidian text-white">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Security &amp; Governance</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] text-white sm:text-4xl lg:text-[3.2rem]">
              Built for the controls your organisation expects
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65">
              {content.security.body}
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
            {controls.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center transition-colors duration-200 hover:border-electric/50"
                >
                  <Icon className="size-10 text-electric" />
                  <span className="text-sm text-white/80">{item.label}</span>
                </div>
              );
            })}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-white/45">
            Certification marks shown are illustrative of the standards Leasedrop is designed
            around, not official certification claims.
          </p>
          <div className="mt-8 text-center">
            <Link
              to="/security"
              className="link-arrow inline-flex items-center gap-2 text-sm text-white transition-colors duration-150 hover:text-electric"
            >
              Explore Security &amp; Compliance
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA + form */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-[96rem] items-center gap-14 px-5 py-24 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-32">
          <div>
            <span className="eyebrow">Get Started</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              {content.cta.heading}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              {content.cta.body}
            </p>
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
    </main>
  );
}
