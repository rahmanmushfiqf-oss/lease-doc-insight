/* Conversion between the plain text storage format used by the public pages
   (## heading, > quote, - list, blank line paragraphs) and the HTML the
   visual editor works with. */

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const inlineToHtml = (s: string) =>
  escapeHtml(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|\W)_([^_]+)_(?=\W|$)/g, "$1<em>$2</em>");

export function textToHtml(text: string): string {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let list: { tag: "ul" | "ol"; items: string[] } | null = null;
  let para: string[] = [];

  const flushList = () => {
    if (!list) return;
    out.push(`<${list.tag}>${list.items.map((i) => `<li>${inlineToHtml(i)}</li>`).join("")}</${list.tag}>`);
    list = null;
  };
  const flushPara = () => {
    if (para.length === 0) return;
    out.push(`<p>${inlineToHtml(para.join(" "))}</p>`);
    para = [];
  };
  const flush = () => {
    flushList();
    flushPara();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.trim() === "") {
      flush();
      continue;
    }
    if (/^---+$/.test(line.trim())) {
      flush();
      out.push("<hr>");
      continue;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      flush();
      const level = (heading[1] ?? "##").length;
      out.push(`<h${level}>${inlineToHtml(heading[2] ?? "")}</h${level}>`);
      continue;
    }
    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      flush();
      out.push(`<blockquote>${inlineToHtml(quote[1] ?? "")}</blockquote>`);
      continue;
    }
    const bullet = /^[-*]\s+(.*)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      flushPara();
      const tag = bullet ? "ul" : "ol";
      if (!list || list.tag !== tag) {
        flushList();
        list = { tag, items: [] };
      }
      list.items.push(((bullet ? bullet[1] : numbered?.[1]) ?? "").trim());
      continue;
    }
    flushList();
    para.push(line.trim());
  }
  flush();
  return out.join("\n") || "<p><br></p>";
}

const inlineToText = (node: Node): string => {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  if (node.nodeType !== Node.ELEMENT_NODE) return "";
  const el = node as HTMLElement;
  const inner = Array.from(el.childNodes).map(inlineToText).join("");
  switch (el.tagName) {
    case "BR":
      return "\n";
    case "STRONG":
    case "B":
      return inner.trim() ? `**${inner}**` : inner;
    case "EM":
    case "I":
      return inner.trim() ? `_${inner}_` : inner;
    case "A": {
      const href = el.getAttribute("href");
      return href ? `[${inner}](${href})` : inner;
    }
    default:
      return inner;
  }
};

export function htmlToText(html: string): string {
  if (typeof document === "undefined") return html;
  const root = document.createElement("div");
  root.innerHTML = html;
  const blocks: string[] = [];

  const walk = (el: HTMLElement) => {
    for (const child of Array.from(el.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const t = (child.textContent ?? "").trim();
        if (t) blocks.push(t);
        continue;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) continue;
      const node = child as HTMLElement;
      const text = inlineToText(node).replace(/\s+\n/g, "\n").trim();
      switch (node.tagName) {
        case "H1":
          blocks.push(`# ${text}`);
          break;
        case "H2":
          blocks.push(`## ${text}`);
          break;
        case "H3":
          blocks.push(`### ${text}`);
          break;
        case "H4":
          blocks.push(`#### ${text}`);
          break;
        case "H5":
          blocks.push(`##### ${text}`);
          break;
        case "H6":
          blocks.push(`###### ${text}`);
          break;
        case "BLOCKQUOTE":
          blocks.push(
            text
              .split("\n")
              .filter(Boolean)
              .map((l) => `> ${l}`)
              .join("\n"),
          );
          break;
        case "UL":
        case "OL": {
          const items = Array.from(node.children).map((li, i) =>
            node.tagName === "UL"
              ? `- ${inlineToText(li).trim()}`
              : `${i + 1}. ${inlineToText(li).trim()}`,
          );
          if (items.length) blocks.push(items.join("\n"));
          break;
        }
        case "HR":
          blocks.push("---");
          break;
        case "DIV":
        case "SECTION":
          if (node.querySelector("p,h1,h2,h3,ul,ol,blockquote,hr")) {
            walk(node);
          } else if (text) {
            blocks.push(text);
          }
          break;
        default:
          if (text) blocks.push(text);
      }
    }
  };

  walk(root);
  return blocks.filter((b) => b.trim() !== "").join("\n\n");
}
