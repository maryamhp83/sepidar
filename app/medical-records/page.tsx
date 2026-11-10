import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import AddNewMedicalRecordDialog from "@/component/dialog/medical-records/addNewMedicalRecordDialog";
import MedicalRecordsFilterableTable from "@/component/table/medicalRecordsFilterableTable";
import { MedicalRecordType } from "@/type/general";
import departments from "@/data/departments";
import statuses from "@/data/statuses";
import { addDays } from "date-fns-jalali";

const title = "پرونده‌های پزشکی";

export const metadata: Metadata = {
  title,
};

const medicalRecords: MedicalRecordType[] = [
  {
    id: "record-001",
    fullName: "علی رضایی",
    nationalCode: "0012345678",
    phoneNumber: "09121234567",
    department: departments[0],
    status: statuses[0],
    date: addDays(new Date(), -2).toISOString(),
    createdAt: addDays(new Date(), -2).toISOString(),
  },
  {
    id: "record-002",
    fullName: "زهرا محمدی",
    nationalCode: "0023456789",
    phoneNumber: "09123456789",
    department: departments[1],
    status: statuses[1],
    date: addDays(new Date(), -5).toISOString(),
    createdAt: addDays(new Date(), -5).toISOString(),
  },
  {
    id: "record-003",
    fullName: "محمد احمدی",
    nationalCode: "0034567890",
    phoneNumber: "09351234567",
    department: departments[2],
    status: statuses[0],
    date: addDays(new Date(), -8).toISOString(),
    createdAt: addDays(new Date(), -8).toISOString(),
  },
  {
    id: "record-004",
    fullName: "فاطمه کریمی",
    nationalCode: "0045678901",
    phoneNumber: "09134567890",
    department: departments[3],
    status: statuses[2],
    date: addDays(new Date(), -12).toISOString(),
    createdAt: addDays(new Date(), -12).toISOString(),
  },
  {
    id: "record-005",
    fullName: "حسین موسوی",
    nationalCode: "0056789012",
    phoneNumber: "09901234567",
    department: departments[0],
    status: statuses[1],
    date: addDays(new Date(), -15).toISOString(),
    createdAt: addDays(new Date(), -15).toISOString(),
  },
  {
    id: "record-006",
    fullName: "مریم جعفری",
    nationalCode: "0067890123",
    phoneNumber: "09187654321",
    department: departments[1],
    status: statuses[0],
    date: addDays(new Date(), -20).toISOString(),
    createdAt: addDays(new Date(), -20).toISOString(),
  },
  {
    id: "record-007",
    fullName: "رضا حسینی",
    nationalCode: "0078901234",
    phoneNumber: "09361234567",
    department: departments[2],
    status: statuses[2],
    date: addDays(new Date(), -25).toISOString(),
    createdAt: addDays(new Date(), -25).toISOString(),
  },
  {
    id: "record-008",
    fullName: "نرگس اکبری",
    nationalCode: "0089012345",
    phoneNumber: "09111234567",
    department: departments[3],
    status: statuses[0],
    date: addDays(new Date(), -30).toISOString(),
    createdAt: addDays(new Date(), -30).toISOString(),
  },
  {
    id: "record-009",
    fullName: "امیرحسین صادقی",
    nationalCode: "0090123456",
    phoneNumber: "09211234567",
    department: departments[0],
    status: statuses[1],
    date: addDays(new Date(), -35).toISOString(),
    createdAt: addDays(new Date(), -35).toISOString(),
  },
  {
    id: "record-010",
    fullName: "سارا مرادی",
    nationalCode: "0101234567",
    phoneNumber: "09391234567",
    department: departments[1],
    status: statuses[0],
    date: addDays(new Date(), -40).toISOString(),
    createdAt: addDays(new Date(), -40).toISOString(),
  },
];

export default function MedicalRecordsPage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", title]} />
      <h1 className="font-bold text-xl truncate mb-1">{title}</h1>
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          پذیرش، تخصیص تخت و ترخیص بیماران
        </span>
        <AddNewMedicalRecordDialog />
      </div>
      <MedicalRecordsFilterableTable data={medicalRecords} />
    </MainLayout>
  );
}
