import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building,
  ClipboardCheck,
  HardHat,
  KeyRound,
  LineChart,
  Play,
  Scale,
  SearchCheck,
} from "lucide-react";
import { Container } from "@/components/resources/Prose";
import { formatDate, publishedGuides, publishedStories, publishedVideos } from "@/lib/content";
import { contentImage } from "@/lib/content-images";

export const Route = createFileRoute("/asset-intelligence-hub")({
  head: () => ({
    meta: [
      { title: "Asset Intelligence Hub | Leasedrop" },
      {
        name: "description",
        content:
          "The Leasedrop knowledge base for commercial real estate teams. Guides, articles and resources on lease intelligence, asset document review, dilapidations and more.",
      },
      { property: "og:title", content: "Asset Intelligence Hub | Leasedrop" },
      {
        property: "og:description",
        content:
          "The Leasedrop knowledge base for commercial real estate teams. Guides, articles and resources on lease intelligence, asset document review, dilapidations and more.",
      },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/asset-intelligence-hub" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/asset-intelligence-hub" }],
  }),
  component: Page,
});

const tabs = ["All", "Solutions", "Case Studies", "Whitepaper", "Videos"] as const;
type Tab = (typeof tabs)[number];

const hubSolutions = [
  {
    label: "Asset Managers",
    to: "/solutions/asset-managers",
    icon: Building,
    blurb:
      "Every document behind every property, structured into one connected record. Portfolio questions answered in minutes, with the source attached.",
  },
  {
    label: "Building Surveyors",
    to: "/solutions/building-surveyors",
    icon: HardHat,
    blurb:
      "Dilapidations and technical evidence located in minutes, not days. Arrive on site already knowing what the documents say.",
  },
  {
    label: "Property Managers",
    to: "/solutions/property-managers",
    icon: KeyRound,
    blurb:
      "Obligations, rights and critical dates surfaced across every asset. Day-to-day questions answered without digging through files.",
  },
  {
    label: "Investment Managers",
    to: "/solutions/investment-managers",
    icon: LineChart,
    blurb:
      "Compare assets across the portfolio on the terms that drive value. Exposure surfaced before it reaches the valuation.",
  },
  {
    label: "Acquisitions & Due Diligence",
    to: "/solutions/acquisitions-due-diligence",
    icon: SearchCheck,
    blurb:
      "Large document packs reviewed against transaction timelines. Completeness checked on day one, red flags traced to source.",
  },
  {
    label: "Legals",
    to: "/solutions/legals",
    icon: Scale,
    blurb:
      "Clause-level answers with verification built in. Every position linked back to the exact wording it came from.",
  },
] as const;

function SectionHead({
  title,
  viewAllTo,
}: {
  title: string;
  viewAllTo?: "/guides" | "/customer-stories";
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border pt-12">
      <h2 className="text-2xl font-[490] leading-tight lg:text-3xl">{title}</h2>
      {viewAllTo ? (
        <Link
          to={viewAllTo}
          className="link-arrow inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          View all <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}

function SolutionsSection() {
  return (
    <div className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {hubSolutions.map((s) => {
        const img = contentImage(`sol-${s.label}`);
        const Icon = s.icon;
        return (
          <Link key={s.to} to={s.to} className="group block">
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-primary">
                <Icon className="size-4" />
              </span>
              <h3 className="text-xl font-[490] leading-snug group-hover:text-primary">{s.label}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
          </Link>
        );
      })}
    </div>
  );
}

function CaseStudiesSection() {
  return (
    <div className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {publishedStories().map((s) => {
        const img = contentImage(s.id);
        return (
          <Link
            key={s.id}
            to="/customer-stories/$slug"
            params={{ slug: s.slug }}
            className="group block"
          >
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-6 text-xs tracking-[0.14em] text-muted-foreground uppercase">
              {s.organisation} · {s.sector}
            </p>
            <h3 className="mt-3 text-xl font-[490] leading-snug group-hover:text-primary">
              {s.outcome}
            </h3>
            <span className="link-arrow mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Read the story <ArrowRight className="size-4" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function WhitepaperSection() {
  return (
    <div className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {publishedGuides().map((g) => {
        const img = contentImage(g.id);
        return (
          <Link
            key={g.id}
            to="/guides/$slug"
            params={{ slug: g.slug }}
            className="group block"
          >
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <span className="mt-6 inline-flex rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
              {g.format}
            </span>
            <h3 className="mt-4 text-xl font-[490] leading-snug group-hover:text-primary">
              {g.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{g.description}</p>
          </Link>
        );
      })}
    </div>
  );
}

function VideosSection() {
  return (
    <div className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2">
      {publishedVideos().map((v) => {
        const img = contentImage(v.id);
        return (
          <article key={v.id} className="group">
            <div className="relative overflow-hidden rounded-xl border border-border">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-background/90 shadow-md">
                  <Play className="ml-0.5 size-5 fill-primary text-primary" />
                </span>
              </span>
              <span className="absolute right-3 bottom-3 rounded-full bg-foreground/85 px-2.5 py-1 text-xs font-medium text-background">
                {v.duration}
              </span>
            </div>
            <h3 className="mt-6 text-xl font-[490] leading-snug">{v.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.excerpt}</p>
            <p className="mt-5 text-xs text-muted-foreground">{formatDate(v.date)}</p>
          </article>
        );
      })}
    </div>
  );
}

function Page() {
  const [tab, setTab] = useState<Tab>("All");

  return (
    <main>
      <Container className="pt-24 pb-14 text-center lg:pt-32 lg:pb-16">
        <h1 className="font-[490] text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          Asset Intelligence
        </h1>
      </Container>

      <Container className="pb-16 lg:pb-20">
        <div className="flex justify-center">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-background p-1.5 shadow-sm">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                aria-pressed={tab === t}
                className={`btn-base rounded-full px-4 py-2 text-sm ${
                  tab === t
                    ? "bg-primary font-medium text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </Container>

      <Container className="pb-24 lg:pb-32">
        {tab === "All" ? (
          <div className="space-y-20">
            <section>
              <SectionHead title="Solutions" />
              <SolutionsSection />
            </section>
            <section>
              <SectionHead title="Case Studies" viewAllTo="/customer-stories" />
              <CaseStudiesSection />
            </section>
            <section>
              <SectionHead title="Whitepaper" viewAllTo="/guides" />
              <WhitepaperSection />
            </section>
            <section>
              <SectionHead title="Videos" />
              <VideosSection />
            </section>
          </div>
        ) : tab === "Solutions" ? (
          <SolutionsSection />
        ) : tab === "Case Studies" ? (
          <CaseStudiesSection />
        ) : tab === "Whitepaper" ? (
          <WhitepaperSection />
        ) : (
          <VideosSection />
        )}
      </Container>
    </main>
  );
}
