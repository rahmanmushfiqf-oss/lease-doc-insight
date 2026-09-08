import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const Route = createFileRoute("/legal/service-level-terms")({
  head: () => ({
    meta: [
      { title: "Service Level Terms | Leasedrop" },
      { name: "description", content: "Read the Leasedrop service level terms to understand our uptime commitments, support availability, incident response and scheduled maintenance policies." },
      { property: "og:title", content: "Service Level Terms | Leasedrop" },
      { property: "og:description", content: "Read the Leasedrop service level terms to understand our uptime commitments, support availability, incident response and scheduled maintenance policies." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/legal/service-level-terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/legal/service-level-terms" }],
  }),
  component: Page,
});

const sections: LegalSection[] = [
  {
    heading: "A. Definitions",
    blocks: [
      {
        type: "p",
        text: (
          <>
            <strong className="font-medium text-foreground">Scheduled Maintenance</strong> means planned periods during
            which Leasedrop may carry out upgrades, updates, or other maintenance activities that could affect the
            availability of the Services. Wherever reasonably possible, Scheduled Maintenance will be performed outside
            of normal business hours and will not exceed four (4) hours in duration per occurrence.
          </>
        ),
      },
      {
        type: "p",
        text: (
          <>
            <strong className="font-medium text-foreground">Excused Downtime</strong> refers to the following
            circumstances that shall not be considered a failure of availability:
          </>
        ),
      },
      {
        type: "bullets",
        items: [
          "Downtime during Scheduled Maintenance.",
          "Outages caused by the Customer's systems, networks, or misuse of the Services.",
          "Failures related to third-party software, hardware, or integrations not managed by Leasedrop.",
          "Suspension of Services in line with the Agreement (including non-payment).",
          "Interruptions or failures outside of Leasedrop's reasonable control, including but not limited to force majeure events, general internet disruptions, or issues with the Customer's internet service provider.",
        ],
      },
      {
        type: "p",
        text: (
          <>
            <strong className="font-medium text-foreground">Service Unavailability</strong> means that the core
            functionality of the Services is not accessible to the Customer due to reasons other than Excused Downtime.
          </>
        ),
      },
    ],
  },
  {
    heading: "B. Service Commitment",
    blocks: [
      {
        type: "p",
        text: "Leasedrop will use commercially reasonable efforts to ensure the Services are operational and accessible at least 99.5% of the time each calendar month, excluding Excused Downtime.",
      },
    ],
  },
  {
    heading: "C. Remedies and Service Credits",
    blocks: [
      {
        type: "p",
        text: (
          <>
            <strong className="font-medium text-foreground">Service Credits.</strong> If Service Unavailability in any
            calendar month exceeds 0.5%, the Customer will be eligible to receive a service credit equal to 5% of the
            monthly subscription fees for that month.
          </>
        ),
      },
      {
        type: "p",
        text: (
          <>
            <strong className="font-medium text-foreground">Process.</strong> To receive a Service Credit, the Customer
            must submit a written request to Leasedrop's support team within five (5) business days of the incident.
            Requests must include the dates and times of Service Unavailability.
          </>
        ),
      },
      { type: "p", text: <strong className="font-medium text-foreground">Limitations.</strong> },
      {
        type: "bullets",
        items: [
          "Service Credits will be applied to the next applicable invoice and cannot be exchanged for cash.",
          "Credits are capped at one (1) month's subscription fees in any twelve (12) month period.",
          "Service Credits represent the Customer's sole and exclusive remedy for any Service Unavailability.",
        ],
      },
    ],
  },
];

function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Service Level Terms"
      intro={
        <p>
          These Service Level Terms set out Leasedrop's availability commitment for the platform, and the remedies
          available to customers if that commitment is not met.
        </p>
      }
      sections={sections}
    />
  );
}
