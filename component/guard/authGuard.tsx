"use client";

import { AppwriteException, type Models } from "appwrite";
import { useQuery } from "@tanstack/react-query";
import { account } from "@/lib/api/client";
import type { AuthGuardProps } from "@/type/component";
import { AuthFetchProvider } from "@/context/authFetchContext";
import AlertScreen from "@/component/api/alertScreen";
import LoadingScreen from "@/component/api/loadingScreen";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { getDepartments } from "@/lib/api/departments";
import { DepartmentsFetchProvider } from "@/context/departmentsFetchContext";

export default function AuthGuard({
  children,
  mode = "auth-only",
}: AuthGuardProps) {
  const authQuery = useQuery<Models.User<Models.Preferences>, Error>({
    queryKey: ["auth", "current-user"],
    queryFn: () => account.get(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const departmentsQuery = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
    enabled: !authQuery.isLoading && !authQuery.isError,
  });

  if (mode === "disabled") {
    return (
      <AuthFetchProvider value={authQuery}>
        <DepartmentsFetchProvider value={departmentsQuery}>
          {children}
        </DepartmentsFetchProvider>
      </AuthFetchProvider>
    );
  } else {
    if (authQuery.isPending || departmentsQuery.isLoading) {
      return <LoadingScreen />;
    } else {
      const isAuthenticated = authQuery.isSuccess;
      const isGuest =
        authQuery.isError &&
        authQuery.error instanceof AppwriteException &&
        authQuery.error.code === 401;

      if (authQuery.isError && !isGuest) {
        return (
          <AlertScreen
            title="خطای احراز هویت"
            description="در دریافت اطلاعات احراز هویت خطایی رخ داد."
            variant="destructive"
          />
        );
      }

      if (mode === "auth-only" && isGuest) {
        return (
          <AlertScreen
            title="خطای احراز هویت"
            description="برای استفاده از این صفحه باید وارد شده باشید."
            variant="destructive"
            button={
              <Button
                render={
                  <Link href="/auth/login">
                    <LogIn />
                    ورود
                  </Link>
                }
              />
            }
          />
        );
      }

      if (
        (mode === "no-auth-only" && isAuthenticated) ||
        departmentsQuery.isError
      ) {
        return (
          <AlertScreen
            title="خطای احراز هویت"
            description="برای استفاده از این صفحه نباید وارد شده باشید."
            variant="destructive"
          />
        );
      }

      return (
        <AuthFetchProvider value={authQuery}>
          <DepartmentsFetchProvider value={departmentsQuery}>
            {children}
          </DepartmentsFetchProvider>
        </AuthFetchProvider>
      );
    }
  }
}
