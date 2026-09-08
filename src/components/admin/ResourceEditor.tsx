import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AdminShell } from "@/components/admin/AdminShell";
import {
  EditorLayout,
  EditorTopBar,
  ImageField,
  RichTextEditor,
  SaveButtons,
  SlugInput,
  TitleInput,
} from "@/components/admin/editor";
import {
  AdminButton,
  AdminInput,
  AdminSelect,
  Field,
  PanelSection,
  Toggle,
} from "@/components/admin/ui";
import type { Guide, Status } from "@/lib/content";
import { blocksToText, newId, slugify, slugifyInput, textToBlocks, useAdmin } from "@/lib/admin-store";

type Draft = Guide & {
  image?: string;
  imageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
  fileName?: string;
  fileSize?: string;
};

const categories = [
  "Lease Intelligence",
  "Dilapidations",
  "Due Diligence",
  "Portfolio Management",
  "Rights and Obligations",
  "Asset Document Review",
];

const empty = (): Draft => ({
  id: newId(),
  slug: "",
  title: "",
  category: "Lease Intelligence",
  description: "",
  format: "Long Read",
  status: "draft",
  body: [],
});

export function ResourceEditor({ id }: { id?: string }) {
  const { state, dispatch, currentUser } = useAdmin();
  const navigate = useNavigate();
  const existing = id ? (state.resources.find((r) => r.id === id) as Draft | undefined) : undefined;
  const [draft, setDraft] = useState<Draft>(existing ?? empty());
  const [bodyText, setBodyText] = useState(blocksToText(existing?.body ?? []));
  const [savedAt, setSavedAt] = useState<string>();
  const readOnly = currentUser?.role === "viewer";
  const isPdf = draft.format === "PDF";

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const save = (status: Status) => {
    const item: Draft = {
      ...draft,
      status,
      slug: slugify(draft.slug) || slugify(draft.title),
      body: textToBlocks(bodyText),
    };
    if (item.isFeatured) {
      state.resources
        .filter((r) => r.isFeatured && r.id !== item.id)
        .forEach((r) => dispatch({ type: "upsert", collection: "resources", item: { ...r, isFeatured: false } }));
    }
    dispatch({ type: "upsert", collection: "resources", item });
    setDraft(item);
    setSavedAt(new Date().toLocaleTimeString());
    toast.success(status === "published" ? "Resource published" : "Draft saved");
    if (!id) navigate({ to: "/admin/resources/$id", params: { id: item.id } });
  };

  return (
    <AdminShell title={id ? "Edit resource" : "New resource"}>
      <EditorTopBar backTo="/admin/resources" title={draft.title} savedAt={savedAt}>
        <AdminButton onClick={() => window.open(`/guides/${draft.slug || slugify(draft.title)}`, "_blank")}>
          Preview
        </AdminButton>
      </EditorTopBar>

      <EditorLayout
        left={
          <>
            <TitleInput
              value={draft.title}
              onChange={(v) => {
                set("title", v);
                if (!id) set("slug", slugify(v));
              }}
            />
            <SlugInput
              prefix="Leasedrop/guides/"
              value={draft.slug}
              onChange={(v) => set("slug", slugifyInput(v))}
            />
            <Field label="Description" helper="Two lines shown on the guides index.">
              <AdminInput value={draft.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
            {isPdf ? null : <RichTextEditor value={bodyText} onChange={setBodyText} />}
          </>
        }
        right={
          <>
            <PanelSection title="Publishing">
              <SaveButtons status={draft.status === "published" ? "published" : "draft"} disabled={readOnly} onSave={() => save(draft.status)} onPublish={() => save("published")} />
            </PanelSection>

            <PanelSection title="Feature">
              <Toggle
                checked={!!draft.isFeatured}
                onChange={(v) => set("isFeatured", v)}
                label="Pin this guide at the top of the Guides page"
                helper="Only one guide is featured at a time."
              />
            </PanelSection>

            <PanelSection title="Resource details">
              <Field label="Category">
                <AdminSelect value={draft.category} onChange={(v) => set("category", v)} options={categories} />
              </Field>
              <Field label="Format" helper="PDF hides the body editor and shows a file upload.">
                <AdminSelect
                  value={draft.format}
                  onChange={(v) => set("format", v as Guide["format"])}
                  options={["Long Read", "Reference Guide", "PDF"]}
                />
              </Field>
            </PanelSection>

            {isPdf ? (
              <PanelSection title="File">
                {draft.fileName ? (
                  <div className="space-y-2 text-[13px]">
                    <div className="text-[#1C1C1C]">{draft.fileName}</div>
                    <div className="text-[12px] text-[#A0A0A0]">{draft.fileSize}</div>
                    <button
                      type="button"
                      className="text-[12px] text-[#DC2626]"
                      onClick={() => {
                        set("fileName", undefined);
                        set("fileSize", undefined);
                      }}
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-[rgba(26,26,26,0.18)] bg-[#F7F7F7] px-4 py-6 text-center text-[12px] text-[#A0A0A0]">
                    Drag a PDF here or click to upload
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        set("fileName", f.name);
                        set("fileSize", `${Math.round(f.size / 1024)} KB`);
                      }}
                    />
                  </label>
                )}
                <p className="text-[12px] text-[#A0A0A0]">
                  This file links from the Download button on the public page.
                </p>
              </PanelSection>
            ) : null}

            <PanelSection title="Featured image">
              <ImageField
                value={draft.image}
                alt={draft.imageAlt}
                onChange={(v) => set("image", v)}
                onAltChange={(v) => set("imageAlt", v)}
                label="Upload"
              />
            </PanelSection>

            <PanelSection title="SEO">
              <Field label="Meta title" counter={{ value: (draft.metaTitle ?? "").length, limit: 60 }}>
                <AdminInput value={draft.metaTitle ?? ""} onChange={(e) => set("metaTitle", e.target.value)} />
              </Field>
              <Field label="Meta description" counter={{ value: (draft.metaDescription ?? "").length, limit: 160 }}>
                <AdminInput
                  value={draft.metaDescription ?? ""}
                  onChange={(e) => set("metaDescription", e.target.value)}
                />
              </Field>
            </PanelSection>
          </>
        }
      />
    </AdminShell>
  );
}
