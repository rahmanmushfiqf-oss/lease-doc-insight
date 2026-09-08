import { supabase } from "@/integrations/supabase/client";

export type ContentCollection = "blogPosts" | "resources" | "customerStories" | "helpArticles";

type AnyItem = { id: string; status?: string } & Record<string, unknown>;

const rowId = (collection: ContentCollection, id: string) => `${collection}-${id}`;

// Reads every item, drafts included. Only signed in admin users can do this.
export async function fetchAdminContent(): Promise<{
  items: Partial<Record<ContentCollection, AnyItem[]>>;
  removed: Set<string>;
}> {
  const { data, error } = await supabase
    .from("content_items" as never)
    .select("collection, status, deleted, data")
    .order("updated_at", { ascending: false });

  if (error) throw error;

  const grouped: Partial<Record<ContentCollection, AnyItem[]>> = {};
  for (const row of (data ?? []) as unknown as Array<{
    collection: ContentCollection;
    status: string;
    deleted: boolean;
    data: AnyItem;
  }>) {
    if (!row?.data || row.deleted) continue;
    (grouped[row.collection] ??= []).push({ ...row.data, status: row.status });
  }
  const removed = new Set(
    ((data ?? []) as unknown as Array<{ collection: ContentCollection; deleted: boolean; data: AnyItem }>)
      .filter((row) => row.deleted && row.data)
      .map((row) => `${row.collection}:${row.data.id}`),
  );

  return { items: grouped, removed };
}

export async function saveContentItem(collection: ContentCollection, item: AnyItem) {
  const { error } = await supabase.from("content_items" as never).upsert(
    {
      id: rowId(collection, item.id),
      collection,
      status: item.status ?? "draft",
      deleted: false,
      data: item,
    } as never,
    { onConflict: "id" },
  );
  if (error) throw error;
}

// Seed items are marked as removed rather than deleted, so the built in copy
// stops showing on the public site too.
export async function removeContentItem(collection: ContentCollection, item: AnyItem) {
  const { error } = await supabase.from("content_items" as never).upsert(
    {
      id: rowId(collection, item.id),
      collection,
      status: "draft",
      deleted: true,
      data: item,
    } as never,
    { onConflict: "id" },
  );
  if (error) throw error;
}
