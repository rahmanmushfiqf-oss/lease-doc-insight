import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Check,
  FileText,
  MessageSquareText,
  Search,
  ShieldCheck,
} from "lucide-react";

import filterPortfolio from "@/assets/Filter_Portfolio.webp.asset.json";
import keepSources from "@/assets/Keep_Sources.webp.asset.json";
import queryPortfolio from "@/assets/Query_Portfolio.webp.asset.json";
import workspaceAssetView from "@/assets/Workspace_Asset_View.webp.asset.json";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform | Leasedrop" },
      {
        name: "description",
        content:
          "Leasedrop brings every document behind each property into a Single Asset View. Ingest, extract, ask and verify - asset intelligence at scale.",
      },
      { property: "og:title", content: "Platform | Leasedrop" },
      {
        property: "og:description",
        content:
          "Leasedrop brings every document behind each property into a Single Asset View. Ingest, extract, ask and verify - asset intelligence at scale.",
      },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/platform" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://asset-intel-source.lovable.app/platform" },
    ],
  }),
  component: Page,
});

const workspaceItems = [
  {
    title: "Asset Record",
    body: "See the documents and structured information associated with a property in one place.",
  },
  {
    title: "Document Relationships",
    body: "Keep original leases, amendments, licences and supporting records connected to the asset they affect.",
  },
  {
    title: "Living Context",
    body: "Add new documents over time without rebuilding what your team already knows about the property.",
  },
];


const metadataItems = [
  {
    title: "Extracted Automatically",
    body: "Key lease terms are identified and structured from the documents in the asset record without manual data entry or template filling.",
  },
  {
    title: "Always Source Linked",
    body: "Every metadata field links to the exact document and page it was extracted from. One click to verify the original wording before acting on it.",
  },
  {
    title: "Updates as Documents Change",
    body: "When a new amendment, licence or variation arrives and changes a position, the metadata reflects it. No manual maintenance required.",
  },
];

const queryItems = [
  {
    title: "Asset-Level Questions",
    body: "Get deeper into one property when you need to understand its documentary position.",
  },
  {
    title: "Cross-Asset Questions",
    body: "Run the same question across multiple assets without repeating the review property by property.",
  },
  {
    title: "Follow-Up Questions",
    body: "Continue the conversation as the investigation develops instead of starting another search from scratch.",
  },
];

const filterItems = [
  {
    title: "Find the Exceptions",
    body: "Narrow the portfolio to assets that meet specific documentary conditions.",
  },
  {
    title: "Compare Like With Like",
    body: "Bring properties with similar terms or provisions together for faster comparison.",
  },
  {
    title: "Move From Portfolio to Source",
    body: "Start with a portfolio view and drill down to the asset, document and relevant passage behind the result.",
  },
];

const sourceItems = [
  {
    title: "Page-Level References",
    body: "See where relevant information appears in the original document.",
  },
  {
    title: "Side-by-Side Review",
    body: "Review the source without leaving the intelligence workspace.",
  },
  {
    title: "Human Verification",
    body: "Use Leasedrop to reach the relevant evidence faster while the final interpretation remains with the professional.",
  },
];

const teamItems = [
  {
    title: "Shared Asset Context",
    body: "Work from the same documentary record across the team.",
  },
  {
    title: "Controlled Access",
    body: "Manage who can access the assets and information relevant to their role.",
  },
  {
    title: "Consistent Intelligence",
    body: "Reduce the need for different people to recreate the same document research independently.",
  },
];

function CardGrid({
  items,
  columns = 3,
}: {
  items: { title: string; body: string }[];
  columns?: 3 | 4;
}) {
  return (
    <div
      className={
        columns === 4
          ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {items.map((item) => (
        <article
          key={item.title}
          className="group rounded-2xl border border-border bg-card p-8 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-electric/40 hover:shadow-[var(--shadow-lift)]"
        >
          <span className="block size-1.5 rounded-full bg-electric transition-transform duration-200 ease-out group-hover:scale-150" />
          <h3 className="mt-5 font-[490] text-lg">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mist">
        <div className="pointer-events-none absolute inset-0 hairline-grid opacity-70" />
        <div className="pointer-events-none absolute -right-40 -top-40 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(3,64,243,0.07),transparent_65%)]" />
<div className="relative mx-auto grid max-w-[96rem] gap-16 px-5 pb-24 pt-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="rise lg:col-span-5">
            <h1 className="font-[490] text-[2.4rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-[4rem]">
              Single Asset View for Commercial Real Estate
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Leasedrop brings the full documentary record of every property into one connected
              workspace: structured, searchable and verifiable. Your team gets the context and
              tools to understand what each asset says, without the search.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/book-a-demo" className="btn-base btn-primary link-arrow px-7 py-4">
                Book a Demo
                <ArrowRight className="size-4" />
              </Link>
              <Link to="/request-a-demo" className="btn-base btn-outline px-7 py-4">
                See Leasedrop in Action
              </Link>
            </div>
          </div>

<div className="rise relative lg:col-span-7" style={{ animationDelay: "120ms" }}>
            {/* ambient glow behind the product */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(3,64,243,0.11),transparent_65%)]"
            />
            <div aria-hidden="true" className="group relative [perspective:1600px]">
              <div className="relative transition-transform duration-700 ease-out will-change-transform [transform:rotateY(-14deg)_rotateX(7deg)] group-hover:[transform:rotateY(-7deg)_rotateX(3deg)] motion-reduce:transition-none motion-reduce:[transform:none]">
                {/* product UI mockup, properly fitted */}
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_50px_100px_-20px_rgba(15,23,42,0.18),0_30px_60px_-30px_rgba(3,64,243,0.12)]">
                  {/* browser chrome */}
                  <div className="flex h-9 items-center gap-1.5 border-b border-border/70 bg-background/80 px-4">
                    <span className="size-2.5 rounded-full bg-border" />
                    <span className="size-2.5 rounded-full bg-border" />
                    <span className="size-2.5 rounded-full bg-border" />
                  </div>
<div className="flex h-[26rem] sm:h-[28rem] lg:h-[30rem]">
                    {/* app sidebar */}
                    <div className="hidden w-44 flex-col border-r border-border/70 bg-background/70 p-3 sm:flex">
                      <div className="flex items-center gap-2 px-2 py-1.5">
                        <span className="flex size-6 items-center justify-center rounded-md bg-electric/10">
                          <span className="size-2.5 rounded-[3px] bg-electric" />
                        </span>
                        <span className="text-xs font-semibold text-foreground">Leasedrop</span>
                      </div>
                      <nav className="mt-4 space-y-1">
                        <span className="flex items-center gap-2 rounded-md bg-electric/10 px-2.5 py-1.5 text-[11px] font-medium text-electric">
                          <Building2 className="size-3.5" /> Assets
                        </span>
                        <span className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11px] text-muted-foreground">
                          <FileText className="size-3.5" /> Documents
                        </span>
                        <span className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11px] text-muted-foreground">
                          <MessageSquareText className="size-3.5" /> Questions
                        </span>
                        <span className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11px] text-muted-foreground">
                          <ShieldCheck className="size-3.5" /> Verification
                        </span>
                      </nav>
                    </div>
                    {/* main pane */}
                    <div className="flex flex-1 flex-col bg-mist/60">
                      {/* toolbar */}
                      <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-background/60 px-4 py-2.5">
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-semibold text-foreground">
                            480 University Ave
                          </p>
                          <p className="text-[10px] text-muted-foreground">Lease extraction</p>
                        </div>
                        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-electric/20 bg-electric/5 px-2 py-0.5 text-[10px] font-medium text-electric">
                          <span className="relative flex size-1.5">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-electric opacity-60 motion-reduce:animate-none" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-electric" />
                          </span>
                          Live
                        </span>
                      </div>
                      {/* body */}
                      <div className="flex flex-1 gap-4 p-4">
                        {/* document */}
                        <div className="relative flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                          <div className="flex-1 p-5">
                            <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                              Lease agreement · Page 4
                            </p>
                            <div className="mt-4 space-y-2.5">
                              <span className="block h-1.5 w-full rounded bg-border" />
                              <span className="block h-1.5 w-full rounded bg-border" />
                              <span className="block h-1.5 w-3/4 rounded bg-border" />
                              <span className="block h-1.5 w-full rounded bg-border" />
                            </div>
                            {/* extraction highlight */}
                            <div className="relative mt-3.5 rounded border-l-2 border-electric bg-electric/10 px-2.5 py-1.5">
                              <span className="flex items-center gap-1.5 text-[10px] font-medium text-foreground">
                                <Check className="size-3 shrink-0 text-electric" />
                                Base rent of $42.50 per square foot
                              </span>
                            </div>
                            <div className="mt-3.5 space-y-2.5">
                              <span className="block h-1.5 w-full rounded bg-border" />
                              <span className="block h-1.5 w-full rounded bg-border" />
                              <span className="block h-1.5 w-1/2 rounded bg-border" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-t border-border/70 bg-background/50 px-4 py-2">
                            <span className="text-[10px] text-muted-foreground">Source: page 4</span>
                            <span className="text-[10px] font-medium text-electric">
                              Open document
                            </span>
                          </div>
                        </div>
                        {/* metadata pane */}
                        <div className="hidden w-44 flex-col gap-3 lg:flex">
                          <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
                            <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                              Base rent
                            </p>
                            <p className="mt-1 text-sm font-semibold text-foreground">$42.50 / SF</p>
                            <p className="mt-0.5 text-[10px] text-muted-foreground">
                              Source: page 4
                            </p>
                          </div>
                          <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
                            <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                              Lease expiry
                            </p>
                            <p className="mt-1 text-sm font-semibold text-foreground">Dec 2029</p>
                            <p className="mt-0.5 text-[10px] text-muted-foreground">
                              Source: page 12
                            </p>
                          </div>
                          <div className="mt-auto flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 shadow-sm">
                            <Search className="size-3.5 shrink-0 text-muted-foreground" />
                            <span className="truncate text-[10px] text-muted-foreground">
                              Ask about this lease
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* One Workspace */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
                One workspace for every document behind the asset.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Leases, amendments, licences, surveys, notices and reports all add to the story of
                an asset. Leasedrop brings them together in one evolving record, connecting
                documents, extracted information, queries and source references in a single view.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]">
              <img
                src={workspaceAssetView.url}
                alt="Leasedrop workspace showing the lease register for an asset with status, dates and AI processing state"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-16">
            <CardGrid items={workspaceItems} />
          </div>
        </div>
      </section>

      {/* Metadata */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div className="order-2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)] sm:p-8 lg:order-1">
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Harbour Point Studios</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Asset metadata</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-electric/20 bg-electric/5 px-2.5 py-1 text-[10px] font-medium text-electric">
                  <Check className="size-3" />
                  Verified
                </span>
              </div>
              <dl className="mt-2 divide-y divide-border/60">
                {[
                  { label: "Base rent", value: "£38.50 / sq ft", source: "Head Lease, p.4" },
                  { label: "Lease expiry", value: "17 Jan 2027", source: "Head Lease, p.12" },
                  { label: "Break option", value: "18 Jan 2025 · 6 months' notice", source: "Amendment 2, p.2" },
                  { label: "1954 Act", value: "Contracted out", source: "Head Lease, p.28" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-foreground">{row.value}</dd>
                    </div>
                    <span className="shrink-0 rounded-full border border-border bg-mist px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                      {row.source}
                    </span>
                  </div>
                ))}
              </dl>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
                Metadata of every asset, organised
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Every asset record carries a structured layer of key terms, dates and positions,
                built directly from the documents behind it.
              </p>
            </div>
          </div>
          <div className="mt-16">
            <CardGrid items={metadataItems} />
          </div>
        </div>
      </section>

{/* Ask the Portfolio */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="order-2 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)] lg:order-1">
              <img
                src={queryPortfolio.url}
                alt="Leasedrop interface showing suggested questions and recent conversations about a lease document"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
                Ask the Portfolio Your Way
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Leasedrop gives your team a conversational interface for both. Ask about a specific
                asset, narrow the question to particular documents, or look across the portfolio for
                properties that match the same condition.
              </p>
            </div>
          </div>
          <div className="mt-16">
            <CardGrid items={queryItems} />
          </div>
        </div>
      </section>

      {/* Filter the Portfolio */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
                Filter the Portfolio by What the Documents Say
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Not every task needs a question. Leasedrop also turns extracted information into
                filters your team can use to narrow the portfolio quickly. Move from hundreds of
                assets to the properties that match a particular term, date, obligation or
                provision, then open the supporting information when something needs closer review.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]">
              <img
                src={filterPortfolio.url}
                alt="Leasedrop lease filters panel beside a list of extracted tenant obligations"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-16">
            <CardGrid items={filterItems} />
          </div>
        </div>
      </section>

      {/* Keep the Source Beside the Intelligence */}
      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="order-2 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)] lg:order-1">
              <img
                src={keepSources.url}
                alt="Extracted lease clause shown beside the original document page with the matching passage highlighted"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
                Keep the Source Beside the Intelligence
              </h2>
              <p className="mt-6 max-w-xl font-display text-sm uppercase tracking-[0.14em] text-muted-foreground">
                Source View
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Leasedrop is designed so the answer and the evidence do not live in separate
                workflows.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Open the relevant document beside an extracted field or AI response and move
                directly to the supporting page. Your team can understand what Leasedrop found while
                still reading the original wording in context.
              </p>
            </div>
          </div>
          <div className="mt-16">
            <CardGrid items={sourceItems} />
          </div>
        </div>
      </section>

      {/* Shared Team Resource */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
              Make Asset Intelligence a Shared Team Resource
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Asset knowledge should not disappear into personal folders, spreadsheets or individual
              memory. Leasedrop gives authorised team members a shared environment for working
              with the same asset record, so the information available to one person can remain
              useful to the wider organisation.
            </p>
          </div>
          <div className="mt-16">
            <CardGrid items={teamItems} />
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-obsidian text-white">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <p className="font-display text-sm uppercase tracking-[0.14em] text-white/60">
              Integrations
            </p>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] text-white sm:text-4xl lg:text-[3.4rem]">
              Fit Leasedrop around your existing property stack.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65">
              Leasedrop is designed to become the intelligence layer around your property
              documents, not another system that forces you to rebuild the way your organisation
              works. Bring property documents, work with the intelligence they contain and connect
              that information with the wider tools and workflows your team already relies on.
            </p>
            <Link
              to="/company/partners"
              className="link-arrow link-underline mt-8 inline-flex items-center gap-1.5 font-display text-sm text-white"
            >
              Explore Integrations →
            </Link>
          </div>
        </div>
      </section>

      {/* Pilot CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-sm uppercase tracking-[0.14em] text-muted-foreground">
              Get Started
            </p>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
              Start with the assets that matter most.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              You do not need to move an entire portfolio before seeing what Leasedrop can do.
              Choose a set of real assets, bring in the documents behind them and test the platform
              against the questions your team already spends time answering.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/platform" className="btn-base btn-primary px-7 py-4">
                Explore the Platform
              </Link>
              <Link to="/book-a-demo" className="btn-base btn-outline px-7 py-4">
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
