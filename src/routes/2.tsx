import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroArchitecture from "@/assets/alt-hero-architecture.webp";
import complianceImage from "@/assets/alt-compliance.webp";

import receptionImage from "@/assets/alt-reception.webp";
import portfolioImage from "@/assets/portfolio-intelligence.webp";
import atriumImage from "@/assets/audience-atrium.webp";
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
  IconDataProtection,
  IconInfoSecurity,
  IconThreatTesting,
} from "@/components/brand/ComplianceIcons";
import { ProofGrid } from "@/components/site/ProofGrid";
import { Testimonials } from "@/components/site/Testimonials";

export const Route = createFileRoute("/2")({
  head: () => ({
    meta: [
      { title: "Leasedrop Concept 2 | Asset Intelligence Across Your Entire Portfolio" },
      {
        name: "description",
        content:
          "Leasedrop turns the documents behind every property into structured, searchable and verifiable intelligence for commercial real estate teams.",
      },
      { property: "og:title", content: "Leasedrop | Asset Intelligence Across Your Entire Portfolio" },
      {
        property: "og:description",
        content:
          "Understand individual assets, search across your portfolio, and trace answers back to their source.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

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
  { label: "SOC 2 Type II", Icon: IconAuditControls, alt: "Service controls audit icon" },
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
    <label className="block text-left">
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
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-mist">
        <div className="absolute inset-0">
          <img
            src={heroArchitecture}
            alt="Stone and glass facade of a modern commercial office building in a UK city"
            width={1920}
            height={1280}
            className="size-full object-cover object-center"
          />
          {/* Even, subtle dark tint keeps the photograph's detail visible */}
          <div className="absolute inset-0 bg-foreground/40" />
          {/* Broader, softer local scrim behind the centred text block */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_82%_68%_at_50%_46%,rgba(15,23,32,0.55)_0%,rgba(15,23,32,0.30)_40%,rgba(15,23,32,0.13)_65%,rgba(15,23,32,0)_88%)]" />
          <div className="pointer-events-none absolute inset-0 hairline-grid opacity-20" />
        </div>

        <div className="relative mx-auto flex min-h-[60vh] max-w-[96rem] flex-col items-center justify-center px-5 pb-24 pt-24 text-center lg:px-8 lg:pb-36 lg:pt-32">
          <div className="rise max-w-4xl">
            <h1 className="font-[490] text-[2.2rem] leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
              <span className="block">Asset Intelligence</span>
              <span className="block">Across Your Entire Portfolio</span>
            </h1>
            <p className="mx-auto mt-7 max-w-4xl text-base leading-relaxed text-white/85 sm:text-lg">
              Leasedrop turns the documents behind every property into structured, searchable, and
              verifiable intelligence. Understand individual assets, search across your portfolio,
              and trace important answers directly back to their source.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/book-a-demo"
                className="btn-base btn-primary link-arrow px-7 py-4"
              >
                Book a Demo
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/platform"
                className="btn-base btn-outline px-7 py-4"
              >
                Explore the Platform
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ── What Leasedrop Solves ────────────────────────── */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="text-center">
            <h2 className="font-[490] text-2xl leading-[1.1] sm:text-3xl lg:text-[2.6rem]">
              Turn Asset Information Into Action
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-muted-foreground">
              Commercial real estate teams already hold the information they need. It sits across
              leases, amendments, licences, surveys, notices, reports and contracts. Leasedrop makes
              that information accessible, comparable and dependable.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="group bg-card p-8 text-center transition-colors duration-200 ease-out hover:bg-mist"
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

      {/* ── Proof (placeholder copy) ─────────────────────── */}
      <ProofGrid />


      {/* ── One Platform for Every Asset ─────────────────── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 pt-16 pb-24 lg:px-8 lg:pt-24 lg:pb-32">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="flex flex-col">
              <h2 className="font-[490] text-2xl leading-[1.1] sm:text-3xl lg:text-[2.6rem]">
                One Platform for Every Asset
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Leasedrop works across the full documentary record of an asset. Documents are
                brought together, structured, questioned and verified in one continuous flow.
              </p>
              <Link
                to="/platform"
                className="link-arrow link-quiet mt-8 inline-flex items-center gap-2 font-display text-sm text-primary"
              >
                Explore the platform <ArrowRight className="size-4" />
              </Link>

              <div className="mt-12 min-h-0 flex-1 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
                <img
                  src={receptionImage}
                  alt="Bright reception area of a modern commercial building"
                  loading="lazy"
                  width={1408}
                  height={1008}
                  className="h-56 w-full object-cover lg:h-full"
                />
              </div>
            </div>

            <ol className="grid h-full gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {steps.map((s) => (
                <li key={s.title} className="flex flex-col items-center justify-center bg-card p-8 text-center">
                  <h3 className="text-xl font-medium">{s.title}</h3>
                  <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">{s.body}</p>
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
                <h2 className="font-[490] text-2xl leading-[1.1] sm:text-3xl lg:text-[2.6rem]">
                  Ask One Question, See the Whole Portfolio
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                  Move beyond a single document or a single asset. Compare obligations, rights and
                  dates across everything you manage, with each result traceable to the document it
                  came from.
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
                  src={portfolioImage}
                  alt="Layered property documents over a city plan"
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

      {/* ── Who It's For ─────────────────────────────────── */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-[490] text-2xl leading-[1.1] sm:text-3xl lg:text-[2.6rem]">
              Built for the Teams Closest to the Asset
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Leasedrop supports the professionals who carry responsibility for what the documents
              actually say, from day to day asset management through to transactions.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-2xl border border-border md:col-span-2 lg:col-span-1 lg:row-span-2">
              <img
                src={atriumImage}
                alt="Light filled commercial building atrium"
                loading="lazy"
                width={1408}
                height={1008}
                className="h-56 w-full object-cover md:h-64 lg:h-full lg:min-h-[34rem]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,26,26,0)_45%,rgba(26,26,26,0.35)_100%)]" />
            </div>

            {audiences.map((a) => (
              <article
                key={a.title}
                className="card-interactive group flex flex-col rounded-2xl border border-border bg-card p-8 text-center lg:p-10"
              >
                <h3 className="text-xl font-medium">{a.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                <Link
                  to={a.to}
                  className="link-quiet mt-7 inline-flex items-center gap-1.5 font-display text-sm text-primary"
                >
                  {a.link} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials (placeholder copy) ──────────────── */}
      <Testimonials />



      {/* ── Security ─────────────────────────────────────── */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src={complianceImage}
            alt="Organised lease documents and compliance files in a modern office setting"
            width={1920}
            height={1280}
            loading="lazy"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-obsidian/85" />
        </div>

        <div className="relative mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="text-center">
            <h2 className="font-[490] text-2xl leading-[1.1] text-white sm:text-3xl lg:text-[2.6rem]">
              Enterprise Security and Governance
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-white/80">
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
          <ul className="mt-14 grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-3">
            {securityItems.map(({ label, Icon, alt }) => (
              <li
                key={label}
                className="flex min-h-28 flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-6 text-center transition-colors hover:bg-white/10"
              >
                <Icon role="img" aria-label={alt} className="h-7 w-7 text-white/80" />
                <span className="font-display text-sm text-white/90">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Demo CTA + form ──────────────────────────────── */}
      <section id="request-a-demo" className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="text-center">
              <h2 className="font-[490] text-2xl leading-[1.1] sm:text-3xl lg:text-[2.6rem]">
                See What Your Portfolio Already Knows
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                The information you need is already inside your documents. Leasedrop makes it
                structured, searchable and verifiable so your team can act on it.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Book a short walkthrough, or request a demo using your own assets and see the
                answers traced back to their source.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  to="/book-a-demo"
                  className="btn-base btn-primary px-7 py-4"
                >
                  Book a Demo
                </Link>
                <Link
                  to="/platform"
                  className="btn-base btn-outline px-7 py-4"
                >
                  Explore the Platform
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
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Submission handling is not connected yet.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
