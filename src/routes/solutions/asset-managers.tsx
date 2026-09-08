import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  CalendarClock,
  ClipboardList,
  Layers,
  MessageSquareText,
  SearchCheck,
  UserRound,
} from "lucide-react";

import compliance from "@/assets/alt-compliance.webp";
import documents from "@/assets/alt-documents-desk.webp";
import portfolio from "@/assets/portfolio-intelligence.webp";
import skyline from "@/assets/alt-portfolio-skyline.webp";
import { SolutionPage, type SolutionContent } from "@/components/solutions/SolutionKit";

export const Route = createFileRoute("/solutions/asset-managers")({
  head: () => ({
    meta: [
      { title: "Leasedrop for Asset Managers" },
      {
        name: "description",
        content:
          "One complete asset record for every property you manage. Leasedrop surfaces obligations, critical dates and lease terms without the document search.",
      },
      {
        property: "og:title",
        content: "Leasedrop for Asset Managers",
      },
      {
        property: "og:description",
        content:
          "One complete asset record for every property you manage. Leasedrop surfaces obligations, critical dates and lease terms without the document search.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/solutions/asset-managers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://asset-intel-source.lovable.app/solutions/asset-managers" },
    ],
  }),
  component: Page,
});

const content: SolutionContent = {
  breadcrumb: "Asset Managers",
  h1: "One complete record for every asset you manage.",
  subheading:
    "Leasedrop connects every document behind each asset into one permanent, searchable record. Your team understands what every property says, without the search, without the repeated document opening, without the knowledge walking out the door.",
  mockup: {
    path: "Leasedrop/assets/northgate-house",
    assetTitle: "Northgate House",
    docLabel: "Lease agreement · Page 12",
    highlight: "Base rent of £38.50 per square foot",
    passage: "subject to review on each fifth anniversary of the term…",
    source: "Source: Clause 4.2, p.12",
    fields: [
      { label: "Base rent", value: "£38.50 / sq ft" },
      { label: "Break option", value: "14 Mar 2027" },
    ],
    ask: "Ask about this asset…",
  },
  challenge: {
    heading: "Critical information exists. It just isn’t accessible.",
    body: "An asset management team responsible for 50 properties is also responsible for thousands of documents. The information inside them is valuable, getting to it reliably is the problem.",
    cards: [
      {
        title: "Dates get missed",
        body: "Break options and notice deadlines sit inside documents nobody opened this quarter.",
      },
      {
        title: "Obligations stay unclear",
        body: "The relevant clause is spread across three amendments nobody has read together.",
      },
      {
        title: "Knowledge walks out the door",
        body: "When people move on, the asset knowledge they carried goes with them.",
      },
    ],
  },
  features: {
    heading: "Everything your team needs to know about every asset.",
    rows: [
      {
        icon: ClipboardList,
        label: "Obligations",
        title: "Keep every obligation in view",
        body: "Surface repair covenants, break options, rent review provisions and service charge caps across every asset. Nothing stays hidden because it was in a document nobody checked.",
        image: portfolio,
        alt: "Asset intelligence workspace showing obligations across a property portfolio",
      },
      {
        icon: CalendarClock,
        label: "Critical Dates",
        title: "Stay ahead of what is coming",
        body: "Break clauses, lease expiries, rent reviews and notice deadlines are extracted and kept current inside each asset record as your portfolio grows.",
        image: compliance,
        alt: "Property documents being reviewed together by an asset management team",
      },
      {
        icon: MessageSquareText,
        label: "Q&A",
        title: "Answer asset questions without searching",
        body: "Ask in plain language from the asset record. Get an answer traced to the exact document and page without spending an afternoon finding it.",
        image: documents,
        alt: "Lease documents on a desk beside a laptop showing a structured answer",
      },
      {
        icon: SearchCheck,
        label: "Portfolio",
        title: "Compare obligations across every asset",
        body: "Run one question across your entire portfolio and identify which properties share the same condition, obligation or term without reviewing each one individually.",
        image: skyline,
        alt: "Commercial property skyline representing a portfolio of managed assets",
      },
    ],
  },
  audiences: {
    heading: "Built for every role in the asset management team",
    cards: [
      {
        icon: Building2,
        title: "Asset Managers",
        body: "Understand what every asset says across leases, amendments and supporting documents without repeating the same searches.",
      },
      {
        icon: Layers,
        title: "Portfolio Directors",
        body: "A consistent, source-backed view of obligations, rights and upcoming events across the assets you oversee.",
      },
      {
        icon: UserRound,
        title: "Asset Management Associates",
        body: "Spend less time reconstructing information and more time on the analysis that needs your professional judgement.",
      },
    ],
  },
  quote: {
    text: "We needed something that understood the documents behind the asset, not just a search box. Leasedrop is the first tool that felt built for how asset management teams actually work.",
    attribution: "Head of Asset Management, UK commercial real estate",
  },
  security: {
    body: "Asset documents are sensitive. Leasedrop is built for the access controls, governance standards and data protection requirements that asset management organisations expect.",
  },
  cta: {
    heading: "See what your portfolio already knows",
    body: "Run Leasedrop on a set of your own assets. Start with the properties where access to information matters most.",
  },
};

function Page() {
  return <SolutionPage content={content} />;
}
