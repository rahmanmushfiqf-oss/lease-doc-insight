import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Leasedrop" },
      { name: "description", content: "How Leasedrop collects, stores and uses your data. Read our privacy policy to understand how we protect your information and your rights under UK GDPR." },
      { property: "og:title", content: "Privacy Policy | Leasedrop" },
      { property: "og:description", content: "How Leasedrop collects, stores and uses your data. Read our privacy policy to understand how we protect your information and your rights under UK GDPR." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/legal/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/legal/privacy" }],
  }),
  component: Page,
});

const sections: LegalSection[] = [
  {
    heading: "1. Who We Are",
    blocks: [
      {
        type: "p",
        text: (
          <>
            Leasedrop is a Software-as-a-Service ("SaaS") company, incorporated and registered in England with company
            number 14630634 and registered office at Unit 1, Bramber Court, 2 Bramber Road, London, W14 9NF ("we", "us",
            or "our"). We act as the data controller for the personal data you provide to us or upload to our platform.
          </>
        ),
      },
      {
        type: "p",
        text: (
          <>
            If you have any questions about this Privacy Policy or how we handle your data, you can contact us at{" "}
            <a className="text-primary underline underline-offset-4" href="mailto:privacy@leasedrop.ai">
              privacy@leasedrop.ai
            </a>
            .
          </>
        ),
      },
    ],
  },
  {
    heading: "2. What Data We Collect",
    blocks: [
      { type: "p", text: "We collect and process the following categories of personal data:" },
      { type: "p", text: <span className="font-medium text-foreground">a. Account and User Data</span> },
      {
        type: "bullets",
        items: ["Name, email address, job title, company, and login credentials", "Billing and payment information"],
      },
      { type: "p", text: <span className="font-medium text-foreground">b. Uploaded Content (Lease Data)</span> },
      { type: "p", text: "Leases and other documents uploaded to Leasedrop, which may include:" },
      {
        type: "bullets",
        items: [
          "Names of individuals (e.g. landlords, tenants)",
          "Contact information",
          "Signatures",
          "Financial and property-related details",
          "Any other personal data included in lease agreements",
        ],
      },
      { type: "p", text: <span className="font-medium text-foreground">c. Usage Data</span> },
      { type: "bullets", items: ["IP address, browser type, pages visited, time spent on pages", "Log files and error reports"] },
      { type: "p", text: <span className="font-medium text-foreground">d. Communication Data</span> },
      { type: "bullets", items: ["Feedback, support queries, and survey responses"] },
    ],
  },
  {
    heading: "3. How We Use Your Data",
    blocks: [
      { type: "p", text: "We process your personal data for the following purposes:" },
      {
        type: "bullets",
        items: [
          "To provide access to and operate the Leasedrop platform",
          "To respond to support requests and user queries",
          "To improve our AI models and software functionality",
          "To analyse usage and performance",
          "To comply with legal obligations",
          "For marketing (if you have given consent)",
        ],
      },
    ],
  },
  {
    heading: "4. Legal Basis for Processing",
    blocks: [
      { type: "p", text: "We rely on the following lawful bases under UK GDPR:" },
      {
        type: "bullets",
        items: [
          <><strong className="font-medium text-foreground">Performance of a contract</strong> - to provide you access to the Leasedrop platform</>,
          <><strong className="font-medium text-foreground">Consent</strong> - for optional use of your data in AI training or marketing</>,
          <><strong className="font-medium text-foreground">Legitimate interests</strong> - to improve platform performance and AI accuracy</>,
          <><strong className="font-medium text-foreground">Legal obligation</strong> - to comply with applicable law or requests from authorities</>,
        ],
      },
    ],
  },
  {
    heading: "5. Sharing Your Data",
    blocks: [
      { type: "p", text: "We do not sell your personal data. We may share your data with:" },
      {
        type: "bullets",
        items: [
          "Cloud hosting providers and data storage services (under strict data protection agreements)",
          "Legal or regulatory authorities if required",
          "Our professional advisers (e.g. lawyers, accountants)",
        ],
      },
      {
        type: "p",
        text: "All third-party processors are GDPR-compliant and under contractual obligations to keep your data secure.",
      },
    ],
  },
  {
    heading: "6. Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain your data only for as long as necessary to provide our services and to meet legal or regulatory requirements:",
      },
      {
        type: "bullets",
        items: [
          "While you have an active account, we keep the personal data needed to operate the platform.",
          "We may retain only the limited records we are legally required to keep (for example, tax, billing, or dispute resolution information) for up to six (6) years.",
          "You may upload leases and related files to the platform and choose how long to keep them.",
          "You can delete individual documents at any time through your account settings.",
          "You can also elect to retain them for as long as you wish while your account remains active.",
          "Unless you specify otherwise, we will automatically remove uploaded documents after ninety (90) days.",
          "If you delete a document, it will be removed from our active systems immediately, subject only to any legal obligations to keep a minimal backup for security or compliance purposes.",
        ],
      },
      {
        type: "p",
        text: (
          <>
            <strong className="font-medium text-foreground">Account Deletion:</strong> You may delete your Leasedrop
            account at any time by contacting{" "}
            <a className="text-primary underline underline-offset-4" href="mailto:privacy@leasedrop.ai">
              privacy@leasedrop.ai
            </a>{" "}
            or using the account settings. When you request deletion, we will remove your personal data from our active
            systems. However, in line with the retention period described above, we may keep certain minimal records,
            such as financial or compliance information, for up to 6 years where required by law or to defend legal
            claims. After that period, all retained data will be securely destroyed.
          </>
        ),
      },
    ],
  },
  {
    heading: "7. Your Rights",
    blocks: [
      { type: "p", text: "Under UK GDPR, you have rights including:" },
      {
        type: "bullets",
        items: [
          <><strong className="font-medium text-foreground">Access</strong> - to the personal data we hold about you</>,
          <><strong className="font-medium text-foreground">Rectification</strong> - to correct inaccurate data</>,
          <><strong className="font-medium text-foreground">Erasure</strong> - to delete your personal data</>,
          <><strong className="font-medium text-foreground">Restriction</strong> - to limit how we use your data</>,
          <><strong className="font-medium text-foreground">Objection</strong> - to our processing, particularly for direct marketing or profiling</>,
          <><strong className="font-medium text-foreground">Data portability</strong> - to obtain a copy in machine-readable format</>,
        ],
      },
      {
        type: "p",
        text: (
          <>
            You may exercise your rights by contacting us at{" "}
            <a className="text-primary underline underline-offset-4" href="mailto:privacy@leasedrop.ai">
              privacy@leasedrop.ai
            </a>
            . You also have the right to complain to the Information Commissioner's Office (ICO) at{" "}
            <a
              className="text-primary underline underline-offset-4"
              href="https://www.ico.org.uk"
              target="_blank"
              rel="noreferrer"
            >
              www.ico.org.uk
            </a>
            .
          </>
        ),
      },
    ],
  },
  {
    heading: "8. Cookies and Tracking Technologies",
    blocks: [
      {
        type: "p",
        text: (
          <>
            We use cookies and similar technologies to improve your experience on our platform, analyse usage and
            personalise content. Cookies are small text files stored on your device. Some are essential for the platform
            to function, while others are optional and help us understand how our services are used. You can manage or
            disable cookies through your browser settings, though this may affect certain features of the platform. See
            our Cookie Policy for more detail.
          </>
        ),
      },
    ],
  },
  {
    heading: "9. Data Security",
    blocks: [
      {
        type: "p",
        text: "We are committed to protecting your personal data and have implemented strong technical and organisational security measures, including:",
      },
      {
        type: "bullets",
        items: [
          <><strong className="font-medium text-foreground">Hosting & Infrastructure:</strong> We host our platform on Microsoft Azure, which is ISO 27001 certified. All data is encrypted at rest (AES-256) and in transit (TLS 1.2/1.3). Cloudflare provides DDoS protection and secure DNS services.</>,
          <><strong className="font-medium text-foreground">Data Lifecycle:</strong> Uploaded documents are stored securely in Azure Blob Storage and deleted after processing unless retention is required. Access is strictly limited and controlled.</>,
          <><strong className="font-medium text-foreground">Authentication & Access Control:</strong> We use OAuth 2.0 via Azure Entra ID. Free users have limited access while paid users can download and copy data. Access to sensitive functions is restricted and monitored.</>,
          <><strong className="font-medium text-foreground">AI & Processing Security:</strong> Our OCR and AI processing run in isolated environments with no external internet access. Prompts and outputs are structured to minimise exposure of personal data.</>,
          <><strong className="font-medium text-foreground">Logging & Monitoring:</strong> All system and security logs are immutable. Incidents are reviewed with root cause analysis and corrective actions.</>,
          <><strong className="font-medium text-foreground">Compliance:</strong> We are ISO/IEC 27001:2022 certified, covering application development, cloud operations, and customer data handling.</>,
        ],
      },
    ],
  },
  {
    heading: "10. Data Protection Officer (DPO)",
    blocks: [
      {
        type: "p",
        text: (
          <>
            We have appointed a Data Protection Officer. You can contact them directly at{" "}
            <a className="text-primary underline underline-offset-4" href="mailto:shorful@leasedrop.ai">
              shorful@leasedrop.ai
            </a>
            , or by post at Unit 1, Bramber Court, 2 Bramber Road, London, W14 9NF.
          </>
        ),
      },
    ],
  },
  {
    heading: "11. Changes to This Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or through the platform.",
      },
    ],
  },
  {
    heading: "12. Contact",
    blocks: [
      {
        type: "p",
        text: (
          <>
            If you have questions, concerns, or requests related to this policy or your data, please contact the
            Privacy Team at{" "}
            <a className="text-primary underline underline-offset-4" href="mailto:privacy@leasedrop.ai">
              privacy@leasedrop.ai
            </a>
            .
          </>
        ),
      },
    ],
  },
];

function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate="12 September 2025"
      lastUpdated="12 September 2025"
      intro={
        <p>
          Welcome to Leasedrop. We respect your privacy and are committed to protecting your personal data. This
          Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
          AI-powered lease review platform.
        </p>
      }
      sections={sections}
    />
  );
}
