import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/preview")({
  component: PreviewPage,
});

function PreviewPage() {
  return <div className="pt-20">Preview Page</div>;
}
