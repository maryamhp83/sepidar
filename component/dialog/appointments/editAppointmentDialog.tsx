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
  addNewAppointmentFormSchema,
  addNewAppointmentFormType,
} from "@/lib/formSchema";
import { EditAppointmentDialogProps } from "@/type/component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Pencil } from "lucide-react";
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
import statuses from "@/data/statuses";
import DatePicker from "@/component/ui/datePicker";
import { useDepartmentsFetch } from "@/context/departmentsFetchContext";
import { updateAppointment } from "@/lib/api/appointments";

export default function EditAppointmentDialog({
  data,
  refetch,
}: EditAppointmentDialogProps) {
  const [open, setOpen] = useState(false);

  const departmentsFetch = useDepartmentsFetch();
  const departments = departmentsFetch.data ?? [];

  const form = useForm<addNewAppointmentFormType>({
    resolver: zodResolver(addNewAppointmentFormSchema),
    defaultValues: {
      fullName: data?.fullName,
      nationalCode: data?.nationalCode,
      phoneNumber: data?.phoneNumber,
      date: data?.date ? new Date(data.date) : new Date(),
      department: data?.department.$id,
      status: data?.status.id,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data2: addNewAppointmentFormType) =>
      updateAppointment(data2, data?.id ?? "", departments),
  });

  const handleSubmit: SubmitHandler<addNewAppointmentFormType> = async (
    formData,
  ) => {
    try {
      await mutation.mutateAsync(formData);

      toast.success("نوبت با موفقیت ویرایش شد", {
        description: `اطلاعات نوبت «${formData.fullName}» با موفقیت به‌روزرسانی شد.`,
      });

      setOpen(false);
      refetch?.();
    } catch {
      toast.error("ویرایش نوبت ناموفق بود", {
        description: `متأسفانه اطلاعات نوبت «${formData.fullName}» به‌روزرسانی نشد. لطفاً دوباره تلاش کنید.`,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!form.formState.isSubmitting) {
          if (nextOpen) {
            form.reset({
              fullName: data?.fullName,
              nationalCode: data?.nationalCode,
              phoneNumber: data?.phoneNumber,
              date: data?.date ? new Date(data.date) : new Date(),
              department: data?.department.$id,
              status: data?.status.id,
            });
          }

          setOpen(nextOpen);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button size="icon" variant="outline">
            <Pencil />
          </Button>
        }
      />

      <DialogContent showCloseButton={false} className="p-0 gap-0">
        <DialogHeader className="border-b border-input p-6">
          <DialogTitle>ویرایش نوبت</DialogTitle>
          <DialogDescription>
            اطلاعات نوبت بیمار را ویرایش کرده و تغییرات را ذخیره کنید.
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
                      {departments.map((item) => (
                        <SelectItem key={item.$id} value={item.$id}>
                          {item.name}
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
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>تاریخ نوبت</FieldLabel>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    minDate={new Date()}
                    invalid={fieldState.invalid}
                  />
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
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>وضعیت نوبت</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="انتخاب وضعیت نوبت" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
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
                  variant="secondary"
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
