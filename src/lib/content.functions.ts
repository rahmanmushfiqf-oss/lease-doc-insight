import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type ContentCollection = "blogPosts" | "resources" | "customerStories" | "helpArticles";

export type ContentSnapshot = {
  items: Array<{ id: string; collection: ContentCollection; status: string; data: Record<string, JsonValue> }>;
  visibility: Array<{ id: string; collection: ContentCollection; status: string; deleted: boolean }>;
};

export const getPublishedContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<ContentSnapshot> => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"];
    if (!url || !key) return { items: [], visibility: [] };

    const client = createClient(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const [itemsRes, visibilityRes] = await Promise.all([
      client.from("content_items").select("id, collection, status, data"),
      client.from("content_visibility").select("id, collection, status, deleted"),
    ]);

    return {
      items: (itemsRes.data ?? []) as ContentSnapshot["items"],
      visibility: (visibilityRes.data ?? []) as ContentSnapshot["visibility"],
    };
  },
);
