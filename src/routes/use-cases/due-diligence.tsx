import { createFileRoute } from "@tanstack/react-router";
import {
  FileUp,
  LineChart,
  MessageSquareText,
  Scale,
  ScanLine,
  Search,
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
import propertyLeaseAsset from "@/assets/Leasedrop_5.webp.asset.json";

export const Route = createFileRoute("/use-cases/due-diligence")({
  head: () => ({
    meta: [
      { title: "Due Diligence | A Single Asset View per Property | Leasedrop" },
      {
        name: "description",
        content:
          "Leasedrop ingests the full document pack behind an acquisition target, organises it around each asset and structures what the transaction depends on into a Single Asset View.",
      },
      { property: "og:title", content: "Due Diligence | Leasedrop" },
      {
        property: "og:description",
        content:
          "A Single Asset View for every property in the data room, with every finding traceable to its source before the decision is made.",
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
      title="A Single Asset View for every property in the data room."
      subtitle="Leasedrop ingests the full document pack behind an acquisition target, organises it around each asset and structures what the transaction depends on."
      heroMockup={
        <DocListMockup
          hero
          url="Leasedrop/portfolio/due-diligence"
          title="Acquisition · Portfolio Review"
          subtitle="8 assets"
          rows={[
            { name: "Northgate House", meta: "22 documents · 3 material findings", status: "SAV complete" },
            { name: "Unit 4 Meridian Park", meta: "18 documents · 1 material finding", status: "SAV complete" },
            { name: "Kingsway Retail", meta: "31 documents", status: "AI processing", pending: true },
          ]}
          note="All findings traceable to source documents"
        />
      }
      howTitle="From data room to Single Asset View in one flow."
      steps={[
        {
          icon: FileUp,
          label: "Upload",
          title: "Bring the full document pack into one structured record",
          body: "Upload the contents of the data room, leases, amendments, licences, surveys, title documents and ancillary agreements. Leasedrop organises them around the assets they relate to, building a Single Asset View for each property from the documents it receives.",
          mockup: (
            <DocListMockup
              url="Leasedrop/portfolio/due-diligence/upload"
              title="Data room upload"
              subtitle="180 documents"
              rows={[
                { name: "Leases and amendments", meta: "94 files", status: "Processed" },
                { name: "Licences and consents", meta: "27 files", status: "Processed" },
                { name: "Surveys and reports", meta: "38 files", status: "Processed" },
                { name: "Title documents", meta: "21 files", status: "AI processing", pending: true },
              ]}
              note="Organised around the assets they relate to."
            />
          ),
        },
        {
          icon: ScanLine,
          label: "Extract",
          title: "Turn the document pack into usable intelligence",
          body: "Obligations, conditions, rights, restrictions, key dates and material provisions are extracted and structured across every document in the pack. The information inside each file becomes part of the Single Asset View for that property without reading it from the first page.",
          mockup: (
            <StructuredMockup
              url="Leasedrop/portfolio/due-diligence/findings"
              title="Material findings"
              rows={[
                { k: "Northgate House", v: "Tenant break, 14 Mar 2027", s: "Clause 9.1 · p.18" },
                { k: "Asset 3", v: "Reinstatement obligation at expiry", s: "Licence to Alter · p.2" },
                { k: "Kingsway Retail", v: "Rent review outstanding", s: "Clause 5.2 · p.9" },
                { k: "Asset 6", v: "Assignment restricted", s: "Clause 4.2 · p.17" },
              ]}
            />
          ),
        },
        {
          icon: MessageSquareText,
          label: "Ask",
          title: "Ask the questions the transaction depends on",
          body: "Ask about income security, break options, repair liability, consent requirements and alienation restrictions across one asset or the entire acquisition portfolio, and receive answers drawn from the documents themselves.",
          mockup: (
            <AskMockup
              url="Leasedrop/portfolio/due-diligence/ask"
              chips={[
                "Which assets carry break options?",
                "Where does repair liability sit?",
                "Are there reinstatement obligations?",
              ]}
              question="Which assets in the pack carry reinstatement obligations at expiry?"
              answer="Two assets. Asset 3 carries a reinstatement obligation created by a licence to alter, and Unit 4 Meridian Park requires removal of tenant alterations at the end of the term."
              source="Licence to Alter, p.2 and Clause 11.3, p.22"
            />
          ),
        },
        {
          icon: ShieldCheck,
          label: "Verify",
          title: "Trace every finding to the document behind it",
          body: "Every finding links to the exact document, page and passage that supports it. Legal and commercial advisers can verify every point against the original wording inside the Single Asset View before relying on it.",
          mockup: (
            <VerifyMockup
              url="Leasedrop/portfolio/due-diligence/source"
              docLabel="Licence to Alter · Page 2 of 6"
              before="…the Tenant shall at the expiry of the Term"
              highlight="remove the Works and reinstate the Premises to their former condition"
              after="to the reasonable satisfaction of the Landlord…"
              source="Licence to Alter, p.2"
              pageLabel="Page [2] of 6"
            />
          ),
        },
      ]}
      outcomeTitle="What changes when due diligence is built on a Single Asset View."
      outcomes={[
        {
          title: "Material issues surface faster",
          body: "Conditions buried in annexes, licences and ancillary documents are identified alongside those in the head leases. The review is built on the full record for each asset, not just the obvious documents.",
        },
        {
          title: "The deal timeline no longer determines the review depth",
          body: "Leasedrop structures the documentary record faster than a manual review allows. Your team spends the available time on judgement and analysis, not on locating and reading files.",
        },
        {
          title: "Every finding is evidence, not interpretation",
          body: "The conclusions your team reaches are connected to the original wording behind them inside the Single Asset View. Findings shared with advisers, investors or counterparties come with the source attached.",
        },
      ]}
      scenarioTitle="What due diligence intelligence looks like in use."
      scenario="An acquisitions team is conducting due diligence on a portfolio of eight assets. The data room contains 180 documents and the exclusivity period is three weeks."
      without={[
        "Divide the document pack across the team and begin reading manually",
        "Build a summary of each asset from notes taken across multiple documents",
        "Identify a break option in asset six that modifies the hold period assumptions",
        "Discover a reinstatement obligation in asset three not reflected in the head lease",
        "Compile findings into a report and return to individual documents when advisers request verification",
      ]}
      withLeasedrop={[
        "Upload all 180 documents and Leasedrop builds a Single Asset View for each property",
        "Ask which assets have break options, material obligations or income risks",
        "Leasedrop surfaces findings across all eight assets with source references attached",
        "Identify the reinstatement obligation in asset three before it affects the valuation",
        "Share findings with advisers with the source document and page attached to each one",
      ]}
      outcomeLine="The team reaches the end of the exclusivity period with a structured, source-backed Single Asset View of every property, and no findings dependent on documents they did not have time to read."
      related={[
        {
          label: "Acquisitions & Due Diligence Teams",
          to: "/solutions/acquisitions-due-diligence",
          icon: Search,
          image: skylineAsset.url,
          blurb:
            "Build a Single Asset View for every property in the data room. Surface what the transaction depends on before the exclusivity period runs out.",
        },
        {
          label: "Investment & Portfolio Managers",
          to: "/solutions/investment-managers",
          icon: LineChart,
          image: propertyLeaseAsset.url,
          blurb:
            "Understand the documentary position behind an acquisition before it affects the investment assumptions. Every finding connected to its source.",
        },
        {
          label: "Legal Teams",
          to: "/solutions/legals",
          icon: Scale,
          image: contractAsset.url,
          blurb:
            "Work through transaction document packs from a structured Single Asset View. Find the clauses that determine legal risk without reading every document from the first page.",
        },
      ]}
      ctaTitle="Run your next due diligence on Leasedrop."
      ctaBody="Bring in the documents behind a live or recent transaction and see how quickly Leasedrop builds a Single Asset View for every property in the pack."
    />
  );
}
