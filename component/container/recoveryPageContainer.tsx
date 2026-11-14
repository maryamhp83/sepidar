import RecoveryForm from "@/component/form/recoveryForm";
import AuthGuard from "@/component/guard/authGuard";
import ThemeToggler from "@/component/themeToggler";
import { RecoveryPageProps } from "@/type/page";

export default async function RecoveryPageContainer({
  searchParams,
}: RecoveryPageProps) {
  const { userId, secret, expire } = await searchParams;

  return (
    <AuthGuard mode="no-auth-only">
      <section className="min-h-dvh lg:p-4 w-full lg:flex items-center justify-center">
        <ThemeToggler className="fixed right-4 top-4" />
        <RecoveryForm
          secret={secret}
          userId={userId}
          expire={expire}
          className="lg:max-w-xl w-full lg:rounded-2xl rounded-none lg:bg-card bg-transparent lg:ring ring-0 lg:pt-5 pt-20"
        />
      </section>
    </AuthGuard>
  );
}
