import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security & Compliance | Leasedrop" },
      { name: "description", content: "Leasedrop security and compliance. ISO 27001, Cyber Essentials Plus, UK GDPR, audit trail, access controls and AI governance for commercial real estate teams." },
      { property: "og:title", content: "Security & Compliance | Leasedrop" },
      { property: "og:description", content: "Leasedrop security and compliance. ISO 27001, Cyber Essentials Plus, UK GDPR, audit trail, access controls and AI governance for commercial real estate teams." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/security" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/security" }],
  }),
  component: Page,
});

const sections: LegalSection[] = [
  {
    heading: "Hosting & Infrastructure Security",
    blocks: [
      { type: "p", text: "Leasedrop is hosted on Microsoft Azure, a cloud platform compliant with ISO 27001." },
      { type: "p", text: <span className="font-medium text-foreground">Core services:</span> },
      {
        type: "bullets",
        items: [
          "Azure VM Services (hosting)",
          "Azure Blob Storage (document and data storage)",
          "Azure Entra ID",
          "Azure SendGrid",
          "Cloudflare DNS",
        ],
      },
      { type: "p", text: <span className="font-medium text-foreground">Security controls:</span> },
      {
        type: "bullets",
        items: [
          "All data in transit is secured via TLS 1.2/1.3 (Cloudflare).",
          "All data at rest is encrypted using AES-256 encryption.",
          "Cloudflare DDoS protection is enabled.",
        ],
      },
    ],
  },
  {
    heading: "Data Lifecycle & Protection",
    blocks: [
      { type: "p", text: <span className="font-medium text-foreground">Document upload and processing:</span> },
      {
        type: "bullets",
        items: [
          "Documents are stored temporarily in Azure Blob Storage and auto-deleted after processing or after a defined retention window.",
        ],
      },
      { type: "p", text: <span className="font-medium text-foreground">Access restrictions:</span> },
      {
        type: "bullets",
        items: [
          "Strict subscription-based access control ensures documents are accessible only to authenticated owners.",
          "Access to production systems is restricted.",
        ],
      },
      { type: "p", text: <span className="font-medium text-foreground">Anonymization and minimization:</span> },
      { type: "bullets", items: ["All extracted data is stored securely."] },
    ],
  },
  {
    heading: "User Authentication & Authorization",
    blocks: [
      {
        type: "p",
        text: "Authentication is handled through OAuth 2.0 with secure token management, maintained by Azure Entra ID.",
      },
      { type: "p", text: <span className="font-medium text-foreground">Role categories:</span> },
      {
        type: "bullets",
        items: [
          "Free Users (anonymous and logged in) can view clause results but cannot copy or download.",
          "Paid Users can view, copy, and download clause texts.",
        ],
      },
      { type: "p", text: <span className="font-medium text-foreground">Front-end protections for free users:</span> },
      {
        type: "bullets",
        items: [
          "Read-only clause rendering with copy/paste prevention.",
          "Watermarking.",
          "Disabled right-click and developer tools through JavaScript-based hardening.",
        ],
      },
    ],
  },
  {
    heading: "AI & OCR Processing Security",
    blocks: [
      {
        type: "bullets",
        items: [
          "The OCR engine is deployed in an isolated Azure VM with no outbound internet access.",
          "All AI API communication uses TLS-encrypted channels.",
          "API keys and credentials are managed through environment properties.",
          "Clause matching prompts do not transmit PII and are structured to comply with ISO 27001 data minimization principles.",
        ],
      },
    ],
  },
  {
    heading: "Logging",
    blocks: [
      {
        type: "bullets",
        items: [
          "Logs are immutable.",
          "All incidents are logged, reviewed, and resolved with Root Cause Analysis (RCA) and corrective actions.",
        ],
      },
    ],
  },
  {
    heading: "Compliance & Certification",
    blocks: [
      {
        type: "p",
        text: "Leasedrop is ISO/IEC 27001:2022 certified. Our Information Security Management System (ISMS) covers application development, cloud operations, and customer data handling.",
      },
    ],
  },
  {
    heading: "Secure Email Communications",
    blocks: [
      {
        type: "p",
        text: "One-Time Passwords (OTP) are used for secure user verification during sign-up and sensitive actions, alongside welcome and onboarding emails.",
      },
      { type: "p", text: <span className="font-medium text-foreground">Security measures implemented:</span> },
      {
        type: "bullets",
        items: [
          "TLS Encryption: emails are transmitted over TLS to ensure secure delivery between our server and the user's email provider.",
          "Expiry Controls: OTPs are time-limited (for example, valid for 5 minutes) and single-use only.",
          "Data Minimization: emails contain no sensitive data beyond what is necessary.",
        ],
      },
      {
        type: "p",
        text: "Email systems form part of our ISMS communication security controls under ISO 27001 (Annex A.13).",
      },
    ],
  },
];

function Page() {
  return (
    <LegalPage
      eyebrow="Trust"
      title="Security & Compliance"
      intro={
        <p>
          This page outlines the information security and data protection practices implemented in the Leasedrop
          platform. The application allows users to upload lease agreements, processes the content via OCR, and uses AI
          to extract relevant clauses, all within a controlled and audited environment.
        </p>
      }
      sections={sections}
    />
  );
}
