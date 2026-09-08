import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock, FolderOpen, Handshake, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";

import { CompanyHero } from "@/components/company/CompanyKit";

export const Route = createFileRoute("/book-a-demo")({
  head: () => ({
    meta: [
      { title: "Book a Demo | Leasedrop" },
      {
        name: "description",
        content:
          "Book a demo on your own assets. Bring in real documents, ask real questions and see every answer traced back to its source.",
      },
      { property: "og:title", content: "Book a Demo | Leasedrop" },
      {
        property: "og:description",
        content:
          "Book a demo on your own assets. Bring in real documents, ask real questions and see every answer traced back to its source.",
      },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/book-a-demo" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/book-a-demo" }],
  }),
  component: Page,
});

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors duration-150 placeholder:text-muted-foreground/70 focus:border-electric focus-visible:ring-2 focus-visible:ring-electric/25";

const label = "mb-2 block text-sm font-medium text-foreground";

const steps = [
  {
    label: "You tell us about your portfolio",
  },
  {
    label: "We run Leasedrop on your documents",
  },
  {
    label: "You see the answers, traced to source",
  },
];

const quotes = [
  {
    text: "We needed something that understood the documents behind the asset, not just a search box. Leasedrop is the first tool that felt built for how asset management teams actually work.",
    attribution: "Head of Asset Management, UK commercial real estate",
  },
  {
    text: "The clause we needed was in an annexe to a licence that had never been indexed. Leasedrop found it in the time it used to take us to open the right folder.",
    attribution: "Chartered Surveyor, UK building surveying practice",
  },
  {
    text: "We brought in a 200-document data room on a Friday afternoon. By Monday morning we had a structured view of every material obligation across the portfolio. That used to take two weeks.",
    attribution: "Acquisition Manager, UK real estate private equity firm",
  },
];

const assurances = [
  {
    icon: FolderOpen,
    label: "Your own documents",
    body: "The demo uses your real assets, not a fictional portfolio.",
  },
  {
    icon: Handshake,
    label: "No commitment required",
    body: "Seeing Leasedrop in action does not obligate you to anything.",
  },
  {
    icon: Clock,
    label: "One working day response",
    body: "We will confirm your demo within one working day of receiving your request.",
  },
  {
    icon: Lock,
    label: "Confidential",
    body: "Your documents are handled under the same data protection standards as the live product.",
  },
];

function DemoForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex h-full min-h-96 flex-col items-center justify-center rounded-3xl border border-border bg-card p-10 text-center shadow-[var(--shadow-soft)]">
        <span className="flex size-12 items-center justify-center rounded-full bg-electric/10 text-electric">
          <CheckCircle2 className="size-5" />
        </span>
        <p className="mt-5 font-[490] text-xl">Thank you</p>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          We have received your request and will be in touch within one working day to arrange your
          demo.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-9"
    >
      <h2 className="font-[490] text-2xl">Request your demo</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Fill in the details below and we will be in touch within one working day to arrange a time.
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <input required name="name" placeholder="Enter your name" autoComplete="name" className={field} />
        <input
          required
          type="email"
          name="email"
          placeholder="Enter your work email"
          autoComplete="email"
          className={field}
        />
        <input
          required
          name="company"
          placeholder="Company name"
          autoComplete="organization"
          className={field}
        />
        <input
          required
          name="role"
          placeholder="Your role"
          autoComplete="organization-title"
          className={field}
        />
        <input name="phone" placeholder="Optional" autoComplete="tel" className={field} />
        <div>
          <label htmlFor="portfolio-size" className={label}>
            Portfolio Size
          </label>
          <select id="portfolio-size" required name="portfolioSize" defaultValue="" className={field}>
            <option value="" disabled>
              Select portfolio size
            </option>
            <option>Under 10 assets</option>
            <option>10 to 50 assets</option>
            <option>50 to 200 assets</option>
            <option>200 or more assets</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="use-case" className={label}>
            Primary Use Case
          </label>
          <select id="use-case" required name="useCase" defaultValue="" className={field}>
            <option value="" disabled>
              Select a use case
            </option>
            <option>Lease Intelligence</option>
            <option>Critical Dates</option>
            <option>Dilapidations</option>
            <option>Asset Document Review</option>
            <option>Portfolio-wide Review</option>
            <option>Due Diligence</option>
            <option>Other</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="demo-focus" className={label}>
            What would you like to see in the demo
          </label>
          <textarea
            id="demo-focus"
            name="focus"
            rows={5}
            placeholder="Tell us about your portfolio, the documents you work with and the questions your team spends the most time answering. This helps us prepare a demo that is relevant to you."
            className={`${field} resize-y`}
          />
        </div>
        <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
          <input
            type="checkbox"
            name="shareDocuments"
            className="mt-1 size-4 shrink-0 rounded accent-electric"
          />
          <span className="text-sm leading-relaxed text-muted-foreground">
            I am happy to share a small selection of documents ahead of the demo so Leasedrop can be
            demonstrated on our own assets.
          </span>
        </label>
      </div>
      <button type="submit" className="btn-base btn-primary link-arrow mt-6 w-full px-7 py-4">
        Request My Demo
        <ArrowRight className="size-4" />
      </button>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80">
        Your details will only be used to arrange and prepare your demo. We will not share them with
        third parties or add you to a mailing list without your consent.
      </p>
    </form>
  );
}

function Page() {
  return (
    <main>
      <CompanyHero
        eyebrow="Get Started"
        title="See Leasedrop on your own assets."
        subtitle="Bring in real documents, ask real questions and see every answer traced back to its source. No generic walkthrough. No slides. Just Leasedrop working on your own portfolio."
      />

      {/* What to expect + demo form */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-[96rem] items-start gap-14 px-5 py-24 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-32">
          <div className="lg:col-span-6">
            <span className="eyebrow">What Happens Next</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              A demo built around your documents.
            </h2>
<p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              We work with a selection of your own assets and documents so what you see is relevant
              to your portfolio, your questions and the way your team works.
            </p>
            <div className="mt-4">
{steps.map((step, i) => (
                <div key={step.label} className={`py-6 ${i > 0 ? "border-t border-border" : ""}`}>
                  <p className="font-display text-xs uppercase tracking-[0.16em] text-electric">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-3 font-[490] text-lg">{step.label}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <DemoForm />
          </div>
        </div>
      </section>

      {/* What others have said */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow">From Teams Who Have Seen It</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              What a Leasedrop demo looks like in practice.
            </h2>
          </div>
          <div className="mt-12 max-w-4xl divide-y divide-border">
            {quotes.map((quote) => (
              <figure key={quote.attribution} className="py-10 first:pt-0 last:pb-0">
                <blockquote className="font-serif text-xl italic leading-relaxed text-foreground sm:text-[1.45rem]">
                  “{quote.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  {quote.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance band */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-28">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {assurances.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <span className="flex size-10 items-center justify-center rounded-xl bg-electric/10 text-electric">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-[490] text-lg">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alternative contact */}
      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-5 py-24 text-center lg:py-28">
          <h3 className="font-[490] text-2xl leading-[1.15] sm:text-3xl">
            Prefer to speak to someone first?
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            If you would rather have a conversation before booking a demo, you can reach us
            directly.
          </p>
          <a
            href="mailto:info@leasedrop.ai"
            className="mt-7 inline-block text-2xl font-[490] text-electric transition-colors duration-150 hover:text-foreground sm:text-3xl"
          >
            info@leasedrop.ai
          </a>
          <div className="mt-9">
            <Link to="/company/contact" className="btn-base btn-outline px-7 py-4">
              Talk to the team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}