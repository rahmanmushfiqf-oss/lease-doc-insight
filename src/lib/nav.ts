export type NavIcon =
  | "building"
  | "hardHat"
  | "keyRound"
  | "lineChart"
  | "searchCheck"
  | "scale"
  | "fileText"
  | "hammer"
  | "folderSearch"
  | "handshake"
  | "calendarClock"
  | "clipboardCheck"
  | "compass"
  | "newspaper"
  | "bookOpen"
  | "quote"
  | "lifeBuoy"
  | "users"
  | "network"
  | "mail"
  | "briefcase";

export type NavLink = { label: string; to: string; description?: string; icon?: NavIcon };
export type NavGroup = { label: string; to?: string; items?: NavLink[] };

export const solutions: NavLink[] = [
  { label: "Asset Managers", to: "/solutions/asset-managers", description: "Portfolio-wide asset intelligence", icon: "building" },
  { label: "Building Surveyors", to: "/solutions/building-surveyors", description: "Evidence located in minutes", icon: "hardHat" },
  { label: "Property Managers", to: "/solutions/property-managers", description: "Obligations, rights and dates", icon: "keyRound" },
  { label: "Investment Managers", to: "/solutions/investment-managers", description: "Compare assets across the portfolio", icon: "lineChart" },
  { label: "Acquisitions & Due Diligence", to: "/solutions/acquisitions-due-diligence", description: "Review large document packs", icon: "searchCheck" },
  { label: "Legals", to: "/solutions/legals", description: "Clause level source verification", icon: "scale" },
];

export const useCases: NavLink[] = [
  { label: "Lease Intelligence", to: "/use-cases/lease-intelligence", description: "Clauses, terms and lease structure", icon: "fileText" },
  { label: "Dilapidations", to: "/use-cases/dilapidations", description: "Repair and reinstatement evidence", icon: "hammer" },
  { label: "Asset Document Review", to: "/use-cases/asset-document-review", description: "The full documentary record", icon: "folderSearch" },
  { label: "Rights & Obligations", to: "/use-cases/rights-and-obligations", description: "What each party must do", icon: "handshake" },
  { label: "Critical Dates", to: "/use-cases/critical-dates", description: "Breaks, expiries and reviews", icon: "calendarClock" },
  { label: "Due Diligence", to: "/use-cases/due-diligence", description: "Transaction ready answers", icon: "clipboardCheck" },
];

export const resources: NavLink[] = [
  { label: "Asset Intelligence Hub", to: "/asset-intelligence-hub", description: "Research and market thinking", icon: "compass" },
  { label: "Blogs", to: "/blog", description: "Product and industry updates", icon: "newspaper" },
  { label: "Guides", to: "/guides", description: "Practical how to material", icon: "bookOpen" },
  { label: "Customer Stories", to: "/customer-stories", description: "How teams work with Leasedrop", icon: "quote" },
  { label: "Help Centre", to: "/help-centre", description: "Support and documentation", icon: "lifeBuoy" },
];

export const company: NavLink[] = [
  { label: "About", to: "/company/about", description: "Who we are and why", icon: "users" },
  { label: "Partners", to: "/company/partners", description: "Working with us", icon: "network" },
  { label: "Contact", to: "/company/contact", description: "Talk to the team", icon: "mail" },
  { label: "Careers", to: "/company/careers", description: "Open roles at Leasedrop", icon: "briefcase" },
];

export const primaryNav: NavGroup[] = [
  { label: "Platform", to: "/platform" },
  { label: "Solutions", items: solutions },
  { label: "Use Cases", items: useCases },
  { label: "Resources", items: resources },
{ label: "Company", items: company },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", to: "/legal/privacy" },
  { label: "Terms of Service", to: "/legal/terms" },
  { label: "Cookie Policy", to: "/legal/cookies" },
  { label: "Security & Compliance", to: "/security" },
  { label: "Service Level Terms", to: "/legal/service-level-terms" },
];

export const socialLinks: NavLink[] = [
  { label: "LinkedIn", to: "/company/contact" },
  { label: "X", to: "/company/contact" },
  { label: "YouTube", to: "/company/contact" },
];
