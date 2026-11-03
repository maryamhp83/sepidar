"use client";

import { AppwriteException, type Models } from "appwrite";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { account } from "@/lib/api/client";
import type { AuthGuardProps } from "@/type/component";
import { AuthFetchProvider } from "@/context/authFetchContext";
import AlertScreen from "@/component/api/alertScreen";
import LoadingScreen from "@/component/api/loadingScreen";

export default function AuthGuard({
  children,
  mode = "auth-only",
}: AuthGuardProps) {
  const router = useRouter();
  const authQuery = useQuery<Models.User<Models.Preferences>, Error>({
    queryKey: ["auth", "current-user"],
    queryFn: () => account.get(),
    enabled: mode !== "disabled",
    retry: false,
    refetchOnWindowFocus: false,
  });

  const unauthorized =
    authQuery.isError &&
    authQuery.error instanceof AppwriteException &&
    authQuery.error.code === 401;

  useEffect(() => {
    if (mode === "auth-only" && unauthorized) {
      router.replace("/auth/login");
    } else if (mode === "no-auth-only" && !unauthorized) {
      router.replace("/");
    }
  }, [mode, unauthorized, router]);

  if (mode === "disabled") {
    return <AuthFetchProvider value={authQuery}>{children}</AuthFetchProvider>;
  }

  if (authQuery.isPending) {
    return <LoadingScreen />;
  }

  if (authQuery.isError && !unauthorized) {
    return (
      <AlertScreen
        title="احراز هویت ناموفق بود"
        description="نتوانستیم وضعیت ورود شما را بررسی کنیم. لطفاً دوباره تلاش کنید."
        variant="destructive"
      />
    );
  }

  if (unauthorized) {
    if (mode === "auth-only") {
      return <LoadingScreen />;
    }

    return <AuthFetchProvider value={authQuery}>{children}</AuthFetchProvider>;
  }

  if (mode === "no-auth-only") {
    return (
      <AlertScreen
        title="شما وارد حساب کاربری شده‌اید"
        description="شما هم‌اکنون وارد حساب خود شده‌اید. لطفاً به برنامه ادامه دهید."
        variant="default"
      />
    );
  }

  return <AuthFetchProvider value={authQuery}>{children}</AuthFetchProvider>;
}
