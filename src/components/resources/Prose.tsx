import type { ContentBlock } from "@/lib/content";
import { normalizeBlocks } from "@/lib/markdown";

type Block = ContentBlock;

export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const headingClass: Record<string, string> = {
  h1: "pt-6 text-3xl sm:text-4xl",
  h2: "pt-6 text-2xl",
  h3: "pt-4 text-xl",
  h4: "pt-4 text-lg",
  h5: "pt-2 text-base",
  h6: "pt-2 text-sm uppercase tracking-wide",
};

export function Prose({ blocks }: { blocks: Block[] }) {
  const rendered = normalizeBlocks(blocks as never) as Block[];
  return (
    <div className="space-y-6">
      {rendered.map((b, i) => {
        if (headingClass[b.type]) {
          const Tag = (b.type === "h1" ? "h2" : b.type) as "h2" | "h3" | "h4" | "h5" | "h6";
          return (
            <Tag
              key={i}
              id={headingId(b.text)}
              className={`scroll-mt-28 font-[490] leading-tight ${headingClass[b.type]}`}
            >
              {b.text}
            </Tag>
          );
        }
        if (b.type === "quote")
          return (
            <blockquote
              key={i}
              className="border-l-2 border-primary py-2 pl-6 font-serif text-2xl leading-snug text-foreground"
            >
              {b.text}
            </blockquote>
          );
        if (b.type === "ul" || b.type === "ol") {
          const List = b.type === "ul" ? "ul" : "ol";
          return (
            <List
              key={i}
              className={`space-y-2 pl-6 text-base leading-relaxed text-muted-foreground ${
                b.type === "ul" ? "list-disc" : "list-decimal"
              }`}
            >
              {(b.items ?? []).map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </List>
          );
        }
        return (
          <p key={i} className="text-base leading-relaxed text-muted-foreground">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}


export function PageHead({
  eyebrow,
  title,
  subtitle,
  narrow = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  narrow?: boolean;
}) {
  return (
    <header className={narrow ? "max-w-3xl" : "max-w-4xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 text-4xl font-[490] leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </header>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[96rem] px-5 lg:px-8 ${className}`}>{children}</div>;
}
