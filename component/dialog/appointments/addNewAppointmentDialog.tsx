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
import { ClassOnlyProps } from "@/type/component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
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
import departments from "@/data/departments";
import statuses from "@/data/statuses";
import DatePicker from "@/component/ui/datePicker";

export default function AddNewAppointmentDialog({ className }: ClassOnlyProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<addNewAppointmentFormType>({
    resolver: zodResolver(addNewAppointmentFormSchema),
    defaultValues: {
      date: undefined,
      department: undefined,
      fullName: "",
      nationalCode: "",
      phoneNumber: "",
      status: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: addNewAppointmentFormType) => {
      // await onSubmit(data);
    },
  });

  const handleSubmit: SubmitHandler<addNewAppointmentFormType> = async (
    data,
  ) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("نوبت با موفقیت ثبت شد", {
        description: `نوبت آقای/خانم «${data.fullName}» با موفقیت ثبت شد.`,
      });

      form.reset();
      setOpen(false);
    } catch {
      toast.error("ثبت نوبت ناموفق بود", {
        description: `متأسفانه نوبت «${data.fullName}» ثبت نشد. لطفاً دوباره تلاش کنید.`,
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
          <Button size="lg" className={className}>
            <Plus />
            ثبت نوبت جدید
          </Button>
        }
      />

      <DialogContent showCloseButton={false} className="p-0 gap-0">
        <DialogHeader className="border-b border-input p-6">
          <DialogTitle>ثبت نوبت جدید</DialogTitle>
          <DialogDescription>
            اطلاعات بیمار و نوبت موردنظر را با دقت تکمیل کنید.
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
                <Plus />
              )}
              ثبت نوبت
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
