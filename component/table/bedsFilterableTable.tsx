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
import { BedsFilterableTableProps } from "@/type/component";
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
import type { DateRange } from "react-day-picker";
import EditBedDialog from "../dialog/beds/editBedDialog";
import DeleteBedDialog from "../dialog/beds/deleteBedDialog";
import { useDepartmentsFetch } from "@/context/departmentsFetchContext";

export default function BedsFilterableTable({
  data,
  className,
  refetch,
}: BedsFilterableTableProps) {
  const [searchStr, setSearchStr] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("همه");
  const [statusFilter, setStatusFilter] = useState("همه");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const normalizedSearch = searchStr.trim().toLowerCase();

  const departmentsFetch = useDepartmentsFetch();
  const departments = departmentsFetch.data ?? [];

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

    const bedStartDate = new Date(item.date.from);
    const bedEndDate = new Date(item.date.to);

    const filterStartDate = dateRange?.from;
    const filterEndDate = dateRange?.to ?? filterStartDate;

    const matchesDate =
      !filterStartDate ||
      (bedStartDate <= filterEndDate! && bedEndDate >= filterStartDate);

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
            <EmptyTitle>هنوز بستری‌ای ثبت نشده است.</EmptyTitle>
            <EmptyDescription>
              پس از ثبت بستری‌های جدید، اطلاعات آن‌ها در این بخش نمایش داده
              می‌شود.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Card>
    );
  }

  return (
    <Card className={cn("pb-0", className)}>
      <CardHeader className="flex lg:flex-row flex-col items-center justify-between gap-3">
        <CardTitle className="truncate block lg:w-auto w-full">
          مدیریت بستری‌ها
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
            <SelectTrigger className={"lg:w-auto w-full"}>
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
            <SelectTrigger className={"lg:w-auto w-full"}>
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
            range
            rangeValue={dateRange}
            onRangeChange={setDateRange}
            placeholder="بازه بستری"
            hasReset
            className="lg:w-52 w-full"
          />
        </div>
      </CardHeader>

      {filteredData.length === 0 ? (
        <Empty className="px-5.5 py-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <List />
            </EmptyMedia>
            <EmptyTitle>بستری‌ای با مشخصات موردنظر یافت نشد.</EmptyTitle>
            <EmptyDescription>
              هیچ بستری با عبارت جست‌وجو یا فیلترهای انتخاب‌شده مطابقت ندارد.
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
              <TableCell>بازه بستری</TableCell>
              <TableCell>وضعیت بستری</TableCell>
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
                  <div className="flex flex-col gap-1">
                    <span>
                      از:{" "}
                      {persianNoTimeDateFormatter.format(
                        new Date(item.date.from),
                      )}
                    </span>
                    <span>
                      تا:{" "}
                      {persianNoTimeDateFormatter.format(
                        new Date(item.date.to),
                      )}
                    </span>
                  </div>
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
                  <EditBedDialog refetch={refetch} data={item} />
                  <DeleteBedDialog refetch={refetch} data={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
