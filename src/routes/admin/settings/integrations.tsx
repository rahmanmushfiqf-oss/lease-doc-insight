import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { SettingsLayout } from "@/components/admin/SettingsLayout";
import { AdminButton, AdminInput, AdminTextarea, Field, Panel, PanelSection, Toggle } from "@/components/admin/ui";
import { useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/settings/integrations")({
  component: Integrations,
});

function Integrations() {
  const { state, dispatch } = useAdmin();
  const [form, setForm] = useState(state.settings);

  return (
    <SettingsLayout
      title="Integrations"
      action={
        <AdminButton
          variant="primary"
          onClick={() => {
            dispatch({ type: "settings", settings: form });
            toast.success("Integrations saved");
          }}
        >
          Save changes
        </AdminButton>
      }
    >
      <Panel>
        <PanelSection title="Analytics and CRM">
          <Field label="Google Analytics measurement ID">
            <AdminInput
              value={form.googleAnalytics}
              onChange={(e) => setForm({ ...form, googleAnalytics: e.target.value })}
              placeholder="G-XXXXXXXXXX"
            />
          </Field>
          <Field label="HubSpot portal ID">
            <AdminInput value={form.hubspot} onChange={(e) => setForm({ ...form, hubspot: e.target.value })} />
          </Field>
          <Field label="Zapier webhook URL" helper="New form submissions are posted to this URL.">
            <AdminInput value={form.zapierWebhook} onChange={(e) => setForm({ ...form, zapierWebhook: e.target.value })} />
          </Field>
        </PanelSection>

        <PanelSection title="Chat">
          <Toggle
            checked={form.chatWidget}
            onChange={(v) => setForm({ ...form, chatWidget: v })}
            label="Enable the website chat widget"
          />
        </PanelSection>

        <PanelSection title="Custom scripts">
          <Field label="Head scripts">
            <AdminTextarea rows={4} value={form.headScripts} onChange={(e) => setForm({ ...form, headScripts: e.target.value })} />
          </Field>
          <Field label="Body scripts">
            <AdminTextarea rows={4} value={form.bodyScripts} onChange={(e) => setForm({ ...form, bodyScripts: e.target.value })} />
          </Field>
        </PanelSection>
      </Panel>
    </SettingsLayout>
  );
}
