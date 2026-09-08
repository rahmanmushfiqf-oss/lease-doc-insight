import { createFileRoute } from "@tanstack/react-router";
import {
  ClipboardList,
  FileSearch,
  GraduationCap,
  HardHat,
  Layers,
  Ruler,
  ShieldCheck,
} from "lucide-react";

import compliance from "@/assets/alt-compliance.webp";
import documents from "@/assets/alt-documents-desk.webp";
import facade from "@/assets/hero-facade.webp";
import portfolio from "@/assets/portfolio-intelligence.webp";
import { SolutionPage, type SolutionContent } from "@/components/solutions/SolutionKit";

export const Route = createFileRoute("/solutions/building-surveyors")({
  head: () => ({
    meta: [
      { title: "Leasedrop for Building Surveyors" },
      {
        name: "description",
        content:
          "Find the documentary evidence behind every dilapidation instruction before the site visit. Leasedrop structures repair covenants and source references in one place.",
      },
      {
        property: "og:title",
        content: "Leasedrop for Building Surveyors",
      },
      {
        property: "og:description",
        content:
          "Find the documentary evidence behind every dilapidation instruction before the site visit. Leasedrop structures repair covenants and source references in one place.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/solutions/building-surveyors" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://asset-intel-source.lovable.app/solutions/building-surveyors" },
    ],
  }),
  component: Page,
});

const content: SolutionContent = {
  breadcrumb: "Building Surveyors",
  h1: "The documentary evidence, structured before you arrive.",
  subheading:
    "Leasedrop reads the full documentary record behind each property, head lease, amendments, licences and schedules of condition, and structures the evidence into one place. The professional judgement stays with you. The document search does not have to.",
  mockup: {
    path: "Leasedrop/assets/unit-4-meridian-park",
    assetTitle: "Unit 4 Meridian Park",
    docLabel: "Head Lease · Page 14",
    highlight: "the Tenant shall keep the interior of the Demised Premises",
    passage: "in good and substantial repair and condition throughout the Term…",
    source: "Source: Clause 8.2, p.14",
    fields: [
      { label: "Repair covenant", value: "Internal, full repairing" },
      { label: "Roof liability", value: "Landlord" },
    ],
    ask: "Ask about this asset…",
  },
  challenge: {
    heading: "The evidence is in the documents. Getting to it takes too long.",
    body: "Dilapidations assessments, lease reviews and reinstatement opinions all depend on what the documents actually say. Locating the right clause across a poorly organised documentary record takes time that should be spent on professional judgement.",
    cards: [
      {
        title: "Scattered documentation",
        body: "Relevant clauses sit across head leases, licences, amendments and schedules that were never designed to be read together.",
      },
      {
        title: "Repeated searches",
        body: "The same document gets opened multiple times across different instructions because there is no shared record of what it contains.",
      },
      {
        title: "Evidence hard to cite",
        body: "Tracing a conclusion back to the exact passage it came from takes longer than reaching the conclusion itself.",
      },
    ],
  },
  features: {
    heading: "From document pack to assessment-ready evidence in one place.",
    rows: [
      {
        icon: ClipboardList,
        label: "Repair Covenants",
        title: "Surface the repairing position without reading every clause",
        body: "Leasedrop identifies and structures repair obligations, reinstatement requirements and schedule of condition references across every document in the asset record before the site visit begins.",
        image: facade,
        alt: "Commercial building facade under survey assessment",
      },
      {
        icon: Ruler,
        label: "Dilapidations",
        title: "Build your assessment on documentary evidence",
        body: "Locate the clauses that determine liability, scope and standard of repair from the asset record. The professional judgement stays with you, the document search does not have to.",
        image: documents,
        alt: "Survey documents and lease papers laid out for a dilapidations assessment",
      },
      {
        icon: Layers,
        label: "Lease Reviews",
        title: "Read the full picture behind a lease in minutes",
        body: "Amendments, licences and ancillary documents are connected to the head lease inside the asset record so the position you are reviewing is always the complete one.",
        image: portfolio,
        alt: "Connected lease documents shown together in one asset record",
      },
      {
        icon: FileSearch,
        label: "Source Verification",
        title: "Cite the exact passage behind every conclusion",
        body: "Every piece of information Leasedrop surfaces is traceable to the document, page and passage it came from. Move from the answer to the original wording in one step.",
        image: compliance,
        alt: "Original lease wording being verified beside a structured finding",
      },
    ],
  },
  audiences: {
    heading: "Built for every role in a surveying practice",
    cards: [
      {
        icon: HardHat,
        title: "Chartered Surveyors",
        body: "Locate the documentary evidence behind a dilapidations or lease review instruction without spending hours reconstructing the position from scratch.",
      },
      {
        icon: GraduationCap,
        title: "Graduate Surveyors",
        body: "Work with the full documentary record from day one without depending on senior colleagues to know where the relevant clauses are.",
      },
      {
        icon: ShieldCheck,
        title: "Practice Directors",
        body: "Increase the volume of instructions your team can handle without increasing the time spent on document research.",
      },
    ],
  },
  quote: {
    text: "The clause we needed was in an annexe to a licence that had never been indexed. Leasedrop found it in the time it used to take us to open the right folder.",
    attribution: "Chartered Surveyor, UK building surveying practice",
  },
  security: {
    body: "Client documents are confidential. Leasedrop is built for the access controls, data protection requirements and governance standards that professional surveying practices and their clients expect.",
  },
  cta: {
    heading: "Find the evidence faster on your next instruction",
    body: "Bring in the documents behind a live instruction and see how quickly Leasedrop surfaces the clauses your assessment depends on.",
  },
};

function Page() {
  return <SolutionPage content={content} />;
}
