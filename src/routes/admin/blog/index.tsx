import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminButton,
  AdminInput,
  AdminLinkButton,
  AdminSelect,
  Cell,
  EmptyState,
  Modal,
  Row,
  RowActions,
  StatusBadge,
  Table,
  TextAction,
} from "@/components/admin/ui";
import { formatDate, type BlogPost } from "@/lib/content";
import { newId, useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/blog/")({
  component: BlogList,
});

const PER_PAGE = 20;

function BlogList() {
  const { state, dispatch } = useAdmin();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<BlogPost | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(state.blogPosts.map((b) => b.category)))],
    [state.blogPosts],
  );

  const rows = useMemo(() => {
    let list = state.blogPosts.filter((b) => b.title.toLowerCase().includes(q.toLowerCase()));
    if (status !== "All") list = list.filter((b) => b.status === status.toLowerCase());
    if (category !== "All") list = list.filter((b) => b.category === category);
    return list.sort((a, b) =>
      sort === "A to Z"
        ? a.title.localeCompare(b.title)
        : sort === "Oldest"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date),
    );
  }, [state.blogPosts, q, status, category, sort]);

  const pages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
  const view = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const duplicate = (post: BlogPost) => {
    dispatch({
      type: "upsert",
      collection: "blogPosts",
      item: { ...post, id: newId(), slug: `${post.slug}-copy`, title: `${post.title} (copy)`, status: "draft", isFeatured: false },
    });
    toast.success("Duplicated as draft");
  };

  return (
    <AdminShell
      title="Blog Posts"
      action={
        <AdminLinkButton to="/admin/blog/new" variant="primary">
          New post
        </AdminLinkButton>
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <AdminInput
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          placeholder="Search by title"
          className="max-w-xs"
        />
        <AdminSelect value={status} onChange={setStatus} options={["All", "Draft", "Scheduled", "Published"]} className="max-w-[160px]" />
        <AdminSelect value={category} onChange={setCategory} options={categories} className="max-w-[200px]" />
        <AdminSelect value={sort} onChange={setSort} options={["Newest", "Oldest", "A to Z"]} className="max-w-[150px]" />
      </div>

      {view.length === 0 ? (
        <div className="rounded-xl border border-[rgba(26,26,26,0.08)] bg-white">
          <EmptyState
            icon={<FileText className="h-8 w-8" strokeWidth={1.4} />}
            heading="No blog posts"
            description="Nothing matches this view yet. Write the first piece."
            action={
              <AdminButton variant="primary" onClick={() => navigate({ to: "/admin/blog/new" })}>
                New post
              </AdminButton>
            }
          />
        </div>
      ) : (
        <Table head={["Title", "Category", "Status", "Publish date", "Last edited", ""]}>
          {view.map((post) => (
            <Row key={post.id}>
              <Cell>
                <Link
                  to="/admin/blog/$id"
                  params={{ id: post.id }}
                  className="font-medium text-[#1C1C1C] hover:text-[#0340F3]"
                >
                  {post.title}
                </Link>
              </Cell>
              <Cell className="text-[#6B6B6B]">{post.category}</Cell>
              <Cell>
                <StatusBadge status={post.status} />
              </Cell>
              <Cell className="text-[#6B6B6B]">{formatDate(post.date)}</Cell>
              <Cell className="text-[#6B6B6B]">{formatDate(post.date)}</Cell>
              <Cell>
                <RowActions>
                  <TextAction onClick={() => navigate({ to: "/admin/blog/$id", params: { id: post.id } })}>
                    Edit
                  </TextAction>
                  <TextAction onClick={() => duplicate(post)}>Duplicate</TextAction>
                  <TextAction tone="danger" onClick={() => setPendingDelete(post)}>
                    Delete
                  </TextAction>
                </RowActions>
              </Cell>
            </Row>
          ))}
        </Table>
      )}

      {pages > 1 ? (
        <div className="mt-4 flex gap-1">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={
                n === page
                  ? "rounded-md bg-[#0340F3] px-3 py-1.5 text-[13px] font-medium text-white"
                  : "rounded-md px-3 py-1.5 text-[13px] text-[#6B6B6B] hover:bg-[#F5F5F5]"
              }
            >
              {n}
            </button>
          ))}
        </div>
      ) : null}

      <Modal
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        title="Delete this post?"
        footer={
          <>
            <AdminButton onClick={() => setPendingDelete(null)}>Cancel</AdminButton>
            <AdminButton
              variant="destructive"
              onClick={() => {
                if (pendingDelete) dispatch({ type: "remove", collection: "blogPosts", id: pendingDelete.id });
                setPendingDelete(null);
                toast.success("Post deleted");
              }}
            >
              Delete
            </AdminButton>
          </>
        }
      >
        {pendingDelete?.title} will be removed from the admin panel and the public site.
      </Modal>
    </AdminShell>
  );
}
