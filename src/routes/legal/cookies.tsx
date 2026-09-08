import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const Route = createFileRoute("/legal/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Leasedrop" },
      { name: "description", content: "How Leasedrop uses cookies. Read our cookie policy to understand what cookies we set, why we use them and how you can manage your preferences." },
      { property: "og:title", content: "Cookie Policy | Leasedrop" },
      { property: "og:description", content: "How Leasedrop uses cookies. Read our cookie policy to understand what cookies we set, why we use them and how you can manage your preferences." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asset-intel-source.lovable.app/legal/cookies" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://asset-intel-source.lovable.app/legal/cookies" }],
  }),
  component: Page,
});

const sections: LegalSection[] = [
  {
    heading: "1. What Are Cookies",
    blocks: [
      {
        type: "p",
        text: "Cookies are small text files stored on your device when you visit a website or use a web application. They allow the platform to recognise your device, remember your preferences and keep your session secure.",
      },
    ],
  },
  {
    heading: "2. How We Use Cookies",
    blocks: [
      {
        type: "p",
        text: "We use cookies and similar technologies to improve your experience on our platform, analyse usage and personalise content. The cookies we use fall into the following categories:",
      },
      {
        type: "bullets",
        items: [
          <><strong className="font-medium text-foreground">Essential cookies</strong> - required for the platform to function, including authentication, session management and security. The platform will not work without these.</>,
          <><strong className="font-medium text-foreground">Analytics cookies</strong> - help us understand how our services are used, which pages are visited and how the platform performs, so we can improve it.</>,
          <><strong className="font-medium text-foreground">Preference cookies</strong> - remember your settings and choices so the platform behaves the way you expect between visits.</>,
        ],
      },
    ],
  },
  {
    heading: "3. Managing Cookies",
    blocks: [
      {
        type: "p",
        text: "You can manage or disable cookies through your browser settings at any time. Most browsers allow you to block or delete cookies, or to alert you before a cookie is stored. Please note that disabling essential cookies may affect certain features of the platform, including the ability to sign in and use the workspace.",
      },
    ],
  },
  {
    heading: "4. Changes to This Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Cookie Policy from time to time to reflect changes in the technologies we use or legal requirements. Any significant changes will be notified through the platform.",
      },
    ],
  },
  {
    heading: "5. Contact",
    blocks: [
      {
        type: "p",
        text: (
          <>
            If you have any questions about our use of cookies, please contact us at{" "}
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
      title="Cookie Policy"
      lastUpdated="12 September 2025"
      intro={
        <p>
          This Cookie Policy explains how Leasedrop uses cookies and similar technologies on our platform, and the
          choices you have to manage them.
        </p>
      }
      sections={sections}
    />
  );
}
