"use client";

import { Button } from "@/component/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/component/ui/dialog";
import { deleteBed } from "@/lib/api/beds";
import { DeleteBedDialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteBedDialog({
  data,
  refetch,
}: DeleteBedDialogProps) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => deleteBed(data?.id ?? "-"),
    onSuccess: () => {
      toast.success("بستری با موفقیت حذف شد", {
        description: `اطلاعات بستری بیمار «${data?.fullName ?? "-"}» با موفقیت از سیستم حذف شد.`,
      });

      setOpen(false);
      refetch?.();
    },
    onError: () => {
      toast.error("حذف بستری ناموفق بود", {
        description:
          "متأسفانه حذف اطلاعات بستری انجام نشد. لطفاً دوباره تلاش کنید.",
      });
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!mutation.isPending) {
          setOpen(nextOpen);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button size="icon" variant="destructive">
            <Trash />
          </Button>
        }
      />

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>حذف اطلاعات بستری</DialogTitle>
          <DialogDescription>
            آیا از حذف اطلاعات بستری بیمار «{data?.fullName ?? "-"}» اطمینان
            دارید؟ این عملیات قابل بازگشت نیست.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                variant="secondary"
                type="button"
                disabled={mutation.isPending}
              >
                انصراف
              </Button>
            }
          />

          <Button
            disabled={mutation.isPending}
            type="button"
            variant="destructive"
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash />
            )}
            حذف بستری
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
