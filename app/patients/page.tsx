import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import AddNewPatientDialog from "@/component/dialog/patients/addNewPatientDialog";
import PatientsFilterableTable from "@/component/table/patientsFilterableTable";

const title = "مدیریت بیماران";

export const metadata: Metadata = {
  title,
};

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
      <PatientsFilterableTable
        data={[
          {
            id: "patient-001",
            fullName: "علی رضایی",
            nationalCode: "0012345678",
            phoneNumber: "09123456781",
            department: "قلب و عروق",
            status: "فعال",
            createdAt: "2026-10-28T09:30:00.000Z",
          },
          {
            id: "patient-002",
            fullName: "سارا محمدی",
            nationalCode: "0023456789",
            phoneNumber: "09123456782",
            department: "مغز و اعصاب",
            status: "در انتظار",
            createdAt: "2026-10-29T11:15:00.000Z",
          },
          {
            id: "patient-003",
            fullName: "محمد امیری",
            nationalCode: "0034567890",
            phoneNumber: "00345678901",
            department: "ارتوپد",
            status: "فعال",
            createdAt: "2026-10-30T08:45:00.000Z",
          },
          {
            id: "patient-004",
            fullName: "فاطمه کریمی",
            nationalCode: "0045678901",
            phoneNumber: "09123456784",
            department: "داخلی",
            status: "غیر فعال",
            createdAt: "2026-10-30T14:20:00.000Z",
          },
          {
            id: "patient-005",
            fullName: "حسین احمدی",
            nationalCode: "0056789012",
            phoneNumber: "09123456785",
            department: "قلب و عروق",
            status: "فعال",
            createdAt: "2026-10-31T10:00:00.000Z",
          },
          {
            id: "patient-006",
            fullName: "مریم حسینی",
            nationalCode: "0067890123",
            phoneNumber: "09123456786",
            department: "اطفال",
            status: "در انتظار",
            createdAt: "2026-11-01T12:30:00.000Z",
          },
          {
            id: "patient-007",
            fullName: "رضا موسوی",
            nationalCode: "0078901234",
            phoneNumber: "09123456787",
            department: "اورژانسی",
            status: "غیر فعال",
            createdAt: "2026-11-02T07:50:00.000Z",
          },
          {
            id: "patient-008",
            fullName: "نگار جعفری",
            nationalCode: "0089012345",
            phoneNumber: "09123456788",
            department: "اطفال",
            status: "فعال",
            createdAt: "2026-11-03T16:10:00.000Z",
          },
          {
            id: "patient-009",
            fullName: "امیرحسین صادقی",
            nationalCode: "0090123456",
            phoneNumber: "09123456789",
            department: "داخلی",
            status: "در انتظار",
            createdAt: "2026-11-05T09:15:00.000Z",
          },
          {
            id: "patient-010",
            fullName: "زهرا اکبری",
            nationalCode: "0101234567",
            phoneNumber: "09123456780",
            department: "ارتوپد",
            status: "فعال",
            createdAt: "2026-11-06T13:40:00.000Z",
          },
        ]}
      />
    </MainLayout>
  );
}
