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
  addNewPatientFormSchema,
  addNewPatientFormType,
} from "@/lib/formSchema";
import { EditPatientDialogProps } from "@/type/component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Pen } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";

export const departments = [
  "قلب و عروق",
  "داخلی",
  "ارتوپد",
  "اطفال",
  "مغز و اعصاب",
  "اورژانسی",
] as const;

export const statuses = ["فعال", "غیر فعال", "در انتظار"] as const;

export default function EditPatientDialog({
  className,
  data,
}: EditPatientDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<addNewPatientFormType>({
    resolver: zodResolver(addNewPatientFormSchema),
    defaultValues: data,
  });

  const mutation = useMutation({
    mutationFn: async (formData: addNewPatientFormType) => {
      // await onSubmit(data);
    },
  });

  const handleSubmit: SubmitHandler<addNewPatientFormType> = async (data) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("اطلاعات بیمار با موفقیت ویرایش شد", {
        description: `اطلاعات «${data.fullName}» با موفقیت به‌روزرسانی شد.`,
      });

      form.reset();
      setOpen(false);
    } catch {
      toast.error("ویرایش اطلاعات بیمار ناموفق بود", {
        description: `متأسفانه اطلاعات «${data.fullName}» به‌روزرسانی نشد. لطفاً دوباره تلاش کنید.`,
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
          <Button size={"icon"} className={className} variant={"outline"}>
            <Pen />
          </Button>
        }
      />
      <DialogContent showCloseButton={false} className={"p-0 gap-0"}>
        <DialogHeader className="border-b border-input p-6">
          <DialogTitle>ویرایش اطلاعات بیمار</DialogTitle>
          <DialogDescription>
            اطلاعات بیمار را ویرایش و تغییرات را ذخیره کنید.
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
                    نام و نام خانوادگی
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
              name="nationalCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>کد ملی</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="مثلاً ۱۲۳۴۵۶۷۸۹۰"
                    inputMode="numeric"
                    maxLength={10}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>شماره تلفن</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="tel"
                    inputMode="tel"
                    placeholder="مثلاً ۰۹۱۲۱۲۳۴۵۶۷"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="department"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>بخش درمانی</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="انتخاب بخش درمانی" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((item, index) => (
                        <SelectItem
                          key={`patient-departments-${index}`}
                          value={item}
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="sm:col-span-2"
                >
                  <FieldLabel htmlFor={field.name}>وضعیت بیمار</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="انتخاب وضعیت بیمار" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((item, index) => (
                        <SelectItem
                          key={`patient-statuses-${index}`}
                          value={item}
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <Pen />
              )}
              ویرایش
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
