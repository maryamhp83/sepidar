import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import { addDays } from "date-fns-jalali";
import { InvoiceType } from "@/type/general";
import AddNewInvoiceDialog from "@/component/dialog/invoices/addNewInvoiceDialog";
import InvoicesFilterableTable from "@/component/table/invoicesFilterableTable";

const title = "صورتحساب‌ها و پرداخت‌ها";

export const metadata: Metadata = {
  title,
};

const invoices: InvoiceType[] = [
  {
    id: "invoice-001",
    fullName: "علی رضایی",
    description: "هزینه ویزیت پزشک متخصص",
    totalPrice: 850000,
    payed: 850000,
    createdAt: addDays(new Date(), -1).toISOString(),
    status: "payed",
  },
  {
    id: "invoice-002",
    fullName: "زهرا محمدی",
    description: "هزینه بستری و خدمات بیمارستانی",
    totalPrice: 12500000,
    payed: 0,
    createdAt: addDays(new Date(), -2).toISOString(),
    status: "not-payed",
  },
  {
    id: "invoice-003",
    fullName: "محمد احمدی",
    description: "هزینه آزمایش خون و بررسی‌های پزشکی",
    totalPrice: 1450000,
    payed: 1450000,
    createdAt: addDays(new Date(), -3).toISOString(),
    status: "payed",
  },
  {
    id: "invoice-004",
    fullName: "فاطمه کریمی",
    description: "هزینه تصویربرداری و رادیولوژی",
    totalPrice: 3200000,
    payed: 1000000,
    createdAt: addDays(new Date(), -5).toISOString(),
    status: "not-payed",
  },
  {
    id: "invoice-005",
    fullName: "حسین موسوی",
    description: "هزینه جراحی و خدمات اتاق عمل",
    totalPrice: 28500000,
    payed: 28500000,
    createdAt: addDays(new Date(), -7).toISOString(),
    status: "payed",
  },
  {
    id: "invoice-006",
    fullName: "مریم جعفری",
    description: "هزینه دارو و تجهیزات پزشکی",
    totalPrice: 2100000,
    payed: 0,
    createdAt: addDays(new Date(), -10).toISOString(),
    status: "not-payed",
  },
  {
    id: "invoice-007",
    fullName: "رضا حسینی",
    description: "هزینه ویزیت و خدمات درمانی",
    totalPrice: 1100000,
    payed: 1100000,
    createdAt: addDays(new Date(), -12).toISOString(),
    status: "payed",
  },
  {
    id: "invoice-008",
    fullName: "نرگس اکبری",
    description: "هزینه خدمات آزمایشگاهی",
    totalPrice: 2750000,
    payed: 1500000,
    createdAt: addDays(new Date(), -15).toISOString(),
    status: "not-payed",
  },
  {
    id: "invoice-009",
    fullName: "امیرحسین صادقی",
    description: "هزینه بستری و مراقبت‌های ویژه",
    totalPrice: 18700000,
    payed: 18700000,
    createdAt: addDays(new Date(), -20).toISOString(),
    status: "payed",
  },
  {
    id: "invoice-010",
    fullName: "سارا مرادی",
    description: "هزینه دارو و ویزیت پزشک",
    totalPrice: 1650000,
    payed: 0,
    createdAt: addDays(new Date(), -25).toISOString(),
    status: "not-payed",
  },
];

export default function InvoicesPage() {
  return (
    <MainLayout>
      <StaticBreadCrumb className="mb-5" values={["سپیدار", title]} />
      <h1 className="font-bold text-xl truncate mb-1">{title}</h1>
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          مدیریت امور مالی، پرداخت‌ها و مطالبات بیماران
        </span>
        <AddNewInvoiceDialog />
      </div>
      <InvoicesFilterableTable data={invoices} />
    </MainLayout>
  );
}
