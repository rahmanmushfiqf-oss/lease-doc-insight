import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import shorfulImg from "@/assets/dr-shorful-islam.webp.asset.json";
import siddiqueImg from "@/assets/siddique-miah.webp.asset.json";
import {
  CompanyCta,
  CompanyHero,
  ExpandableMap,
  LabelBodyRows,
} from "@/components/company/CompanyKit";

export const Route = createFileRoute("/company/about")({
  head: () => ({
    meta: [
      { title: "About | Leasedrop" },
      {
        name: "description",
        content:
          "Leasedrop was built by people who understood the problem before they built the solution. Meet the team and learn what drives the platform.",
      },
      { property: "og:title", content: "About | Leasedrop" },
      {
        property: "og:description",
        content:
          "Leasedrop was built by people who understood the problem before they built the solution. Meet the team and learn what drives the platform.",
      },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/company/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/company/about" }],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <CompanyHero
        eyebrow="About"
        title="Built by the people who lived the problem."
        subtitle="Leasedrop exists because commercial real estate runs on documents that nobody can query. We are changing that."
      />

      {/* Why Leasedrop exists */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-[96rem] gap-10 px-5 py-24 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-32">
          <div className="lg:col-span-5">
            <span className="eyebrow">Why We Built It</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              Nobody chooses surveying to be buried in lease review.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground lg:col-span-7">
            <p>
              Lease review is not difficult. It is inefficient. It takes a trained eye to find the
              key clauses, then a manual process to extract and format them, a task that drains
              time, energy and attention from the work that actually requires professional
              judgement.
            </p>
            <p>
              Surveyors are valued for their advice, negotiation and problem-solving. Not for
              polishing lease extracts. That frustration became a product. And that product became
              something larger, a platform that makes the documentary record of every commercial
              property permanently accessible, structured and verifiable.
            </p>
            <p className="font-[490] text-foreground">
              Leasedrop is built on a simple belief: the information was always there. Access was
              the problem.
            </p>
          </div>
        </div>
      </section>

{/* Founders */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">The Team</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              Meet the founders.
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-5xl space-y-20 lg:space-y-28">
            {/* Siddique Miah — image left, copy right */}
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <img
                src={siddiqueImg.url}
                alt="Siddique Miah, Co-founder and CEO of Leasedrop"
                loading="lazy"
                className="aspect-square w-full rounded-2xl border border-border object-cover"
              />
              <div>
                <h3 className="font-[490] text-2xl">Siddique Miah</h3>
                <p className="mt-1 text-sm text-muted-foreground">Co-founder & CEO</p>
                <hr className="my-6 border-border" />
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Siddique is a Chartered Building Surveyor with a BSc in Building Surveying from
                    the University of Westminster. He spent years in professional practice doing the
                    work Leasedrop now automates, locating the key clauses across lease documents,
                    extracting them manually and formatting them for reports and assessments. That
                    experience gave him a precise understanding of where the inefficiency lived and
                    what it was costing the profession.
                  </p>
                  <p>
                    He built Leasedrop because he knew the problem was not a lack of skill or
                    knowledge. It was a lack of the right tool. One built specifically for
                    surveyors, by someone who had done the work.
                  </p>
                </div>
                <blockquote className="mt-7 font-serif text-lg italic leading-relaxed text-foreground sm:text-xl">
                  “As surveyors, we are valued for our advice, negotiation and problem-solving. Not
                  for polishing lease extracts. So I built Leasedrop, for us.”
                </blockquote>
                <ul className="mt-6 space-y-1.5">
                  <li className="text-xs text-muted-foreground/80">
                    MRICS, Chartered Building Surveyor
                  </li>
                  <li className="text-xs text-muted-foreground/80">
                    BSc Building Surveying, University of Westminster
                  </li>
                </ul>
                <Link
                  to="/authors/$slug"
                  params={{ slug: "siddique-miah" }}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-foreground"
                >
                  Read articles by Siddique
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Dr Shorful Islam — copy left, image right */}
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="lg:order-1">
                <h3 className="font-[490] text-2xl">Dr Shorful Islam</h3>
                <p className="mt-1 text-sm text-muted-foreground">Co-founder & CTO</p>
                <hr className="my-6 border-border" />
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Shorful holds a PhD in Psychology with a specialism in behavioural modelling,
                    and that background has shaped how he thinks about data, technology and the
                    organisations that use them. Over 25 years he has led global teams, built and
                    scaled two international data consultancies, and helped organisations including
                    Shell, Coca-Cola, Microsoft, Unilever and the NHS turn data into something that
                    genuinely changes how they operate.
                  </p>
                  <p>
                    He has worked at the intersection of AI, data culture and commercial leadership
                    throughout his career, and in 2024 published Data Culture, a book about the
                    layer of transformation most organisations overlook: the people and structures
                    that determine whether a data strategy actually lands.
                  </p>
                </div>
                <blockquote className="mt-7 font-serif text-lg italic leading-relaxed text-foreground sm:text-xl">
                  “The hardest part of any data or AI transformation has never been the technology.
                  It has always been the humans around it.”
                </blockquote>
                <ul className="mt-6 space-y-1.5">
                  <li className="text-xs text-muted-foreground/80">
                    PhD, Psychology, Behavioural Modelling
                  </li>
                  <li className="text-xs text-muted-foreground/80">Author, Data Culture, 2024</li>
                  <li className="text-xs text-muted-foreground/80">
                    Former global leadership, Wunderman, WPP
                  </li>
                </ul>
                <Link
                  to="/authors/$slug"
                  params={{ slug: "dr-shorful-islam" }}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-foreground"
                >
                  Read articles by Shorful
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <img
                src={shorfulImg.url}
                alt="Dr Shorful Islam, Co-founder and CTO of Leasedrop"
                loading="lazy"
                className="aspect-square w-full rounded-2xl border border-border object-cover lg:order-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="bg-background">
        <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">What We Believe</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
              Three principles that shape everything Leasedrop does.
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <LabelBodyRows
              items={[
                {
                  label: "Domain first",
                  body: "AI built for a specific problem, by people who understand it from the inside, produces better outcomes than general tools applied to specialist work. Leasedrop is built for commercial real estate documents because that is the problem we know.",
                },
                {
                  label: "Source before summary",
                  body: "Every answer Leasedrop produces is connected to the document and page it came from. Professional judgement requires evidence, not paraphrase. We built the platform around that principle from the start.",
                },
                {
                  label: "The professional stays in control",
                  body: "Leasedrop reduces the time spent finding and checking information. The interpretation, the advice and the accountability stay with the professional. That is not a limitation of the technology. It is the point of it.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-obsidian text-white">
        <div className="mx-auto max-w-[96rem] px-5 py-24 text-center lg:px-8 lg:py-32">
          <span className="eyebrow">Our Mission</span>
          <h2 className="mx-auto mt-4 max-w-4xl font-[490] text-3xl leading-[1.08] text-white sm:text-4xl lg:text-[3.2rem]">
            Make every property document accessible.
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
            Commercial real estate runs on documents. Leases, amendments, licences, surveys,
            notices and reports contain the obligations, rights and critical dates that determine
            how assets are managed, transacted and valued. Leasedrop exists to make that
            information accessible to the professionals who need it, structured, searchable and
            always traceable to its source.
          </p>
        </div>
      </section>

      {/* Where we are */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-[96rem] items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-32">
          <div>
            <span className="eyebrow">Where We Are</span>
            <h2 className="mt-4 font-[490] text-3xl leading-[1.08] sm:text-4xl">
              Based in London. Built for commercial real estate teams everywhere.
            </h2>
            <address className="mt-8 space-y-1 text-base not-italic leading-relaxed text-muted-foreground">
              <p>Unit 1 Bramber Court</p>
              <p>2 Bramber Road</p>
              <p>London W14 9PW</p>
            </address>
            <a
              href="mailto:info@leasedrop.ai"
              className="mt-5 inline-block text-base text-electric transition-colors duration-150 hover:text-foreground"
            >
              info@leasedrop.ai
            </a>
          </div>
          <ExpandableMap title="Leasedrop office location, Bramber Court, London W14 9PW" />
        </div>
      </section>

      <CompanyCta
        heading="See Leasedrop on your own assets."
        body="Bring in the documents behind a selection of your properties and see what becomes visible when they are read together as one record."
      />
    </main>
  );
}
