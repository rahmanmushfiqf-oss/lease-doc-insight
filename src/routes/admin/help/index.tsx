import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { useState } from "react";
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
import { formatDate, helpCategories, type HelpArticle } from "@/lib/content";
import { newId, useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/help/")({
  component: HelpList,
});

function HelpList() {
  const { state, dispatch } = useAdmin();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Recently Updated");
  const [pendingDelete, setPendingDelete] = useState<HelpArticle | null>(null);

  const rows = state.helpArticles
    .filter(
      (a) =>
        a.title.toLowerCase().includes(q.toLowerCase()) &&
        (category === "All" || a.category === category) &&
        (status === "All" || a.status === status.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "A to Z"
        ? a.title.localeCompare(b.title)
        : sort === "Oldest"
          ? a.updated.localeCompare(b.updated)
          : b.updated.localeCompare(a.updated),
    );

  return (
    <AdminShell
      title="Help Articles"
      action={
        <AdminLinkButton to="/admin/help/new" variant="primary">
          New article
        </AdminLinkButton>
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <AdminInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title" className="max-w-xs" />
        <AdminSelect
          value={category}
          onChange={setCategory}
          options={["All", ...(helpCategories as unknown as string[])]}
          className="max-w-[220px]"
        />
        <AdminSelect value={status} onChange={setStatus} options={["All", "Draft", "Published"]} className="max-w-[150px]" />
        <AdminSelect value={sort} onChange={setSort} options={["Recently Updated", "Oldest", "A to Z"]} className="max-w-[200px]" />
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-[rgba(26,26,26,0.08)] bg-white">
          <EmptyState
            icon={<LifeBuoy className="h-8 w-8" strokeWidth={1.4} />}
            heading="No help articles"
            description="Write the first article so customers can find an answer."
            action={
              <AdminButton variant="primary" onClick={() => navigate({ to: "/admin/help/new" })}>
                New article
              </AdminButton>
            }
          />
        </div>
      ) : (
        <Table head={["Title", "Category", "Popular", "Status", "Last updated", ""]}>
          {rows.map((a) => (
            <Row key={a.id}>
              <Cell>
                <Link to="/admin/help/$id" params={{ id: a.id }} className="font-medium hover:text-[#0340F3]">
                  {a.title}
                </Link>
              </Cell>
              <Cell className="text-[#6B6B6B]">{a.category}</Cell>
              <Cell className="text-[#6B6B6B]">{a.isFeatured ? "Yes" : ""}</Cell>
              <Cell>
                <StatusBadge status={a.status} />
              </Cell>
              <Cell className="text-[#6B6B6B]">{formatDate(a.updated)}</Cell>
              <Cell>
                <RowActions>
                  <TextAction onClick={() => navigate({ to: "/admin/help/$id", params: { id: a.id } })}>Edit</TextAction>
                  <TextAction
                    onClick={() => {
                      dispatch({
                        type: "upsert",
                        collection: "helpArticles",
                        item: { ...a, id: newId(), slug: `${a.slug}-copy`, title: `${a.title} (copy)`, status: "draft" },
                      });
                      toast.success("Duplicated as draft");
                    }}
                  >
                    Duplicate
                  </TextAction>
                  <TextAction tone="danger" onClick={() => setPendingDelete(a)}>
                    Delete
                  </TextAction>
                </RowActions>
              </Cell>
            </Row>
          ))}
        </Table>
      )}

      <Modal
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        title="Delete this article?"
        footer={
          <>
            <AdminButton onClick={() => setPendingDelete(null)}>Cancel</AdminButton>
            <AdminButton
              variant="destructive"
              onClick={() => {
                if (pendingDelete) dispatch({ type: "remove", collection: "helpArticles", id: pendingDelete.id });
                setPendingDelete(null);
                toast.success("Article deleted");
              }}
            >
              Delete
            </AdminButton>
          </>
        }
      >
        {pendingDelete?.title} will be removed from the Help Centre.
      </Modal>
    </AdminShell>
  );
}
