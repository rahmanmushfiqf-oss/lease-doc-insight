import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
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
  FormatPill,
  Modal,
  Row,
  RowActions,
  StatusBadge,
  Table,
  TextAction,
} from "@/components/admin/ui";
import type { Guide } from "@/lib/content";
import { newId, useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/resources/")({
  component: ResourceList,
});

function ResourceList() {
  const { state, dispatch } = useAdmin();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [format, setFormat] = useState("All");
  const [category, setCategory] = useState("All");
  const [pendingDelete, setPendingDelete] = useState<Guide | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(state.resources.map((r) => r.category)))],
    [state.resources],
  );

  const rows = state.resources.filter(
    (r) =>
      r.title.toLowerCase().includes(q.toLowerCase()) &&
      (status === "All" || r.status === status.toLowerCase()) &&
      (format === "All" || r.format === format) &&
      (category === "All" || r.category === category),
  );

  return (
    <AdminShell
      title="Resources"
      action={
        <AdminLinkButton to="/admin/resources/new" variant="primary">
          New resource
        </AdminLinkButton>
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <AdminInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title" className="max-w-xs" />
        <AdminSelect value={status} onChange={setStatus} options={["All", "Draft", "Published"]} className="max-w-[150px]" />
        <AdminSelect value={format} onChange={setFormat} options={["All", "PDF", "Long Read", "Reference Guide"]} className="max-w-[180px]" />
        <AdminSelect value={category} onChange={setCategory} options={categories} className="max-w-[220px]" />
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-[rgba(26,26,26,0.08)] bg-white">
          <EmptyState
            icon={<BookOpen className="h-8 w-8" strokeWidth={1.4} />}
            heading="No resources"
            description="Publish the first guide or reference document."
            action={
              <AdminButton variant="primary" onClick={() => navigate({ to: "/admin/resources/new" })}>
                New resource
              </AdminButton>
            }
          />
        </div>
      ) : (
        <Table head={["Title", "Category", "Format", "Status", "Featured", ""]}>
          {rows.map((r) => (
            <Row key={r.id}>
              <Cell>
                <Link to="/admin/resources/$id" params={{ id: r.id }} className="font-medium hover:text-[#0340F3]">
                  {r.title}
                </Link>
              </Cell>
              <Cell className="text-[#6B6B6B]">{r.category}</Cell>
              <Cell>
                <FormatPill format={r.format} />
              </Cell>
              <Cell>
                <StatusBadge status={r.status} />
              </Cell>
              <Cell className="text-[#6B6B6B]">{r.isFeatured ? "Pinned" : ""}</Cell>
              <Cell>
                <RowActions>
                  <TextAction onClick={() => navigate({ to: "/admin/resources/$id", params: { id: r.id } })}>
                    Edit
                  </TextAction>
                  <TextAction
                    onClick={() => {
                      dispatch({
                        type: "upsert",
                        collection: "resources",
                        item: { ...r, id: newId(), slug: `${r.slug}-copy`, title: `${r.title} (copy)`, status: "draft", isFeatured: false },
                      });
                      toast.success("Duplicated as draft");
                    }}
                  >
                    Duplicate
                  </TextAction>
                  <TextAction tone="danger" onClick={() => setPendingDelete(r)}>
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
        title="Delete this resource?"
        footer={
          <>
            <AdminButton onClick={() => setPendingDelete(null)}>Cancel</AdminButton>
            <AdminButton
              variant="destructive"
              onClick={() => {
                if (pendingDelete) dispatch({ type: "remove", collection: "resources", id: pendingDelete.id });
                setPendingDelete(null);
                toast.success("Resource deleted");
              }}
            >
              Delete
            </AdminButton>
          </>
        }
      >
        {pendingDelete?.title} will be removed from the guides index.
      </Modal>
    </AdminShell>
  );
}
