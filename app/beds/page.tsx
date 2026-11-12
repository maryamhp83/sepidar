import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import BedsPageContainer from "@/component/container/bedsPageContainer";

const title = "مدیریت بستری‌ها";

export const metadata: Metadata = {
  title,
};

export default function BedsPage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", title]} />
      <h1 className="font-bold text-xl truncate mb-1">{title}</h1>
      <BedsPageContainer />
    </MainLayout>
  );
}
