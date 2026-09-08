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

export const Route = createFileRoute("/use-cases/critical-dates")({
  head: () => ({
    meta: [
      { title: "Critical Dates | Surfaced Before They Become Urgent | Leasedrop" },
      {
        name: "description",
        content:
          "Leasedrop identifies break options, rent reviews, lease expiries and notice deadlines across every document in the asset record and structures them into the Single Asset View.",
      },
      { property: "og:title", content: "Critical Dates | Leasedrop" },
      {
        property: "og:description",
        content:
          "Every critical date, surfaced before it becomes urgent, with the conditions and the source clause attached.",
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
      title="Every critical date, surfaced before it becomes urgent."
      subtitle="Leasedrop identifies break options, rent review dates, lease expiries and notice deadlines across every document in the asset record."
      heroMockup={
        <StructuredMockup
          hero
          url="Leasedrop/assets/portfolio/critical-dates"
          title="Portfolio · Critical Dates"
          rows={[
            {
              k: "Northgate House · Break option",
              v: "14 Mar 2027 · Notice: 6 months",
              s: "Clause 9.1 · p.18",
            },
            { k: "Unit 4 Meridian Park · Lease expiry", v: "02 Aug 2027", s: "Clause 2.1 · p.3" },
            { k: "Kingsway Retail · Rent review", v: "30 Nov 2026", s: "Clause 5.2 · p.9" },
          ]}
          note="3 critical dates in the next 18 months"
        />
      }
      howTitle="From buried dates to a structured timeline across every asset in one flow."
      steps={[
        {
          icon: FileUp,
          label: "Upload",
          title: "Bring the documents that contain critical dates together",
          body: "Upload leases, amendments, licences and notices. Leasedrop reads every document that creates, modifies or triggers a critical date, including those buried in ancillary documents rather than the head lease, and adds them to the Single Asset View.",
          mockup: (
            <DocListMockup
              url="Leasedrop/assets/northgate-house/documents"
              title="Northgate House"
              subtitle="Single Asset View"
              rows={[
                { name: "Head Lease", meta: "2018", status: "Processed" },
                { name: "Amendment 1", meta: "2021", status: "Processed" },
                { name: "Side Letter", meta: "2022", status: "Processed" },
                { name: "Notice of Rent Review", meta: "2024", status: "AI processing", pending: true },
              ]}
              note="Dates created in side letters are read alongside the head lease."
            />
          ),
        },
        {
          icon: ScanLine,
          label: "Extract",
          title: "Identify every date and the conditions attached to it",
          body: "Lease expiry dates, break option dates, rent review dates, notice periods, option exercise windows and other time-sensitive provisions are identified and structured across every document in the Single Asset View.",
          mockup: (
            <StructuredMockup
              url="Leasedrop/assets/northgate-house/dates"
              title="Structured timeline"
              rows={[
                { k: "Break option", v: "14 Mar 2027", s: "Clause 9.1 · p.18" },
                { k: "Break notice", v: "6 months written notice", s: "Clause 9.2 · p.18" },
                { k: "Break pre-condition", v: "Rent paid up to date", s: "Clause 9.3 · p.19" },
                { k: "Lease expiry", v: "13 Sep 2033", s: "Clause 2.1 · p.3" },
              ]}
            />
          ),
        },
        {
          icon: MessageSquareText,
          label: "Ask",
          title: "Question the timeline across one asset or the whole portfolio",
          body: "Ask which assets have break options in the next 18 months, when the next rent review falls or what notice a break option requires, and receive answers drawn from the documents themselves.",
          mockup: (
            <AskMockup
              url="Leasedrop/assets/portfolio/ask"
              chips={[
                "Which assets have break options in 18 months?",
                "When is the next rent review?",
                "What notice does the break require?",
              ]}
              question="Which assets have break options in the next 18 months?"
              answer="One asset. Northgate House has a tenant break on 14 March 2027, requiring six months written notice and rent paid up to date."
              source="Clause 9.1, p.18 and Clause 9.3, p.19"
            />
          ),
        },
        {
          icon: ShieldCheck,
          label: "Verify",
          title: "Confirm every date against the original wording",
          body: "Every date and condition links to the exact clause and page behind it. Move from the structured timeline to the original passage before acting on any date or deadline.",
          mockup: (
            <VerifyMockup
              url="Leasedrop/assets/northgate-house/source"
              docLabel="Head Lease · Page 18 of 34"
              before="…the Tenant may determine this Lease on the Break Date by giving"
              highlight="not less than six months prior written notice to the Landlord"
              after="…"
              source="Clause 9.2, p.18"
              pageLabel="Page [18] of 34"
            />
          ),
        },
      ]}
      outcomeTitle="What changes when critical dates are always visible and always verified."
      outcomes={[
        {
          title: "Nothing missed because it was in a side letter",
          body: "Dates created or modified by amendments, licences and ancillary documents are surfaced alongside those in the head lease inside the Single Asset View. The timeline is built from the full record.",
        },
        {
          title: "The conditions travel with the date",
          body: "A break option date without its notice requirements is incomplete information. Leasedrop surfaces what each date requires alongside when it falls.",
        },
        {
          title: "The source is always one step away",
          body: "Every date is linked to the clause and page it came from. Your team can verify the date against the original wording before acting on it.",
        },
      ]}
      scenarioTitle="What critical dates intelligence looks like in use."
      scenario="An asset manager is reviewing upcoming lease events across a portfolio of 40 assets. Several leases have been amended and one break option is subject to pre-conditions."
      without={[
        "Open each lease individually to check for upcoming events",
        "Cross-reference amendments to identify modifications to dates or notice periods",
        "Note break option pre-conditions separately and track them manually",
        "Build a calendar from notes compiled across 40 sets of documents",
        "Return to individual documents when a date or condition needs to be verified",
      ]}
      withLeasedrop={[
        "Ask which assets have critical dates in the next 18 months from the portfolio view",
        "Leasedrop surfaces dates across all 40 assets with notice requirements and pre-conditions attached",
        "Review the original clause behind each date before adding it to the calendar",
        "Identify break option pre-conditions and the steps required to preserve them",
        "Maintain the calendar from one record that updates as new documents arrive",
      ]}
      outcomeLine="The asset manager has a verified, source-backed view of upcoming events across the portfolio, built in the time it used to take to review a handful of individual leases."
      related={[
        {
          label: "Asset Management Teams",
          to: "/solutions/asset-managers",
          icon: Building2,
          image: skylineAsset.url,
          blurb:
            "Keep break options, rent reviews, lease expiries and notice deadlines visible across every asset you manage, from the Single Asset View, with every date traceable to its source.",
        },
        {
          label: "Property Managers",
          to: "/solutions/property-managers",
          icon: KeyRound,
          image: archiveAsset.url,
          blurb:
            "Stay ahead of lease events across every managed asset. Critical dates surfaced from the full documentary record, not just the primary lease.",
        },
        {
          label: "Investment & Portfolio Managers",
          to: "/solutions/investment-managers",
          icon: LineChart,
          image: propertyLeaseAsset.url,
          blurb:
            "Surface the critical dates that affect hold period assumptions, income forecasts and exit timing, across every asset in the portfolio, before decisions are made.",
        },
      ]}
      ctaTitle="Surface the critical dates across your portfolio."
      ctaBody="Bring in your lease documents and see how Leasedrop structures the dates and conditions your team needs to act on into a Single Asset View."
    />
  );
}

