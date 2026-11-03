"use client";

import { account } from "@/lib/api/client";
import { Button } from "@/component/ui/button";
import { toast } from "sonner";
import AuthGuard from "@/component/guard/authGuard";

export default function HomePage() {
  return (
    <AuthGuard mode="auth-only">
      <section>
        <main>
          <Button
            onClick={async () => {
              const promise = account.deleteSession({
                sessionId: "current",
              });

              toast.promise(promise, {
                loading: "Loading...",
                success: "CUK",
                error: "Error",
              });
            }}
          >
            LOG OUT
          </Button>
        </main>
      </section>
    </AuthGuard>
  );
}
