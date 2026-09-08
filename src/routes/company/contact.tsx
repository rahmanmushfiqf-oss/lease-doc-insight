import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { CompanyHero, ExpandableMap } from "@/components/company/CompanyKit";

export const Route = createFileRoute("/company/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Leasedrop" },
      {
        name: "description",
        content:
          "Get in touch with the Leasedrop team. Book a demo, ask a question about the platform or enquire about a partnership. We respond within one working day.",
      },
      { property: "og:title", content: "Contact | Leasedrop" },
      {
        property: "og:description",
        content:
          "Get in touch with the Leasedrop team. Book a demo, ask a question about the platform or enquire about a partnership. We respond within one working day.",
      },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/company/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/company/contact" }],
  }),
  component: Page,
});

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors duration-150 placeholder:text-muted-foreground/70 focus:border-electric focus-visible:ring-2 focus-visible:ring-electric/25";

function Page() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <CompanyHero
        eyebrow="Contact"
        title="Talk to the team."
        subtitle="Whether you want to see Leasedrop on your own assets, have a question about the platform or want to explore a partnership, we are here."
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-[96rem] gap-14 px-5 py-24 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-32">
          {/* Contact routes */}
          <div>
            <div className="space-y-12">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.16em] text-electric">
                  Book a Demo
                </p>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                  See Leasedrop on your own assets. Bring in real documents and see the answers
                  traced back to their source.
                </p>
                <Link
                  to="/book-a-demo"
                  className="btn-base btn-primary link-arrow mt-6 inline-flex px-7 py-4"
                >
                  Book a Demo
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <div>
                <p className="font-display text-xs uppercase tracking-[0.16em] text-electric">
                  General Enquiries
                </p>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                  Questions about the platform, pricing or anything else.
                </p>
                <a
                  href="mailto:info@leasedrop.ai"
                  className="mt-3 inline-block text-base text-electric transition-colors duration-150 hover:text-foreground"
                >
                  info@leasedrop.ai
                </a>
              </div>
              <div>
                <p className="font-display text-xs uppercase tracking-[0.16em] text-electric">
                  Press &amp; Media
                </p>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                  For journalists and analysts covering commercial real estate technology.
                </p>
                <a
                  href="mailto:press@leasedrop.ai"
                  className="mt-3 inline-block text-base text-electric transition-colors duration-150 hover:text-foreground"
                >
                  press@leasedrop.ai
                </a>
              </div>
            </div>
            <div className="mt-14 border-t border-border pt-8">
              <p className="font-display text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Location
              </p>
              <address className="mt-4 space-y-1 text-base not-italic leading-relaxed text-muted-foreground">
                <p>Unit 1 Bramber Court</p>
                <p>2 Bramber Road</p>
                <p>London W14 9PW</p>
              </address>
              <div className="mt-6">
                <ExpandableMap title="Leasedrop office location, Bramber Court, London W14 9PW" />
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {sent ? (
              <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-3xl border border-border bg-card p-10 text-center shadow-[var(--shadow-soft)]">
                <span className="flex size-12 items-center justify-center rounded-full bg-electric/10 text-electric">
                  <CheckCircle2 className="size-5" />
                </span>
                <p className="mt-5 font-[490] text-xl">Thank you</p>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Thank you. We will be in touch within one working day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-9"
              >
                <h2 className="font-[490] text-xl">Send us a message</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We will get back to you within one working day.
                </p>
                <div className="mt-7 grid gap-4">
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
                  <textarea
                    required
                    name="message"
                    placeholder="Message"
                    rows={6}
                    className={`${field} resize-y`}
                  />
                </div>
                <button type="submit" className="btn-base btn-primary link-arrow mt-6 w-full px-7 py-4">
                  Send message
                  <ArrowRight className="size-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
