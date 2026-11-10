"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsFormSchema, settingsFormType } from "@/lib/formSchema";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Send, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useAuthFetch } from "@/context/authFetchContext";
import { account } from "@/lib/api/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsForm() {
  const authFetch = useAuthFetch();
  const router = useRouter();
  const form = useForm<settingsFormType>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      email: authFetch.data?.email || "",
      userName: authFetch.data?.name || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ email, userName, password }: settingsFormType) => {
      const emailIsDirty = form.getFieldState("email").isDirty;
      await account.updateName({ name: userName });

      if (emailIsDirty) {
        if (password === "" || password === undefined) {
          form.setError("password", {
            message: "برای تغیر ایمیل لطفا رمز عبور خود را وارد کنید.",
          });
        } else {
          await account.updateEmail({ email, password });
        }
      }
    },
  });

  const onSubmit: SubmitHandler<settingsFormType> = async ({
    email,
    userName,
    password,
  }) => {
    try {
      await mutation.mutateAsync({
        email,
        userName,
        password,
      });

      toast.success("عملیات موفق", {
        description: "اطلاعات حساب کاربری با موفقیت بروزرسانی شد.",
      });

      router.replace("/");
      authFetch.refetch();
    } catch {
      toast.error("عملیات ناموفق", {
        description:
          "در بروزرسانی اطلاعات حساب کاربری خطایی رخ داد. لطفاً دوباره تلاش کنید.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تنظیمات عمومی</CardTitle>
        <CardDescription>
          گزینه‌های مربوط به این بخش را مدیریت کنید.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-3 gap-4 px-6 mb-5">
          <Controller
            name="userName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>نام کاربری</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="نام کاربری را وارد کنید"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>ایمیل</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  dir="ltr"
                  placeholder="example@email.com"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>رمز عبور</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="رمز عبور خود را وارد کنید"
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <CardFooter className="">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send />
            )}
            ذخیره تغییرات
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
