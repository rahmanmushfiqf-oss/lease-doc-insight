import { createFileRoute } from "@tanstack/react-router";

import { ResourceEditor } from "@/components/admin/ResourceEditor";

export const Route = createFileRoute("/admin/resources/$id")({
  component: () => {
    const { id } = Route.useParams();
    return <ResourceEditor id={id} />;
  },
});
