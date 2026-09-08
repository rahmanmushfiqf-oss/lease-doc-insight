import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Briefcase,
  FileSearch,
  LineChart,
  ShieldAlert,
  TrendingUp,
  Users,
} from "lucide-react";

import compliance from "@/assets/alt-compliance.webp";
import documents from "@/assets/alt-documents-desk.webp";
import portfolio from "@/assets/portfolio-intelligence.webp";
import skyline from "@/assets/alt-portfolio-skyline.webp";
import { SolutionPage, type SolutionContent } from "@/components/solutions/SolutionKit";

export const Route = createFileRoute("/solutions/investment-managers")({
  head: () => ({
    meta: [
      { title: "Leasedrop for Investment Managers" },
      {
        name: "description",
        content:
          "Compare what every lease actually says before decisions are made. Leasedrop structures and verifies the documentary position across your entire portfolio.",
      },
      {
        property: "og:title",
        content: "Leasedrop for Investment Managers",
      },
      {
        property: "og:description",
        content:
          "Compare what every lease actually says before decisions are made. Leasedrop structures and verifies the documentary position across your entire portfolio.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/solutions/investment-managers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://asset-intel-source.lovable.app/solutions/investment-managers" },
    ],
  }),
  component: Page,
});

const content: SolutionContent = {
  breadcrumb: "Investment Managers",
  h1: "Compare what the documents say before decisions are made.",
  subheading:
    "Leasedrop connects every document behind each asset into one structured, searchable record. Surface the terms that affect investment decisions, compare obligations across the portfolio and trace every finding to its source before you act on it.",
  mockup: {
    path: "Leasedrop/assets/portfolio/investment",
    assetTitle: "Portfolio — 24 assets",
    rows: [
      {
        label: "Northgate House",
        value: "Break option · 14 Mar 2027",
        source: "Source: Clause 9.1, p.18",
      },
      {
        label: "Unit 4 Meridian Park",
        value: "Lease expiry · 02 Aug 2027",
        source: "Source: Clause 2.1, p.3",
      },
      {
        label: "Kingsway Retail",
        value: "Rent review pending",
        source: "Source: Clause 5.2, p.9",
      },
    ],
    footnote: "3 material dates in the next 18 months",
    ask: "Ask about this portfolio…",
  },
  challenge: {
    heading: "Portfolio decisions need documentary evidence, not summaries.",
    body: "Investment analysis depends on what leases, agreements and supporting documents actually say. Getting a reliable picture across a large portfolio, quickly enough to act on it, is rarely straightforward.",
    cards: [
      {
        title: "Inconsistent information",
        body: "Summaries prepared by different people at different times give an unreliable picture of what the underlying documents actually say.",
      },
      {
        title: "Slow cross-asset review",
        body: "Comparing terms, obligations or rights across multiple assets means reviewing each one separately, which takes time the decision timeline rarely allows.",
      },
      {
        title: "Unverified assumptions",
        body: "Decisions made on document summaries rather than the documents themselves carry risk that source verification would remove.",
      },
    ],
  },
  features: {
    heading: "A documentary view of the portfolio your decisions depend on.",
    rows: [
      {
        icon: BarChart3,
        label: "Cross-Asset Analysis",
        title: "Ask one question across every asset you hold",
        body: "Run a question across the entire portfolio and see how each property responds. Identify which assets share the same obligation, right or condition without reviewing them one by one.",
        image: skyline,
        alt: "Commercial property portfolio skyline representing multiple held assets",
      },
      {
        icon: TrendingUp,
        label: "Income & Obligations",
        title: "Understand what the leases actually commit to",
        body: "Rent provisions, break options, rent-free periods, service charge caps and tenant obligations are structured and comparable across assets, traceable to the exact clause behind each figure.",
        image: portfolio,
        alt: "Structured lease and income terms compared across assets",
      },
      {
        icon: ShieldAlert,
        label: "Risk Identification",
        title: "Surface documentary risk before it affects a decision",
        body: "Identify assets where the documentary position carries conditions, obligations or exposure that a summary would not have flagged, before a transaction or commitment is made.",
        image: compliance,
        alt: "Documentary risk identified inside a structured portfolio record",
      },
      {
        icon: FileSearch,
        label: "Verification",
        title: "Every data point traceable to its source",
        body: "Move from a portfolio-level finding to the document and passage behind it in one step. Investment decisions supported by Leasedrop are supported by the original wording, not a paraphrase of it.",
        image: documents,
        alt: "Source document opened beside a portfolio level finding",
      },
    ],
  },
  audiences: {
    heading: "Built for every role in an investment management team",
    cards: [
      {
        icon: Briefcase,
        title: "Investment Managers",
        body: "Get a documentary view of the assets you are responsible for without depending on summaries that may not reflect the current position.",
      },
      {
        icon: LineChart,
        title: "Analysts",
        body: "Run document-level research across a portfolio in the time it used to take to review a single asset record.",
      },
      {
        icon: Users,
        title: "Investment Directors",
        body: "Make decisions with documentary evidence accessible at the point you need it, not after a request has been made to the asset management team.",
      },
    ],
  },
  quote: {
    text: "We identified three assets with break options we had not accounted for in our hold period modelling. They were in the leases. We just had not been able to read across the portfolio fast enough to see them.",
    attribution: "Investment Manager, UK real estate investment firm",
  },
  security: {
    body: "Investment portfolios involve sensitive fund and asset documentation. Leasedrop is built for the data protection, access governance and security standards that investment management organisations and their investors require.",
  },
  cta: {
    heading: "See the documentary position across your portfolio",
    body: "Start with a subset of assets and run the questions your investment decisions already depend on. See the answers traced back to their source.",
  },
};

function Page() {
  return <SolutionPage content={content} />;
}
