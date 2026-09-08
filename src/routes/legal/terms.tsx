import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Leasedrop" },
      { name: "description", content: "Read the Leasedrop terms of service. Everything you need to know about accessing and using the platform, your obligations and what you can expect from us." },
      { property: "og:title", content: "Terms of Service | Leasedrop" },
      { property: "og:description", content: "Read the Leasedrop terms of service. Everything you need to know about accessing and using the platform, your obligations and what you can expect from us." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/legal/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/legal/terms" }],
  }),
  component: Page,
});

const sections: LegalSection[] = [
  {
    heading: "1. Licence and Access",
    blocks: [
      {
        type: "clauses",
        items: [
          {
            id: "1.1",
            text: "We grant you a non-exclusive, non-transferable licence to access and use the Software during your subscription, subject to these Terms.",
          },
          {
            id: "1.2",
            text: "The licence is for business purposes only and may not be used for resale, unlawful activity, or development of competing services.",
          },
          {
            id: "1.3",
            text: "Authorised Users:",
            sub: [
              "You may allow only the number of users covered by your subscription to access the Software.",
              "Each Authorised User must use their own credentials. Sharing accounts is not permitted.",
              "You are responsible for all use of the Software by Authorised Users.",
            ],
          },
          {
            id: "1.4",
            text: "Users who sign up through the pricing page or the landing page login modal may access the Free Plan without providing credit card details. Paid plans require valid payment information at the point of upgrade or purchase.",
          },
        ],
      },
    ],
  },
  {
    heading: "2. Subscription and Renewal",
    blocks: [
      {
        type: "clauses",
        items: [
          {
            id: "2.1",
            text: "Subscriptions run on a monthly or annual recurring billing cycle. Renewal occurs on the same calendar date each month or year based on the original purchase date unless changed due to an upgrade under clause 9.5.",
          },
          {
            id: "2.2",
            text: "Free Plan users do not need to enter credit card information. Free Plan access continues unless upgraded or restricted due to quota limits.",
          },
          {
            id: "2.3",
            text: "When a user reaches their quota limit, the system will restrict further processing until they upgrade or purchase a paid plan. The user will still be able to access, view, download and delete previously uploaded files.",
          },
          {
            id: "2.4",
            text: "Unless expressly stated otherwise in clauses 2.5 or 9.6, unused quota does not carry forward into subsequent billing cycles or subscription periods.",
          },
          {
            id: "2.5",
            text: "If a user upgrades before their current plan expires:",
            sub: [
              "Their remaining quota is carried forward.",
              "The billing date resets to the upgrade date.",
              "A new quota is issued according to the upgraded plan.",
            ],
          },
          { id: "2.6", text: "We do not provide usage alerts or expiration reminders." },
        ],
      },
    ],
  },
  {
    heading: "3. Restrictions on Use",
    blocks: [
      {
        type: "clauses",
        items: [
          {
            id: "3.1",
            text: "You must not (and must ensure Authorised Users do not):",
            sub: [
              "Copy, modify, decompile, reverse engineer, or create derivative works of the Software except where permitted by law.",
              "Access the Software to build or train competing AI or software products.",
              "Upload or transmit unlawful, offensive, discriminatory, or harmful material.",
              "Transfer, lease, or sublicense your access rights to any third party.",
            ],
          },
          {
            id: "3.2",
            text: "'Authorised User' means any individual within the organisation who is permitted to access and use the Software, provided that the total number of such individuals does not exceed the number of users licensed under this Agreement.",
          },
          { id: "3.3", text: "We reserve the right to suspend or terminate accounts that breach this clause." },
          {
            id: "3.4",
            text: "We may implement validation measures to prevent processing where quota is insufficient. Quota deductions occur only after validation confirms available quota.",
          },
        ],
      },
    ],
  },
  {
    heading: "4. Data and Content",
    blocks: [
      {
        type: "clauses",
        items: [
          { id: "4.1", text: 'You retain ownership of all documents, data, and content you upload ("Customer Data").' },
          {
            id: "4.2",
            text: "You grant us a licence to use, store, process, and analyse Customer Data as necessary to provide and improve the Software. This may include use of aggregated or de-identified data for research, diagnostics, and product enhancement.",
          },
          {
            id: "4.3",
            text: "You confirm that you have all necessary rights and consents to provide Customer Data and that it complies with law.",
          },
          {
            id: "4.4",
            text: (
              <>
                We encourage you not to upload sensitive personal data unless strictly necessary. Where we process
                personal data, we do so in compliance with the UK GDPR and our{" "}
                <Link to="/legal/privacy" className="text-primary underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    heading: "5. Intellectual Property",
    blocks: [
      {
        type: "clauses",
        items: [
          {
            id: "5.1",
            text: "All rights in the Software and related intellectual property belong to us or our licensors. Nothing in these Terms transfers ownership to you.",
          },
          { id: "5.2", text: "You are granted only a limited licence to use the Software as set out in clause 1." },
        ],
      },
    ],
  },
  {
    heading: "6. Warranties and Disclaimers",
    blocks: [
      {
        type: "clauses",
        items: [
          { id: "6.1", text: "We warrant that we will provide the Software with reasonable care and skill." },
          {
            id: "6.2",
            text: "We do not warrant that the Software will be error-free, uninterrupted, or meet your specific requirements.",
          },
          {
            id: "6.3",
            text: 'Outputs generated by the Software (including AI-generated outputs) are provided "as is." We do not guarantee their accuracy, completeness, or suitability. You remain responsible for reviewing and relying on such outputs.',
          },
          {
            id: "6.4",
            text: "Except as expressly stated, all other warranties and conditions are excluded to the fullest extent permitted by law.",
          },
        ],
      },
    ],
  },
  {
    heading: "7. Limitation of Liability",
    blocks: [
      {
        type: "clauses",
        items: [
          {
            id: "7.1",
            text: "Nothing in these Terms excludes liability for death, personal injury, fraud, or any liability that cannot legally be excluded.",
          },
          {
            id: "7.2",
            text: "Subject to clause 7.1, our aggregate liability for all claims arising under these Terms shall not exceed the total fees paid by you in the twelve (12) months preceding the claim.",
          },
          {
            id: "7.3",
            text: "We shall not be liable for:",
            sub: [
              "Indirect or consequential loss.",
              "Loss of profits, revenues, data, or business opportunities.",
              "Decisions made based on AI outputs.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "8. Term and Termination",
    blocks: [
      {
        type: "clauses",
        items: [
          { id: "8.1", text: "Your subscription continues until cancelled or expired." },
          {
            id: "8.2",
            text: "You may cancel your subscription at any time. The cancellation becomes effective at the end of the current billing period. Until that date:",
            sub: ["Your quota is preserved.", "You may continue using the Software under your existing plan."],
          },
          {
            id: "8.3",
            text: "If your plan expires due to non-renewal or failed billing:",
            sub: [
              "Your account remains open on a restricted basis.",
              "You cannot upload or process new files.",
              "You may still view, download, and delete existing files.",
            ],
          },
          {
            id: "8.4",
            text: "If your account is disabled (not deleted), your quota remains tied to the billing cycle and expires at the end of that cycle. When the account is re-enabled after the cycle has ended, quota does not carry forward and is reset under any new subscription purchased.",
          },
          {
            id: "8.5",
            text: "All unused quota expires at the end of each billing cycle unless an upgrade is purchased before expiration.",
          },
          { id: "8.6", text: "We may terminate or suspend access immediately if you breach these terms." },
        ],
      },
    ],
  },
  {
    heading: "9. Fees, Payment, Upgrades, Downgrades and Refunds",
    blocks: [
      {
        type: "clauses",
        items: [
          { id: "9.1", text: "Fees are payable in advance through our payment provider." },
          { id: "9.2", text: "Paid plans renew automatically unless cancelled." },
          {
            id: "9.3",
            text: "Upgrades:",
            sub: [
              "Users may upgrade at any time, even if quota remains.",
              "Remaining quota is carried forward into the upgraded plan.",
              "The billing cycle resets to the date of upgrade.",
              "The new monthly/annual period starts immediately.",
            ],
          },
          {
            id: "9.4",
            text: "Downgrades take effect at the next billing cycle. No refunds are issued for downgrades.",
          },
          {
            id: "9.5",
            text: "Migration between monthly to yearly:",
            sub: [
              "Monthly to yearly migrations are permitted, but only starting on the next billing date.",
              "Yearly to monthly migrations are not permitted.",
            ],
          },
          {
            id: "9.6",
            text: "Refund Policy:",
            sub: [
              "Annual Plan: refunds permitted only within 14 days, provided no usage has occurred. If the Software has been used even once, no refund is issued.",
              "Monthly Plan: refunds for the current month only if no usage has occurred. If the Software has been used even once, no refund is issued.",
              "Stripe Fees: refunds are issued in full. We will absorb Stripe's processing fees.",
            ],
          },
          {
            id: "9.7",
            text: "Effect of Refund: if a refund is issued:",
            sub: [
              "Remaining quota resets to 0.",
              "The account remains open in restricted mode (view/download/delete only) until the user upgrades again.",
            ],
          },
          { id: "9.8", text: "Access may be suspended if payment is overdue." },
        ],
      },
    ],
  },
  {
    heading: "10. Governing Law",
    blocks: [
      {
        type: "p",
        text: "These Terms shall be governed by the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction over any disputes.",
      },
    ],
  },
  {
    heading: "11. General",
    blocks: [
      {
        type: "clauses",
        items: [
          { id: "11.1", text: "These Terms are the entire agreement between us and supersede prior discussions." },
          {
            id: "11.2",
            text: "We may transfer our rights and obligations under these Terms to another entity, provided it does not adversely affect your rights.",
          },
          { id: "11.3", text: "A failure to enforce rights does not constitute a waiver." },
          {
            id: "11.4",
            text: "No third party has rights to enforce these Terms under the Contracts (Rights of Third Parties) Act 1999.",
          },
        ],
      },
      {
        type: "p",
        text: (
          <>
            These Terms are complemented by our{" "}
            <Link to="/legal/service-level-terms" className="text-primary underline underline-offset-4">
              Service Level Terms
            </Link>
            , which set out our availability commitment and service credit process.
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
      title="Terms of Service"
      intro={
        <>
          <p className="font-medium text-foreground">Please read these terms carefully before using our software.</p>
          <p>
            These Terms of Subscription ("Terms") form a legal agreement between you, the subscriber (whether an
            individual or the company you represent) ("Subscriber" or "you"), and Leasedrop Limited, a company
            incorporated in England and Wales under company number 14630634, with its registered office at Unit 1
            Bramber Court, 2 Bramber Road, London W14 9PW ("we", "our", or "us").
          </p>
          <p>
            By registering for or using our software-as-a-service platform (the "Software"), you agree to these Terms.
            If you do not agree, you must not use the Software. For queries, please contact us at{" "}
            <a className="text-primary underline underline-offset-4" href="mailto:info@leasedrop.ai">
              info@leasedrop.ai
            </a>
            .
          </p>
        </>
      }
      sections={sections}
    />
  );
}
