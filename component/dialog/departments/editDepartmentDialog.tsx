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
import {
  addNewDepartmentFormSchema,
  addNewDepartmentFormType,
} from "@/lib/formSchema";
import { EditDepartmentDialogProps } from "@/type/component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Pencil } from "lucide-react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";
import { updateDepartment } from "@/lib/api/departments";

export default function EditDepartmentDialog({
  data,
  open,
  onOpenChange,
  refetch,
}: EditDepartmentDialogProps) {
  const form = useForm<addNewDepartmentFormType>({
    resolver: zodResolver(addNewDepartmentFormSchema),
    defaultValues: {
      name: data?.name ?? "",
      description: data?.description ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: addNewDepartmentFormType) =>
      updateDepartment(formData, data?.id ?? ""),
  });

  const handleSubmit: SubmitHandler<addNewDepartmentFormType> = async (
    formData,
  ) => {
    try {
      await mutation.mutateAsync(formData);

      toast.success("دپارتمان با موفقیت ویرایش شد", {
        description: `اطلاعات دپارتمان «${formData.name}» با موفقیت به‌روزرسانی شد.`,
      });

      form.reset({
        name: "",
        description: "",
      });

      onOpenChange?.(false);
      refetch?.();
    } catch {
      toast.error("ویرایش دپارتمان ناموفق بود", {
        description: `متأسفانه اطلاعات دپارتمان «${formData.name}» به‌روزرسانی نشد. لطفاً دوباره تلاش کنید.`,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!form.formState.isSubmitting) {
          onOpenChange?.(open);
        }
      }}
    >
      <DialogContent showCloseButton={false} className={"p-0 gap-0"}>
        <DialogHeader className="border-b border-input p-6">
          <DialogTitle>ویرایش دپارتمان</DialogTitle>
          <DialogDescription>
            اطلاعات دپارتمان را ویرایش کنید.
          </DialogDescription>
        </DialogHeader>

        <form action="#" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-3 p-6">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>نام دپارتمان</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="مثلاً قلب و عروق"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>توضیحات</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="توضیحاتی درباره دپارتمان وارد کنید..."
                    rows={3}
                    className="resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <DialogFooter className="p-6 border-t border-input">
            <DialogClose
              render={
                <Button
                  variant={"secondary"}
                  type="button"
                  disabled={form.formState.isSubmitting}
                >
                  انصراف
                </Button>
              }
            />
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Pencil />
              )}
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
