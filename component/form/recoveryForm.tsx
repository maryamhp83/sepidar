"use client";

import { RecoveryFormProps } from "@/type/component";
import { AppwriteException } from "appwrite";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/component/ui/card";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { recoveryFormSchema, recoveryFormType } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { isExpirationValid } from "@/lib/date";
import { account } from "@/lib/api/client";

export default function RecoveryForm({
  className,
  secret,
  userId,
  expire,
}: RecoveryFormProps) {
  const router = useRouter();
  const isValid = !!userId && !!secret && isExpirationValid(expire);
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!isValid && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.error("لینک بازیابی نامعتبر است", {
        description:
          "این لینک بازیابی رمز عبور نامعتبر است یا اعتبار آن به پایان رسیده است. لطفاً درخواست لینک جدیدی بدهید.",
      });

      router.replace("/auth/login");
    }
  }, [isValid, router]);

  const form = useForm<recoveryFormType>({
    resolver: zodResolver(recoveryFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const recoveryMutation = useMutation({
    mutationFn: (data: recoveryFormType) =>
      account.updateRecovery({
        password: data.password,
        secret: secret ?? "",
        userId: userId ?? "",
      }),
  });

  const onSubmit: SubmitHandler<recoveryFormType> = async (data) => {
    try {
      await recoveryMutation.mutateAsync(data);

      toast.success("عملیات موفقیت امیز بود", {
        description:
          "رمز عبور شما با موفقیت تغییر کرد. اکنون می‌توانید با رمز عبور جدید خود وارد حساب کاربری شوید.",
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
      <CardHeader>
        <CardTitle>بازیابی رمز عبور</CardTitle>
        <CardDescription>
          برای دسترسی مجدد به حساب کاربری سپیدار، رمز عبور جدیدی انتخاب کنید.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="px-5.5 space-y-4 mb-8">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>رمز عبور جدید</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="رمز عبور جدیدی انتخاب کنید"
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
                <FieldLabel htmlFor={field.name}>
                  تکرار رمز عبور جدید
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="رمز عبور جدید را مجدداً وارد کنید"
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
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send />
            )}
            تغییر رمز عبور
          </Button>

          <p className="text-sm font-normal shrink-0 text-muted-foreground">
            رمز عبور خود را به خاطر دارید؟{" "}
            <Link href="/auth/login" className="font-bold text-foreground">
              بازگشت به صفحه ورود
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
