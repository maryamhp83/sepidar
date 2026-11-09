"use client";

import { loginFormSchema, loginFormType } from "@/lib/formSchema";
import { ClassOnlyProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppwriteException } from "appwrite";
import { account } from "@/lib/api/client";

export default function LoginForm({ className }: ClassOnlyProps) {
  const router = useRouter();

  const form = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: ({ email, password }: loginFormType) =>
      account.createEmailPasswordSession({
        email,
        password,
      }),
  });

  const recoveryMutation = useMutation({
    mutationFn: (email: string) =>
      account.createRecovery({
        email,
        url: `${window.location.origin}/auth/recovery`,
      }),
  });

  const onSubmit: SubmitHandler<loginFormType> = async (data) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("عملیات موفقیت امیز بود", {
        description: "با موفقیت وارد حساب کاربری خود شدید.",
      });

      router.push("/");
    } catch (err) {
      const error = err as AppwriteException;
      toast.error("خطایی رخ داد", {
        description: error.message,
      });
    }
  };

  async function handleRecovery() {
    const isValid = await form.trigger("email");

    if (isValid) {
      const email = form.getValues("email");

      try {
        await recoveryMutation.mutateAsync(email);

        toast.success("عملیات موفقیت امیز بود", {
          description:
            "در صورت وجود حساب کاربری با این ایمیل، راهنمای بازیابی رمز عبور برای شما ارسال خواهد شد.",
        });
      } catch (err) {
        const error = err as AppwriteException;
        toast.error("خطایی رخ داد", {
          description: error.message,
        });
      }
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>به سپیدار خوش آمدید</CardTitle>
        <CardDescription>
          برای مدیریت بیماران، پزشکان، نوبت‌های مراجعه، فرایند بستری و امور
          اداری و مالی بیمارستان، وارد حساب کاربری خود شوید.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="px-5.5 space-y-4 mb-8">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>آدرس ایمیل</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="email"
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

          <div className="flex items-center justify-end">
            <Button
              type="button"
              variant={"link"}
              className={"px-0"}
              size={"xs"}
              onClick={handleRecovery}
              disabled={
                form.formState.isSubmitting || recoveryMutation.isPending
              }
            >
              رمز عبور خود را فراموش کرده‌اید؟
            </Button>
          </div>
        </div>

        <CardFooter className="grid gap-3">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            size="lg"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send />
            )}
            ورود به حساب کاربری
          </Button>

          <p className="text-sm font-normal shrink-0 text-muted-foreground">
            هنوز حساب کاربری ندارید؟{" "}
            <Link href="/auth/signup" className="font-bold text-foreground">
              ثبت‌نام کنید
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
