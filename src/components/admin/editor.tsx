import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Undo,
  Unlink,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { AdminButton, AdminInput } from "@/components/admin/ui";
import { htmlToText, textToHtml } from "@/components/admin/rich-text";
import { fileToWebp } from "@/lib/image-webp";

export function EditorTopBar({
  backTo,
  title,
  savedAt,
  children,
}: {
  backTo: string;
  title: string;
  savedAt?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-[rgba(26,26,26,0.08)] pb-4">
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to={backTo as any}
        aria-label="Back"
        className="text-[#6B6B6B] transition-colors hover:text-[#1C1C1C]"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <span className="text-[14px] font-medium text-[#1C1C1C]">{title || "Untitled"}</span>
      {savedAt ? <span className="text-[12px] text-[#A0A0A0]">Last saved {savedAt}</span> : null}
      <div className="ml-auto flex gap-2">{children}</div>
    </div>
  );
}

export function EditorLayout({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-5">{left}</div>
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="overflow-hidden rounded-xl border border-[rgba(26,26,26,0.08)] bg-[#FAFAFA]">
          {right}
        </div>
      </aside>
    </div>
  );
}

export function TitleInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      value={value}
      autoFocus
      placeholder="Untitled"
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-0 bg-transparent text-[28px] font-semibold tracking-[-0.025em] text-[#1C1C1C] placeholder:text-[#C4C4C4] focus:outline-none"
    />
  );
}

export function SlugInput({
  prefix,
  value,
  onChange,
}: {
  prefix: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-[rgba(26,26,26,0.12)] bg-[#F7F7F7] px-[14px] py-[10px] text-[13px]">
      <span className="shrink-0 text-[#A0A0A0]">{prefix}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-[#1C1C1C] focus:outline-none"
      />
    </div>
  );
}

/* A WordPress classic style editor: Visual (WYSIWYG) and Text tabs sharing
   the plain text storage format used by the public pages. */
export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [mode, setMode] = useState<"visual" | "text">("visual");
  const areaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const lastHtml = useRef("");

  useEffect(() => {
    if (mode !== "visual") return;
    const el = areaRef.current;
    if (!el) return;
    if (htmlToText(el.innerHTML) === value && el.innerHTML.trim() !== "") return;
    const html = textToHtml(value);
    el.innerHTML = html;
    lastHtml.current = html;
  }, [mode, value]);

  const exec = (command: string, arg?: string) => {
    areaRef.current?.focus();
    document.execCommand(command, false, arg);
    sync();
  };

  const sync = () => {
    const el = areaRef.current;
    if (!el) return;
    lastHtml.current = el.innerHTML;
    onChange(htmlToText(el.innerHTML));
  };

  const addLink = () => {
    const url = window.prompt("Link URL", "https://");
    if (url) exec("createLink", url);
  };

  const tools = [
    { icon: Bold, label: "Bold", run: () => exec("bold") },
    { icon: Italic, label: "Italic", run: () => exec("italic") },
    { icon: List, label: "Bullet list", run: () => exec("insertUnorderedList") },
    { icon: ListOrdered, label: "Numbered list", run: () => exec("insertOrderedList") },
    { icon: Quote, label: "Quote", run: () => exec("formatBlock", "blockquote") },
    { icon: LinkIcon, label: "Insert link", run: addLink },
    { icon: Unlink, label: "Remove link", run: () => exec("unlink") },
    { icon: Minus, label: "Divider", run: () => exec("insertHorizontalRule") },
    { icon: Undo, label: "Undo", run: () => exec("undo") },
    { icon: Redo, label: "Redo", run: () => exec("redo") },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-[rgba(26,26,26,0.08)] bg-white">
      <div className="flex items-center gap-1 border-b border-[rgba(26,26,26,0.08)] bg-[#FAFAFA] px-3 pt-2">
        {(["visual", "text"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`-mb-px rounded-t-md border border-b-0 px-3 py-1.5 text-[12px] capitalize transition-colors ${
              mode === m
                ? "border-[rgba(26,26,26,0.08)] bg-white text-[#1C1C1C]"
                : "border-transparent text-[#6B6B6B] hover:text-[#1C1C1C]"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === "visual" ? (
        <>
          <div className="flex flex-wrap items-center gap-1 border-b border-[rgba(26,26,26,0.08)] bg-white px-3 py-2">
            <select
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) exec("formatBlock", e.target.value);
                e.target.value = "";
              }}
              className="mr-1 rounded-md border border-[rgba(26,26,26,0.12)] bg-white px-2 py-1 text-[12px] text-[#1C1C1C]"
            >
              <option value="">Paragraph style</option>
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="h5">Heading 5</option>
              <option value="h6">Heading 6</option>
            </select>
            {tools.map((t) => (
              <button
                key={t.label}
                type="button"
                aria-label={t.label}
                title={t.label}
                onMouseDown={(e) => e.preventDefault()}
                onClick={t.run}
                className="rounded-md p-1.5 text-[#6B6B6B] transition-colors hover:bg-[#F5F5F5] hover:text-[#1C1C1C]"
              >
                <t.icon className="h-4 w-4" strokeWidth={1.7} />
              </button>
            ))}
          </div>
          <div
            ref={areaRef}
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            aria-label="Post content"
            onInput={sync}
            onBlur={sync}
            className="admin-wysiwyg min-h-[420px] w-full bg-white px-5 py-4 text-[15px] leading-[1.75] text-[#1C1C1C] focus:outline-none"
          />
        </>
      ) : (
        <textarea
          ref={textRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write the piece. Use ## for a heading and > for a pull quote. Separate paragraphs with a blank line."
          className="min-h-[420px] w-full resize-y bg-white px-5 py-4 font-mono text-[13px] leading-[1.7] text-[#1C1C1C] placeholder:text-[#C4C4C4] focus:outline-none"
        />
      )}
    </div>
  );
}


export function ImageField({
  value,
  alt,
  onChange,
  onAltChange,
  label = "Featured image",
}: {
  value?: string | undefined;
  alt?: string | undefined;
  onChange: (v: string | undefined) => void;
  onAltChange: (v: string) => void;
  label?: string | undefined;
}) {
  const onFile = (file?: File) => {
    if (!file) return;
    void fileToWebp(file).then(onChange);
  };

  return (
    <div className="space-y-3">
      <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#A0A0A0]">{label}</div>
      {value ? (
        <div className="space-y-2">
          <img src={value} alt={alt ?? ""} className="w-full rounded-md border border-[rgba(26,26,26,0.08)] object-cover" />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-[12px] text-[#DC2626]"
          >
            Remove image
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onFile(e.dataTransfer.files?.[0]);
          }}
          className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-[rgba(26,26,26,0.18)] bg-[#F7F7F7] px-4 py-6 text-center text-[12px] text-[#A0A0A0]"
        >
          Drag an image here or click to upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0] ?? undefined)}
          />
        </label>
      )}
      <AdminInput
        value={alt ?? ""}
        onChange={(e) => onAltChange(e.target.value)}
        placeholder="Alt text"
      />
    </div>
  );
}

export function PillPicker({
  selected,
  options,
  max,
  onChange,
  placeholder,
}: {
  selected: string[];
  options: Array<{ id: string; title: string }>;
  max: number;
  onChange: (v: string[]) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {selected.map((id) => {
          const item = options.find((o) => o.id === id);
          return (
            <span
              key={id}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F3F3] px-2.5 py-1 text-[11px] text-[#1C1C1C]"
            >
              {item?.title ?? id}
              <button
                type="button"
                aria-label="Remove"
                onClick={() => onChange(selected.filter((s) => s !== id))}
                className="text-[#A0A0A0]"
              >
                x
              </button>
            </span>
          );
        })}
      </div>
      <select
        value=""
        disabled={selected.length >= max}
        onChange={(e) => e.target.value && onChange([...selected, e.target.value])}
        className="w-full rounded-md border border-[rgba(26,26,26,0.12)] bg-[#F7F7F7] px-[14px] py-[10px] text-[13px] text-[#1C1C1C] disabled:text-[#C4C4C4]"
      >
        <option value="">{selected.length >= max ? `Maximum ${max} selected` : placeholder}</option>
        {options
          .filter((o) => !selected.includes(o.id))
          .map((o) => (
            <option key={o.id} value={o.id}>
              {o.title}
            </option>
          ))}
      </select>
    </div>
  );
}

export function SaveButtons({
  status,
  onSave,
  onPublish,
  disabled,
}: {
  status: "draft" | "published";
  onSave: () => void;
  onPublish: () => void;
  disabled?: boolean;
}) {
  const published = status === "published";
  return (
    <div className="space-y-3">
      <p className="text-[12px] text-[#6B6B6B]">
        Status: <span className="text-[#1C1C1C]">{published ? "Published" : "Draft"}</span>
      </p>
      <div className="flex gap-2">
        {published ? (
          <AdminButton variant="primary" onClick={onSave} disabled={disabled} className="flex-1">
            Update
          </AdminButton>
        ) : (
          <>
            <AdminButton onClick={onSave} disabled={disabled} className="flex-1">
              Save draft
            </AdminButton>
            <AdminButton variant="primary" onClick={onPublish} disabled={disabled} className="flex-1">
              Publish
            </AdminButton>
          </>
        )}
      </div>
    </div>
  );
}

