import { createFileRoute } from "@tanstack/react-router";

import { HelpEditor } from "@/components/admin/HelpEditor";

export const Route = createFileRoute("/admin/help/$id")({
  component: () => {
    const { id } = Route.useParams();
    return <HelpEditor id={id} />;
  },
});
