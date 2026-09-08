// Mock content store for the Leasedrop resource pages.
// The admin panel will write into this shape once the CMS is wired up.

export type Status = "draft" | "scheduled" | "published";

export type ContentBlock = {
  type: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "quote" | "ul" | "ol";
  text: string;
  items?: string[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  status: Status;
  isFeatured?: boolean;
  body: ContentBlock[];
  related: string[];
};

export type Guide = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  format: "PDF" | "Long Read" | "Reference Guide";
  status: Status;
  isFeatured?: boolean;
  body: ContentBlock[];
};

export type CustomerStory = {
  id: string;
  slug: string;
  organisation: string;
  sector: string;
  outcome: string;
  quote: string;
  status: Status;
  body: ContentBlock[];
};

export type HelpArticle = {
  id: string;
  slug: string;
  category: string;
  title: string;
  isFeatured?: boolean;
  updated: string;
  status: Status;
  body: ContentBlock[];
};

export type Video = {
  id: string;
  title: string;
  duration: string;
  excerpt: string;
  date: string;
  status: Status;
};

export type Author = {
  slug: string;
  name: string;
  role: string;
  image: "siddique" | "shorful";
  description: string[];
  credentials: string[];
  guideIds: string[];
};

export const authors: Author[] = [
  {
    slug: "siddique-miah",
    name: "Siddique Miah",
    role: "Co-founder & CEO",
    image: "siddique",
    description: [
      "Siddique is a Chartered Building Surveyor with a BSc in Building Surveying from the University of Westminster. He spent years in professional practice doing the work Leasedrop now automates, locating key clauses across lease documents, extracting them manually and formatting them for reports and assessments.",
      "He built Leasedrop because he knew the problem was not a lack of skill or knowledge. It was a lack of the right tool, built specifically for property professionals by someone who had done the work.",
    ],
    credentials: ["MRICS, Chartered Building Surveyor", "BSc Building Surveying, University of Westminster"],
    guideIds: ["g1", "g2", "g4"],
  },
  {
    slug: "dr-shorful-islam",
    name: "Dr Shorful Islam",
    role: "Co-founder & CTO",
    image: "shorful",
    description: [
      "Shorful holds a PhD in Psychology with a specialism in behavioural modelling. Over 25 years he has led global teams, built and scaled two international data consultancies, and helped organisations including Shell, Coca-Cola, Microsoft, Unilever and the NHS turn data into something that changes how they operate.",
      "He has worked at the intersection of AI, data culture and commercial leadership throughout his career. In 2024 he published Data Culture, a book about the people and structures that determine whether a data strategy actually lands.",
    ],
    credentials: ["PhD, Psychology, Behavioural Modelling", "Author, Data Culture, 2024", "Former global leadership, Wunderman, WPP"],
    guideIds: ["g3", "g5", "g6"],
  },
];

export const authorByName = (name: string) => authors.find((author) => author.name === name);

export const hubTopics = [
  "All",
  "Lease Intelligence",
  "Dilapidations",
  "Portfolio Management",
  "Due Diligence",
  "Industry Thinking",
] as const;

const p = (text: string) => ({ type: "p" as const, text });
const h2 = (text: string) => ({ type: "h2" as const, text });
const quote = (text: string) => ({ type: "quote" as const, text });

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "what-asset-intelligence-actually-means",
    title: "What asset intelligence actually means when the documents are the asset",
    category: "Industry Thinking",
    excerpt:
      "Most property data starts life as a sentence in a lease. Asset intelligence is the discipline of getting from that sentence to a decision without losing the source.",
    readTime: "7 min read",
    date: "2026-08-18",
    author: "Siddique Miah",
    status: "published",
    isFeatured: true,
    body: [
      p("Every number on an asset management report began as language. A rent figure is a clause. A break date is a condition. A reinstatement liability is an obligation buried in a licence annexe that nobody re-reads until the tenant leaves."),
      p("This is the quiet truth of commercial real estate: the documents are the asset. The building is bricks and steel, but the value an owner actually holds lives in the lease, the amendments, the licences and the notices that have accumulated around it over years. And yet, for most organisations, that documentary record is functionally unreadable at the moment it matters most."),
      h2("The gap between a document and a decision"),
      p("Teams do not lack documents. A mid-sized portfolio can sit on tens of thousands of pages, carefully scanned, neatly foldered and almost entirely inaccessible. What teams lack is a reliable route from the documents they already hold to the answer they need this afternoon, with the source attached so the answer can be defended in a meeting, in a negotiation or in front of an investment committee."),
      p("The usual route is a person. Someone who remembers, or someone who searches, or someone who reads the whole lease again because the summary from three years ago cannot be trusted. That route is slow, it does not scale across a portfolio, and it breaks the moment the person is unavailable."),
      h2("What asset intelligence actually is"),
      p("Asset intelligence is the discipline of closing that gap. Not a dashboard of statistics about the portfolio, and not a search box over a pile of PDFs, but a structured, verifiable record of what every document behind every asset actually says."),
      p("Three properties make it real. First, completeness: the record covers every document connected to the asset, not just the primary lease, because the amendment signed in year four routinely overrides the clause everyone quotes from year one. Second, connection: documents are read alongside the documents they affect, so a licence to alter is understood in the context of the repair obligation it modifies. Third, currency: when a new document arrives, the record updates, without anyone maintaining it by hand."),
      quote("The answer used to require three people and two afternoons. Now it takes one question."),
      h2("Why the source is the point"),
      p("None of this is usable if it cannot be verified. Professional responsibility does not transfer to a system: whoever signs the advice, approves the valuation or sends the notice needs to see the clause. That is why every answer in an asset intelligence system worth the name carries its provenance: the document, the page and the exact passage it came from."),
      p("Verification is not a feature bolted on at the end. It is the condition that makes everything else trustworthy enough to act on. An answer without a source is an opinion, and opinions are what the organisation was already drowning in."),
      h2("From record to advantage"),
      p("Once the record is structured, the economics of knowledge work inside a property business change. The quarterly review stops being a reporting exercise and becomes an interrogation. The dilapidations claim starts from the documents instead of arriving at them three weeks in. The acquisition team asks its real questions on day one of exclusivity instead of day thirty."),
      p("That is what asset intelligence means when the documents are the asset: the same information your organisation already owns, finally organised well enough to use."),
    ],
    related: ["b2", "b4", "b5"],
  },
  {
    id: "b2",
    slug: "reading-a-lease-for-critical-dates",
    title: "Reading a lease for critical dates without reading the whole lease",
    category: "Lease Intelligence",
    excerpt:
      "Break conditions rarely sit where you expect them. A structured approach to finding the dates that carry consequences.",
    readTime: "6 min read",
    date: "2026-08-11",
    author: "Siddique Miah",
    status: "published",
    body: [
      p("Break clauses, rent reviews and expiry dates are the events that move value. They are also the events most often recorded from memory rather than from the document."),
      h2("Conditions travel with dates"),
      p("A break date without its conditions is not a date, it is a risk. Vacant possession requirements, payment conditions and notice periods all change whether the date is usable."),
    ],
    related: ["b1", "b3"],
  },
  {
    id: "b3",
    slug: "dilapidations-evidence-before-the-site-visit",
    title: "Dilapidations: locating the evidence before the site visit",
    category: "Dilapidations",
    excerpt:
      "Repair, reinstatement and yield-up obligations are documentary questions first and physical questions second.",
    readTime: "8 min read",
    date: "2026-07-29",
    author: "Siddique Miah",
    status: "published",
    body: [
      p("Surveyors who arrive on site already knowing what the documents say work differently from those who reconstruct the position afterwards."),
      h2("Start with the licences"),
      p("Alterations consented under licence usually carry the reinstatement obligation. The lease alone rarely tells the full story."),
    ],
    related: ["b1", "b2"],
  },
  {
    id: "b4",
    slug: "structuring-a-data-room-in-48-hours",
    title: "Structuring a 180 document data room inside 48 hours of exclusivity",
    category: "Due Diligence",
    excerpt:
      "Transaction timelines do not expand to fit the document pack. A working method for the first two days.",
    readTime: "9 min read",
    date: "2026-07-15",
    author: "Dr Shorful Islam",
    status: "published",
    body: [
      p("Exclusivity starts the clock. The first task is not analysis, it is knowing exactly what is in the pack and what is missing from it."),
      h2("Completeness before conclusions"),
      p("A gap list produced on day one is worth more than a partial red flag report produced on day five."),
    ],
    related: ["b1", "b3"],
  },
  {
    id: "b5",
    slug: "portfolio-questions-worth-asking",
    title: "Ten portfolio questions worth asking every quarter",
    category: "Portfolio Management",
    excerpt:
      "The questions that surface exposure early, and what a complete answer to each one looks like.",
    readTime: "5 min read",
    date: "2026-06-30",
    author: "Dr Shorful Islam",
    status: "published",
    body: [
      p("Portfolio review meetings tend to repeat the same reporting. These ten questions surface exposure that standard reporting misses."),
      h2("Ask across the portfolio, not per asset"),
      p("The value appears when the same question is answered consistently across every asset in the same afternoon."),
    ],
    related: ["b1", "b4"],
  },
  {
    id: "b6",
    slug: "why-source-verification-matters",
    title: "Why an answer without a source is not an answer",
    category: "Industry Thinking",
    excerpt:
      "Verification is not a feature of asset intelligence. It is the condition that makes the rest of it usable.",
    readTime: "4 min read",
    date: "2026-06-12",
    author: "Dr Shorful Islam",
    status: "published",
    body: [
      p("Professional responsibility does not transfer to a system. Whoever signs the advice needs to see the clause."),
      quote("We found a reinstatement obligation in asset three that would have changed the valuation."),
      p("Every answer should carry the document, the page and the passage it came from."),
    ],
    related: ["b1", "b2"],
  },
];

export const guides: Guide[] = [
  {
    id: "g1",
    slug: "asset-managers-guide-to-lease-intelligence",
    title: "The Asset Manager's Guide to Lease Intelligence",
    category: "Lease Intelligence",
    description:
      "How to build a structured lease record across a portfolio, and the questions it should be able to answer on demand.",
    format: "Long Read",
    status: "published",
    isFeatured: true,
    body: [
      p("This guide sets out a working method for turning a portfolio of leases into a structured record that answers questions the same way every time."),
      h2("What a complete lease record contains"),
      p("Parties, term, rent and review mechanics, break rights and conditions, repair and reinstatement, alienation, and the licences that modify all of the above."),
    ],
  },
  {
    id: "g2",
    slug: "understanding-dilapidations",
    title: "Understanding Dilapidations: A Documentary Approach",
    category: "Dilapidations",
    description:
      "Repair, reinstatement and yield-up obligations traced through leases, licences and schedules of condition.",
    format: "PDF",
    status: "published",
    body: [p("A documentary method for establishing the dilapidations position before inspection.")],
  },
  {
    id: "g3",
    slug: "due-diligence-at-scale",
    title: "Due Diligence at Scale: Working Through Large Document Packs",
    category: "Due Diligence",
    description:
      "A first-48-hours method for structuring, interrogating and gap-checking a transaction data room.",
    format: "PDF",
    status: "published",
    body: [p("Practical sequencing for large document packs under transaction timelines.")],
  },
  {
    id: "g4",
    slug: "rights-and-obligations-reference",
    title: "Rights and Obligations in Commercial Leases: A Practical Reference",
    category: "Lease Intelligence",
    description:
      "What each party must do, may do and must not do, and where those provisions usually sit in the document.",
    format: "Reference Guide",
    status: "published",
    body: [p("A clause-by-clause reference for landlord and tenant obligations.")],
  },
  {
    id: "g5",
    slug: "critical-dates-what-to-track",
    title: "Critical Dates in Commercial Leases: What to Track and Why",
    category: "Portfolio Management",
    description:
      "The date types that carry consequences, the conditions attached to them, and how to keep the register current.",
    format: "Reference Guide",
    status: "published",
    body: [p("A register design for dates that actually change outcomes.")],
  },
  {
    id: "g6",
    slug: "asset-document-review",
    title: "Asset Document Review: Building a Complete Property Record",
    category: "Asset Document Review",
    description:
      "How to establish what documents exist for an asset, what is missing, and what the record says once assembled.",
    format: "Long Read",
    status: "published",
    body: [p("Assembling and testing the completeness of an asset's documentary record.")],
  },
];

export const customerStories: CustomerStory[] = [
  {
    id: "s1",
    slug: "uk-asset-management-firm",
    organisation: "UK asset management firm",
    sector: "Asset Management",
    outcome:
      "Reduced time spent answering asset queries from hours to minutes across a 60-property portfolio.",
    quote:
      "The answer used to require three people and two afternoons. Now it takes one question.",
    status: "published",
    body: [
      h2("The situation"),
      p("A 60-property portfolio managed by a small team, with the documentary record spread across shared drives, historic managing agent handovers and email attachments."),
      h2("The problem"),
      p("Every asset query became a research project. Answers were produced from memory and then checked, or checked and then produced late."),
      h2("How Leasedrop was used"),
      p("The full document set was structured once, then queried directly by the asset managers rather than routed through an analyst."),
      quote("The answer used to require three people and two afternoons. Now it takes one question."),
      h2("The result"),
      p("Query turnaround moved from hours to minutes, and every answer arrives with the clause attached."),
    ],
  },
  {
    id: "s2",
    slug: "national-building-surveying-practice",
    organisation: "National building surveying practice",
    sector: "Building Surveying",
    outcome:
      "Dilapidations evidence located and structured before the site visit, not after it.",
    quote:
      "We arrived on site already knowing what the documents said. That changed how we worked from the first instruction.",
    status: "published",
    body: [
      h2("The situation"),
      p("Dilapidations instructions arriving with incomplete document packs and short deadlines."),
      h2("The problem"),
      p("Reinstatement obligations sat in licences that were rarely read before inspection."),
      h2("How Leasedrop was used"),
      p("Document packs were structured on receipt, with repair, reinstatement and yield-up provisions extracted and traced to source."),
      quote("We arrived on site already knowing what the documents said. That changed how we worked from the first instruction."),
      h2("The result"),
      p("Site visits became verification exercises rather than discovery exercises."),
    ],
  },
  {
    id: "s3",
    slug: "real-estate-private-equity-firm",
    organisation: "Real estate private equity firm",
    sector: "Investment",
    outcome:
      "180-document data room structured and interrogated within 48 hours of exclusivity.",
    quote:
      "We found a reinstatement obligation in asset three that would have changed the valuation. It was in a licence annexe. We would not have reached it in time.",
    status: "published",
    body: [
      h2("The situation"),
      p("A multi-asset acquisition with a 180-document data room and a short exclusivity period."),
      h2("The problem"),
      p("Manual review would not have covered the full pack before the decision point."),
      h2("How Leasedrop was used"),
      p("The pack was structured on day one and interrogated by the deal team directly across all assets."),
      quote("We found a reinstatement obligation in asset three that would have changed the valuation. It was in a licence annexe. We would not have reached it in time."),
      h2("The result"),
      p("A material obligation surfaced inside 48 hours and fed straight into pricing."),
    ],
  },
];

export const videos: Video[] = [
  {
    id: "v1",
    title: "Single Asset View: a walkthrough",
    duration: "4:12",
    excerpt:
      "How the documents behind one property come together into a single connected, verifiable record.",
    date: "2026-08-20",
    status: "published",
  },
  {
    id: "v2",
    title: "Asking the portfolio a question",
    duration: "6:05",
    excerpt:
      "From a plain-language question to a sourced answer across every asset at once.",
    date: "2026-08-06",
    status: "published",
  },
  {
    id: "v3",
    title: "From answer to source: verification in practice",
    duration: "3:48",
    excerpt:
      "Opening the exact clause and page behind any answer Leasedrop gives, before you act on it.",
    date: "2026-07-22",
    status: "published",
  },
  {
    id: "v4",
    title: "Structuring a data room in the first 48 hours",
    duration: "7:21",
    excerpt:
      "What a complete, gap-checked document pack looks like on day one of exclusivity.",
    date: "2026-07-08",
    status: "published",
  },
];

export const helpCategories = [
  "Getting Started",
  "Uploading Documents",
  "Asking Questions",
  "Verifying Answers",
  "Managing Your Portfolio",
  "Security & Access",
  "Integrations",
  "Billing & Account",
] as const;

export const helpCategorySlugs: Record<string, string> = {
  "Getting Started": "getting-started",
  "Uploading Documents": "uploading-documents",
  "Asking Questions": "asking-questions",
  "Verifying Answers": "verifying-answers",
  "Managing Your Portfolio": "managing-your-portfolio",
  "Security & Access": "security-and-access",
  Integrations: "integrations",
  "Billing & Account": "billing-and-account",
};

const helpSeed: Array<[string, string[]]> = [
  ["Getting Started", ["Setting up your workspace", "Inviting your team", "Creating your first asset"]],
  ["Uploading Documents", ["Supported file types", "Uploading a document pack", "Fixing a failed upload"]],
  ["Asking Questions", ["Writing a good portfolio question", "Asking across multiple assets", "Saving frequent questions"]],
  ["Verifying Answers", ["Opening the source document", "Understanding source references", "Flagging an incorrect answer"]],
  ["Managing Your Portfolio", ["Organising assets and folders", "Tracking critical dates", "Archiving an asset"]],
  ["Security & Access", ["Access control and roles", "Single sign on", "Data retention and deletion"]],
  ["Integrations", ["Connecting your document store", "Exporting to your reporting stack"]],
  ["Billing & Account", ["Managing your plan", "Updating billing details", "Closing an account"]],
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const helpArticles: HelpArticle[] = helpSeed.flatMap(([category, titles], ci) =>
  titles.map((title, i) => ({
    id: `h${ci}-${i}`,
    slug: slugify(title),
    category,
    title,
    isFeatured: i === 0,
    updated: `2026-0${(ci % 8) + 1}-1${i}`,
    status: "published" as Status,
    body: [
      p(`${title}. This article walks through the steps and the settings involved, and links to the related articles you are likely to need next.`),
      h2("Before you start"),
      p("Make sure you have the right access level for your workspace. Access is managed by your workspace administrator."),
      h2("Steps"),
      p("Follow the steps in order. Each step confirms in the interface before you move on to the next one."),
    ],
  })),
);

export const publishedBlog = () =>
  allBlogPosts()
    .filter((b) => b.status === "published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
export const featuredPost = () => (publishedBlog().find((b) => b.isFeatured) ?? publishedBlog()[0])!;
export const publishedGuides = () => allGuides().filter((g) => g.status === "published");
export const featuredGuide = () => (publishedGuides().find((g) => g.isFeatured) ?? publishedGuides()[0])!;
export const publishedStories = () => allCustomerStories().filter((s) => s.status === "published");
export const publishedVideos = () => videos.filter((v) => v.status === "published");
export const publishedHelp = () => allHelpArticles().filter((a) => a.status === "published");

export const helpCategorySlug = (c: string) => helpCategorySlugs[c] ?? slugify(c);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

// ---------------------------------------------------------------------------
// Live content, hydrated from the backend content library.
// Seed arrays above act as the built in library. Anything created or edited in
// the admin panel is stored in the database and merged in here.
// ---------------------------------------------------------------------------

export type ContentCollection = "blogPosts" | "resources" | "customerStories" | "helpArticles";

type LiveState = {
  items: Partial<Record<ContentCollection, Array<Record<string, unknown>>>>;
  hidden: Set<string>;
};

const live: LiveState = { items: {}, hidden: new Set() };

export function applyLiveContent(snapshot: {
  items: Array<{ collection: ContentCollection; status: string; data: Record<string, any> }>;
  visibility: Array<{ id: string; collection: ContentCollection; status: string; deleted: boolean }>;
}) {
  const grouped: LiveState["items"] = {};
  for (const row of snapshot.items) {
    if (!row?.data) continue;
    (grouped[row.collection] ??= []).push({ ...row.data, status: row.status });
  }
  live.items = grouped;
  live.hidden = new Set(
    snapshot.visibility
      .filter((v) => v.deleted || v.status !== "published")
      .map((v) => `${v.collection}:${String(v.id).slice(v.collection.length + 1)}`),
  );
}

function mergeLive<T extends { id: string }>(collection: ContentCollection, seed: T[]): T[] {
  const dbItems = (live.items[collection] ?? []) as unknown as T[];
  if (dbItems.length === 0 && live.hidden.size === 0) return seed;
  const byId = new Map<string, T>();
  for (const item of seed) {
    if (live.hidden.has(`${collection}:${item.id}`)) continue;
    byId.set(item.id, item);
  }
  const extras: T[] = [];
  for (const item of dbItems) {
    if (byId.has(item.id)) byId.set(item.id, item);
    else extras.push(item);
  }
  return [...extras, ...byId.values()];
}

export const allBlogPosts = () => mergeLive("blogPosts", blogPosts);
export const allGuides = () => mergeLive("resources", guides);
export const allCustomerStories = () => mergeLive("customerStories", customerStories);
export const allHelpArticles = () => mergeLive("helpArticles", helpArticles);
