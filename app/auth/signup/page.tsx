import SignupForm from "@/component/form/signupForm";
import AuthGuard from "@/component/guard/authGuard";
import ThemeToggler from "@/component/themeToggler";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ثبت نام",
};

export default function SignupPage() {
  return (
    <AuthGuard mode="no-auth-only">
      <section className="min-h-dvh lg:p-4 w-full lg:flex items-center justify-center">
        <ThemeToggler className="fixed right-4 top-4" />
        <SignupForm className="lg:max-w-xl w-full lg:rounded-2xl rounded-none lg:bg-card bg-transparent lg:ring ring-0 lg:pt-5 pt-20" />
      </section>
    </AuthGuard>
  );
}
