"use client";

import { useState } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { List } from "lucide-react";
import { PatientsFilterableTableProps } from "@/type/component";
import departments from "@/data/departments";
import statuses from "@/data/statuses";
import { cn } from "cn";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/component/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

import EditPatientDialog from "../dialog/patients/editPatientDialog";
import DeletePatientDialog from "../dialog/patients/deletePatientDialog";

export default function PatientsFilterableTable({
  data,
  className,
  refetch,
}: PatientsFilterableTableProps) {
  const [searchStr, setSearchStr] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("همه");
  const [statusFilter, setStatusFilter] = useState("همه");

  const normalizedSearch = searchStr.trim().toLowerCase();

  const filteredData = data.filter((item) => {
    const matchesSearch =
      !normalizedSearch ||
      item.fullName.toLowerCase().includes(normalizedSearch) ||
      item.nationalCode.includes(normalizedSearch) ||
      item.phoneNumber.includes(normalizedSearch);

    const matchesDepartment =
      departmentFilter === "همه" || item.department.id === departmentFilter;

    const matchesStatus =
      statusFilter === "همه" || item.status.id === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  if (data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>بیماران</CardTitle>
        </CardHeader>

        <Empty className="px-5.5">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <List />
            </EmptyMedia>
            <EmptyTitle>هنوز بیماری ثبت نشده است.</EmptyTitle>
            <EmptyDescription>
              پس از ثبت بیماران جدید، اطلاعات آن‌ها در این بخش نمایش داده
              می‌شود.
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
            بیماران
          </CardTitle>

          <div className="flex-1 flex lg:flex-row flex-col lg:items-center justify-end gap-3 flex-wrap lg:w-auto w-full">
            <Input
              placeholder="جست‌وجو در مدیریت بیماران..."
              className="w-62"
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
            />
            <Select
              value={departmentFilter}
              onValueChange={(value) => setDepartmentFilter(value as string)}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب بخش درمانی" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="همه">همه بخش‌ها</SelectItem>

                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as string)}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب وضعیت بیمار" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="همه">همه وضعیت‌ها</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
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
              <EmptyTitle>بیماری با مشخصات موردنظر یافت نشد.</EmptyTitle>
              <EmptyDescription>
                هیچ بیماری با عبارت جست‌وجو یا فیلترهای انتخاب‌شده مطابقت ندارد.
                عبارت جست‌وجو یا فیلترها را تغییر دهید و دوباره تلاش کنید.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-background border-t border-input">
                <TableCell>نام و نام خانوادگی</TableCell>
                <TableCell>کد ملی</TableCell>
                <TableCell>شماره تلفن</TableCell>
                <TableCell>بخش درمانی</TableCell>
                <TableCell>وضعیت بیمار</TableCell>
                <TableCell className="text-left">عملیات</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={`patient-${index}`}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{digitsEnToFa(item.nationalCode)}</TableCell>
                  <TableCell>{digitsEnToFa(item.phoneNumber)}</TableCell>
                  <TableCell>{item.department.name}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "bg-current/10",
                        item.status.id === "active"
                          ? "text-primary"
                          : item.status.id === "pending"
                            ? "text-amber-500"
                            : "text-red-500",
                      )}
                    >
                      {item.status.name}
                    </Badge>
                  </TableCell>

                  <TableCell className="flex items-center justify-end gap-2">
                    <EditPatientDialog data={item} refetch={refetch} />
                    <DeletePatientDialog data={item} refetch={refetch} />
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
