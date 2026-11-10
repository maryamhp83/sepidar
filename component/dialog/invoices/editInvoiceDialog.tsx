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
import {
  AddNewInvoiceFormSchema,
  AddNewInvoiceFormType,
} from "@/lib/formSchema";
import { EditInvoiceDialogProps } from "@/type/component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Pen } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";

export default function EditInvoiceDialog({ data }: EditInvoiceDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<AddNewInvoiceFormType>({
    resolver: zodResolver(AddNewInvoiceFormSchema),
    defaultValues: {
      fullName: data.fullName,
      description: data.description,
      totalPrice: data.totalPrice,
      payed: data.payed,
      status: data.status,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: AddNewInvoiceFormType) => {
      // await onSubmit(data);
    },
  });

  const handleSubmit: SubmitHandler<AddNewInvoiceFormType> = async (data) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("فاکتور با موفقیت ویرایش شد", {
        description: `اطلاعات فاکتور بیمار «${data.fullName}» با موفقیت به‌روزرسانی شد.`,
      });

      setOpen(false);
    } catch {
      toast.error("ویرایش فاکتور ناموفق بود", {
        description: `متأسفانه اطلاعات فاکتور بیمار «${data.fullName}» به‌روزرسانی نشد. لطفاً دوباره تلاش کنید.`,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!form.formState.isSubmitting) {
          setOpen(open);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button size="icon" variant="outline">
            <Pen />
          </Button>
        }
      />

      <DialogContent showCloseButton={false} className="p-0 gap-0">
        <DialogHeader className="border-b border-input p-6">
          <DialogTitle>ویرایش فاکتور</DialogTitle>
          <DialogDescription>
            اطلاعات بیمار و جزئیات مالی فاکتور را ویرایش کنید.
          </DialogDescription>
        </DialogHeader>

        <form action="#" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 p-6">
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    نام و نام خانوادگی بیمار
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="مثلاً علی رضایی"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="totalPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>مبلغ کل (تومان)</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    min={1}
                    placeholder="مثلاً ۵۰۰۰۰۰۰"
                    value={field.value}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? 0
                          : Number(event.target.value),
                      )
                    }
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="payed"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="sm:col-span-2"
                >
                  <FieldLabel htmlFor={field.name}>
                    مبلغ پرداخت‌شده (تومان)
                  </FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    min={0}
                    placeholder="مثلاً ۲۰۰۰۰۰۰"
                    value={field.value}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? 0
                          : Number(event.target.value),
                      )
                    }
                    aria-invalid={fieldState.invalid}
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
                <Field
                  data-invalid={fieldState.invalid}
                  className="sm:col-span-2"
                >
                  <FieldLabel htmlFor={field.name}>توضیحات فاکتور</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder="توضیحات مربوط به فاکتور را وارد کنید..."
                    rows={4}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <DialogFooter className="mt-6 p-6 border-t border-input">
            <DialogClose
              render={
                <Button
                  variant="secondary"
                  type="button"
                  disabled={form.formState.isSubmitting}
                >
                  انصراف
                </Button>
              }
            />

            <Button
              className="w-full sm:w-auto"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Pen />
              )}
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
