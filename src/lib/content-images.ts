import altCompliance from "@/assets/alt-compliance.webp";
import altDocumentsDesk from "@/assets/alt-documents-desk.webp";
import altHeroArchitecture from "@/assets/alt-hero-architecture.webp";
import altPortfolioSkyline from "@/assets/alt-portfolio-skyline.webp";
import altReception from "@/assets/alt-reception.webp";
import audienceAtrium from "@/assets/audience-atrium.webp";
import heroFacade from "@/assets/hero-facade.webp";
import portfolioIntelligence from "@/assets/portfolio-intelligence.webp";

const pool = [
  { src: altPortfolioSkyline, alt: "City skyline of commercial office towers at dusk" },
  { src: altDocumentsDesk, alt: "Property documents laid out on a desk" },
  { src: portfolioIntelligence, alt: "Office building elevation seen from street level" },
  { src: altCompliance, alt: "Detail of a modern office interior" },
  { src: audienceAtrium, alt: "Atrium of a commercial building" },
  { src: altHeroArchitecture, alt: "Architectural detail of a glass facade" },
  { src: heroFacade, alt: "Commercial building facade in daylight" },
  { src: altReception, alt: "Reception area of a commercial property" },
];

const hash = (id: string) =>
  Math.abs([...id].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) | 0, 7));

export function contentImage(id: string) {
  return pool[hash(id) % pool.length]!;
}
