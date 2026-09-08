import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/request-a-demo")({
  head: () => ({
    meta: [
      { title: "Request a Demo | Leasedrop" },
      { name: "description", content: "Request a Demo - Leasedrop commercial real estate asset intelligence." },
      { property: "og:title", content: "Request a Demo | Leasedrop" },
      { property: "og:description", content: "Request a Demo - Leasedrop commercial real estate asset intelligence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return <PlaceholderPage eyebrow="Get Started" title={"Request a Demo"} />;
}
