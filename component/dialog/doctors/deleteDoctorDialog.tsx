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
import { deleteDoctor } from "@/lib/api/doctors";
import { DeleteDoctorDialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteDoctorDialog({
  className,
  data,
  refetch,
}: DeleteDoctorDialogProps) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => deleteDoctor(data?.id ?? ""),
    onSuccess: () => {
      toast.success("پزشک با موفقیت حذف شد", {
        description: `اطلاعات پزشک «${data?.fullName ?? "-"}» با موفقیت از سیستم حذف شد.`,
      });

      setOpen(false);
      refetch?.();
    },
    onError: () => {
      toast.error("حذف پزشک ناموفق بود", {
        description:
          "متأسفانه حذف اطلاعات پزشک انجام نشد. لطفاً دوباره تلاش کنید.",
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
          <DialogTitle>حذف پزشک</DialogTitle>
          <DialogDescription>
            آیا از حذف پزشک «{data?.fullName || "-"}» اطمینان دارید؟ این عملیات
            قابل بازگشت نیست.
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
            type="button"
            variant={"destructive"}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash />
            )}
            حذف پزشک
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
