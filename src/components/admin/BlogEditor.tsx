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
  AdminSelect,
  Field,
  PanelSection,
  Toggle,
} from "@/components/admin/ui";
import { authors, hubTopics, type BlogPost, type Status } from "@/lib/content";
import {
  blocksToText,
  newId,
  readTimeFor,
  slugify,
  slugifyInput,
  textToBlocks,
  today,
  useAdmin,
} from "@/lib/admin-store";

type Draft = BlogPost & { image?: string; imageAlt?: string; metaTitle?: string; metaDescription?: string; tags?: string[] };

const emptyPost = (): Draft => ({
  id: newId(),
  slug: "",
  title: "",
  category: "Industry Thinking",
  excerpt: "",
  readTime: "1 min read",
  date: today(),
  author: "Editorial",
  status: "draft",
  body: [],
  related: [],
  tags: [],
});

export function BlogEditor({ id }: { id?: string }) {
  const { state, dispatch, currentUser } = useAdmin();
  const navigate = useNavigate();
  const existing = id ? (state.blogPosts.find((b) => b.id === id) as Draft | undefined) : undefined;
  const [draft, setDraft] = useState<Draft>(existing ?? emptyPost());
  const [bodyText, setBodyText] = useState(blocksToText(existing?.body ?? []));
  const [slugTouched, setSlugTouched] = useState(!!existing);
  const [savedAt, setSavedAt] = useState<string>();
  const readOnly = currentUser?.role === "viewer";

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const save = (status: Status) => {
    const item: Draft = {
      ...draft,
      status,
      slug: slugify(draft.slug) || slugify(draft.title),
      body: textToBlocks(bodyText),
      readTime: readTimeFor(bodyText),
      date: status === "published" ? draft.date || today() : draft.date,
    };
    if (item.isFeatured) {
      state.blogPosts
        .filter((b) => b.isFeatured && b.id !== item.id)
        .forEach((b) => dispatch({ type: "upsert", collection: "blogPosts", item: { ...b, isFeatured: false } }));
    }
    dispatch({ type: "upsert", collection: "blogPosts", item });
    setDraft(item);
    setSavedAt(new Date().toLocaleTimeString());
    toast.success(status === "published" ? "Post published" : "Draft saved");
    if (!id) navigate({ to: "/admin/blog/$id", params: { id: item.id } });
  };

  return (
    <AdminShell title={id ? "Edit post" : "New post"}>
      <EditorTopBar backTo="/admin/blog" title={draft.title} savedAt={savedAt}>
        <AdminButton onClick={() => window.open(`/blog/${draft.slug || slugify(draft.title)}`, "_blank")}>
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
                if (!slugTouched) set("slug", slugify(v));
              }}
            />
            <SlugInput
              prefix="Leasedrop/blog/"
              value={draft.slug}
              onChange={(v) => {
                setSlugTouched(true);
                set("slug", slugifyInput(v));
              }}
            />
            <Field label="Excerpt">
              <AdminInput
                value={draft.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="One sentence shown on the blog index"
              />
            </Field>
            <RichTextEditor value={bodyText} onChange={setBodyText} />
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
                label="Feature this post on the Asset Intelligence Hub"
                helper="Only one post is featured at a time."
              />
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

            <PanelSection title="SEO">
              <Field label="Meta title" counter={{ value: (draft.metaTitle ?? "").length, limit: 60 }}>
                <AdminInput value={draft.metaTitle ?? ""} onChange={(e) => set("metaTitle", e.target.value)} />
              </Field>
              <Field
                label="Meta description"
                counter={{ value: (draft.metaDescription ?? "").length, limit: 160 }}
              >
                <AdminInput
                  value={draft.metaDescription ?? ""}
                  onChange={(e) => set("metaDescription", e.target.value)}
                />
              </Field>
            </PanelSection>

            <PanelSection title="Post details">
              <Field label="Category">
                <AdminSelect
                  value={draft.category}
                  onChange={(v) => set("category", v)}
                  options={hubTopics.filter((t) => t !== "All")}
                />
              </Field>
              <Field label="Tags" helper="Comma separated.">
                <AdminInput
                  value={(draft.tags ?? []).join(", ")}
                  onChange={(e) => set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
                />
              </Field>
              <Field label="Author">
                <AdminSelect
                  value={draft.author}
                  onChange={(v) => set("author", v)}
                  options={Array.from(new Set([...authors.map((a) => a.name), "Editorial", draft.author].filter(Boolean)))}
                />
              </Field>
              <Field label="Read time" helper="Calculated from the word count on save.">
                <AdminInput value={readTimeFor(bodyText)} readOnly />
              </Field>
            </PanelSection>

            <PanelSection title="Related posts">
              <PillPicker
                selected={draft.related}
                max={3}
                onChange={(v) => set("related", v)}
                placeholder="Add a related post"
                options={state.blogPosts
                  .filter((b) => b.status === "published" && b.id !== draft.id)
                  .map((b) => ({ id: b.id, title: b.title }))}
              />
            </PanelSection>
          </>
        }
      />
    </AdminShell>
  );
}
