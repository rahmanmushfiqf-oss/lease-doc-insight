import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CompanyCta, CompanyHero, LabelBodyRows } from "@/components/company/CompanyKit";

export const Route = createFileRoute("/company/partners")({
  head: () => ({
    meta: [
      { title: "Partners | Leasedrop" },
      {
        name: "description",
        content:
          "Work with Leasedrop. We partner with property technology platforms, data providers and professional firms serving commercial real estate teams.",
      },
      { property: "og:title", content: "Partners | Leasedrop" },
      {
        property: "og:description",
        content:
          "Work with Leasedrop. We partner with property technology platforms, data providers and professional firms serving commercial real estate teams.",
      },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/company/partners" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/company/partners" }],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <CompanyHero
        eyebrow="Partners"
        title="Working with Leasedrop."
        subtitle="Leasedrop works with property technology platforms, data providers and professional networks to bring asset intelligence further into the workflows commercial real estate teams already use."
      />

      {/* Partnership types */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-[96rem] gap-12 px-5 py-24 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-32">
          <div className="lg:col-span-5">
            <span className="eyebrow">Partnership Types</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              Ways to work with us.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <LabelBodyRows
              items={[
                {
                  label: "Technology Partners",
                  body: "Platforms and tools that Leasedrop integrates with, connecting asset intelligence into the property management, data and reporting systems your team already relies on.",
                },
                {
                  label: "Data Partners",
                  body: "Providers whose data enriches the Leasedrop asset record, bringing additional context, market information or property data alongside the documentary intelligence.",
                },
                {
                  label: "Referral & Channel Partners",
                  body: "Professional firms and networks who refer or recommend Leasedrop to their clients and contacts across commercial real estate.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Become a partner */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 text-center lg:px-8 lg:py-28">
          <span className="eyebrow">Work With Us</span>
          <h2 className="mx-auto mt-4 max-w-3xl font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
            Interested in partnering with Leasedrop?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            If you work with commercial real estate teams, whether through technology, data or
            professional services, and see a fit with what Leasedrop does, we would like to hear
            from you.
          </p>
          <Link
            to="/company/contact"
            className="btn-base btn-primary link-arrow mt-10 inline-flex px-7 py-4"
          >
            Get in touch
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <CompanyCta
        heading="See what Leasedrop does for your clients."
        body="If you want to understand the platform before discussing a partnership, start with a demo on your own assets."
      />
    </main>
  );
}
