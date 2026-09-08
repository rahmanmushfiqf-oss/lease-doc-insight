import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/customer-stories")({
  component: () => <Outlet />,
});
