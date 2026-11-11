"use client";

import AddNewDepartmentDialog from "@/component/dialog/departments/addNewDepartmentDialog";
import DepartmentCard from "@/component/card/departmentCard";
import { useDepartmentsFetch } from "@/context/departmentsFetchContext";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/component/ui/empty";
import { Card } from "../ui/card";
import { List } from "lucide-react";

export default function DepartmentsPageContainer() {
  const departmentsFetch = useDepartmentsFetch();
  const departments = departmentsFetch.data ?? [];

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          مدیریت بخش‌ها، پزشکان و ظرفیت پذیرش
        </span>
        <AddNewDepartmentDialog refetch={departmentsFetch.refetch} />
      </div>
      {departments.length === 0 ? (
        <Card>
          <Empty className="px-5.5 py-10">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <List />
              </EmptyMedia>
              <EmptyTitle>هنوز بخشی ثبت نشده است.</EmptyTitle>
              <EmptyDescription>
                پس از ثبت بخش های جدید، اطلاعات آن‌ها در این بخش نمایش داده
                می‌شود.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
          {departments.map((item, index) => (
            <DepartmentCard
              key={`department-card-${index}`}
              refetch={departmentsFetch.refetch}
              data={{
                ...item,
                id: item.$id,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
