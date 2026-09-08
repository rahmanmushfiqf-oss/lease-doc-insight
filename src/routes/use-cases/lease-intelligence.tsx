import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileUp,
  Files,
  KeyRound,
  MessageSquareText,
  MinusCircle,
  Scale,
  ScanLine,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import skylineAsset from "@/assets/Leasedrop_2.webp.asset.json";
import contractAsset from "@/assets/leasedrop_3.webp.asset.json";
import archiveAsset from "@/assets/leasedrop_4.webp.asset.json";

export const Route = createFileRoute("/use-cases/lease-intelligence")({
  head: () => ({
    meta: [
      { title: "Lease Intelligence | Every Lease, Read Once | Leasedrop" },
      {
        name: "description",
        content:
          "Leasedrop reads your lease documents, structures what matters and keeps it accessible to everyone who needs it, with every answer traced to its source.",
      },
      { property: "og:title", content: "Lease Intelligence | Leasedrop" },
      {
        property: "og:description",
        content:
          "Every lease, read once. Available forever. Structured terms, plain language answers and source-linked wording.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function MockupFrame({ url, children }: { url: string; children: ReactNode }) {
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

function HeroMockup() {
  const terms = [
    { k: "Base rent", v: "$42.50 / sq ft", s: "Clause 4.2 · p.12" },
    { k: "Rent review", v: "Every 5 years", s: "Clause 4.2 · p.12" },
    { k: "Break option", v: "14 Mar 2031", s: "Clause 9.1 · p.18" },
    { k: "Term", v: "15 years", s: "Clause 2.1 · p.3" },
  ];
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
            Leasedrop/leases/480-university-ave/extract
          </span>
        </div>
        <div className="grid grid-cols-5 gap-px bg-border">
          <div className="col-span-3 min-w-0 bg-background p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-xs font-medium">Lease Agreement</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-electric/10 px-2 py-0.5 text-[10px] text-electric">
                <span className="size-1 animate-pulse rounded-full bg-electric" />
                Page 12 of 41
              </span>
            </div>
            <p className="mt-3 rounded-lg border border-border bg-mist/50 p-3 text-[10.5px] leading-relaxed text-muted-foreground">
              ...the provisions of this lease shall be read and construed together...{" "}
              <mark className="rounded bg-electric/15 px-1 text-foreground">
                the Tenant shall pay the Base Rent of $42.50 per square foot
              </mark>{" "}
              subject to review on each fifth anniversary of the Term...
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-md border border-electric/30 bg-electric/5 px-2 py-1 text-[9.5px] text-electric">
                Clause 4.2
              </span>
              <span className="text-[9.5px] text-muted-foreground">Rent</span>
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
                    <span className="text-[11px] font-medium">{row.v}</span>
                  </div>
                  <p className="mt-0.5 text-[9px] text-electric">Source: {row.s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-4 py-2.5">
          <span className="text-[10px] text-muted-foreground">Ask about this lease…</span>
          <ArrowRight className="size-3 text-electric" />
        </div>
      </div>
    </div>
  );
}

function UploadMockup() {
  const rows = [
    { name: "480 University Ave Lease.pdf", status: "Processed", pending: false },
    { name: "Licence to Alter.pdf", status: "Processed", pending: false },
    { name: "Assignment Side Letter.pdf", status: "AI processing", pending: true },
  ];
  return (
    <MockupFrame url="Leasedrop/documents/upload">
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-electric px-3 py-1.5 text-[10px] font-medium text-white">
            <FileUp className="size-3" />
            Upload a lease
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[10px] text-foreground">
            <Files className="size-3" />
            Bulk upload
          </span>
        </div>
        <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-background">
          {rows.map((row) => (
            <div key={row.name} className="flex items-center justify-between gap-3 px-3 py-2.5">
              <span className="flex min-w-0 items-center gap-2">
                <FileUp className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate text-[11px] text-foreground">{row.name}</span>
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
        <p className="mt-3 text-[10px] text-muted-foreground">
          Read together as one connected record, not as separate files.
        </p>
      </div>
    </MockupFrame>
  );
}

function ExtractMockup() {
  const groups = [
    {
      cat: "Prescribed Clauses",
      items: ["LR1. Date of lease", "LR3. Parties to this lease", "LR4. Property"],
    },
    { cat: "Defined Terms", items: ["Lease start date", "Lease end date"] },
  ];
  return (
    <MockupFrame url="Leasedrop/leases/480-university-ave/extracts">
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium">Extracts</p>
          <Search className="size-3.5 text-muted-foreground" />
        </div>
        {groups.map((group) => (
          <div key={group.cat} className="mt-3">
            <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
              {group.cat}
            </p>
            <div className="mt-1.5 space-y-1.5">
              {group.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2"
                >
                  <span className="flex items-center gap-2 text-[11px] text-foreground">
                    <span className="size-1.5 rounded-full bg-electric" />
                    {item}
                  </span>
                  <ChevronRight className="size-3 text-muted-foreground/60" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function AskMockup() {
  return (
    <MockupFrame url="Leasedrop/leases/480-university-ave/ask">
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-1.5">
          {[
            "What are the tenant's repair obligations?",
            "Can the tenant sublet part of the floor?",
            "Has this provision been amended?",
          ].map((chip) => (
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
          <p className="mt-1 text-[11px] text-foreground">
            Has the assignment clause been amended?
          </p>
        </div>
        <div className="mt-2 rounded-xl border border-electric/30 bg-electric/5 p-3">
          <p className="text-[10px] font-medium text-electric">Leasedrop</p>
          <p className="mt-1 text-[11px] leading-relaxed text-foreground">
            Yes. The licence dated 14 Mar 2023 varies clause 4.2 to allow assignment with
            landlord consent.
          </p>
          <p className="mt-2 text-[10px] text-electric">Source: Licence to Alter, p.3</p>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
          <span className="text-[10px] text-muted-foreground">
            Ask anything about this document…
          </span>
          <ArrowRight className="size-3 text-electric" />
        </div>
      </div>
    </MockupFrame>
  );
}

function VerifyMockup() {
  return (
    <MockupFrame url="Leasedrop/leases/480-university-ave/source">
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <Search className="size-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Search original document</span>
        </div>
        <div className="mt-3 rounded-xl border border-border bg-background p-3">
          <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
            Lease agreement · Page 17 of 31
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-foreground">
            …the Tenant shall not assign, underlet or part with possession of the Demised
            Premises without the prior written consent of the Landlord,{" "}
            <mark className="rounded bg-electric/15 px-1 text-foreground">
              such consent not to be unreasonably withheld
            </mark>
            …
          </p>
          <p className="mt-2 text-[10px] text-electric">View source: Clause 4.2, p.17</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <ChevronLeft className="size-3" />
            Page [17] of 31
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

const steps = [
  {
    icon: FileUp,
    label: "Upload",
    title: "Bring the lease and its history together",
    body: "Upload the head lease alongside any amendments, licences, side letters and ancillary documents. Leasedrop reads them as one connected record, not as separate files.",
    mockup: <UploadMockup />,
  },
  {
    icon: ScanLine,
    label: "Extract",
    title: "Structure what the lease actually says",
    body: "Key terms, dates, obligations, rights, covenants and provisions are identified and structured automatically. No manual abstraction. No template to fill in.",
    mockup: <ExtractMockup />,
  },
  {
    icon: MessageSquareText,
    label: "Ask",
    title: "Question the lease in plain language",
    body: "Ask about any aspect of the lease, repair liability, permitted use, rent review mechanism, break conditions, and receive an answer drawn from the document itself.",
    mockup: <AskMockup />,
  },
  {
    icon: ShieldCheck,
    label: "Verify",
    title: "Read the original wording before you rely on it",
    body: "Every answer links to the exact page and passage it came from. Move from the structured response to the original clause in one step.",
    mockup: <VerifyMockup />,
  },
];

const outcomes = [
  {
    title: "No more repeated document searches",
    body: "The same question about a lease does not need to be answered by opening the document again. The answer is already there, already traced to its source.",
  },
  {
    title: "A record that outlasts the team",
    body: "When people move on, the intelligence they built up around a lease stays with the asset. The next person starts with everything, not nothing.",
  },
  {
    title: "Answers your counterparties can rely on",
    body: "When a tenant, investor or adviser asks what the lease says, the answer comes with a source reference, not a qualification about needing to check the documents.",
  },
];

const without = [
  "Locate the head lease in the shared drive",
  "Search for the assignment and subletting clause manually",
  "Realise the position was amended by a licence granted three years later",
  "Locate the licence separately",
  "Read across both documents to form a view",
  "Draft a response with a caveat that it should be checked further",
];

const with_ = [
  "Ask the question in plain language",
  "Leasedrop identifies the relevant provisions across the lease and the licence",
  "Review the original wording directly from the response",
  "Respond to the tenant with the clause reference attached",
];

const related = [
  {
    label: "Asset Management Teams",
    to: "/solutions/asset-managers",
    icon: Building2,
    image: skylineAsset.url,
    blurb:
      "Turn every lease, amendment and side letter into structured data the whole team can query in seconds. Reconcile rents, options and obligations without reopening a single PDF.",
  },
  {
    label: "Property Managers",
    to: "/solutions/property-managers",
    icon: KeyRound,
    image: archiveAsset.url,
    blurb:
      "Replace inbox-hunting with source-linked answers on break options, rent reviews and service charge clauses. Keep the position current for everyone who relies on it daily.",
  },
  {
    label: "Legal Teams",
    to: "/solutions/legals",
    icon: Scale,
    image: contractAsset.url,
    blurb:
      "Find the exact wording behind any clause, with every answer traced to its page in the source document. Prepare due diligence and disputes from a verified record, not a folder of files.",
  },
];

function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mist">
        <div className="pointer-events-none absolute inset-0 hairline-grid opacity-70" />
        <div className="pointer-events-none absolute left-1/2 top-[-22rem] size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(3,64,243,0.09),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-[96rem] items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="rise lg:col-span-5">
            <span className="eyebrow">Lease Intelligence</span>
            <h1 className="mt-5 font-[490] text-[2.3rem] leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              Every Lease, Read Once. Available Forever.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Lease documents hold the terms your business depends on. Leasedrop reads them,
              structures what matters and keeps it accessible to everyone who needs it, without
              the document ever needing to be opened again.
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
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow">How It Works</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              From lease document to structured intelligence in one flow.
            </h2>
          </div>
          <div className="mt-16 grid gap-16 lg:gap-24">
            {steps.map((item, index) => {
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

      {/* Outcome */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow">The Outcome</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              What changes when every lease is structured and searchable.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {outcomes.map((item, i) => (
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

      {/* In practice */}
      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow">A Real Scenario</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              What lease intelligence looks like in use.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A property manager receives a tenant query about whether their lease permits
              subleasing part of their floor.
            </p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
              <p className="font-display text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Without Leasedrop
              </p>
              <ol className="mt-6 space-y-4">
                {without.map((item) => (
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
                {with_.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-electric" />
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center font-display text-lg leading-relaxed sm:text-xl">
            The same answer is available to any team member who receives the same question next
            week, without starting the search again.
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-20 lg:px-8 lg:py-24">
          <span className="eyebrow">Related Solutions</span>
<div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((item) => {
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

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 text-center lg:px-8 lg:py-32">
          <h2 className="mx-auto max-w-3xl font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
            See lease intelligence on your own documents.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Bring in a lease and see how Leasedrop structures the position behind it.
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