import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/details")({
  component: DetailsPage,
});

function DetailsPage() {
  return <div className="pt-20">Details Page</div>;
}
