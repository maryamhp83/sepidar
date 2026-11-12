"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AppointmentsFilterableTableProps } from "@/type/component";
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
import statuses from "@/data/statuses";
import DatePicker from "../ui/datePicker";
import { persianNoTimeDateFormatter } from "@/lib/date";
import EditAppointmentDialog from "../dialog/appointments/editAppointmentDialog";
import DeleteAppointmentDialog from "../dialog/appointments/deleteAppointmentDialog";
import { useDepartmentsFetch } from "@/context/departmentsFetchContext";

export default function AppointmentsFilterableTable({
  data,
  className,
  refetch,
}: AppointmentsFilterableTableProps) {
  const [searchStr, setSearchStr] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("همه");
  const [statusFilter, setStatusFilter] = useState("همه");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const departmentsFetch = useDepartmentsFetch();
  const departments = departmentsFetch.data ?? [];

  const normalizedSearch = searchStr.trim().toLowerCase();

  const filteredData = data.filter((item) => {
    const matchesSearch =
      !normalizedSearch ||
      item.fullName.toLowerCase().includes(normalizedSearch) ||
      item.nationalCode.includes(normalizedSearch) ||
      item.phoneNumber.includes(normalizedSearch);

    const matchesDepartment =
      departmentFilter === "همه" || item.department.$id === departmentFilter;

    const matchesStatus =
      statusFilter === "همه" || item.status.id === statusFilter;

    const matchesDate =
      !date || new Date(item.date).toDateString() === date.toDateString();

    return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
  });

  if (data.length === 0) {
    return (
      <Card className={className}>
        <Empty className="px-5.5 py-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <List />
            </EmptyMedia>
            <EmptyTitle>هنوز نوبتی ثبت نشده است.</EmptyTitle>
            <EmptyDescription>
              پس از ثبت نوبت‌های جدید، اطلاعات آن‌ها در این بخش نمایش داده
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
            مدیریت نوبت‌ها
          </CardTitle>

          <div className="flex-1 flex lg:flex-row flex-col lg:items-center justify-end gap-3 flex-wrap lg:w-auto w-full">
            <Input
              value={searchStr}
              placeholder="جست‌وجوی نام، کد ملی یا تلفن..."
              className="lg:w-62 w-full"
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
                  <SelectItem key={department.$id} value={department.$id}>
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
                <SelectValue placeholder="انتخاب وضعیت" />
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

            <DatePicker
              value={date}
              onChange={setDate}
              hasReset
              className="lg:w-36 w-full"
            />
          </div>
        </CardHeader>

        {filteredData.length === 0 ? (
          <Empty className="px-5.5 py-10">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <List />
              </EmptyMedia>
              <EmptyTitle>نوبتی با مشخصات موردنظر یافت نشد.</EmptyTitle>
              <EmptyDescription>
                هیچ نوبتی با عبارت جست‌وجو یا فیلترهای انتخاب‌شده مطابقت ندارد.
                لطفاً عبارت جست‌وجو یا فیلترها را تغییر دهید.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-background border-t border-input">
                <TableCell>نام و نام خانوادگی بیمار</TableCell>
                <TableCell>کد ملی</TableCell>
                <TableCell>شماره تلفن</TableCell>
                <TableCell>بخش درمانی</TableCell>
                <TableCell>تاریخ نوبت</TableCell>
                <TableCell>وضعیت نوبت</TableCell>
                <TableCell className="text-left">عملیات</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{digitsEnToFa(item.nationalCode)}</TableCell>
                  <TableCell>{digitsEnToFa(item.phoneNumber)}</TableCell>
                  <TableCell>{item.department.name}</TableCell>
                  <TableCell>
                    {persianNoTimeDateFormatter.format(new Date(item.date))}
                  </TableCell>
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
                    <EditAppointmentDialog data={item} refetch={refetch} />
                    <DeleteAppointmentDialog data={item} refetch={refetch} />
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
