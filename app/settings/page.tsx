import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import SettingsForm from "@/component/form/settingsForm";

const title = "تنظیمات";

export const metadata: Metadata = {
  title,
};

export default function MedicalRecordsPage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", title]} />
      <h1 className="font-bold text-xl truncate mb-1">{title}</h1>
      <span className="font-normal text-sm text-muted-foreground block mb-8">
        مدیریت تنظیمات سامانه، اعلان‌ها و دسترسی‌ها
      </span>
      <SettingsForm />
    </MainLayout>
  );
}
