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
import { AddNewBedDialogProps, ClassOnlyProps } from "@/type/component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
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
import { createBed } from "@/lib/api/beds";

export default function AddNewBedDialog({
  className,
  refetch,
}: AddNewBedDialogProps) {
  const [open, setOpen] = useState(false);

  const departmentsFetch = useDepartmentsFetch();
  const departments = departmentsFetch.data ?? [];

  const form = useForm<addNewBedFormType>({
    resolver: zodResolver(addNewBedFormSchema),
    defaultValues: {
      fromDate: undefined,
      toDate: undefined,
      department: undefined,
      fullName: "",
      nationalCode: "",
      phoneNumber: "",
      status: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: addNewBedFormType) => createBed(data, departments),
  });

  const handleSubmit: SubmitHandler<addNewBedFormType> = async (data) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("بستری بیمار با موفقیت ثبت شد", {
        description: `اطلاعات بستری بیمار «${data.fullName}» با موفقیت ثبت شد.`,
      });

      form.reset();
      setOpen(false);
      refetch?.();
    } catch {
      toast.error("ثبت بستری ناموفق بود", {
        description: `متأسفانه اطلاعات بستری بیمار «${data.fullName}» ثبت نشد. لطفاً دوباره تلاش کنید.`,
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
          <Button size="lg" className={className}>
            <Plus />
            ثبت بستری جدید
          </Button>
        }
      />

      <DialogContent showCloseButton={false} className="p-0 gap-0">
        <DialogHeader className="border-b border-input p-6">
          <DialogTitle>ثبت بستری جدید</DialogTitle>
          <DialogDescription>
            اطلاعات بیمار و جزئیات بستری را با دقت تکمیل کنید.
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
              ثبت بستری
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
