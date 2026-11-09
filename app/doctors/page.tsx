import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import AddNewDoctorDialog from "@/component/dialog/doctors/addNewDoctorDialog";
import DoctorsFilterableTable from "@/component/table/doctorsFilterableTable";

const title = "مدیریت پزشکان";

export const metadata: Metadata = {
  title,
};

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
      <DoctorsFilterableTable
        data={[
          {
            id: "doc-001",
            fullName: "علی رضایی",
            nationalCode: "0012345678",
            phoneNumber: "09121234567",
            department: "قلب و عروق",
            status: "فعال",
            createdAt: "2026-10-12T09:30:00.000Z",
          },
          {
            id: "doc-002",
            fullName: "محمد احمدی",
            nationalCode: "0023456789",
            phoneNumber: "09123456789",
            department: "داخلی",
            status: "فعال",
            createdAt: "2026-10-15T11:20:00.000Z",
          },
          {
            id: "doc-003",
            fullName: "سارا محمدی",
            nationalCode: "0034567890",
            phoneNumber: "09351234567",
            department: "اطفال",
            status: "فعال",
            createdAt: "2026-10-18T08:45:00.000Z",
          },
          {
            id: "doc-004",
            fullName: "حسین کریمی",
            nationalCode: "0045678901",
            phoneNumber: "09129876543",
            department: "ارتوپد",
            status: "غیر فعال",
            createdAt: "2026-10-20T14:10:00.000Z",
          },
          {
            id: "doc-005",
            fullName: "نگار حسینی",
            nationalCode: "0056789012",
            phoneNumber: "09361234567",
            department: "مغز و اعصاب",
            status: "فعال",
            createdAt: "2026-10-22T10:15:00.000Z",
          },
          {
            id: "doc-006",
            fullName: "رضا مرادی",
            nationalCode: "0067890123",
            phoneNumber: "09121112233",
            department: "اورژانسی",
            status: "در انتظار",
            createdAt: "2026-10-25T12:00:00.000Z",
          },
          {
            id: "doc-007",
            fullName: "مریم جعفری",
            nationalCode: "0078901234",
            phoneNumber: "09351112233",
            department: "قلب و عروق",
            status: "فعال",
            createdAt: "2026-10-28T07:30:00.000Z",
          },
          {
            id: "doc-008",
            fullName: "امیرحسین صادقی",
            nationalCode: "0089012345",
            phoneNumber: "09125556677",
            department: "داخلی",
            status: "غیر فعال",
            createdAt: "2026-11-01T09:00:00.000Z",
          },
          {
            id: "doc-009",
            fullName: "فاطمه اکبری",
            nationalCode: "0090123456",
            phoneNumber: "09357778899",
            department: "اطفال",
            status: "فعال",
            createdAt: "2026-11-04T13:25:00.000Z",
          },
          {
            id: "doc-010",
            fullName: "محمدرضا موسوی",
            nationalCode: "0101234567",
            phoneNumber: "09129998877",
            department: "مغز و اعصاب",
            status: "در انتظار",
            createdAt: "2026-11-07T15:40:00.000Z",
          },
        ]}
      />
    </MainLayout>
  );
}
