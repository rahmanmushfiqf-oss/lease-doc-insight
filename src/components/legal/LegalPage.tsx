import type { ReactNode } from "react";

export type LegalBlock =
  | { type: "p"; text: ReactNode }
  | { type: "bullets"; items: ReactNode[] }
  | { type: "clauses"; items: { id: string; text: ReactNode; sub?: ReactNode[] }[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export function LegalPage({
  eyebrow,
  title,
  effectiveDate,
  lastUpdated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  effectiveDate?: string;
  lastUpdated?: string;
  intro?: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main className="bg-background text-foreground">
      <header className="mx-auto max-w-[96rem] px-6 pt-24 pb-12 text-center lg:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-[490] tracking-tight lg:text-5xl">{title}</h1>
        {(effectiveDate || lastUpdated) && (
          <p className="mt-5 text-sm text-muted-foreground">
            {effectiveDate && <>Effective Date: {effectiveDate}</>}
            {effectiveDate && lastUpdated && <span className="mx-2">·</span>}
            {lastUpdated && <>Last Updated: {lastUpdated}</>}
          </p>
        )}
      </header>

      <div className="mx-auto max-w-3xl px-6 pb-28">
        {intro && <div className="mb-14 space-y-5 text-base leading-relaxed text-muted-foreground">{intro}</div>}
        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-[490] tracking-tight">{section.heading}</h2>
              <div className="mt-5 space-y-5 text-base leading-relaxed text-muted-foreground">
                {section.blocks.map((block, i) => {
                  if (block.type === "p") return <p key={i}>{block.text}</p>;
                  if (block.type === "bullets")
                    return (
                      <ul key={i} className="list-disc space-y-2.5 pl-6 marker:text-primary">
                        {block.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    );
                  return (
                    <ol key={i} className="space-y-4">
                      {block.items.map((item) => (
                        <li key={item.id}>
                          <div className="flex gap-3">
                            <span className="shrink-0 font-medium text-foreground">{item.id}</span>
                            <div className="space-y-3">
                              <p>{item.text}</p>
                              {item.sub && (
                                <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                                  {item.sub.map((s, k) => (
                                    <li key={k}>{s}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
