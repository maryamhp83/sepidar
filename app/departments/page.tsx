import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import DepartmentsPageContainer from "@/component/container/departmentsPageContainer";

const title = "بخش‌های بیمارستان";

export const metadata: Metadata = {
  title,
};

export default function DoctorsPage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", title]} />
      <h1 className="font-bold text-xl truncate mb-1">{title}</h1>
      <DepartmentsPageContainer />
    </MainLayout>
  );
}
