"use client";

import "./globals.css"; // adjust the path to your global stylesheet

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

export default function GlobalError({ error, reset }: ErrorPageProps) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <main className="flex min-h-screen items-center justify-center p-4">
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
              <Card className="w-full gap-0 pb-0 pt-3">
                <CardHeader className="mb-2">
                  <CardTitle className="text-right">خطا :</CardTitle>
                </CardHeader>
                <div
                  className="max-h-50 overflow-auto rounded-t-2xl bg-background p-5.5"
                  dir="ltr"
                >
                  <pre className="text-start font-mono">{error?.message}</pre>
                </div>
              </Card>
            </EmptyHeader>
            <EmptyContent className="w-full">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button onClick={() => reset()}>
                  <RefreshCw className="size-4" />
                  تلاش مجدد
                </Button>
                <Button
                  variant="outline"
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
        </main>
      </body>
    </html>
  );
}
