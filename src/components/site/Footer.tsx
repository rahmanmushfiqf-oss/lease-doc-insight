import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import {
  company,
  legalLinks,
  resources,
  socialLinks,
  solutions,
  useCases,
  type NavLink,
} from "@/lib/nav";

function Column({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h3 className="font-display text-xs uppercase tracking-[0.16em] text-white/45">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="link-underline text-sm text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-obsidian text-white">
      <div className="mx-auto max-w-[96rem] px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
          <div>
            <Logo variant="white" className="h-7 w-auto" />
            <p className="mt-5 max-w-sm font-serif text-xl leading-snug text-white/80">
              Asset intelligence built on the documents you already hold.
            </p>
          </div>

          <Column title="Solutions" links={solutions} />
          <Column title="Use Cases" links={useCases} />
          <Column title="Resources" links={resources} />
          <Column title="Company" links={company} />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-white/45">
            © 2025 Leasedrop. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="link-underline text-xs text-white/55 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {socialLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="link-underline text-xs text-white/55 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
