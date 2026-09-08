import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { SettingsLayout } from "@/components/admin/SettingsLayout";
import { AdminButton, AdminInput, AdminTextarea, Field, Panel, PanelSection, Toggle } from "@/components/admin/ui";
import { useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/settings/forms")({
  component: Forms,
});

const fields = [
  "Name",
  "Work email",
  "Company",
  "Role",
  "Portfolio size",
  "Use case",
];

function Forms() {
  const { state, dispatch } = useAdmin();
  const [form, setForm] = useState(state.settings);
  const [required, setRequired] = useState<Record<string, boolean>>({
    Name: true,
    "Work email": true,
    Company: true,
    Role: false,
    "Portfolio size": false,
    "Use case": false,
  });

  return (
    <SettingsLayout
      title="Forms"
      action={
        <AdminButton
          variant="primary"
          onClick={() => {
            dispatch({ type: "settings", settings: form });
            toast.success("Form settings saved");
          }}
        >
          Save changes
        </AdminButton>
      }
    >
      <Panel>
        <PanelSection title="Demo request form">
          <Toggle
            checked={form.formsEnabled}
            onChange={(v) => setForm({ ...form, formsEnabled: v })}
            label="Accept new submissions"
            helper="When off, the form shows a short message instead of the fields."
          />
          <Field label="Notification email" helper="Where new submissions are sent.">
            <AdminInput value={form.formsEmail} onChange={(e) => setForm({ ...form, formsEmail: e.target.value })} />
          </Field>
          <Field label="Confirmation message">
            <AdminTextarea
              rows={3}
              value={form.formsConfirmation}
              onChange={(e) => setForm({ ...form, formsConfirmation: e.target.value })}
            />
          </Field>
        </PanelSection>

        <PanelSection title="Fields">
          <div className="space-y-3">
            {fields.map((f) => (
              <Toggle
                key={f}
                checked={!!required[f]}
                onChange={(v) => setRequired({ ...required, [f]: v })}
                label={`${f} is required`}
              />
            ))}
          </div>
        </PanelSection>
      </Panel>
    </SettingsLayout>
  );
}
