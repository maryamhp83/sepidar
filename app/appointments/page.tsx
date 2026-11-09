import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import AddNewAppointmentDialog from "@/component/dialog/appointments/addNewAppointmentDialog";
import AppointmentsPageContainer from "@/component/container/appointmentsPageContainer";

const title = "مدیریت نوبت‌ها";

export const metadata: Metadata = {
  title,
};

export default function AppointmentsPage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", title]} />
      <h1 className="font-bold text-xl truncate mb-1">{title}</h1>
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          برنامه‌ریزی و پیگیری نوبت‌های بیماران
        </span>
        <AddNewAppointmentDialog />
      </div>
      <AppointmentsPageContainer />
    </MainLayout>
  );
}
