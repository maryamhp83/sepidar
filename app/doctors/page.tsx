import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import AddNewDoctorDialog from "@/component/dialog/doctors/addNewDoctorDialog";
import DoctorsFilterableTable from "@/component/table/doctorsFilterableTable";
import { DoctorType } from "@/type/general";
import departments from "@/data/departments";
import statuses from "@/data/statuses";

const title = "مدیریت پزشکان";

export const metadata: Metadata = {
  title,
};

const doctors: DoctorType[] = [
  {
    id: "doc-001",
    fullName: "علی رضایی",
    nationalCode: "0012345678",
    phoneNumber: "09121234567",
    department: departments[0],
    status: statuses[0],
    createdAt: "2026-10-12T09:30:00.000Z",
  },
  {
    id: "doc-002",
    fullName: "محمد احمدی",
    nationalCode: "0023456789",
    phoneNumber: "09123456789",
    department: departments[1],
    status: statuses[1],
    createdAt: "2026-10-15T11:20:00.000Z",
  },
  {
    id: "doc-003",
    fullName: "سارا محمدی",
    nationalCode: "0034567890",
    phoneNumber: "09351234567",
    department: departments[2],
    status: statuses[2],
    createdAt: "2026-10-18T08:45:00.000Z",
  },
];

export default function DoctorsPage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", title]} />
      <h1 className="font-bold text-xl truncate mb-1">{title}</h1>
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          اطلاعات، برنامه کاری و وضعیت پزشکان
        </span>
        <AddNewDoctorDialog />
      </div>
      <DoctorsFilterableTable data={doctors} />
    </MainLayout>
  );
}
