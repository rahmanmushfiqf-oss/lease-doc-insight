import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CompanyHero } from "@/components/company/CompanyKit";

export const Route = createFileRoute("/company/careers")({
  head: () => ({
    meta: [
      { title: "Careers | Leasedrop" },
      {
        name: "description",
        content:
          "Leasedrop is hiring. We are building the intelligence layer for commercial real estate documents. See open roles or get in touch speculatively.",
      },
      { property: "og:title", content: "Careers | Leasedrop" },
      {
        property: "og:description",
        content:
          "Leasedrop is hiring. We are building the intelligence layer for commercial real estate documents. See open roles or get in touch speculatively.",
      },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/company/careers" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/company/careers" }],
  }),
  component: Page,
});

type Role = { title: string; team: string; location: string; type: string };

const roles: Role[] = [];

function Page() {
  return (
    <main>
      <CompanyHero
        eyebrow="Careers"
        title="Open roles at Leasedrop."
        subtitle="Leasedrop is building the intelligence layer for commercial real estate documents. If that sounds like the kind of problem you want to work on, we would like to hear from you."
      />

{/* Open roles */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Open Roles</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              Current openings.
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            {roles.length === 0 ? (
              <p className="rounded-2xl border border-border bg-card p-10 text-center text-base leading-relaxed text-muted-foreground">
                We do not have any open roles right now. We are always interested in hearing from
                strong people. If you think you would be a good fit for what Leasedrop is building,
                send us a note at{" "}
                <a
                  href="mailto:careers@leasedrop.ai"
                  className="text-electric transition-colors duration-150 hover:text-foreground"
                >
                  careers@leasedrop.ai
                </a>
              </p>
            ) : (
              <ul>
                {roles.map((role, i) => (
                  <li
                    key={role.title}
                    className={`flex flex-wrap items-center gap-4 py-7 ${i > 0 ? "border-t border-border" : ""}`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-[490] text-lg">{role.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {role.team} · {role.location}
                      </p>
                    </div>
                    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                      {role.type}
                    </span>
                    <a
                      href={`mailto:careers@leasedrop.ai?subject=${encodeURIComponent(role.title)}`}
                      className="btn-base btn-outline px-5 py-2.5 text-sm"
                    >
                      Apply
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Speculative applications */}
      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 text-center lg:px-8 lg:py-28">
          <span className="eyebrow">Do Not See the Right Role</span>
          <h2 className="mx-auto mt-4 max-w-3xl font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
            We would still like to hear from you.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            If you have experience in commercial real estate, property technology, document
            intelligence or AI product development and think there is a fit, send us a note. We
            read every message.
          </p>
          <a
            href="mailto:careers@leasedrop.ai"
            className="mt-8 inline-block font-[490] text-xl text-electric transition-colors duration-150 hover:text-foreground sm:text-2xl"
          >
            careers@leasedrop.ai
          </a>
          <div className="mt-8">
            <Link
              to="/company/contact"
              className="btn-base btn-outline link-arrow inline-flex px-7 py-4"
            >
              Get in touch
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
