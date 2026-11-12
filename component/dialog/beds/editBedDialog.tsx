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
import { addNewBedFormSchema, addNewBedFormType } from "@/lib/formSchema";
import { EditBedDialogProps } from "@/type/component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Pen, Save } from "lucide-react";
import { useState, useMemo } from "react";
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
import type { DateRange } from "react-day-picker";
import { useDepartmentsFetch } from "@/context/departmentsFetchContext";
import { updateBed } from "@/lib/api/beds";

export default function EditBedDialog({ data, refetch }: EditBedDialogProps) {
  const [open, setOpen] = useState(false);

  const departmentsFetch = useDepartmentsFetch();
  const departments = departmentsFetch.data ?? [];

  const form = useForm<addNewBedFormType>({
    resolver: zodResolver(addNewBedFormSchema),
    defaultValues: {
      ...data,
      fromDate: new Date(data?.date.from ?? ""),
      toDate: new Date(data?.date.to ?? ""),
      department: departments.find((item) => item.$id === data?.department.$id)
        ?.$id,
      status: statuses.find((item) => item.id === data?.status.id)?.id,
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: addNewBedFormType) =>
      updateBed(formData, data?.id ?? "", departments),
  });

  const handleSubmit: SubmitHandler<addNewBedFormType> = async (formData) => {
    try {
      await mutation.mutateAsync(formData);

      toast.success("اطلاعات بستری با موفقیت ویرایش شد", {
        description: `اطلاعات بستری بیمار «${formData.fullName}» با موفقیت به‌روزرسانی شد.`,
      });

      setOpen(false);
      refetch?.();
    } catch {
      toast.error("ویرایش اطلاعات بستری ناموفق بود", {
        description: `متأسفانه اطلاعات بستری بیمار «${formData.fullName}» ویرایش نشد. لطفاً دوباره تلاش کنید.`,
      });
    }
  };

  const fromDate = form.watch("fromDate");
  const toDate = form.watch("toDate");

  const datePickerRangeValue = useMemo<DateRange>(
    () => ({ from: fromDate, to: toDate }),
    [fromDate, toDate],
  );

  const fromError = form.getFieldState("fromDate").error;
  const toError = form.getFieldState("toDate").error;
  const datePickerRangeInvalid = !!(fromError || toError);

  const handleRangeChange = (range: DateRange | undefined) => {
    const opts = { shouldDirty: true, shouldValidate: true };

    form.setValue("fromDate", range?.from as Date, opts);
    form.setValue("toDate", range?.to as Date, opts);
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
          <DialogTitle>ویرایش اطلاعات بستری</DialogTitle>
          <DialogDescription>
            اطلاعات بیمار و جزئیات بستری را ویرایش کنید.
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

            <Field data-invalid={datePickerRangeInvalid}>
              <FieldLabel>تاریخ بستری</FieldLabel>
              <DatePicker
                maxDate={new Date()}
                invalid={datePickerRangeInvalid}
                range
                rangeValue={datePickerRangeValue}
                onRangeChange={handleRangeChange}
              />
              {datePickerRangeInvalid && (
                <FieldError errors={[fromError, toError].filter(Boolean)} />
              )}
            </Field>

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>وضعیت بستری</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="انتخاب وضعیت بستری" />
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
                <Save />
              )}
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
