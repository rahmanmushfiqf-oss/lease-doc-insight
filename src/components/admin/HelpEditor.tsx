import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AdminShell } from "@/components/admin/AdminShell";
import {
  EditorLayout,
  EditorTopBar,
  PillPicker,
  RichTextEditor,
  SaveButtons,
  SlugInput,
  TitleInput,
} from "@/components/admin/editor";
import { AdminButton, AdminSelect, Field, PanelSection, Toggle } from "@/components/admin/ui";
import { helpCategories, type HelpArticle, type Status } from "@/lib/content";
import { blocksToText, newId, slugify, slugifyInput, textToBlocks, today, useAdmin } from "@/lib/admin-store";

type Draft = HelpArticle & { related?: string[] };

const empty = (): Draft => ({
  id: newId(),
  slug: "",
  title: "",
  category: helpCategories[0] as string,
  updated: today(),
  status: "draft",
  body: [],
  related: [],
});

export function HelpEditor({ id }: { id?: string }) {
  const { state, dispatch, currentUser } = useAdmin();
  const navigate = useNavigate();
  const existing = id ? (state.helpArticles.find((a) => a.id === id) as Draft | undefined) : undefined;
  const [draft, setDraft] = useState<Draft>(existing ?? empty());
  const [bodyText, setBodyText] = useState(blocksToText(existing?.body ?? []));
  const readOnly = currentUser?.role === "viewer";

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const save = (status: Status) => {
    const item: Draft = {
      ...draft,
      status,
      slug: slugify(draft.slug) || slugify(draft.title),
      updated: today(),
      body: textToBlocks(bodyText),
    };
    dispatch({ type: "upsert", collection: "helpArticles", item });
    setDraft(item);
    toast.success(status === "published" ? "Article published" : "Draft saved");
    if (!id) navigate({ to: "/admin/help/$id", params: { id: item.id } });
  };

  return (
    <AdminShell title={id ? "Edit help article" : "New help article"}>
      <EditorTopBar backTo="/admin/help" title={draft.title} savedAt={draft.updated}>
        <AdminButton
          onClick={() =>
            window.open(`/help-centre/${slugify(draft.category)}/${draft.slug || slugify(draft.title)}`, "_blank")
          }
        >
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
                if (!id) set("slug", slugifyInput(v));
              }}
            />
            <SlugInput
              prefix="Leasedrop/help-centre/"
              value={draft.slug}
              onChange={(v) => set("slug", slugifyInput(v))}
            />
            <RichTextEditor value={bodyText} onChange={setBodyText} />
          </>
        }
        right={
          <>
            <PanelSection title="Publishing">
              <SaveButtons status={draft.status === "published" ? "published" : "draft"} disabled={readOnly} onSave={() => save(draft.status)} onPublish={() => save("published")} />
              <p className="text-[12px] text-[#A0A0A0]">Last updated {draft.updated}</p>
            </PanelSection>

            <PanelSection title="Feature">
              <Toggle
                checked={!!draft.isFeatured}
                onChange={(v) => set("isFeatured", v)}
                label="Show in Popular articles on the Help Centre"
                helper="Up to 8 articles can be featured. If more than 8 are toggled on, the 8 most recently updated appear."
              />
            </PanelSection>

            <PanelSection title="Category">
              <Field label="Category">
                <AdminSelect value={draft.category} onChange={(v) => set("category", v)} options={helpCategories as unknown as string[]} />
              </Field>
            </PanelSection>

            <PanelSection title="Related articles">
              <PillPicker
                selected={draft.related ?? []}
                max={3}
                onChange={(v) => set("related", v)}
                placeholder="Add a related article"
                options={state.helpArticles
                  .filter((a) => a.status === "published" && a.id !== draft.id)
                  .slice(0, 40)
                  .map((a) => ({ id: a.id, title: a.title }))}
              />
            </PanelSection>
          </>
        }
      />
    </AdminShell>
  );
}
