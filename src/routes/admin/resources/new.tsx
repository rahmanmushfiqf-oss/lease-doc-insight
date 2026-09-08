import { createFileRoute } from "@tanstack/react-router";

import { ResourceEditor } from "@/components/admin/ResourceEditor";

export const Route = createFileRoute("/admin/resources/new")({
  component: () => <ResourceEditor />,
});
