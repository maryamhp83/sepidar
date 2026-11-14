import { Suspense } from "react";
import RecoveryPageContainer from "@/component/container/recoveryPageContainer";
import type { Metadata } from "next";
import { RecoveryPageProps } from "@/type/page";

export const metadata: Metadata = {
  title: "بازنشانی رمز عبور",
};

export default function RecoveryPage({
  searchParams,
}: {
  searchParams: RecoveryPageProps["searchParams"];
}) {
  return (
    <Suspense fallback={null}>
      <RecoveryPageContainer searchParams={searchParams} />
    </Suspense>
  );
}
