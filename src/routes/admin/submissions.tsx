import { createFileRoute } from "@tanstack/react-router";
import { Inbox } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminButton,
  AdminInput,
  AdminSelect,
  Cell,
  EmptyState,
  Modal,
  Row,
  RowActions,
  Table,
  TextAction,
} from "@/components/admin/ui";
import { useAdmin, type FormSubmission } from "@/lib/admin-store";
import { formatDate } from "@/lib/content";

export const Route = createFileRoute("/admin/submissions")({
  component: Submissions,
});

function Submissions() {
  const { state, dispatch } = useAdmin();
  const [q, setQ] = useState("");
  const [useCase, setUseCase] = useState("All");
  const [size, setSize] = useState("All");
  const [viewing, setViewing] = useState<FormSubmission | null>(null);
  const [pendingDelete, setPendingDelete] = useState<FormSubmission | null>(null);

  const useCases = ["All", ...Array.from(new Set(state.formSubmissions.map((s) => s.useCase)))];
  const sizes = ["All", ...Array.from(new Set(state.formSubmissions.map((s) => s.portfolioSize)))];

  const rows = state.formSubmissions.filter(
    (s) =>
      (s.name + s.email).toLowerCase().includes(q.toLowerCase()) &&
      (useCase === "All" || s.useCase === useCase) &&
      (size === "All" || s.portfolioSize === size),
  );

  const exportCsv = () => {
    const header = ["Name", "Email", "Company", "Role", "Portfolio size", "Use case", "Date"];
    const body = rows.map((r) => [r.name, r.email, r.company, r.role, r.portfolioSize, r.useCase, r.date]);
    const csv = [header, ...body].map((line) => line.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-submissions.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  return (
    <AdminShell
      title="Form Submissions"
      action={
        <AdminButton onClick={exportCsv} disabled={rows.length === 0}>
          Export CSV
        </AdminButton>
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <AdminInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or email" className="max-w-xs" />
        <AdminSelect value={useCase} onChange={setUseCase} options={useCases} className="max-w-[220px]" />
        <AdminSelect value={size} onChange={setSize} options={sizes} className="max-w-[200px]" />
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-[rgba(26,26,26,0.08)] bg-white">
          <EmptyState
            icon={<Inbox className="h-8 w-8" strokeWidth={1.4} />}
            heading="No submissions"
            description="Demo requests from the website will appear here."
          />
        </div>
      ) : (
        <Table head={["Name", "Email", "Company", "Role", "Portfolio size", "Use case", "Date", ""]}>
          {rows.map((s) => (
            <Row key={s.id}>
              <Cell>{s.name}</Cell>
              <Cell className="text-[#6B6B6B]">{s.email}</Cell>
              <Cell className="text-[#6B6B6B]">{s.company}</Cell>
              <Cell className="text-[#6B6B6B]">{s.role}</Cell>
              <Cell className="text-[#6B6B6B]">{s.portfolioSize}</Cell>
              <Cell className="text-[#6B6B6B]">{s.useCase}</Cell>
              <Cell className="text-[#6B6B6B]">{formatDate(s.date)}</Cell>
              <Cell>
                <RowActions>
                  <TextAction onClick={() => setViewing(s)}>View</TextAction>
                  <TextAction tone="danger" onClick={() => setPendingDelete(s)}>
                    Delete
                  </TextAction>
                </RowActions>
              </Cell>
            </Row>
          ))}
        </Table>
      )}

      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Submission">
        {viewing && (
          <dl className="grid grid-cols-[130px_1fr] gap-y-3 text-[13px]">
            {[
              ["Name", viewing.name],
              ["Email", viewing.email],
              ["Company", viewing.company],
              ["Role", viewing.role],
              ["Portfolio size", viewing.portfolioSize],
              ["Use case", viewing.useCase],
              ["Date", formatDate(viewing.date)],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-[#A0A0A0]">{k}</dt>
                <dd className="text-[#1C1C1C]">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </Modal>

      <Modal
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        title="Delete this submission?"
        footer={
          <>
            <AdminButton onClick={() => setPendingDelete(null)}>Cancel</AdminButton>
            <AdminButton
              variant="destructive"
              onClick={() => {
                if (pendingDelete) dispatch({ type: "removeSubmission", id: pendingDelete.id });
                setPendingDelete(null);
                toast.success("Submission deleted");
              }}
            >
              Delete
            </AdminButton>
          </>
        }
      >
        This record will be permanently removed.
      </Modal>
    </AdminShell>
  );
}
