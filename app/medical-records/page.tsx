import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import MedicalRecordsPageContainer from "@/component/container/medicalRecordsPageContainer";

const title = "پرونده‌های پزشکی";

export const metadata: Metadata = {
  title,
};

export default function MedicalRecordsPage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", title]} />
      <h1 className="font-bold text-xl truncate mb-1">{title}</h1>
      <MedicalRecordsPageContainer />
    </MainLayout>
  );
}
