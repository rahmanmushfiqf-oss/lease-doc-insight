import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";

export function UseCaseHero({
  eyebrow,
  title,
  paragraphs,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
}) {
  return (
    <section className="relative overflow-hidden bg-mist">
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-[-22rem] size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(3,64,243,0.09),transparent_65%)]" />
      <div className="relative mx-auto max-w-[96rem] px-5 pb-20 pt-20 text-center lg:px-8 lg:pb-28 lg:pt-28">
        <div className="rise mx-auto max-w-4xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-5 font-[490] text-[2.3rem] leading-[1.06] tracking-tight sm:text-5xl lg:text-[4rem]">
            {title}
          </h1>
          {paragraphs.map((text) => (
            <p
              key={text}
              className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {text}
            </p>
          ))}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to={primary.to as "/"} className="btn-base btn-primary link-arrow px-7 py-4">
              {primary.label}
              <ArrowRight className="size-4" />
            </Link>
            <Link to={secondary.to as "/"} className="btn-base btn-outline px-7 py-4">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Section({
  children,
  tone = "background",
  className = "",
}: {
  children: ReactNode;
  tone?: "background" | "mist" | "obsidian";
  className?: string;
}) {
  const toneClass =
    tone === "mist"
      ? "border-y border-border bg-mist"
      : tone === "obsidian"
        ? "bg-obsidian text-white"
        : "bg-background";
  return (
    <section className={`${toneClass} ${className}`}>
      <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">{children}</div>
    </section>
  );
}

export function SectionHead({
  title,
  paragraphs = [],
  align = "left",
  dark = false,
}: {
  title: string;
  paragraphs?: string[];
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
      <h2
        className={`font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem] ${
          dark ? "text-white" : ""
        }`}
      >
        {title}
      </h2>
      {paragraphs.map((text, index) => (
        <p
          key={text}
          className={`${index === 0 ? "mt-6" : "mt-4"} ${
            align === "center" ? "mx-auto" : ""
          } max-w-3xl text-base leading-relaxed ${dark ? "text-white/65" : "text-muted-foreground"}`}
        >
          {text}
        </p>
      ))}
    </div>
  );
}

export type Card = { title: string; body: string; icon?: LucideIcon };

export function CardGrid({ items, columns = 3 }: { items: Card[]; columns?: 2 | 3 }) {
  return (
    <div
      className={`grid gap-5 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article
            key={item.title}
            className="group rounded-2xl border border-border bg-card p-8 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-electric/40 hover:shadow-[var(--shadow-lift)]"
          >
            {Icon ? (
              <span className="flex size-10 items-center justify-center rounded-xl bg-electric/10 text-electric transition-transform duration-200 ease-out group-hover:scale-105">
                <Icon className="size-5" />
              </span>
            ) : (
              <span className="block size-1.5 rounded-full bg-electric transition-transform duration-200 ease-out group-hover:scale-150" />
            )}
            <h3 className="mt-5 font-[490] text-lg">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </article>
        );
      })}
    </div>
  );
}

export function StatementRow({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((text) => (
        <p
          key={text}
          className="rounded-2xl border border-border bg-card px-6 py-6 font-display text-base leading-relaxed transition-colors duration-200 hover:border-electric/40"
        >
          {text}
        </p>
      ))}
    </div>
  );
}

export function QuestionChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((text) => (
        <span
          key={text}
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm text-foreground transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-electric/50 hover:shadow-[var(--shadow-lift)]"
        >
          <span className="size-1.5 rounded-full bg-electric transition-transform duration-200 group-hover:scale-150" />
          {text}
        </span>
      ))}
    </div>
  );
}

export function Steps({
  items,
}: {
  items: { label: string; title: string; body: string }[];
}) {
  return (
    <ol className="relative grid gap-6 lg:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.title}
          className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-electric/40 hover:shadow-[var(--shadow-lift)]"
        >
          <span className="font-display text-xs uppercase tracking-[0.16em] text-electric">
            {item.label}
          </span>
          <h3 className="mt-4 font-[490] text-xl">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function ImageBand({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-[18rem] w-full object-cover transition-transform duration-[900ms] ease-out hover:scale-[1.03] sm:h-[24rem] lg:h-[30rem]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(26,26,26,0.78),transparent)] p-6 lg:p-10">
        <p className="max-w-2xl font-display text-base leading-relaxed text-white sm:text-lg">
          {caption}
        </p>
      </div>
    </div>
  );
}

export function ClosingCta({
  title,
  paragraphs = [],
  primary,
  secondary,
}: {
  title: string;
  paragraphs?: string[];
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
}) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">{title}</h2>
        {paragraphs.map((text) => (
          <p
            key={text}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            {text}
          </p>
        ))}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to={primary.to as "/"} className="btn-base btn-primary px-7 py-4">
            {primary.label}
          </Link>
          <Link to={secondary.to as "/"} className="btn-base btn-outline px-7 py-4">
            {secondary.label}
          </Link>
        </div>
      </div>
    </Section>
  );
}
