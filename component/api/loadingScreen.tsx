import { LoadingScreenProps } from "@/type/component";
import { Loader2 } from "lucide-react";
import { cn } from "cn";

export default function LoadingScreen({ className }: LoadingScreenProps) {
  return (
    <div
      className={cn("flex min-h-dvh items-center justify-center", className)}
      role="status"
    >
      <Loader2
        className="size-7 animate-spin text-primary"
        aria-hidden="true"
      />
    </div>
  );
}
