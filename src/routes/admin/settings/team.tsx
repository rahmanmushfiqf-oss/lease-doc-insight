import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { SettingsLayout } from "@/components/admin/SettingsLayout";
import {
  AdminButton,
  AdminInput,
  AdminSelect,
  Cell,
  Field,
  Modal,
  Row,
  RowActions,
  RoleBadge,
  Table,
  TextAction,
} from "@/components/admin/ui";
import {
  createAdmin,
  listAdmins,
  removeAdmin,
  updateAdmin,
  type AdminAccount,
  type AdminRole,
} from "@/lib/admin-auth.functions";
import { useAdminSession } from "@/lib/admin-session";

export const Route = createFileRoute("/admin/settings/team")({
  component: Team,
});

const roles = ["owner", "admin", "editor"];

function Team() {
  const { account } = useAdminSession();
  const [members, setMembers] = useState<AdminAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "editor" as AdminRole, password: "" });
  const [pendingDelete, setPendingDelete] = useState<AdminAccount | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setMembers(await listAdmins());
    } catch {
      toast.error("Could not load the admin list.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const changeRole = async (member: AdminAccount, role: AdminRole) => {
    const res = await updateAdmin({ data: { userId: member.userId, role } });
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Access level updated");
    void load();
  };

  return (
    <SettingsLayout
      title="Team"
      action={
        <AdminButton variant="primary" onClick={() => setInviting(true)}>
          Add admin
        </AdminButton>
      }
    >
      <p className="text-[13px] leading-[1.6] text-[#6B6B6B]">
        Everyone here signs in with their own password and an emailed verification link. New admins must set
        their own password the first time they sign in.
      </p>

      <Table head={["Name", "Email", "Access", "First sign in", "Last sign in", ""]}>
        {members.map((m) => (
          <Row key={m.userId}>
            <Cell>{m.name || "Not set"}</Cell>
            <Cell className="text-[#6B6B6B]">{m.email}</Cell>
            <Cell>
              <div className="flex items-center gap-2">
                <AdminSelect
                  value={m.role}
                  onChange={(v) => void changeRole(m, v as AdminRole)}
                  options={roles}
                  className="max-w-[140px]"
                />
                <RoleBadge role={m.role} />
              </div>
            </Cell>
            <Cell className="text-[#6B6B6B]">
              {m.mustChangePassword ? "Password not set yet" : "Complete"}
            </Cell>
            <Cell className="text-[#6B6B6B]">
              {m.lastLoginAt ? new Date(m.lastLoginAt).toLocaleDateString() : "Never"}
            </Cell>
            <Cell>
              <RowActions>
                <TextAction
                  tone="danger"
                  onClick={() => setPendingDelete(m)}
                  disabled={m.userId === account?.userId}
                >
                  Remove
                </TextAction>
              </RowActions>
            </Cell>
          </Row>
        ))}
      </Table>
      {loading ? <p className="text-[13px] text-[#A0A0A0]">Loading...</p> : null}

      <Modal
        open={inviting}
        onClose={() => setInviting(false)}
        title="Add an admin"
        footer={
          <>
            <AdminButton onClick={() => setInviting(false)}>Cancel</AdminButton>
            <AdminButton
              variant="primary"
              disabled={!form.email || form.password.length < 10 || busy}
              onClick={async () => {
                setBusy(true);
                const res = await createAdmin({ data: form });
                setBusy(false);
                if (!res.ok) {
                  toast.error(res.error);
                  return;
                }
                setForm({ name: "", email: "", role: "editor", password: "" });
                setInviting(false);
                toast.success("Admin added. Share the temporary password with them.");
                void load();
              }}
            >
              {busy ? "Adding..." : "Add admin"}
            </AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Name">
            <AdminInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Email">
            <AdminInput value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <Field
            label="Temporary password"
            helper="At least 10 characters. They will be asked to replace it at first sign in, and they still need the emailed verification link."
          >
            <AdminInput
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Field>
          <Field label="Access level" helper="Editors manage content. Admins and owners also manage the team.">
            <AdminSelect
              value={form.role}
              onChange={(v) => setForm({ ...form, role: v as AdminRole })}
              options={roles}
            />
          </Field>
        </div>
      </Modal>

      <Modal
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        title="Remove this admin?"
        footer={
          <>
            <AdminButton onClick={() => setPendingDelete(null)}>Cancel</AdminButton>
            <AdminButton
              variant="destructive"
              onClick={async () => {
                if (!pendingDelete) return;
                const res = await removeAdmin({ data: { userId: pendingDelete.userId } });
                setPendingDelete(null);
                if (!res.ok) {
                  toast.error(res.error);
                  return;
                }
                toast.success("Admin removed");
                void load();
              }}
            >
              Remove
            </AdminButton>
          </>
        }
      >
        {pendingDelete?.name || pendingDelete?.email} will lose access immediately.
      </Modal>
    </SettingsLayout>
  );
}
