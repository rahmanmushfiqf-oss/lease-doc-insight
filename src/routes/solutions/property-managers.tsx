import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarClock,
  ClipboardList,
  FileBarChart,
  KeyRound,
  MessageSquareText,
  Repeat,
  UsersRound,
} from "lucide-react";

import compliance from "@/assets/alt-compliance.webp";
import documents from "@/assets/alt-documents-desk.webp";
import reception from "@/assets/alt-reception.webp";
import portfolio from "@/assets/portfolio-intelligence.webp";
import { SolutionPage, type SolutionContent } from "@/components/solutions/SolutionKit";

export const Route = createFileRoute("/solutions/property-managers")({
  head: () => ({
    meta: [
      { title: "Leasedrop for Property Managers" },
      {
        name: "description",
        content:
          "Every obligation, date and lease term is accessible to the whole team. Leasedrop keeps the documentary position behind every managed asset current and searchable.",
      },
      {
        property: "og:title",
        content: "Leasedrop for Property Managers",
      },
      {
        property: "og:description",
        content:
          "Every obligation, date and lease term is accessible to the whole team. Leasedrop keeps the documentary position behind every managed asset current and searchable.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/solutions/property-managers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://asset-intel-source.lovable.app/solutions/property-managers" },
    ],
  }),
  component: Page,
});

const content: SolutionContent = {
  breadcrumb: "Property Managers",
  h1: "Every obligation and date, accessible to the whole team.",
  subheading:
    "Leasedrop connects every document behind each managed asset into one permanent record, with obligations, dates, rights and lease terms structured and accessible to everyone responsible for the property. No more searching. No more reconstructing the position from scratch.",
  mockup: {
    path: "Leasedrop/assets/kingsway-retail",
    assetTitle: "Kingsway Retail",
    docLabel: "Lease agreement · Page 8",
    highlight: "the Tenant shall use the Demised Premises for Class E retail purposes only",
    passage:
      "and shall not use them for any other purpose without the prior written consent of the Landlord…",
    source: "Source: Clause 5.1, p.8",
    fields: [
      { label: "Permitted use", value: "Class E retail only" },
      { label: "Notice period", value: "6 months" },
    ],
    ask: "Ask about this asset…",
  },
  challenge: {
    heading: "Managing assets means managing what the documents say.",
    body: "Every property under management comes with a documentary history that grows over time. Keeping track of what each document says, and acting on it at the right moment, is work that never stops.",
    cards: [
      {
        title: "Obligations overlooked",
        body: "Service charge provisions, repair responsibilities and consent requirements get missed when they live inside documents nobody is monitoring.",
      },
      {
        title: "Tenant queries take too long",
        body: "Answering a straightforward question about lease terms should not require an afternoon of document searching.",
      },
      {
        title: "Handovers lose context",
        body: "When a property changes hands internally, the understanding built up around it rarely transfers with the file.",
      },
    ],
  },
  features: {
    heading: "The full documentary position behind every managed asset.",
    rows: [
      {
        icon: ClipboardList,
        label: "Obligations",
        title: "Know what every lease requires and when",
        body: "Repair obligations, consent requirements, service charge provisions and landlord responsibilities are structured inside the asset record and accessible without opening the underlying documents every time.",
        image: portfolio,
        alt: "Structured lease obligations shown inside a managed asset record",
      },
      {
        icon: MessageSquareText,
        label: "Tenant Queries",
        title: "Respond to tenant questions with documentary confidence",
        body: "When a tenant asks about their obligations, permitted use or lease terms, Leasedrop surfaces the relevant clause from the asset record and traces the answer to the exact page it came from.",
        image: reception,
        alt: "Commercial building reception where tenant queries are handled",
      },
      {
        icon: CalendarClock,
        label: "Lease Events",
        title: "Stay ahead of every critical date",
        body: "Rent reviews, break options, lease expiries and notice deadlines are visible inside the asset record before they become time-sensitive, not after.",
        image: compliance,
        alt: "Upcoming lease events tracked across managed properties",
      },
      {
        icon: Repeat,
        label: "Handovers",
        title: "Transfer asset knowledge, not just files",
        body: "The intelligence built around each asset stays in the record when people move on. New team members inherit the full documentary position, not a folder of unread PDFs.",
        image: documents,
        alt: "Property files being handed over between team members",
      },
    ],
  },
  audiences: {
    heading: "Built for every role in a property management team",
    cards: [
      {
        icon: KeyRound,
        title: "Property Managers",
        body: "Manage obligations, dates and tenant relationships across a portfolio without depending on memory or repeated document searches.",
      },
      {
        icon: FileBarChart,
        title: "Client Reporting Teams",
        body: "Pull accurate, source-backed information for client reports without reconstructing the documentary position from scratch each time.",
      },
      {
        icon: UsersRound,
        title: "Property Management Directors",
        body: "Give your team a consistent, accessible record of every managed asset so quality does not depend on individual knowledge.",
      },
    ],
  },
  quote: {
    text: "A tenant called asking about their permitted use. We had the answer, with the clause reference, before they finished explaining the question.",
    attribution: "Property Manager, UK commercial property management firm",
  },
  security: {
    body: "Property management involves sensitive client and tenant documentation. Leasedrop is built for the governance, access controls and data protection standards that managing agents and their clients require.",
  },
  cta: {
    heading: "Bring your managed portfolio into one intelligent record",
    body: "Start with a selection of the assets you currently manage and see how Leasedrop builds a complete record for each one.",
  },
};

function Page() {
  return <SolutionPage content={content} />;
}
