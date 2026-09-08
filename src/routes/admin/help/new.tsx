import { createFileRoute } from "@tanstack/react-router";

import { HelpEditor } from "@/components/admin/HelpEditor";

export const Route = createFileRoute("/admin/help/new")({
  component: () => <HelpEditor />,
});
