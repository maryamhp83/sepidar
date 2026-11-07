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
import { DeletePatientDialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeletePatientDialog({
  className,
  data,
}: DeletePatientDialogProps) {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async () => {
      // await onSubmit();
    },
    onSuccess: () => {
      toast.success("بیمار با موفقیت حذف شد", {
        description: `اطلاعات بیمار (${data.fullName}) با موفقیت از سیستم حذف شد.`,
      });

      setOpen(false);
    },
    onError: () => {
      toast.error("حذف بیمار ناموفق بود", {
        description:
          "متأسفانه حذف اطلاعات بیمار انجام نشد. لطفاً دوباره تلاش کنید.",
      });
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!mutation.isPending) {
          setOpen(open);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button size={"icon"} className={className} variant={"destructive"}>
            <Trash />
          </Button>
        }
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>حذف بیمار</DialogTitle>
          <DialogDescription>
            آیا از حذف این بیمار اطمینان دارید؟ این عملیات قابل بازگشت نیست.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
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
            disabled={mutation.isPending}
            type="submit"
            variant={"destructive"}
            onClick={async () => mutation.mutateAsync()}
          >
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash />
            )}
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
