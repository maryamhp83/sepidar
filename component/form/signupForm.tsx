"use client";

import { ClassOnlyProps } from "@/type/component";
import Link from "next/link";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/component/ui/card";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { signupFormSchema, signupFormType } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AppwriteException, ID } from "appwrite";
import { account } from "@/lib/api/client";

export default function SignupForm({ className }: ClassOnlyProps) {
  const router = useRouter();

  const form = useForm<signupFormType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: signupFormType) =>
      account.create({
        email: data.email,
        password: data.password,
        userId: ID.unique(),
        name: data.name,
      }),
  });

  const onSubmit: SubmitHandler<signupFormType> = async (data) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("عملیات موفقیت امیز بود", {
        description:
          "حساب کاربری شما با موفقیت ایجاد شد! اکنون می‌توانید وارد شوید و از امکانات خُرده استفاده کنید.",
      });

      router.push("/auth/login");
    } catch (err) {
      const error = err as AppwriteException;
      toast.error("خطایی رخ داد", {
        description: error.message,
      });
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="mb-6">
        <CardTitle>ایجاد حساب کاربری</CardTitle>
        <CardDescription>
          به سپیدار بپیوندید و با دسترسی به امکانات مدیریتی، اطلاعات بیماران،
          پزشکان، نوبت‌ها و فرایندهای بیمارستان را به‌سادگی مدیریت کنید.
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
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>نام و نام خانوادگی</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                  autoComplete="name"
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
                  placeholder="یک رمز عبور انتخاب کنید"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>تکرار رمز عبور</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="رمز عبور خود را مجدداً وارد کنید"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
            ایجاد حساب کاربری
          </Button>

          <p className="text-sm font-normal shrink-0 text-muted-foreground">
            قبلاً حساب کاربری ایجاد کرده‌اید؟{" "}
            <Link href="/auth/login" className="font-bold text-foreground">
              وارد شوید
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
