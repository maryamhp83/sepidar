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
import { deleteInvoice } from "@/lib/api/invoices";
import { DeleteInvoiceDialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteInvoiceDialog({
  data,
  refetch,
}: DeleteInvoiceDialogProps) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => deleteInvoice(data?.id ?? ""),
    onSuccess: () => {
      toast.success("فاکتور با موفقیت حذف شد", {
        description: `فاکتور بیمار «${data?.fullName ?? "-"}» با موفقیت از سیستم حذف شد.`,
      });

      setOpen(false);
      refetch?.();
    },
    onError: () => {
      toast.error("حذف فاکتور ناموفق بود", {
        description: "متأسفانه حذف فاکتور انجام نشد. لطفاً دوباره تلاش کنید.",
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
          <DialogTitle>حذف فاکتور</DialogTitle>
          <DialogDescription>
            آیا از حذف فاکتور بیمار «{data?.fullName ?? "-"}» اطمینان دارید؟ این
            عملیات قابل بازگشت نیست.
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
            حذف فاکتور
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
