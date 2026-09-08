import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CalendarClock,
  ChevronDown,
  ClipboardCheck,
  Compass,
  FileText,
  FolderSearch,
  Hammer,
  HardHat,
  Handshake,
  KeyRound,
  LifeBuoy,
  LineChart,
  Mail,
  Menu,
  Network,
  Newspaper,
  Quote,
  Scale,
  SearchCheck,
  Users,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { primaryNav, type NavGroup, type NavIcon } from "@/lib/nav";
import { cn } from "@/lib/utils";
import blogImageOne from "@/assets/alt-documents-desk.webp";
import blogImageTwo from "@/assets/alt-reception.webp";

// Placeholder blog previews until real posts are supplied.
const blogPreviews = [
  {
    title: "Placeholder: What a Structured Asset Record Changes",
    image: blogImageOne,
    alt: "Lease documents laid out on a desk",
    to: "/blog" as const,
  },
  {
    title: "Placeholder: Tracing Every Answer Back to Its Source",
    image: blogImageTwo,
    alt: "Reception area of a modern commercial building",
    to: "/blog" as const,
  },
];

const navIcons: Record<NavIcon, typeof Building2> = {
  building: Building2,
  hardHat: HardHat,
  keyRound: KeyRound,
  lineChart: LineChart,
  searchCheck: SearchCheck,
  scale: Scale,
  fileText: FileText,
  hammer: Hammer,
  folderSearch: FolderSearch,
  handshake: Handshake,
  calendarClock: CalendarClock,
  clipboardCheck: ClipboardCheck,
  compass: Compass,
  newspaper: Newspaper,
  bookOpen: BookOpen,
  quote: Quote,
  lifeBuoy: LifeBuoy,
  users: Users,
  network: Network,
  mail: Mail,
  briefcase: Briefcase,
};

function MegaPanel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  return (
    <div className="absolute left-1/2 top-full w-[62rem] max-w-[92vw] -translate-x-1/2 pt-3">
      <div className="grid grid-cols-[1.35fr_1fr] overflow-hidden rounded-xl border border-border bg-popover shadow-[var(--shadow-lift)]">
        <div className="p-4">
          <p className="px-2 pb-2 font-display text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
            {group.label}
          </p>
          <ul className="grid auto-rows-fr grid-cols-2 gap-1">
            {group.items?.map((item) => {
              const ItemIcon = item.icon ? navIcons[item.icon] : Compass;
              return (
                <li key={item.to} className="h-full">
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    className="group flex h-full items-start gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-all duration-200 ease-out hover:border-primary/30 hover:bg-secondary focus-visible:border-primary/40 focus-visible:bg-secondary"
                  >
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors duration-200 group-hover:border-primary group-hover:text-primary">
                      <ItemIcon className="size-4" strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span className="block font-display text-sm leading-snug text-foreground transition-colors group-hover:text-primary">
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-l border-border bg-secondary/60 p-4">
          <div className="flex items-center justify-between px-1 pb-3">
            <p className="font-display text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
              Latest from our blog
            </p>
            <Link
              to="/blog"
              onClick={onNavigate}
              className="link-underline inline-flex items-center gap-1 text-xs text-primary"
            >
              See all posts <ArrowRight className="size-3" />
            </Link>
          </div>
          <ul className="space-y-2">
            {blogPreviews.map((post) => (
              <li key={post.title}>
                <Link
                  to={post.to}
                  onClick={onNavigate}
                  className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-background focus-visible:bg-background"
                >
                  <img
                    src={post.image}
                    alt={post.alt}
                    loading="lazy"
                    className="size-16 shrink-0 rounded-md object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                      Read more <ArrowRight className="size-3" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="relative mx-auto flex h-18 max-w-[96rem] items-center gap-8 px-5 py-4 lg:px-8">
        <Logo className="h-6 w-auto lg:h-7" />

        <nav aria-label="Primary" className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex [&>*]:pointer-events-auto">
          {primaryNav.map((group) =>
            group.items ? (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => open(group.label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={openGroup === group.label}
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  className={cn(
                    "link-underline inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-normal transition-colors",
                    openGroup === group.label
                      ? "text-primary"
                      : "text-foreground/75 hover:text-foreground",
                  )}
                >
                  {group.label}
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      openGroup === group.label && "rotate-180",
                    )}
                  />
                </button>
                {openGroup === group.label ? (
                  <div className="rise">
                    <MegaPanel group={group} onNavigate={() => setOpenGroup(null)} />
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={group.label}
                to={group.to!}
                className="link-underline rounded-md px-3 py-2 text-sm font-normal text-foreground/75 transition-colors hover:text-foreground"
                activeProps={{ className: "text-primary" }}
              >
                {group.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <a
            href="https://leasedrop.ai/signin?redirect=%2Fworkspaces"
            className="link-underline rounded-md px-3 py-2 text-sm text-foreground/75 transition-colors hover:text-foreground"
          >
            Log in
          </a>
          <Link
            to="/book-a-demo"
            className="btn-base btn-primary px-4 py-2.5"
          >
            Book a Demo
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="btn-base btn-outline ml-auto inline-flex size-11 items-center justify-center lg:hidden"
        >
          {mobileOpen ? <Menu className="size-5 rotate-90 opacity-0" /> : null}
          {mobileOpen ? <X className="absolute size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-x-0 top-18 z-50 h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-background px-5 pb-16 pt-4 lg:hidden">
          <ul className="divide-y divide-border">
            {primaryNav.map((group) => (
              <li key={group.label} className="py-1">
                {group.items ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={mobileSection === group.label}
                      onClick={() =>
                        setMobileSection(mobileSection === group.label ? null : group.label)
                      }
                      className="flex w-full items-center justify-between py-3 font-display text-base"
                    >
                      {group.label}
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform",
                          mobileSection === group.label && "rotate-180",
                        )}
                      />
                    </button>
                    {mobileSection === group.label ? (
                      <ul className="pb-2 pl-1">
                        {group.items.map((item) => (
                          <li key={item.to}>
                            <Link
                              to={item.to}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : (
                  <Link
                    to={group.to!}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 font-display text-base"
                  >
                    {group.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link
            to="/book-a-demo"
            onClick={() => setMobileOpen(false)}
            className="btn-base btn-primary mt-6 w-full px-4 py-3.5"
          >
            Book a Demo
          </Link>
        </div>
      ) : null}
    </header>
  );
}
