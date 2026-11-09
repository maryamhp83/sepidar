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
} from "@/component/ui/dialog";
import { DeleteDepartmentDialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

export default function DeleteDepartmentDialog({
  data,
  onOpenChange,
  open,
}: DeleteDepartmentDialogProps) {
  const mutation = useMutation({
    mutationFn: async () => {
      // await onDelete(data.id);
    },
  });

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync();

      toast.success("دپارتمان با موفقیت حذف شد", {
        description: `دپارتمان «${data.name}» با موفقیت حذف شد.`,
      });

      onOpenChange?.(false);
    } catch {
      toast.error("حذف دپارتمان ناموفق بود", {
        description: `متأسفانه دپارتمان «${data.name}» حذف نشد. لطفاً دوباره تلاش کنید.`,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!mutation.isPending) {
          onOpenChange?.(open);
        }
      }}
    >
      <DialogContent showCloseButton={false} className={"p-0 gap-0"}>
        <DialogHeader className="border-b border-input p-6">
          <DialogTitle>حذف دپارتمان</DialogTitle>
          <DialogDescription>
            آیا از حذف دپارتمان «{data.name}» اطمینان دارید؟ این عملیات قابل
            بازگشت نیست.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-6">
          <DialogClose
            render={
              <Button
                variant={"secondary"}
                type="button"
                disabled={mutation.isPending}
              >
                انصراف
              </Button>
            }
          />

          <Button
            variant={"destructive"}
            disabled={mutation.isPending}
            onClick={handleDelete}
          >
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash />
            )}
            حذف دپارتمان
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
