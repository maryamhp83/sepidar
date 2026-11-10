"use client";

import { ApiLoaderProps } from "@/type/component";
import LoadingScreen from "./loadingScreen";
import { Button } from "@base-ui/react";
import AlertScreen from "./alertScreen";
import { RefreshCcw } from "lucide-react";

export default function ApiLoader({
  children,
  isError,
  isLoading,
  refetch,
}: ApiLoaderProps) {
  if (isLoading) return <LoadingScreen />;
  else {
    if (isError) {
      return (
        <AlertScreen
          title="خطا در دریافت اطلاعات"
          description="متأسفانه دریافت اطلاعات با مشکل مواجه شد. لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید."
          variant="destructive"
          button={
            <Button onClick={() => refetch?.()}>
              <RefreshCcw />
              تلاش مجدد
            </Button>
          }
        />
      );
    } else {
      return children;
    }
  }
}
