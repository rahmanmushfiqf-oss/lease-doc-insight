import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { SettingsLayout } from "@/components/admin/SettingsLayout";
import { AdminButton, AdminInput, AdminTextarea, Field, Panel } from "@/components/admin/ui";
import { useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/settings/general")({
  component: General,
});

function General() {
  const { state, dispatch } = useAdmin();
  const [form, setForm] = useState(state.settings);

  return (
    <SettingsLayout
      title="General"
      action={
        <AdminButton
          variant="primary"
          onClick={() => {
            dispatch({ type: "settings", settings: form });
            toast.success("Settings saved");
          }}
        >
          Save changes
        </AdminButton>
      }
    >
      <Panel>
        <div className="space-y-4">
          <Field label="Site name">
            <AdminInput value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} />
          </Field>
          <Field label="Default meta title suffix" helper="Appended to page titles across the site.">
            <AdminInput value={form.metaSuffix} onChange={(e) => setForm({ ...form, metaSuffix: e.target.value })} />
          </Field>
          <Field label="Default meta description" counter={{ value: form.metaDescription.length, limit: 160 }}>
            <AdminTextarea
              rows={3}
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            />
          </Field>
          <Field label="Footer text">
            <AdminInput value={form.footerText} onChange={(e) => setForm({ ...form, footerText: e.target.value })} />
          </Field>
        </div>
      </Panel>
    </SettingsLayout>
  );
}
