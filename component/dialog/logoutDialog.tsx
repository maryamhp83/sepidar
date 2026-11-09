"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppwriteException } from "appwrite";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { account } from "@/lib/api/client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogProps } from "@/type/component";

export default function LogoutDialog({ open, onOpenChange }: DialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      account.deleteSession({
        sessionId: "current",
      }),

    onSuccess: () => {
      queryClient.setQueryData(["auth", "current-user"], null);

      queryClient.removeQueries({
        queryKey: ["auth"],
      });
    },
  });

  const handleLogout = async () => {
    try {
      await mutation.mutateAsync();

      toast.success("عملیات موفقیت آمیز بود", {
        description: "با موفقیت از حساب کاربری خارج شدید.",
      });

      onOpenChange?.(false);
      router.replace("/");
    } catch (err) {
      const error = err as AppwriteException;

      toast.error("خطایی رخ داد", {
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            از حساب کاربری خود خارج می‌شوید؟
          </DialogTitle>

          <DialogDescription>
            از حساب کاربری فعلی خارج خواهید شد و به صفحه اصلی منتقل می‌شوید.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            render={
              <Button
                type="button"
                variant="outline"
                disabled={mutation.isPending}
              >
                انصراف
              </Button>
            }
          />
          <Button
            type="button"
            variant="destructive"
            disabled={mutation.isPending}
            onClick={handleLogout}
          >
            {mutation.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogOut className="size-4" />
            )}
            خروج از حساب
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
