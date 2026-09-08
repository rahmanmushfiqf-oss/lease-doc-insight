import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { SettingsLayout } from "@/components/admin/SettingsLayout";
import { AdminButton, AdminInput, AdminTextarea, Field, Panel, PanelSection } from "@/components/admin/ui";
import { useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/settings/seo")({
  component: Seo,
});

function Seo() {
  const { state, dispatch } = useAdmin();
  const [form, setForm] = useState(state.settings);

  return (
    <SettingsLayout
      title="SEO"
      action={
        <AdminButton
          variant="primary"
          onClick={() => {
            dispatch({ type: "settings", settings: form });
            toast.success("SEO settings saved");
          }}
        >
          Save changes
        </AdminButton>
      }
    >
      <Panel>
        <PanelSection title="Defaults">
          <Field label="Default meta title suffix" counter={{ value: form.metaSuffix.length, limit: 60 }}>
            <AdminInput value={form.metaSuffix} onChange={(e) => setForm({ ...form, metaSuffix: e.target.value })} />
          </Field>
          <Field label="Default meta description" counter={{ value: form.metaDescription.length, limit: 160 }}>
            <AdminTextarea
              rows={3}
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            />
          </Field>
        </PanelSection>

        <PanelSection title="Crawling">
          <Field label="robots.txt" helper="Served at Leasedrop/robots.txt.">
            <AdminTextarea rows={5} value={form.robots} onChange={(e) => setForm({ ...form, robots: e.target.value })} />
          </Field>
          <p className="text-[12px] text-[#A0A0A0]">
            The sitemap is generated automatically from published pages at Leasedrop/sitemap.xml.
          </p>
        </PanelSection>

        <PanelSection title="Verification">
          <Field label="Google Analytics measurement ID">
            <AdminInput
              value={form.googleAnalytics}
              onChange={(e) => setForm({ ...form, googleAnalytics: e.target.value })}
              placeholder="G-XXXXXXXXXX"
            />
          </Field>
          <Field label="Google Search Console verification">
            <AdminInput value={form.searchConsole} onChange={(e) => setForm({ ...form, searchConsole: e.target.value })} />
          </Field>
        </PanelSection>
      </Panel>
    </SettingsLayout>
  );
}
