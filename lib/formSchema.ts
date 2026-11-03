import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "وارد کردن ایمیل الزامی است.")
    .email("لطفاً یک آدرس ایمیل معتبر وارد کنید."),
  password: z.string().min(1, "وارد کردن رمز عبور الزامی است."),
});

export const signupFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "وارد کردن ایمیل الزامی است.")
      .email("لطفاً یک آدرس ایمیل معتبر وارد کنید."),
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر داشته باشد."),
    confirmPassword: z.string().min(1, "لطفاً رمز عبور خود را تأیید کنید."),
    name: z
      .string()
      .trim()
      .min(2, "نام باید حداقل ۲ کاراکتر داشته باشد.")
      .max(128, "نام نباید بیشتر از ۱۲۸ کاراکتر باشد."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمزهای عبور با یکدیگر مطابقت ندارند.",
    path: ["confirmPassword"],
  });

export const recoveryFormSchema = z
  .object({
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر داشته باشد."),
    confirmPassword: z.string().min(1, "لطفاً رمز عبور خود را تأیید کنید."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمزهای عبور با یکدیگر مطابقت ندارند.",
    path: ["confirmPassword"],
  });

export type signupFormType = z.infer<typeof signupFormSchema>;
export type loginFormType = z.infer<typeof loginFormSchema>;
export type recoveryFormType = z.infer<typeof recoveryFormSchema>;
