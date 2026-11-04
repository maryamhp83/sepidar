"use client";

import { account } from "@/lib/api/client";
import { Button } from "@/component/ui/button";
import { toast } from "sonner";
import MainLayout from "@/component/layout/mainLayout";

export default function HomePage() {
  return (
    <MainLayout>
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
    </MainLayout>
  );
}
