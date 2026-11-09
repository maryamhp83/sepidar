import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import AddNewPatientDialog from "@/component/dialog/patients/addNewPatientDialog";
import PatientsFilterableTable from "@/component/table/patientsFilterableTable";
import { PatientType } from "@/type/general";
import departments from "@/data/departments";
import statuses from "@/data/statuses";

const title = "مدیریت بیماران";

export const metadata: Metadata = {
  title,
};

const patients: PatientType[] = [
  {
    id: "patient-1",
    fullName: "علی رضایی",
    nationalCode: "0012345678",
    phoneNumber: "09123456781",
    department: departments[0],
    status: statuses[0],
    createdAt: "2026-11-01T09:30:00.000Z",
  },
  {
    id: "patient-2",
    fullName: "سارا محمدی",
    nationalCode: "0023456789",
    phoneNumber: "09123456782",
    department: departments[1],
    status: statuses[1],
    createdAt: "2026-11-02T11:15:00.000Z",
  },
  {
    id: "patient-3",
    fullName: "محمد حسینی",
    nationalCode: "0034567890",
    phoneNumber: "09123456783",
    department: departments[2],
    status: statuses[2],
    createdAt: "2026-11-03T08:45:00.000Z",
  },
];

export default function PatientsPage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", title]} />
      <h1 className="font-bold text-xl truncate mb-1">{title}</h1>
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          مشاهده، ثبت و ویرایش اطلاعات بیماران بیمارستان
        </span>
        <AddNewPatientDialog />
      </div>
      <PatientsFilterableTable data={patients} />
    </MainLayout>
  );
}
