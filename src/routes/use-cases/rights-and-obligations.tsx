import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  FileUp,
  KeyRound,
  MessageSquareText,
  Scale,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import {
  AskMockup,
  DocListMockup,
  StructuredMockup,
  UseCasePage,
  VerifyMockup,
} from "@/components/use-cases/UseCaseKit";
import skylineAsset from "@/assets/Leasedrop_2.webp.asset.json";
import contractAsset from "@/assets/leasedrop_3.webp.asset.json";
import archiveAsset from "@/assets/leasedrop_4.webp.asset.json";

export const Route = createFileRoute("/use-cases/rights-and-obligations")({
  head: () => ({
    meta: [
      { title: "Rights & Obligations | Visible and Traceable | Leasedrop" },
      {
        name: "description",
        content:
          "Leasedrop identifies repair covenants, permitted use, consent requirements and alienation restrictions across every document in the asset record and structures them into the Single Asset View.",
      },
      { property: "og:title", content: "Rights & Obligations | Leasedrop" },
      {
        property: "og:description",
        content:
          "Every right and obligation across the asset, visible and traceable. The position is clear before the question is asked.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <UseCasePage
      eyebrow="Use Cases"
      title="Every right and obligation across the asset, visible and traceable."
      subtitle="Leasedrop identifies repair covenants, permitted use provisions, consent requirements and alienation restrictions across every document and structures them into the Single Asset View."
      heroMockup={
        <StructuredMockup
          hero
          url="Leasedrop/assets/northgate-house/obligations"
          title="Northgate House · Rights & Obligations"
          rows={[
            { k: "Repair · Tenant", v: "Internal full repairing", s: "Clause 8.2 · p.14" },
            { k: "Repair · Landlord", v: "Roof and structure", s: "Clause 8.2 · p.14" },
            { k: "Permitted use", v: "Class E office only", s: "Clause 5.1 · p.8" },
            { k: "Assignment", v: "Landlord consent required", s: "Clause 4.2 · p.17" },
            { k: "Alterations", v: "Licence required", s: "Licence to Alter · p.1" },
          ]}
        />
      }
      howTitle="From buried clauses to a structured obligations record in one flow."
      steps={[
        {
          icon: FileUp,
          label: "Upload",
          title: "Bring the documents that create obligations together",
          body: "Upload leases, amendments, licences and deeds that establish or modify the rights and obligations attached to the asset. Leasedrop reads them as one connected record inside the Single Asset View.",
          mockup: (
            <DocListMockup
              url="Leasedrop/assets/northgate-house/documents"
              title="Northgate House"
              subtitle="Single Asset View"
              rows={[
                { name: "Head Lease", meta: "2018", status: "Processed" },
                { name: "Amendment 1", meta: "2021", status: "Processed" },
                { name: "Licence to Alter", meta: "2022", status: "Processed" },
                { name: "Deed of Variation", meta: "2024", status: "AI processing", pending: true },
              ]}
              note="Obligations are read across the record, not document by document."
            />
          ),
        },
        {
          icon: ScanLine,
          label: "Extract",
          title: "Surface every obligation and right across the record",
          body: "Repair covenants, permitted use provisions, consent requirements, alienation restrictions, service charge obligations and landlord duties are identified and structured across every document in the Single Asset View.",
          mockup: (
            <StructuredMockup
              url="Leasedrop/assets/northgate-house/extracts"
              title="Structured obligations"
              rows={[
                { k: "Subletting", v: "Permitted, whole floor only", s: "Clause 4.4 · p.18" },
                { k: "Service charge", v: "Fixed 12.5% share", s: "Schedule 4 · p.31" },
                { k: "Landlord duty", v: "Insure and maintain common parts", s: "Clause 6.1 · p.11" },
                { k: "Signage", v: "Consent required", s: "Clause 7.3 · p.13" },
              ]}
            />
          ),
        },
        {
          icon: MessageSquareText,
          label: "Ask",
          title: "Question the obligations position in plain language",
          body: "Ask whether a tenant can sublet, what the landlord is required to repair, whether an alteration requires consent or what use the lease permits, and receive answers drawn from the documents themselves.",
          mockup: (
            <AskMockup
              url="Leasedrop/assets/northgate-house/ask"
              chips={[
                "Can the tenant sublet part of the floor?",
                "What consent do alterations require?",
                "What use does the lease permit?",
              ]}
              question="What consent is required before the tenant carries out alterations?"
              answer="Non-structural alterations require the landlord's prior written consent, not to be unreasonably withheld. Structural works are prohibited without a further licence."
              source="Clause 7.1, p.12 and Licence to Alter, p.1"
            />
          ),
        },
        {
          icon: ShieldCheck,
          label: "Verify",
          title: "Confirm every position against the original wording",
          body: "Every answer links to the exact clause and page behind it. Move from the structured obligation to the original passage before relying on it in correspondence, advice or decisions.",
          mockup: (
            <VerifyMockup
              url="Leasedrop/assets/northgate-house/source"
              docLabel="Head Lease · Page 12 of 34"
              before="…the Tenant shall not make any alteration to the Demised Premises without"
              highlight="the prior written consent of the Landlord, such consent not to be unreasonably withheld"
              after="…"
              source="Clause 7.1, p.12"
              pageLabel="Page [12] of 34"
            />
          ),
        },
      ]}
      outcomeTitle="What changes when rights and obligations are always visible."
      outcomes={[
        {
          title: "No obligation goes unnoticed",
          body: "Provisions buried in amendments, licences and ancillary documents are surfaced alongside those in the head lease inside the Single Asset View. The position your team works from is always the complete one.",
        },
        {
          title: "Faster answers to everyday questions",
          body: "Questions about what a tenant can do, what a landlord must do and what consent is required are answered from the asset record, without opening documents to find out.",
        },
        {
          title: "Every position is defensible",
          body: "Rights and obligations identified through Leasedrop are traceable to the exact clause behind them. The position is not an assumption, it is an answer with a source.",
        },
      ]}
      scenarioTitle="What rights and obligations intelligence looks like in use."
      scenario="A tenant requests consent to carry out alterations to their demise. The asset manager needs to understand what the lease and licence require before responding."
      without={[
        "Locate the head lease and find the alterations clause",
        "Check whether any amendment modifies the consent requirement",
        "Review the existing licence to alter for restrictions on further works",
        "Form a view on the landlord's obligations in responding to the request",
        "Draft a response based on notes compiled across multiple documents",
      ]}
      withLeasedrop={[
        "Open the Single Asset View for the property",
        "Ask what consent is required for alterations under the lease",
        "Leasedrop identifies the relevant provisions across the lease and licence",
        "Review the original wording of each clause before responding",
        "Respond to the tenant with the documentary position clear and verified",
      ]}
      outcomeLine="The asset manager responds with confidence, and the position is traceable to the clause behind it if it is ever questioned."
      related={[
        {
          label: "Asset Management Teams",
          to: "/solutions/asset-managers",
          icon: Building2,
          image: skylineAsset.url,
          blurb:
            "Understand what every lease requires and what every tenant is permitted to do, from the Single Asset View, without opening the documents to find out.",
        },
        {
          label: "Property Managers",
          to: "/solutions/property-managers",
          icon: KeyRound,
          image: archiveAsset.url,
          blurb:
            "Answer tenant queries about obligations, permitted use and consent requirements with the source attached. No more drafting responses with caveats about needing to check the documents.",
        },
        {
          label: "Legal Teams",
          to: "/solutions/legals",
          icon: Scale,
          image: contractAsset.url,
          blurb:
            "Access the full obligations position across every document connected to an asset. Advise on rights and covenants from a verified record, not a summary.",
        },
      ]}
      ctaTitle="See the obligations position across your assets."
      ctaBody="Bring in the documents behind a set of properties and see how Leasedrop structures the rights and obligations into a Single Asset View."
    />
  );
}
