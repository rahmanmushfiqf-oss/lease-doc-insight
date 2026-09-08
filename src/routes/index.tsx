import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  FileImage,
  FilePenLine,
  FileSearch,
  FileSignature,
  FileText,
} from "lucide-react";
import portfolioImage from "@/assets/Leasedrop_portfolio.webp.asset.json";
import heroVideo from "@/assets/leasedrop-background.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.webp.asset.json";
import atriumImage from "@/assets/Leasedrop_Asset_Intellegence.webp.asset.json";
import {
  IconBuildings,
  IconDocumentVerified,
  IconSearch,
  IconSettings,
  IconTime,
  IconTrend,
} from "@/components/brand/BrandIcons";
import {
  IconAccessControl,
  IconAiGovernance,
  IconAuditControls,
  IconAuditTrail,
  IconDataProtection,
  IconInfoSecurity,
  IconThreatTesting,
} from "@/components/brand/ComplianceIcons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leasedrop" },
      {
        name: "description",
        content:
          "Leasedrop turns the documents behind every commercial property into structured, searchable and verifiable intelligence. Single Asset View for every asset.",
      },
      { property: "og:title", content: "Leasedrop" },
      {
        property: "og:description",
        content:
          "Leasedrop turns the documents behind every commercial property into structured, searchable and verifiable intelligence. Single Asset View for every asset.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const recordFeatures = [
  {
    label: "Complete",
    body: "One record covering every document connected to the asset, not just the primary lease.",
  },
  {
    label: "Connected",
    body: "Amendments, licences and notices are read alongside the documents they affect, not separately.",
  },
  {
    label: "Current",
    body: "New documents are added as they arrive. The record stays accurate without anyone maintaining it manually.",
  },
];

const benefits = [
  {
    icon: IconSearch,
    title: "Find What Matters Faster",
    body: "Locate the clause, term or reference you need without opening folder after folder of PDFs.",
  },
  {
    icon: IconBuildings,
    title: "Search Across Your Portfolio",
    body: "Ask one question and see how every asset answers it, not just the file in front of you.",
  },
  {
    icon: IconDocumentVerified,
    title: "Keep Asset Knowledge Accessible",
    body: "Asset knowledge stays available to the whole team instead of living with one person.",
  },
  {
    icon: IconTrend,
    title: "Connect the Full Asset Record",
    body: "Leases, amendments, licences, surveys, notices and reports read together as one record.",
  },
  {
    icon: IconTime,
    title: "Verify Every Answer",
    body: "Every answer is traceable to the exact document and passage it came from.",
  },
  {
    icon: IconSettings,
    title: "Reduce Manual Review",
    body: "Spend less time reconstructing information and more time on professional judgement.",
  },
];

const steps = [
  { n: "01", title: "Ingest", body: "Bring the documents behind each asset together in one place." },
  { n: "02", title: "Extract", body: "Structure the terms, dates, rights and obligations held inside them." },
  { n: "03", title: "Ask", body: "Question a single asset or the entire portfolio in plain language." },
  { n: "04", title: "Verify", body: "Open the source passage behind every answer before you rely on it." },
];

const assetDocs = [
  { name: "Head Lease", type: "Lease", Icon: FileText },
  { name: "Amendment 2", type: "Amendment", Icon: FilePenLine },
  { name: "Licence to Alter", type: "Licence", Icon: FileSignature },
  { name: "Schedule of Condition", type: "Schedule", Icon: FileImage },
  { name: "Dilapidations Survey", type: "Survey", Icon: FileSearch },
];

const demoQuestions = [
  {
    question: "What are the tenant repair obligations at Northgate House?",
    answer:
      "The tenant holds full internal repairing obligations throughout the term. The roof and external structure remain the landlord's liability.",
    source: "Lease, Clause 8.4, page 22",
    docIndex: 0,
  },
  {
    question: "Has the tenant made any alterations to the premises?",
    answer:
      "Yes. A licence to alter dated 2021 permits the fit-out of the third floor, subject to reinstatement at the end of the term.",
    source: "Licence to Alter, Clause 3, page 4",
    docIndex: 2,
  },
  {
    question: "What condition was the property in at the start of the term?",
    answer:
      "The schedule of condition records the roof covering as defective at grant, limiting the tenant's repair obligation for that element.",
    source: "Schedule of Condition, Section 2, page 6",
    docIndex: 3,
  },
  {
    question: "Are there any outstanding dilapidations against the tenant?",
    answer:
      "The survey lists external window repairs and repainting of common areas as outstanding against the tenant's covenant.",
    source: "Dilapidations Survey, Summary, page 2",
    docIndex: 4,
  },
];

const audiences = [
  {
    title: "Asset Management Teams",
    body: "Understand obligations, rights and critical dates across the assets you are responsible for.",
    link: "For Asset Managers",
    to: "/solutions/asset-managers",
  },
  {
    title: "Building Surveyors",
    body: "Locate and extract the evidence behind a survey while judgement stays with the surveyor.",
    link: "For Building Surveyors",
    to: "/solutions/building-surveyors",
  },
  {
    title: "Investment & Portfolio Managers",
    body: "Compare what the documents say across assets before decisions are made.",
    link: "For Investment Teams",
    to: "/solutions/investment-managers",
  },
  {
    title: "Acquisitions & Due Diligence Teams",
    body: "Work through large document packs and surface what a transaction depends on.",
    link: "For Due Diligence",
    to: "/solutions/acquisitions-due-diligence",
  },
] as const;

const securityItems = [
  { label: "ISO 27001", Icon: IconInfoSecurity, alt: "Information security management icon" },
  { label: "Audit Trail", Icon: IconAuditTrail, alt: "Chronological audit trail icon" },
  {
    label: "Cyber Essentials Plus",
    Icon: IconThreatTesting,
    alt: "Technical security testing icon",
  },
  { label: "UK GDPR", Icon: IconDataProtection, alt: "Personal data protection icon" },
  { label: "Access Control", Icon: IconAccessControl, alt: "User access permissions icon" },
  { label: "AI Governance", Icon: IconAiGovernance, alt: "AI model oversight icon" },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-foreground/30 focus:border-primary focus:outline-none";

function Home() {
  const [activeTab, setActiveTab] = useState<"documents" | "ask">("documents");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const qa = demoQuestions[activeQuestion]!;
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-obsidian text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo.url}
          poster={heroPoster.url}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-obsidian/45" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(26,26,26,0.55),rgba(26,26,26,0.15))]" />
        <div className="relative mx-auto grid max-w-[96rem] gap-16 px-5 pb-24 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-28">
          <div className="rise">
            <h1 className="font-[490] text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.6rem]">
              Single Asset View Across Your Entire Portfolio
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/book-a-demo"
                className="btn-base btn-primary link-arrow px-7 py-4"
              >
                Book a Demo
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/platform"
                className="btn-base btn-outline-dark px-7 py-4"
              >
                Explore the Platform
              </Link>
            </div>
          </div>

          {/* Single Asset View product presentation */}
          <div className="rise relative" style={{ animationDelay: "120ms" }}>
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-obsidian/95 text-white shadow-[0_28px_80px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/15 bg-white/[0.06] px-5 py-3.5">
                <span className="size-2 rounded-full bg-white/60" />
                <span className="size-2 rounded-full bg-white/60" />
                <span className="size-2 rounded-full bg-electric/90" />
                <span className="ml-3 font-display text-xs tracking-wide text-white/80">
                  Portfolio workspace
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/15 px-6 py-4">
                <div>
                  <p className="font-display text-[0.7rem] uppercase tracking-[0.14em] text-white/70">
                    Single Asset View
                  </p>
                  <p className="mt-1 text-base font-[490]">Northgate House</p>
                </div>
              </div>

              <div className="flex items-center gap-6 border-b border-white/15 px-6">
                {(["documents", "ask"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    aria-pressed={activeTab === tab}
                    className={`-mb-px border-b-2 pb-3 pt-3 font-display text-xs font-medium uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-white/70 hover:text-white"
                    }`}
                  >
                    {tab === "documents" ? "Documents" : "Ask"}
                  </button>
                ))}
              </div>

              <div className="grid gap-0 sm:grid-cols-[1.15fr_1fr]">
                <div className="border-b border-white/15 p-6 sm:border-b-0 sm:border-r sm:border-r-white/20">
                  {activeTab === "documents" ? (
                    <ul className="space-y-2.5">
                      {assetDocs.map(({ name, type, Icon }, index) => {
                        const isSource = qa.docIndex === index;
                        return (
                          <li key={name}>
                            <button
                              type="button"
                              onClick={() => {
                                const match = demoQuestions.findIndex((q) => q.docIndex === index);
                                if (match >= 0) setActiveQuestion(match);
                                setActiveTab("ask");
                              }}
                              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                                isSource
                                  ? "border-primary/70 bg-white/[0.12]"
                                  : "border-white/12 bg-white/[0.05] hover:border-white/30 hover:bg-white/[0.09]"
                              }`}
                            >
                              <Icon className="size-4 shrink-0 text-primary" />
                              <span className="truncate text-sm">{name}</span>
                              <span className="ml-auto shrink-0 font-display text-[0.65rem] uppercase tracking-[0.12em] text-white/70">
                                {type}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-white/70">
                        Try a question
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {demoQuestions.map((item, index) => (
                          <li key={item.question}>
                            <button
                              type="button"
                              onClick={() => setActiveQuestion(index)}
                              aria-pressed={activeQuestion === index}
                              className={`w-full rounded-lg border px-4 py-3 text-left text-sm leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                                activeQuestion === index
                                  ? "border-primary/70 bg-white/[0.12]"
                                  : "border-white/12 bg-white/[0.05] hover:border-white/30 hover:bg-white/[0.09]"
                              }`}
                            >
                              {item.question}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="font-display text-xs uppercase tracking-[0.14em] text-white/70">
                    Question
                  </p>
                  <div className="mt-3 rounded-lg border border-white/12 bg-white/[0.05] px-4 py-3 text-sm leading-relaxed">
                    {qa.question}
                  </div>
                  <p className="mt-5 font-display text-xs uppercase tracking-[0.14em] text-white/70">
                    Answer
                  </p>
                  <div
                    key={activeQuestion}
                    className="rise mt-3 rounded-lg border border-white/12 bg-white/[0.05] px-4 py-3 text-sm leading-relaxed"
                  >
                    {qa.answer}
                  </div>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-primary">
                    <Check className="size-3.5" /> Source: {qa.source}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── One Record for Every Document ─────────────────── */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
              One record for Every document
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Leasedrop connects every document behind a property into one structured, and
              verifiable record. For the first time, your team has a single place to understand what
              each asset actually says.
            </p>
          </div>

          <div className="mt-14 grid gap-y-10 sm:grid-cols-3 sm:gap-x-12 lg:gap-x-16">
            {recordFeatures.map(({ label, body }) => (
              <div key={label} className="border-t border-border pt-6">
                <h3 className="text-base font-[490]">{label}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Intelligence Layer ───────────────────────── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
                The intelligence layer that makes Single Asset View possible.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Lease Intelligence is how Leasedrop reads, structures and verifies the documents.
                What your team sees is not a summary or an index, but the actual information the
                documents contain, traceable to the exact source it came from.
              </p>
              <Link
                to="/platform"
                className="link-arrow link-quiet mt-8 inline-flex items-center gap-2 font-display text-sm text-primary"
              >
                Explore the platform <ArrowRight className="size-4" />
              </Link>
            </div>

            <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {steps.map((s) => (
                <li key={s.title} className="bg-card p-8">
                  <span className="font-display text-xs tracking-[0.2em] text-primary">{s.n}</span>
                  <h3 className="mt-4 text-xl font-medium">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Portfolio Intelligence ───────────────────────── */}
      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
            <div className="grid lg:grid-cols-2">
              <div className="p-9 lg:p-16">
                <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl">
                  Ask One Question, See the Whole Portfolio
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                  Move beyond a single document. Compare obligations, rights and dates across
                  everything you manage, with each result traceable to the document it came from.
                </p>
                <Link
                  to="/portfolio-intelligence"
                  className="link-arrow link-quiet mt-8 inline-flex items-center gap-1.5 font-display text-sm text-primary"
                >
                  Explore Portfolio Intelligence →
                </Link>
                <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                  {[
                    ["Assets", "Portfolio wide"],
                    ["Documents", "Every type"],
                    ["Answers", "Source backed"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-display text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {k}
                      </dt>
                      <dd className="mt-2 font-serif text-xl">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="relative min-h-72 bg-porcelain">
                <img
                  src={portfolioImage.url}
                  alt="Stack of lease documents, amendments and property paperwork"
                  loading="lazy"
                  width={1600}
                  height={1104}
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Leasedrop Solves ────────────────────────── */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
              Turn Asset Information Into Action
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Commercial real estate teams already hold the information they need. It sits across
              leases, amendments, licences, surveys, notices, reports and contracts. Leasedrop makes
              that information accessible, comparable and dependable.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="group bg-card p-8 transition-colors duration-200 ease-out hover:bg-mist"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-lg border border-border bg-secondary text-foreground">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-6 text-lg font-[490]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ─────────────────────────────────── */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <h2 className="font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
                Built for the Teams Closest to the Asset
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground lg:pb-2">
              Leasedrop supports the professionals who carry responsibility for what the documents
              actually say, from day to day asset management through to transactions.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="relative hidden overflow-hidden rounded-2xl md:col-span-2 md:block">
              <img
                src={atriumImage.url}
                alt="Modern multi-storey residential buildings with balconies"
                loading="lazy"
                width={1408}
                height={1008}
                className="h-64 w-full object-cover lg:h-80"
              />
            </div>
            {audiences.map((a) => (
              <article
                key={a.title}
                className="card-interactive group flex flex-col rounded-2xl border border-border bg-card p-8 lg:p-10"
              >
                <h3 className="text-xl font-medium">{a.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                <Link
                  to={a.to}
                  className="link-quiet mt-7 inline-flex items-center gap-1.5 self-start font-display text-sm text-primary"
                >
                  {a.link} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security ─────────────────────────────────────── */}
      <section className="bg-obsidian text-white">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="font-[490] text-3xl leading-[1.08] text-white sm:text-4xl lg:text-[3.4rem]">
                Enterprise Security and Governance
              </h2>
              <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/65">
                Asset documents are sensitive. Leasedrop is built for the controls, governance and
                verification standards that commercial real estate organisations expect.
              </p>
              <Link
                to="/security"
                className="link-arrow link-underline mt-8 inline-flex items-center gap-1.5 font-display text-sm text-white"
              >
                Explore Security &amp; Compliance →
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {securityItems.map(({ label, Icon, alt }) => (
                <li
                  key={label}
                  className="flex min-h-28 flex-col justify-between gap-4 bg-obsidian p-6 transition-colors hover:bg-white/5"
                >
                  <Icon role="img" aria-label={alt} className="h-7 w-7 text-white/70" />
                  <span className="font-display text-sm text-white/70">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Demo CTA + form ──────────────────────────────── */}
      <section id="request-a-demo" className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="font-display text-xs font-medium uppercase tracking-[0.14em] text-primary">
                Get Started
              </p>
              <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.4rem]">
                See what a Single Asset View looks like on your own assets.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                The information you need is already inside your documents. Leasedrop brings it into
                a Single Asset View and makes it structured, searchable and verifiable so your team can
                act on it.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Book a short walkthrough, or request a demo using your own assets and see the answers
                traced back to their source.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/book-a-demo"
                  className="btn-base btn-primary px-7 py-4"
                >
                  Book a Demo
                </Link>
              </div>
            </div>

            <form
              id="demo-form"
              onSubmit={(e) => e.preventDefault()}
              className="rounded-2xl border border-border bg-mist p-7 shadow-[var(--shadow-soft)] lg:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your Name">
                  <input className={inputClass} placeholder="Enter your name" autoComplete="name" />
                </Field>
                <Field label="Work Email">
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="Enter your work email"
                    autoComplete="email"
                  />
                </Field>
                <Field label="Company">
                  <input className={inputClass} placeholder="Company name" autoComplete="organization" />
                </Field>
                <Field label="Role">
                  <input className={inputClass} placeholder="Your role" autoComplete="organization-title" />
                </Field>
                <Field label="Portfolio Size">
                  <select className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select portfolio size
                    </option>
                    <option>1–20</option>
                    <option>21–100</option>
                    <option>101–500</option>
                    <option>500+ assets</option>
                  </select>
                </Field>
                <Field label="Primary Use Case">
                  <select className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select primary use case
                    </option>
                    <option>Asset Management</option>
                    <option>Building Surveying</option>
                    <option>Investment &amp; Portfolio</option>
                    <option>Due Diligence</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>
              <button
                type="submit"
                className="btn-base btn-primary mt-8 w-full px-6 py-4"
              >
                Request My Demo
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                Submission handling is not connected yet.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}