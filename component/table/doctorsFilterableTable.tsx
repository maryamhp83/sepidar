"use client";

import { Card, CardHeader, CardTitle } from "../ui/card";
import {
  departments as doctorsDepartments,
  statuses as doctorsStatuses,
} from "@/component/dialog/doctors/addNewDoctorDialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DoctorsFilterableTableProps } from "@/type/component";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/component/ui/empty";
import { List } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "cn";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Badge } from "../ui/badge";
import { useState } from "react";
import {
  doctorsDepartmentsType,
  doctorsStatusesType,
  patientsDepartmentsType,
  patientsStatusesType,
} from "@/type/general";
import EditDoctorDialog from "../dialog/doctors/editDoctorDialog";
import DeleteDoctorDialog from "../dialog/doctors/deleteDoctorDialog";

export default function DoctorsFilterableTable({
  data,
  className,
}: DoctorsFilterableTableProps) {
  const [searchStr, setSearchStr] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<
    patientsDepartmentsType | "همه"
  >("همه");

  const [statusFilter, setStatusFilter] = useState<
    patientsStatusesType | "همه"
  >("همه");

  const filteredData = data.filter((item) => {
    const normalizedSearch = searchStr.trim().toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      item.fullName.toLowerCase().includes(normalizedSearch) ||
      item.nationalCode.includes(normalizedSearch) ||
      item.phoneNumber.includes(normalizedSearch);

    const matchesDepartment =
      !departmentFilter ||
      departmentFilter === "همه" ||
      item.department === departmentFilter;

    const matchesStatus =
      !statusFilter || statusFilter === "همه" || item.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departmentsArrayToSelect = ["همه", ...doctorsDepartments];
  const statusesArrayToSelect = ["همه", ...doctorsStatuses];

  if (data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <Empty className="px-5.5">
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <List />
            </EmptyMedia>
            <EmptyTitle>هنوز پزشکی ثبت نشده است.</EmptyTitle>
            <EmptyDescription>
              پس از ثبت پزشکان جدید، اطلاعات آن‌ها در این بخش نمایش داده می‌شود.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Card>
    );
  } else {
    return (
      <Card className={cn("pb-0", className)}>
        <CardHeader className="flex lg:flex-row flex-col items-center justify-between gap-3">
          <CardTitle className="truncate block lg:w-auto w-full">
            پزشکان
          </CardTitle>
          <div className="flex-1 flex lg:flex-row flex-col lg:items-center justify-end gap-3 flex-wrap lg:w-auto w-full">
            <Input
              placeholder="جست‌وجو در مدیریت پزشکان..."
              className="w-62"
              onChange={(e) => setSearchStr(e.target.value)}
            />
            <Select
              value={departmentFilter}
              onValueChange={(value) =>
                setDepartmentFilter(value as doctorsDepartmentsType | "همه")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب بخش درمانی" />
              </SelectTrigger>
              <SelectContent>
                {departmentsArrayToSelect.map((item, index) => (
                  <SelectItem key={`doctors-departments-${index}`} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as doctorsStatusesType | "همه")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب وضعیت بیمار" />
              </SelectTrigger>
              <SelectContent>
                {statusesArrayToSelect.map((item, index) => (
                  <SelectItem key={`doctor-statuses-${index}`} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        {filteredData.length === 0 ? (
          <Empty className="px-5.5 py-10">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <List />
              </EmptyMedia>
              <EmptyTitle>پزشکی با مشخصات موردنظر یافت نشد.</EmptyTitle>
              <EmptyDescription>
                هیچ پزشکی با عبارت جست‌وجو یا فیلترهای انتخاب‌شده مطابقت ندارد.
                عبارت جست‌وجو یا فیلترها را تغییر دهید و دوباره تلاش کنید.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-background border-t border-input">
                <TableCell>نام و نام خانوادگی پزشک</TableCell>
                <TableCell>کد ملی</TableCell>
                <TableCell>شماره تلفن</TableCell>
                <TableCell>بخش</TableCell>
                <TableCell>وضعیت</TableCell>
                <TableCell className="text-left">عملیات</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={`doctor-${index}`}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{digitsEnToFa(item.nationalCode)}</TableCell>
                  <TableCell>{digitsEnToFa(item.phoneNumber)}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "bg-current/10",
                        item.status === "فعال"
                          ? "text-primary"
                          : item.status === "در انتظار"
                            ? "text-amber-500"
                            : "text-red-500",
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <EditDoctorDialog data={item} />
                    <DeleteDoctorDialog data={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    );
  }
}
