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
  addNewDepartmentFormSchema,
  addNewDepartmentFormType,
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
import { Textarea } from "@/component/ui/textarea";
import doctors from "@/data/doctors";

export default function AddNewDepartmentDialog({ className }: ClassOnlyProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<addNewDepartmentFormType>({
    resolver: zodResolver(addNewDepartmentFormSchema),
    defaultValues: {
      description: "",
      management: "",
      name: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: addNewDepartmentFormType) => {
      // await onSubmit(data);
    },
  });

  const handleSubmit: SubmitHandler<addNewDepartmentFormType> = async (
    data,
  ) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("دپارتمان با موفقیت اضافه شد", {
        description: `اطلاعات دپارتمان «${data.name}» با موفقیت ثبت شد.`,
      });

      form.reset();
      setOpen(false);
    } catch {
      toast.error("افزودن دپارتمان ناموفق بود", {
        description: `متأسفانه اطلاعات دپارتمان «${data.name}» ثبت نشد. لطفاً دوباره تلاش کنید.`,
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
          <Button size={"lg"} className={className}>
            <Plus />
            افزودن دپارتمان
          </Button>
        }
      />
      <DialogContent showCloseButton={false} className={"p-0 gap-0"}>
        <DialogHeader className="border-b border-input p-6">
          <DialogTitle>افزودن دپارتمان</DialogTitle>
          <DialogDescription>
            اطلاعات دپارتمان را با دقت تکمیل کنید.
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

            <Controller
              name="management"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>مدیر دپارتمان</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="انتخاب مدیر دپارتمان" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor, index) => (
                        <SelectItem
                          key={`department-management-${index}`}
                          value={doctor.id}
                        >
                          {doctor.fullName}
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
                <Plus />
              )}
              افزودن دپارتمان
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
