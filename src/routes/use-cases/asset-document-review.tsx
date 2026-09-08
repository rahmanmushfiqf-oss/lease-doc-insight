import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  FileUp,
  KeyRound,
  LineChart,
  MessageSquareText,
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
import archiveAsset from "@/assets/leasedrop_4.webp.asset.json";
import propertyLeaseAsset from "@/assets/Leasedrop_5.webp.asset.json";

export const Route = createFileRoute("/use-cases/asset-document-review")({
  head: () => ({
    meta: [
      { title: "Asset Document Review | One Connected Record | Leasedrop" },
      {
        name: "description",
        content:
          "Leasedrop brings leases, amendments, licences, surveys, notices and reports into the Single Asset View for each property, structured, searchable and traceable to source.",
      },
      { property: "og:title", content: "Asset Document Review | Leasedrop" },
      {
        property: "og:description",
        content:
          "Every document behind an asset, connected in one record. Open an asset and everything that belongs to it is already there.",
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
      title="Every document behind an asset, connected in one record."
      subtitle="Leasedrop brings leases, amendments, licences, surveys, notices and reports together into the Single Asset View for each property. Each asset is structured, and traceable to source."
      heroMockup={
        <DocListMockup
          hero
          url="Leasedrop/assets/kingsway-retail/documents"
          title="Kingsway Retail · Single Asset View"
          subtitle="Documents · 14 total"
          rows={[
            { name: "Head Lease", meta: "2014", status: "Processed" },
            { name: "Amendment 1", meta: "2017", status: "Processed" },
            { name: "Amendment 2", meta: "2019", status: "Processed" },
            { name: "Licence to Alter", meta: "2020", status: "Processed" },
            { name: "Dilapidations Survey", meta: "2023", status: "Processed" },
            { name: "Notice of Rent Review", meta: "2024", status: "Processed" },
          ]}
        />
      }
      howTitle="From scattered files to one connected asset record."
      steps={[
        {
          icon: FileUp,
          label: "Upload",
          title: "Bring every document behind the asset together",
          body: "Upload leases, amendments, licences, surveys, notices and reports connected to the property. Leasedrop organises them inside the Single Asset View for that asset, not around the folder structure they arrived in.",
          mockup: (
            <DocListMockup
              url="Leasedrop/assets/kingsway-retail/upload"
              title="Upload to Kingsway Retail"
              subtitle="6 files"
              rows={[
                { name: "Head Lease 2014.pdf", status: "Processed" },
                { name: "Amendment 2 2019.pdf", status: "Processed" },
                { name: "Licence to Alter 2020.pdf", status: "Processed" },
                { name: "Building Survey 2023.pdf", status: "AI processing", pending: true },
              ]}
              note="Organised around the asset, not the drive they arrived from."
            />
          ),
        },
        {
          icon: ScanLine,
          label: "Extract",
          title: "Turn every document into structured intelligence",
          body: "Key terms, obligations, rights, dates and provisions across every document are identified and structured automatically. The information inside each file becomes part of the asset record without manual data entry.",
          mockup: (
            <StructuredMockup
              url="Leasedrop/assets/kingsway-retail/extracts"
              title="Structured asset record"
              rows={[
                { k: "Term", v: "15 years from 2014", s: "Clause 2.1 · p.3" },
                { k: "Permitted use", v: "Retail, Class E", s: "Clause 5.1 · p.8" },
                { k: "Rent review", v: "30 Nov 2026", s: "Clause 5.2 · p.9" },
                { k: "Alterations", v: "Licence granted 2020", s: "Licence to Alter · p.1" },
              ]}
            />
          ),
        },
        {
          icon: MessageSquareText,
          label: "Ask",
          title: "Question the full asset record in plain language",
          body: "Ask anything about the asset's documentary position, what the lease requires, what the survey identified, what the licence permits, and receive an answer drawn from the full record, not just the document in front of you.",
          mockup: (
            <AskMockup
              url="Leasedrop/assets/kingsway-retail/ask"
              chips={[
                "What use does the lease permit?",
                "What did the 2023 survey identify?",
                "Has the repair covenant been amended?",
              ]}
              question="Has the repair covenant been amended since the original lease?"
              answer="Yes. Amendment 2, dated 2019, varies clause 8.2 so that the landlord retains responsibility for the shopfront and glazing."
              source="Amendment 2, p.4"
            />
          ),
        },
        {
          icon: ShieldCheck,
          label: "Verify",
          title: "Open the source before acting on it",
          body: "Every answer links to the exact document and page it came from. Move from the structured response to the original wording in one step, inside the Single Asset View.",
          mockup: (
            <VerifyMockup
              url="Leasedrop/assets/kingsway-retail/source"
              docLabel="Amendment 2 · Page 4 of 9"
              before="…clause 8.2 of the Lease shall be varied such that"
              highlight="the Landlord shall be responsible for the repair of the shopfront and glazing"
              after="for the remainder of the Term…"
              source="Amendment 2, p.4"
              pageLabel="Page [4] of 9"
            />
          ),
        },
      ]}
      outcomeTitle="What changes when every asset has a complete documentary record."
      outcomes={[
        {
          title: "One place for everything the asset says",
          body: "Leases, surveys, licences and notices are no longer spread across shared drives and individual folders. They are connected, structured and accessible inside the Single Asset View.",
        },
        {
          title: "A record that grows with the asset",
          body: "Every new document adds to what is already known about the property. The asset record becomes more complete over time, not more difficult to manage.",
        },
        {
          title: "Accessible to the whole team",
          body: "The documentary position behind an asset is available to every authorised team member, not just the person who last opened the folder.",
        },
      ]}
      scenarioTitle="What asset document review looks like in use."
      scenario="An asset manager takes on responsibility for a property mid-portfolio. The documentary record spans twelve years and is spread across three shared drives."
      without={[
        "Spend several days locating and reviewing documents across multiple drives",
        "Build a personal summary of the asset's position from notes",
        "Discover that an amendment modifying the repair covenant is stored separately from the lease",
        "Reconstruct the current position from a combination of documents and inherited notes",
        "Begin managing the asset with an incomplete picture of its documentary history",
      ]}
      withLeasedrop={[
        "Upload documents from all three shared drives into the Single Asset View",
        "Leasedrop connects leases, amendments, licences and surveys automatically",
        "Ask questions about the asset's current obligations, rights and key dates",
        "Review the original wording behind each answer before acting on it",
        "Begin managing the asset with the full documentary position already structured",
      ]}
      outcomeLine="The asset manager reaches full working knowledge of the property in hours rather than days, and the record stays available to the next person who takes responsibility for it."
      related={[
        {
          label: "Asset Management Teams",
          to: "/solutions/asset-managers",
          icon: Building2,
          image: skylineAsset.url,
          blurb:
            "Build a Single Asset View for every property in your portfolio. Answer everyday asset questions without depending on repeated document searches or individual knowledge.",
        },
        {
          label: "Property Managers",
          to: "/solutions/property-managers",
          icon: KeyRound,
          image: archiveAsset.url,
          blurb:
            "Keep the full documentary record behind every managed asset accessible to the whole team. No more reconstructing the position from scratch when a question comes in.",
        },
        {
          label: "Investment & Portfolio Managers",
          to: "/solutions/investment-managers",
          icon: LineChart,
          image: propertyLeaseAsset.url,
          blurb:
            "Compare the documentary position across assets from a structured record, not from summaries prepared by different people at different times.",
        },
      ]}
      ctaTitle="Build the documentary record behind your assets."
      ctaBody="Start with a set of properties and see what the Single Asset View looks like when every document is read together."
    />
  );
}
