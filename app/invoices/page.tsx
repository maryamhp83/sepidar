import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import InvoicesPageContainer from "@/component/container/invoicesPageContainer";

const title = "صورتحساب‌ها و پرداخت‌ها";

export const metadata: Metadata = {
  title,
};

export default function InvoicesPage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", title]} />
      <h1 className="font-bold text-xl truncate mb-1">{title}</h1>
      <InvoicesPageContainer />
    </MainLayout>
  );
}
