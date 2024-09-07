import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted/40">
      <LoaderCircle className="h-8 w-8 animate-spin" />
    </div>
  );
}
