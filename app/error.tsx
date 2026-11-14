"use client";

import MainLayout from "@/component/layout/mainLayout";
import { Button } from "@/component/ui/button";
import { Card, CardHeader, CardTitle } from "@/component/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/component/ui/empty";
import { ErrorPageProps } from "@/type/page";
import { AlertTriangle, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <MainLayout mode="disabled">
      <Empty>
        <EmptyHeader className="mb-5">
          <EmptyMedia
            variant="icon"
            className="bg-destructive/20 text-destructive"
          >
            <AlertTriangle />
          </EmptyMedia>
          <EmptyTitle className="text-destructive">
            مشکلی پیش آمده است!
          </EmptyTitle>
          <EmptyDescription>
            متأسفیم، هنگام بارگذاری این صفحه خطایی رخ داده است. لطفاً دوباره
            تلاش کنید.
          </EmptyDescription>
          <Card className="w-full pb-0 pt-3 gap-0">
            <CardHeader className="mb-2">
              <CardTitle className="text-right">خطا :</CardTitle>
            </CardHeader>
            <div
              className="p-5.5 overflow-auto max-h-50 bg-background rounded-t-2xl"
              dir="ltr"
            >
              <pre className="text-start font-mono">
                <p>{JSON.stringify(error.message, null, 2)}</p>
              </pre>
            </div>
          </Card>
        </EmptyHeader>
        <EmptyContent className="w-full">
          <div className="flex items-center justify-center flex-wrap gap-3">
            <Button onClick={reset}>
              <RefreshCw className="size-4" />
              تلاش مجدد
            </Button>
            <Button
              variant={"outline"}
              render={
                <Link href="/">
                  <ArrowRight className="size-4" />
                  بازگشت به صفحه اصلی
                </Link>
              }
            />
          </div>
        </EmptyContent>
      </Empty>
    </MainLayout>
  );
}
