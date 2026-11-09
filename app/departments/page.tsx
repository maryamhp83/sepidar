import type { Metadata } from "next";
import MainLayout from "@/component/layout/mainLayout";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import AddNewDepartmentDialog from "@/component/dialog/departments/addNewDepartmentDialog";
import departments from "@/data/departments";
import DepartmentCard from "@/component/card/departmentCard";

const title = "بخش‌های بیمارستان";

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
          مدیریت بخش‌ها، پزشکان و ظرفیت پذیرش
        </span>
        <AddNewDepartmentDialog />
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
        {departments.map((item, index) => (
          <DepartmentCard data={item} key={`department-card-${index}`} />
        ))}
      </div>
    </MainLayout>
  );
}
