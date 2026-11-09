import DashboardPageContainer from "@/component/container/dashboardPageContainer";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import { Button } from "@/component/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", "داشبورد"]} />
      <h1 className="font-bold text-xl truncate mb-1">داشبورد مدیریتی</h1>
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          نمای کلی عملکرد بیمارستان.
        </span>
        <Button
          size={"lg"}
          render={
            <Link href="/appointments">
              <Plus />
              ثبت نوبت جدید
            </Link>
          }
        />
      </div>
      <DashboardPageContainer />
    </MainLayout>
  );
}
