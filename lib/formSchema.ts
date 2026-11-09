import { z } from "zod";
import {
  verifyIranianNationalId,
  isPhoneNumberValid,
} from "@persian-tools/persian-tools";

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

export const addNewPatientFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "نام و نام خانوادگی الزامی است.")
    .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد."),
  nationalCode: z
    .string()
    .min(1, "کد ملی الزامی است.")
    .refine(
      (value) => verifyIranianNationalId(value),
      "کد ملی وارد شده معتبر نیست.",
    ),
  phoneNumber: z
    .string()
    .min(1, "شماره تلفن الزامی است.")
    .refine(
      (value) => isPhoneNumberValid(value),
      "شماره تلفن وارد شده معتبر نیست.",
    ),
  department: z.string().min(1, {
    message: "انتخاب بخش درمانی الزامی است.",
  }),
  status: z.string().min(1, {
    message: "انتخاب وضعیت الزامی است.",
  }),
});

export const addNewDoctorFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "نام و نام خانوادگی الزامی است.")
    .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد."),
  nationalCode: z
    .string()
    .min(1, "کد ملی الزامی است.")
    .refine(
      (value) => verifyIranianNationalId(value),
      "کد ملی وارد شده معتبر نیست.",
    ),
  phoneNumber: z
    .string()
    .min(1, "شماره تلفن الزامی است.")
    .refine(
      (value) => isPhoneNumberValid(value),
      "شماره تلفن وارد شده معتبر نیست.",
    ),
  department: z.string().min(1, {
    message: "انتخاب بخش درمانی الزامی است.",
  }),
  status: z.string().min(1, {
    message: "انتخاب وضعیت الزامی است.",
  }),
});

export type addNewPatientFormType = z.infer<typeof addNewPatientFormSchema>;
export type addNewDoctorFormType = z.infer<typeof addNewDoctorFormSchema>;
export type signupFormType = z.infer<typeof signupFormSchema>;
export type loginFormType = z.infer<typeof loginFormSchema>;
export type recoveryFormType = z.infer<typeof recoveryFormSchema>;
