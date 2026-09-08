import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MinusCircle,
  Search,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";

export function MockupFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-xl [perspective:1400px] lg:max-w-none">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)] transition-transform duration-500 ease-out [transform:rotateY(-6deg)_rotateX(2deg)] hover:[transform:rotateY(-2deg)_rotateX(0.5deg)] motion-reduce:transform-none">
        <div className="flex items-center gap-1.5 border-b border-border bg-mist px-4 py-2.5">
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="ml-3 hidden truncate rounded-md bg-background px-3 py-1 text-[10px] text-muted-foreground sm:block">
            {url}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function HeroFrame({ url, children }: { url: string; children: ReactNode }) {
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
          <span className="ml-3 hidden truncate rounded-md bg-background px-3 py-1 text-[10px] text-muted-foreground sm:block">
            {url}
          </span>
        </div>
        {children}
        <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-4 py-2.5">
          <span className="text-[10px] text-muted-foreground">Ask about this asset…</span>
          <ArrowRight className="size-3 text-electric" />
        </div>
      </div>
    </div>
  );
}

export type TermRow = { k: string; v: string; s?: string };

export function ClauseHero({
  url,
  docTitle,
  pageLabel,
  clauseLabel,
  clauseTopic,
  before,
  highlight,
  after,
  terms,
}: {
  url: string;
  docTitle: string;
  pageLabel: string;
  clauseLabel: string;
  clauseTopic: string;
  before: string;
  highlight: string;
  after: string;
  terms: TermRow[];
}) {
  return (
    <HeroFrame url={url}>
      <div className="grid grid-cols-5 gap-px bg-border">
        <div className="col-span-3 min-w-0 bg-background p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-xs font-medium">{docTitle}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-electric/10 px-2 py-0.5 text-[10px] text-electric">
              <span className="size-1 animate-pulse rounded-full bg-electric" />
              {pageLabel}
            </span>
          </div>
          <p className="mt-3 rounded-lg border border-border bg-mist/50 p-3 text-[10.5px] leading-relaxed text-muted-foreground">
            {before}{" "}
            <mark className="rounded bg-electric/15 px-1 text-foreground">{highlight}</mark>{" "}
            {after}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-md border border-electric/30 bg-electric/5 px-2 py-1 text-[9.5px] text-electric">
              {clauseLabel}
            </span>
            <span className="text-[9.5px] text-muted-foreground">{clauseTopic}</span>
            <span className="ml-auto text-[9.5px] text-muted-foreground">
              View source document
            </span>
          </div>
        </div>
        <div className="col-span-2 min-w-0 bg-mist/60 p-4">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Extracted terms
          </p>
          <div className="mt-2.5 space-y-2">
            {terms.map((row) => (
              <div key={row.k} className="rounded-lg border border-border bg-background p-2.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[9px] uppercase tracking-wide text-muted-foreground">
                    {row.k}
                  </span>
                  <span className="text-right text-[11px] font-medium">{row.v}</span>
                </div>
                {row.s ? <p className="mt-0.5 text-[9px] text-electric">Source: {row.s}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

export type DocRow = { name: string; meta?: string; status: string; pending?: boolean };

export function DocListMockup({
  url,
  title,
  subtitle,
  rows,
  note,
  hero = false,
}: {
  url: string;
  title: string;
  subtitle?: string;
  rows: DocRow[];
  note?: string;
  hero?: boolean;
}) {
  const Frame = hero ? HeroFrame : MockupFrame;
  return (
    <Frame url={url}>
      <div className="p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-medium">{title}</p>
          {subtitle ? (
            <span className="text-[10px] text-muted-foreground">{subtitle}</span>
          ) : null}
        </div>
        <div className="mt-3 divide-y divide-border rounded-xl border border-border bg-background">
          {rows.map((row) => (
            <div key={row.name} className="flex items-center justify-between gap-3 px-3 py-2.5">
              <span className="flex min-w-0 items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-electric" />
                <span className="truncate text-[11px] text-foreground">{row.name}</span>
                {row.meta ? (
                  <span className="shrink-0 text-[10px] text-muted-foreground">{row.meta}</span>
                ) : null}
              </span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium ${
                  row.pending
                    ? "bg-foreground/5 text-muted-foreground"
                    : "bg-electric/10 text-electric"
                }`}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
        {note ? <p className="mt-3 text-[10px] text-muted-foreground">{note}</p> : null}
      </div>
    </Frame>
  );
}

export function StructuredMockup({
  url,
  title,
  rows,
  note,
  hero = false,
}: {
  url: string;
  title: string;
  rows: TermRow[];
  note?: string;
  hero?: boolean;
}) {
  const Frame = hero ? HeroFrame : MockupFrame;
  return (
    <Frame url={url}>
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium">{title}</p>
          <Search className="size-3.5 text-muted-foreground" />
        </div>
        <div className="mt-3 space-y-1.5">
          {rows.map((row) => (
            <div
              key={`${row.k}-${row.v}`}
              className="rounded-lg border border-border bg-background px-3 py-2"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  {row.k}
                </span>
                <span className="text-right text-[11px] font-medium text-foreground">
                  {row.v}
                </span>
              </div>
              {row.s ? <p className="mt-0.5 text-[9px] text-electric">Source: {row.s}</p> : null}
            </div>
          ))}
        </div>
        {note ? <p className="mt-3 text-[10px] text-muted-foreground">{note}</p> : null}
      </div>
    </Frame>
  );
}

export function AskMockup({
  url,
  chips,
  question,
  answer,
  source,
}: {
  url: string;
  chips: string[];
  question: string;
  answer: string;
  source: string;
}) {
  return (
    <MockupFrame url={url}>
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] text-foreground"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-border bg-background p-3">
          <p className="text-[10px] text-muted-foreground">You</p>
          <p className="mt-1 text-[11px] text-foreground">{question}</p>
        </div>
        <div className="mt-2 rounded-xl border border-electric/30 bg-electric/5 p-3">
          <p className="text-[10px] font-medium text-electric">Leasedrop</p>
          <p className="mt-1 text-[11px] leading-relaxed text-foreground">{answer}</p>
          <p className="mt-2 text-[10px] text-electric">Source: {source}</p>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
          <span className="text-[10px] text-muted-foreground">Ask about this asset…</span>
          <ArrowRight className="size-3 text-electric" />
        </div>
      </div>
    </MockupFrame>
  );
}

export function VerifyMockup({
  url,
  docLabel,
  before,
  highlight,
  after,
  source,
  pageLabel,
}: {
  url: string;
  docLabel: string;
  before: string;
  highlight: string;
  after: string;
  source: string;
  pageLabel: string;
}) {
  return (
    <MockupFrame url={url}>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <Search className="size-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Search original document</span>
        </div>
        <div className="mt-3 rounded-xl border border-border bg-background p-3">
          <p className="text-[9px] uppercase tracking-wide text-muted-foreground">{docLabel}</p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-foreground">
            {before}{" "}
            <mark className="rounded bg-electric/15 px-1 text-foreground">{highlight}</mark>{" "}
            {after}
          </p>
          <p className="mt-2 text-[10px] text-electric">View source: {source}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <ChevronLeft className="size-3" />
            {pageLabel}
            <ChevronRight className="size-3" />
          </span>
          <span className="rounded-md bg-electric/10 px-2 py-1 text-[9px] font-medium text-electric">
            Open in viewer
          </span>
        </div>
      </div>
    </MockupFrame>
  );
}

export type Step = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  title: string;
  body: string;
  mockup: ReactNode;
};

export type Outcome = { title: string; body: string };

export type Related = {
  label: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  image: string;
  blurb: string;
};

export type UseCasePageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroMockup: ReactNode;
  howTitle: string;
  steps: Step[];
  outcomeTitle: string;
  outcomes: Outcome[];
  scenarioTitle: string;
  scenario: string;
  without: string[];
  withLeasedrop: string[];
  outcomeLine: string;
  related: Related[];
  ctaTitle: string;
  ctaBody: string;
};

export function UseCasePage(props: UseCasePageProps) {
  return (
    <main>
      <section className="relative overflow-hidden bg-mist">
        <div className="pointer-events-none absolute inset-0 hairline-grid opacity-70" />
        <div className="pointer-events-none absolute left-1/2 top-[-22rem] size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(3,64,243,0.09),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-[96rem] items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="rise lg:col-span-5">
            <span className="eyebrow">{props.eyebrow}</span>
            <h1 className="mt-5 font-[490] text-[2.3rem] leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {props.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {props.subtitle}
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
          <div className="rise lg:col-span-7">{props.heroMockup}</div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow">How It Works</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              {props.howTitle}
            </h2>
          </div>
          <div className="mt-16 grid gap-16 lg:gap-24">
            {props.steps.map((item, index) => {
              const Icon = item.icon;
              const flipped = index % 2 === 1;
              return (
                <div
                  key={item.title}
                  className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
                >
                  <div className={`lg:col-span-5 ${flipped ? "lg:order-2" : ""}`}>
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-electric/10 text-electric">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-display text-xs uppercase tracking-[0.16em] text-electric">
                        Step {index + 1} · {item.label}
                      </span>
                    </div>
                    <h3 className="mt-5 font-[490] text-2xl leading-[1.12] sm:text-[1.75rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                  <div className={`lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}>
                    {item.mockup}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow">The Outcome</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              {props.outcomeTitle}
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {props.outcomes.map((item, i) => (
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

      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow">A Real Scenario</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              {props.scenarioTitle}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {props.scenario}
            </p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
              <p className="font-display text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Without Leasedrop
              </p>
              <ol className="mt-6 space-y-4">
                {props.without.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <MinusCircle className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                    {item}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-electric/30 bg-card p-8 shadow-[var(--shadow-lift)] lg:p-10">
              <p className="font-display text-xs uppercase tracking-[0.16em] text-electric">
                With Leasedrop
              </p>
              <ol className="mt-6 space-y-4">
                {props.withLeasedrop.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-electric" />
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center font-display text-lg leading-relaxed sm:text-xl">
            {props.outcomeLine}
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-20 lg:px-8 lg:py-24">
          <span className="eyebrow">Related Solutions</span>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {props.related.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.to as "/"}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-electric/40 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="aspect-[16/9] overflow-hidden border-b border-border">
                    <img
                      src={item.image}
                      alt={`${item.label} using Leasedrop`}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-electric/10 text-electric">
                        <Icon className="size-4" />
                      </span>
                      <h3 className="font-[490] text-base">{item.label}</h3>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.blurb}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-electric">
                      Explore
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 text-center lg:px-8 lg:py-32">
          <h2 className="mx-auto max-w-3xl font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
            {props.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {props.ctaBody}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/book-a-demo" className="btn-base btn-primary link-arrow px-7 py-4">
              Book a Demo
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
