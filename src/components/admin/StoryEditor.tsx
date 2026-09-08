import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AdminShell } from "@/components/admin/AdminShell";
import {
  EditorLayout,
  EditorTopBar,
  ImageField,
  PillPicker,
  RichTextEditor,
  SaveButtons,
  SlugInput,
  TitleInput,
} from "@/components/admin/editor";
import {
  AdminButton,
  AdminInput,
  AdminTextarea,
  Field,
  PanelSection,
} from "@/components/admin/ui";
import type { CustomerStory, Status } from "@/lib/content";
import { blocksToText, newId, slugify, slugifyInput, textToBlocks, useAdmin } from "@/lib/admin-store";

type Draft = CustomerStory & {
  title?: string;
  image?: string;
  imageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
  related?: string[];
};

const empty = (): Draft => ({
  id: newId(),
  slug: "",
  title: "",
  organisation: "",
  sector: "",
  outcome: "",
  quote: "",
  status: "draft",
  body: [],
  related: [],
});

export function StoryEditor({ id }: { id?: string }) {
  const { state, dispatch, currentUser } = useAdmin();
  const navigate = useNavigate();
  const existing = id ? (state.customerStories.find((s) => s.id === id) as Draft | undefined) : undefined;
  const [draft, setDraft] = useState<Draft>(existing ?? empty());
  const [bodyText, setBodyText] = useState(blocksToText(existing?.body ?? []));
  const [savedAt, setSavedAt] = useState<string>();
  const readOnly = currentUser?.role === "viewer";

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const save = (status: Status) => {
    const item: Draft = {
      ...draft,
      status,
      slug: slugify(draft.slug) || slugify(draft.title || draft.organisation),
      body: textToBlocks(bodyText),
    };
    dispatch({ type: "upsert", collection: "customerStories", item });
    setDraft(item);
    setSavedAt(new Date().toLocaleTimeString());
    toast.success(status === "published" ? "Story published" : "Draft saved");
    if (!id) navigate({ to: "/admin/stories/$id", params: { id: item.id } });
  };

  return (
    <AdminShell title={id ? "Edit story" : "New customer story"}>
      <EditorTopBar backTo="/admin/stories" title={draft.title || draft.organisation} savedAt={savedAt}>
        <AdminButton
          onClick={() =>
            window.open(`/customer-stories/${draft.slug || slugify(draft.title || draft.organisation)}`, "_blank")
          }
        >
          Preview
        </AdminButton>
      </EditorTopBar>

      <EditorLayout
        left={
          <>
            <TitleInput
              value={draft.title ?? ""}
              onChange={(v) => {
                set("title", v);
                if (!id) set("slug", slugify(v));
              }}
            />
            <SlugInput
              prefix="Leasedrop/customer-stories/"
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
            </PanelSection>

            <PanelSection title="Featured image">
              <ImageField
                value={draft.image}
                alt={draft.imageAlt}
                onChange={(v) => set("image", v)}
                onAltChange={(v) => set("imageAlt", v)}
                label="Upload"
              />
            </PanelSection>

            <PanelSection title="Story details">
              <Field label="Organisation type" helper="Shown as the tag on the stories index, for example: UK asset management firm.">
                <AdminInput value={draft.organisation} onChange={(e) => set("organisation", e.target.value)} />
              </Field>
              <Field label="Sector" helper="Shown as the second tag.">
                <AdminInput value={draft.sector} onChange={(e) => set("sector", e.target.value)} />
              </Field>
              <Field label="Outcome statement" helper="The large text on the stories index. One sentence stating the result plainly.">
                <AdminTextarea rows={3} value={draft.outcome} onChange={(e) => set("outcome", e.target.value)} />
              </Field>
              <Field label="Pull quote" helper="Shown in italic on the right side of the stories index row.">
                <AdminTextarea rows={3} value={draft.quote} onChange={(e) => set("quote", e.target.value)} />
              </Field>
            </PanelSection>

            <PanelSection title="SEO">
              <Field label="Meta title" counter={{ value: (draft.metaTitle ?? "").length, limit: 60 }}>
                <AdminInput value={draft.metaTitle ?? ""} onChange={(e) => set("metaTitle", e.target.value)} />
              </Field>
              <Field label="Meta description" counter={{ value: (draft.metaDescription ?? "").length, limit: 160 }}>
                <AdminInput value={draft.metaDescription ?? ""} onChange={(e) => set("metaDescription", e.target.value)} />
              </Field>
            </PanelSection>

            <PanelSection title="Related stories">
              <PillPicker
                selected={draft.related ?? []}
                max={2}
                onChange={(v) => set("related", v)}
                placeholder="Add a related story"
                options={state.customerStories
                  .filter((s) => s.status === "published" && s.id !== draft.id)
                  .map((s) => ({ id: s.id, title: s.organisation }))}
              />
            </PanelSection>
          </>
        }
      />
    </AdminShell>
  );
}
