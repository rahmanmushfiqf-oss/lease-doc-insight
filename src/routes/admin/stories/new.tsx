import { createFileRoute } from "@tanstack/react-router";

import { StoryEditor } from "@/components/admin/StoryEditor";

export const Route = createFileRoute("/admin/stories/new")({
  component: () => <StoryEditor />,
});
