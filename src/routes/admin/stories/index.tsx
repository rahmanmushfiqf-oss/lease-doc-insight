import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Quote } from "lucide-react";
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
import type { CustomerStory } from "@/lib/content";
import { newId, useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/stories/")({
  component: StoryList,
});

function StoryList() {
  const { state, dispatch } = useAdmin();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [pendingDelete, setPendingDelete] = useState<CustomerStory | null>(null);

  const rows = state.customerStories.filter(
    (s) =>
      (s.organisation + s.outcome).toLowerCase().includes(q.toLowerCase()) &&
      (status === "All" || s.status === status.toLowerCase()),
  );

  return (
    <AdminShell
      title="Customer Stories"
      action={
        <AdminLinkButton to="/admin/stories/new" variant="primary">
          New story
        </AdminLinkButton>
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <AdminInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title or organisation type"
          className="max-w-sm"
        />
        <AdminSelect value={status} onChange={setStatus} options={["All", "Draft", "Published"]} className="max-w-[150px]" />
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-[rgba(26,26,26,0.08)] bg-white">
          <EmptyState
            icon={<Quote className="h-8 w-8" strokeWidth={1.4} />}
            heading="No customer stories"
            description="Publish the first story to show outcomes in practice."
            action={
              <AdminButton variant="primary" onClick={() => navigate({ to: "/admin/stories/new" })}>
                New story
              </AdminButton>
            }
          />
        </div>
      ) : (
        <Table head={["Outcome", "Organisation type", "Sector", "Status", ""]}>
          {rows.map((s) => (
            <Row key={s.id}>
              <Cell>
                <Link to="/admin/stories/$id" params={{ id: s.id }} className="font-medium hover:text-[#0340F3]">
                  {s.outcome}
                </Link>
              </Cell>
              <Cell className="text-[#6B6B6B]">{s.organisation}</Cell>
              <Cell className="text-[#6B6B6B]">{s.sector}</Cell>
              <Cell>
                <StatusBadge status={s.status} />
              </Cell>
              <Cell>
                <RowActions>
                  <TextAction onClick={() => navigate({ to: "/admin/stories/$id", params: { id: s.id } })}>
                    Edit
                  </TextAction>
                  <TextAction
                    onClick={() => {
                      dispatch({
                        type: "upsert",
                        collection: "customerStories",
                        item: { ...s, id: newId(), slug: `${s.slug}-copy`, status: "draft" },
                      });
                      toast.success("Duplicated as draft");
                    }}
                  >
                    Duplicate
                  </TextAction>
                  <TextAction tone="danger" onClick={() => setPendingDelete(s)}>
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
        title="Delete this story?"
        footer={
          <>
            <AdminButton onClick={() => setPendingDelete(null)}>Cancel</AdminButton>
            <AdminButton
              variant="destructive"
              onClick={() => {
                if (pendingDelete) dispatch({ type: "remove", collection: "customerStories", id: pendingDelete.id });
                setPendingDelete(null);
                toast.success("Story deleted");
              }}
            >
              Delete
            </AdminButton>
          </>
        }
      >
        This story will be removed from the customer stories index.
      </Modal>
    </AdminShell>
  );
}
