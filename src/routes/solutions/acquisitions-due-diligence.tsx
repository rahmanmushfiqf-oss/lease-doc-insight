import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  FileSearch,
  FolderInput,
  Handshake,
  LayoutGrid,
  Scale,
  Wallet,
} from "lucide-react";

import compliance from "@/assets/alt-compliance.webp";
import documents from "@/assets/alt-documents-desk.webp";
import portfolio from "@/assets/portfolio-intelligence.webp";
import skyline from "@/assets/alt-portfolio-skyline.webp";
import { SolutionPage, type SolutionContent } from "@/components/solutions/SolutionKit";

export const Route = createFileRoute("/solutions/acquisitions-due-diligence")({
  head: () => ({
    meta: [
      { title: "Leasedrop for Acquisitions & Due Diligence" },
      {
        name: "description",
        content:
          "Work through large data rooms and surface what the transaction depends on. Leasedrop structures acquisition document packs and traces every finding to source.",
      },
      { property: "og:title", content: "Leasedrop for Acquisitions & Due Diligence" },
      {
        property: "og:description",
        content: "Work through large data rooms and surface what the transaction depends on. Leasedrop structures acquisition document packs and traces every finding to source.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/solutions/acquisitions-due-diligence" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://asset-intel-source.lovable.app/solutions/acquisitions-due-diligence" },
    ],
  }),
  component: Page,
});

const content: SolutionContent = {
  breadcrumb: "Acquisitions & Due Diligence",
  h1: "Work through large document packs and surface what matters.",
  subheading:
    "Leasedrop ingests the full document pack behind an acquisition target, organises everything around each asset and structures what the transaction depends on into one place. Every finding traceable to its source before the decision is made.",
  mockup: {
    path: "Leasedrop/assets/portfolio/due-diligence",
    assetTitle: "Acquisition Portfolio — 8 assets",
    rows: [
      { label: "Northgate House", value: "22 documents", source: "3 material findings" },
      { label: "Unit 4 Meridian Park", value: "18 documents", source: "1 material finding" },
      { label: "Kingsway Retail", value: "31 documents", source: "Processing" },
    ],
    footnote: "All findings traceable to source documents",
    ask: "Ask about this portfolio…",
  },
  challenge: {
    heading: "The deal timeline rarely matches the document volume.",
    body: "Acquisition due diligence involves working through a large and often disorganised document pack under time pressure. The cost of missing something is high. The time available to find everything is short.",
    cards: [
      {
        title: "Volume without structure",
        body: "Data rooms contain hundreds of documents with no consistent organisation and no indication of what each one contains.",
      },
      {
        title: "Time pressure",
        body: "The deal timeline compresses the review period. The document volume does not compress with it.",
      },
      {
        title: "Missed dependencies",
        body: "A condition buried in an annexe to a licence can be as material as anything in the head lease. Manual review does not guarantee it will be found.",
      },
    ],
  },
  features: {
    heading: "From data room to structured documentary intelligence in one place.",
    rows: [
      {
        icon: FolderInput,
        label: "Document Ingestion",
        title: "Bring the entire data room into one structured record",
        body: "Upload the full document pack and Leasedrop organises it around the assets it relates to. Leases, amendments, licences, surveys, notices and ancillary documents are connected and readable as one record per asset.",
        image: documents,
        alt: "Transaction document pack being organised into structured asset records",
      },
      {
        icon: AlertTriangle,
        label: "Material Issues",
        title: "Surface what the transaction depends on",
        body: "Identify the obligations, conditions, restrictions and rights that are material to the acquisition, including the ones sitting in documents that a time-pressured manual review might not have reached.",
        image: compliance,
        alt: "Material findings surfaced from an acquisition document pack",
      },
      {
        icon: LayoutGrid,
        label: "Cross-Asset Review",
        title: "Compare documentary positions across multiple assets",
        body: "When a transaction involves a portfolio, run questions across every asset simultaneously. Identify shared conditions, inconsistencies and points of risk without reviewing each asset in sequence.",
        image: skyline,
        alt: "Portfolio of acquisition target properties reviewed together",
      },
      {
        icon: FileSearch,
        label: "Source Verification",
        title: "Every finding is evidence, not interpretation",
        body: "Move from any finding to the document, page and passage behind it. Legal and commercial advisers can verify every point against the original wording before relying on it.",
        image: portfolio,
        alt: "Finding shown beside the original document wording that supports it",
      },
    ],
  },
  audiences: {
    heading: "Built for every role in an acquisitions and due diligence team",
    cards: [
      {
        icon: Handshake,
        title: "Acquisition Managers",
        body: "Work through the documentary record of a target asset or portfolio faster and with greater confidence that material information has not been missed.",
      },
      {
        icon: Scale,
        title: "Legal Advisers",
        body: "Locate the clauses, conditions and cross-references that determine legal risk without reading every document from the first page.",
      },
      {
        icon: Wallet,
        title: "Investment & Finance Teams",
        body: "Access the documentary evidence behind income, obligations and risk assumptions at the point analysis is being prepared, not after a separate document review has been requested.",
      },
    ],
  },
  quote: {
    text: "We brought in a 200-document data room on a Friday afternoon. By Monday morning we had a structured view of every material obligation across the portfolio. That used to take two weeks.",
    attribution: "Acquisition Manager, UK real estate private equity firm",
  },
  security: {
    body: "Transaction documents are among the most sensitive in commercial real estate. Leasedrop is built for the confidentiality requirements, access governance and data protection standards that acquisitions teams and their advisers require.",
  },
  cta: {
    heading: "Run your next due diligence on Leasedrop",
    body: "Bring in the documents behind a live or recent transaction and see how quickly Leasedrop structures the documentary record and surfaces what matters.",
  },
};

function Page() {
  return <SolutionPage content={content} />;
}
