import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/portfolio-intelligence")({
  head: () => ({
    meta: [
      { title: "Portfolio Intelligence | Leasedrop" },
      { name: "description", content: "Ask One Question, See the Whole Portfolio - Leasedrop commercial real estate asset intelligence." },
      { property: "og:title", content: "Portfolio Intelligence | Leasedrop" },
      { property: "og:description", content: "Ask One Question, See the Whole Portfolio - Leasedrop commercial real estate asset intelligence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return <PlaceholderPage eyebrow="Portfolio Intelligence" title={"Ask One Question, See the Whole Portfolio"} />;
}
