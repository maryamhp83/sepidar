import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import AddNewBedDialog from "@/component/dialog/beds/addNewBedDialog";
import BedsFilterableTable from "@/component/table/bedsFilterableTable";
import { addDays } from "date-fns-jalali";
import departments from "@/data/departments";
import statuses from "@/data/statuses";

const title = "مدیریت بستری‌ها";

export const metadata: Metadata = {
  title,
};

const beds = [
  {
    createdAt: new Date().toISOString(),
    date: {
      from: addDays(new Date(), -4).toISOString(),
      to: new Date().toISOString(),
    },
    department: departments[0],
    fullName: "علی رضایی",
    id: "bed-001",
    nationalCode: "0012345678",
    phoneNumber: "09121234567",
    status: statuses[0],
  },
  {
    createdAt: addDays(new Date(), -2).toISOString(),
    date: {
      from: addDays(new Date(), -7).toISOString(),
      to: addDays(new Date(), -2).toISOString(),
    },
    department: departments[1],
    fullName: "محمد احمدی",
    id: "bed-002",
    nationalCode: "0023456789",
    phoneNumber: "09123456789",
    status: statuses[1],
  },
  {
    createdAt: addDays(new Date(), -1).toISOString(),
    date: {
      from: addDays(new Date(), -1).toISOString(),
      to: addDays(new Date(), 5).toISOString(),
    },
    department: departments[2],
    fullName: "فاطمه کریمی",
    id: "bed-003",
    nationalCode: "0034567890",
    phoneNumber: "09351234567",
    status: statuses[0],
  },
  {
    createdAt: addDays(new Date(), -5).toISOString(),
    date: {
      from: addDays(new Date(), -10).toISOString(),
      to: addDays(new Date(), -5).toISOString(),
    },
    department: departments[3],
    fullName: "حسین محمدی",
    id: "bed-004",
    nationalCode: "0045678901",
    phoneNumber: "09151234567",
    status: statuses[1],
  },
  {
    createdAt: addDays(new Date(), -3).toISOString(),
    date: {
      from: addDays(new Date(), -3).toISOString(),
      to: addDays(new Date(), 3).toISOString(),
    },
    department: departments[0],
    fullName: "زهرا موسوی",
    id: "bed-005",
    nationalCode: "0056789012",
    phoneNumber: "09361234567",
    status: statuses[0],
  },
  {
    createdAt: addDays(new Date(), -8).toISOString(),
    date: {
      from: addDays(new Date(), -12).toISOString(),
      to: addDays(new Date(), -8).toISOString(),
    },
    department: departments[1],
    fullName: "رضا جعفری",
    id: "bed-006",
    nationalCode: "0067890123",
    phoneNumber: "09131234567",
    status: statuses[1],
  },
  {
    createdAt: addDays(new Date(), -1).toISOString(),
    date: {
      from: addDays(new Date(), -1).toISOString(),
      to: addDays(new Date(), 4).toISOString(),
    },
    department: departments[2],
    fullName: "مریم حسینی",
    id: "bed-007",
    nationalCode: "0078901234",
    phoneNumber: "09191234567",
    status: statuses[0],
  },
  {
    createdAt: addDays(new Date(), -6).toISOString(),
    date: {
      from: addDays(new Date(), -9).toISOString(),
      to: addDays(new Date(), -6).toISOString(),
    },
    department: departments[3],
    fullName: "امیرحسین صادقی",
    id: "bed-008",
    nationalCode: "0089012345",
    phoneNumber: "09021234567",
    status: statuses[1],
  },
  {
    createdAt: addDays(new Date(), -2).toISOString(),
    date: {
      from: addDays(new Date(), -2).toISOString(),
      to: addDays(new Date(), 6).toISOString(),
    },
    department: departments[0],
    fullName: "نگار اکبری",
    id: "bed-009",
    nationalCode: "0090123456",
    phoneNumber: "09301234567",
    status: statuses[0],
  },
  {
    createdAt: addDays(new Date(), -4).toISOString(),
    date: {
      from: addDays(new Date(), -8).toISOString(),
      to: addDays(new Date(), -4).toISOString(),
    },
    department: departments[2],
    fullName: "سعید مرادی",
    id: "bed-010",
    nationalCode: "0101234567",
    phoneNumber: "09111234567",
    status: statuses[1],
  },
];

export default function BedsPage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", title]} />
      <h1 className="font-bold text-xl truncate mb-1">{title}</h1>
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          پذیرش، تخصیص تخت و ترخیص بیماران
        </span>
        <AddNewBedDialog />
      </div>
      <BedsFilterableTable data={beds} />
    </MainLayout>
  );
}
