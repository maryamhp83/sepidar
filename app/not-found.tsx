import MainLayout from "@/component/layout/mainLayout";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileQuestion } from "lucide-react";
import { Button } from "@/component/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/component/ui/empty";

export const metadata: Metadata = {
  title: "پیدا نشد",
};

export default function NotFoundPage() {
  return (
    <MainLayout mode="disabled" className="flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestion />
          </EmptyMedia>
          <EmptyTitle>صفحه پیدا نشد!</EmptyTitle>
          <EmptyDescription>
            متأسفیم، صفحه‌ای که دنبالش هستید وجود ندارد یا ممکن است آدرس آن
            تغییر کرده باشد.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            render={
              <Link href="/">
                <ArrowRight className="size-4" />
                بازگشت به صفحه اصلی
              </Link>
            }
          />
        </EmptyContent>
      </Empty>
    </MainLayout>
  );
}
