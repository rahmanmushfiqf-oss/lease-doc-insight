import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  FileUp,
  MessageSquareText,
  Ruler,
  Scale,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import {
  AskMockup,
  ClauseHero,
  DocListMockup,
  StructuredMockup,
  UseCasePage,
  VerifyMockup,
} from "@/components/use-cases/UseCaseKit";
import skylineAsset from "@/assets/Leasedrop_2.webp.asset.json";
import contractAsset from "@/assets/leasedrop_3.webp.asset.json";
import propertyLeaseAsset from "@/assets/Leasedrop_5.webp.asset.json";

export const Route = createFileRoute("/use-cases/dilapidations")({
  head: () => ({
    meta: [
      { title: "Dilapidations | Structured Repairing Evidence | Leasedrop" },
      {
        name: "description",
        content:
          "Leasedrop reads the full documentary record behind an asset and structures the repairing position into the Single Asset View, with every finding traced to its clause.",
      },
      { property: "og:title", content: "Dilapidations | Leasedrop" },
      {
        property: "og:description",
        content:
          "Find the evidence. Leave the judgement to the professional. Repair covenants, reinstatement obligations and schedules of condition, structured and source linked.",
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
      title="Find the evidence. Leave the judgement to the professional."
      subtitle="Leasedrop reads the full documentary record behind an asset and structures the repairing position into the Single Asset View."
      heroMockup={
        <ClauseHero
          url="Leasedrop/assets/unit-4-meridian-park/extract"
          docTitle="Head Lease"
          pageLabel="Page 14 of 38"
          clauseLabel="Clause 8.2"
          clauseTopic="Repair"
          before="…the Tenant shall"
          highlight="keep the interior of the Demised Premises in good and substantial repair and condition"
          after="throughout the Term…"
          terms={[
            { k: "Repair covenant", v: "Internal, full repairing", s: "Clause 8.2 · p.14" },
            { k: "Roof liability", v: "Landlord", s: "Clause 8.2 · p.14" },
            { k: "Reinstatement", v: "Required at expiry", s: "Clause 11.3 · p.22" },
            { k: "Schedule of condition", v: "Annexe A applies", s: "Clause 8.4 · p.15" },
          ]}
        />
      }
      howTitle="From document pack to structured evidence in one flow."
      steps={[
        {
          icon: FileUp,
          label: "Upload",
          title: "Bring the full repairing record together",
          body: "Upload the head lease, amendments, licences, schedules of condition and ancillary documents. Leasedrop reads them as one connected record and organises them inside the Single Asset View for that property.",
          mockup: (
            <DocListMockup
              url="Leasedrop/assets/unit-4-meridian-park/documents"
              title="Unit 4 Meridian Park"
              subtitle="Single Asset View"
              rows={[
                { name: "Head Lease", meta: "2016", status: "Processed" },
                { name: "Amendment 1", meta: "2019", status: "Processed" },
                { name: "Licence to Alter", meta: "2021", status: "Processed" },
                { name: "Schedule of Condition", meta: "Annexe A", status: "Processed" },
                { name: "Dilapidations Survey", meta: "2024", status: "AI processing", pending: true },
              ]}
              note="Read as one connected record, not as separate files."
            />
          ),
        },
        {
          icon: ScanLine,
          label: "Extract",
          title: "Structure the repairing position automatically",
          body: "Repair covenants, reinstatement obligations, yield-up provisions, schedule of condition references and decoration requirements are identified and structured across every document in the record. No manual extraction. No clause hunting.",
          mockup: (
            <StructuredMockup
              url="Leasedrop/assets/unit-4-meridian-park/repairing-position"
              title="Repairing position"
              rows={[
                { k: "Repair", v: "Internal, full repairing", s: "Clause 8.2 · p.14" },
                { k: "Decoration", v: "Every 5 years and final year", s: "Clause 8.6 · p.16" },
                { k: "Yield up", v: "Good repair, vacant possession", s: "Clause 11.1 · p.21" },
                { k: "Reinstatement", v: "Alterations to be removed", s: "Licence to Alter · p.2" },
              ]}
            />
          ),
        },
        {
          icon: MessageSquareText,
          label: "Ask",
          title: "Question the repairing position directly",
          body: "Ask what the tenant is required to repair, what the schedule of condition qualifies and what reinstatement the lease demands, and receive answers drawn from the documents themselves.",
          mockup: (
            <AskMockup
              url="Leasedrop/assets/unit-4-meridian-park/ask"
              chips={[
                "What is the tenant required to repair?",
                "Does the schedule of condition qualify it?",
                "What must be reinstated at expiry?",
              ]}
              question="What is the tenant required to repair at this property?"
              answer="The tenant holds an internal full repairing obligation, limited by the Schedule of Condition at Annexe A. The roof and external structure remain the landlord's liability."
              source="Clause 8.2, p.14 and Clause 8.4, p.15"
            />
          ),
        },
        {
          icon: ShieldCheck,
          label: "Verify",
          title: "Read the original clause before you rely on it",
          body: "Every finding links to the exact document, page and passage behind it. Move from the structured repairing position to the original wording before including it in your schedule or report.",
          mockup: (
            <VerifyMockup
              url="Leasedrop/assets/unit-4-meridian-park/source"
              docLabel="Head Lease · Page 15 of 38"
              before="…the Tenant shall not be required to put the Demised Premises into any better state of repair than"
              highlight="that evidenced by the Schedule of Condition annexed at Annexe A"
              after="…"
              source="Clause 8.4, p.15"
              pageLabel="Page [15] of 38"
            />
          ),
        },
      ]}
      outcomeTitle="What changes when the repairing evidence is already structured."
      outcomes={[
        {
          title: "Less time on document research",
          body: "The hours spent locating, cross-referencing and reading repair clauses are reduced to minutes. Professional time goes on the assessment, not the search.",
        },
        {
          title: "A complete picture of the repairing position",
          body: "Amendments, licences and ancillary documents are read alongside the head lease inside the Single Asset View. The position your assessment relies on is always the full one.",
        },
        {
          title: "Evidence traceable from the start",
          body: "Every conclusion in the schedule or report has a source behind it that can be verified before the assessment leaves your desk.",
        },
      ]}
      scenarioTitle="What dilapidations intelligence looks like in use."
      scenario="A chartered surveyor is instructed on a dilapidations claim at lease expiry. The documentary record includes a head lease, two amendments and a licence to alter."
      without={[
        "Open the head lease and locate the repair covenant manually",
        "Check whether either amendment modifies the repairing obligation",
        "Search the licence to alter for reinstatement and make-good provisions",
        "Cross-reference the schedule of condition against the repair clause",
        "Compile the repairing position from notes taken across four documents",
        "Return to individual documents repeatedly during the schedule drafting process",
      ]}
      withLeasedrop={[
        "Open the Single Asset View for the property",
        "Ask what the tenant is required to repair and reinstate",
        "Leasedrop structures the position across all four documents",
        "Review each clause in its original context before relying on it",
        "Reference the source directly in the schedule without returning to the file",
      ]}
      outcomeLine="The surveyor reaches the assessment stage with the documentary position already structured, and every conclusion traceable to the clause behind it."
      related={[
        {
          label: "Building Surveyors",
          to: "/solutions/building-surveyors",
          icon: Ruler,
          image: propertyLeaseAsset.url,
          blurb:
            "Surface the full repairing position from the Single Asset View before the site visit. Spend your time on the assessment, not on locating the evidence behind it.",
        },
        {
          label: "Asset Management Teams",
          to: "/solutions/asset-managers",
          icon: Building2,
          image: skylineAsset.url,
          blurb:
            "Understand landlord and tenant repair obligations across every asset you manage. Know the position before a dilapidations negotiation begins.",
        },
        {
          label: "Legal Teams",
          to: "/solutions/legals",
          icon: Scale,
          image: contractAsset.url,
          blurb:
            "Access the repairing covenant, schedule of condition and reinstatement provisions in one place, traced to their source, before advising on a dilapidations claim.",
        },
      ]}
      ctaTitle="Surface the repairing position on a live instruction."
      ctaBody="Bring in the documents behind a current dilapidations instruction and see how Leasedrop structures the evidence into a Single Asset View."
    />
  );
}
