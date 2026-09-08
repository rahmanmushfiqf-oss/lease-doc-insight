import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpenCheck,
  Building,
  FileSearch,
  FileSignature,
  Gavel,
  Layers,
  Scale,
} from "lucide-react";

import compliance from "@/assets/alt-compliance.webp";
import documents from "@/assets/alt-documents-desk.webp";
import portfolio from "@/assets/portfolio-intelligence.webp";
import reception from "@/assets/alt-reception.webp";
import { SolutionPage, type SolutionContent } from "@/components/solutions/SolutionKit";

export const Route = createFileRoute("/solutions/legals")({
  head: () => ({
    meta: [
      { title: "Leasedrop for Legal Teams" },
      {
        name: "description",
        content:
          "Find the exact clause and verify it against the source. Leasedrop structures the full documentary record behind every asset for legal teams in commercial real estate.",
      },
      {
        property: "og:title",
        content: "Leasedrop for Legal Teams",
      },
      {
        property: "og:description",
        content:
          "Find the exact clause and verify it against the source. Leasedrop structures the full documentary record behind every asset for legal teams in commercial real estate.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/solutions/legals" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://asset-intel-source.lovable.app/solutions/legals" },
    ],
  }),
  component: Page,
});

const content: SolutionContent = {
  breadcrumb: "Legal Teams",
  h1: "Find the exact clause and verify it against the source.",
  subheading:
    "Leasedrop gives legal teams direct access to the relevant clause, in context, with the source always visible beside the answer. Every document behind an asset or transaction is connected, searchable and traceable, so legal work is built on the documents themselves, not summaries of them.",
  mockup: {
    path: "Leasedrop/assets/northgate-house/source",
    assetTitle: "Northgate House",
    docLabel: "Head Lease · Page 19 of 41",
    highlight: "the Tenant shall not assign, underlet or part with possession",
    passage:
      "of the Demised Premises without the prior written consent of the Landlord, such consent not to be unreasonably withheld or delayed…",
    source: "View source: Clause 6.3, p.19",
    fields: [{ label: "Assignment restriction", value: "Landlord consent required" }],
    ask: "Ask about this asset…",
  },
  challenge: {
    heading: "Legal advice is only as reliable as the documents behind it.",
    body: "In commercial real estate, the quality of legal advice depends on the quality of documentary access. When documents are disorganised, incomplete or difficult to cross-reference, the review takes longer and the risk of missing something increases.",
    cards: [
      {
        title: "Complex cross-references",
        body: "A single legal position can depend on clauses spread across a head lease, multiple amendments, a licence and an ancillary agreement, none of which were designed to be read together.",
      },
      {
        title: "Verification overhead",
        body: "Confirming a point of interpretation against the original wording is essential but time-consuming when the relevant passage has to be located manually each time.",
      },
      {
        title: "Briefing gap",
        body: "Legal teams are often working from summaries prepared by others, without straightforward access to the underlying documents when the summary raises a question.",
      },
    ],
  },
  features: {
    heading: "The documentary record, structured for legal work.",
    rows: [
      {
        icon: Layers,
        label: "Document Access",
        title: "Read the full documentary position behind an asset or transaction",
        body: "Leases, amendments, licences and ancillary documents are connected and readable as one record per asset. The legal position across all of them is accessible without managing multiple files.",
        image: documents,
        alt: "Legal documents connected into a single readable asset record",
      },
      {
        icon: FileSearch,
        label: "Clause Location",
        title: "Find the relevant clause without reading from the beginning",
        body: "Ask a legal question in plain language and Leasedrop identifies the relevant provisions across the documentary record, with the original wording accessible in one step.",
        image: portfolio,
        alt: "Relevant lease clause located across a documentary record",
      },
      {
        icon: BookOpenCheck,
        label: "Source Verification",
        title: "Keep the source beside the intelligence at every stage",
        body: "Every answer Leasedrop surfaces is linked to the document and page behind it. Legal teams can review the original passage before relying on any finding, without leaving the workspace.",
        image: compliance,
        alt: "Original clause wording shown beside a structured legal finding",
      },
      {
        icon: FileSignature,
        label: "Transaction Support",
        title: "Work through transaction document packs with structure",
        body: "In acquisitions, finance and lease transactions, Leasedrop organises the incoming documentary record so legal review begins with structure, not a folder of unindexed files.",
        image: reception,
        alt: "Commercial property transaction documents prepared for legal review",
      },
    ],
  },
  audiences: {
    heading: "Built for every role in a legal team working on real estate",
    cards: [
      {
        icon: Scale,
        title: "Real Estate Solicitors",
        body: "Access the relevant clause, in context, without spending time reconstructing the documentary position from a disorganised file.",
      },
      {
        icon: Gavel,
        title: "Paralegals & Legal Executives",
        body: "Locate and extract the provisions your supervising solicitor needs without reading through every document to find them.",
      },
      {
        icon: Building,
        title: "In-House Legal Counsel",
        body: "Maintain a current, structured view of the documentary position across every asset or lease in your organisation's portfolio.",
      },
    ],
  },
  quote: {
    text: "The question was straightforward. The answer was in an annexe to a licence signed eight years ago. Leasedrop found the passage before I had finished typing the question.",
    attribution: "Real Estate Solicitor, UK law firm",
  },
  security: {
    body: "Legal documents carry professional privilege and client confidentiality obligations. Leasedrop is built for the data protection, access governance and security standards that legal practices and in-house legal teams require.",
  },
  cta: {
    heading: "Bring the source into every legal review",
    body: "Test Leasedrop on a live matter or a set of assets and see how quickly the documentary record becomes structured and searchable.",
  },
};

function Page() {
  return <SolutionPage content={content} />;
}
