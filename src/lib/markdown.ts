export type Block = {
  type: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "quote" | "ul" | "ol";
  text: string;
  items?: string[];
};

const headingPrefix: Record<string, string> = {
  h1: "# ",
  h2: "## ",
  h3: "### ",
  h4: "#### ",
  h5: "##### ",
  h6: "###### ",
};

export const blocksToText = (blocks: Block[] = []) =>
  blocks
    .map((b) => {
      if (headingPrefix[b.type]) return `${headingPrefix[b.type]}${b.text}`;
      if (b.type === "quote") return `> ${b.text}`;
      if (b.type === "ul") return (b.items ?? []).map((i) => `- ${i}`).join("\n");
      if (b.type === "ol") return (b.items ?? []).map((i, n) => `${n + 1}. ${i}`).join("\n");
      return b.text;
    })
    .join("\n\n");

// Line-level parser: works whether or not the author left blank lines between
// headings, list items and paragraphs.
export const textToBlocks = (text: string): Block[] => {
  const out: Block[] = [];
  let para: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) out.push({ type: "p", text: para.join(" ").trim() });
    para = [];
  };
  const flushList = () => {
    if (list && list.items.length) out.push({ type: list.type, text: "", items: list.items });
    list = null;
  };
  const flushAll = () => {
    flushPara();
    flushList();
  };

  for (const raw of (text ?? "").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flushAll();
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      flushAll();
      out.push({ type: `h${heading[1]!.length}` as Block["type"], text: (heading[2] ?? "").trim() });
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      flushAll();
      out.push({ type: "quote", text: (quote[1] ?? "").trim() });
      continue;
    }

    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    if (bullet) {
      flushPara();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push((bullet[1] ?? "").trim());
      continue;
    }

    const numbered = /^\d+[.)]\s+(.*)$/.exec(line);
    if (numbered) {
      flushPara();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push((numbered[1] ?? "").trim());
      continue;
    }

    flushList();
    para.push(line);
  }

  flushAll();
  return out;
};

// Repairs blocks that were stored before parsing improved, e.g. a paragraph
// whose text still contains "### Heading" or inline "- item - item" runs.
export const normalizeBlocks = (blocks: Block[] = []): Block[] =>
  blocks.flatMap((b) => {
    if (b.type !== "p") return [b];
    const text = b.text ?? "";
    if (/^\s*(#{1,6}\s|>\s|[-*•]\s|\d+[.)]\s)/m.test(text) || /\n/.test(text)) {
      const parsed = textToBlocks(text);
      if (parsed.length) return parsed;
    }
    // Inline bullet runs collapsed onto one line: "- a - b - c"
    if (/^[-•]\s+/.test(text) && text.split(/\s+[-•]\s+/).length > 2) {
      const items = text
        .replace(/^[-•]\s+/, "")
        .split(/\s+[-•]\s+/)
        .map((s) => s.trim())
        .filter(Boolean);
      return [{ type: "ul", text: "", items }];
    }
    return [b];
  });
