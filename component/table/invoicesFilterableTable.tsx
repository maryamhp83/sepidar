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
import { InvoicesFilterableTableProps } from "@/type/component";
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
import DatePicker from "../ui/datePicker";
import { persianNoTimeDateFormatter } from "@/lib/date";
import EditInvoiceDialog from "@/component/dialog/invoices/editInvoiceDialog";
import DeleteInvoiceDialog from "@/component/dialog/invoices/deleteInvoiceDialog";
import { formatPersianNumber } from "@/lib/number";

export default function InvoicesFilterableTable({
  data,
  className,
}: InvoicesFilterableTableProps) {
  const [searchStr, setSearchStr] = useState("");
  const [statusFilter, setStatusFilter] = useState("همه");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const normalizedSearch = searchStr.trim().toLowerCase();

  const filteredData = data.filter((item) => {
    const matchesSearch =
      !normalizedSearch ||
      item.fullName.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch);

    const matchesStatus =
      statusFilter === "همه" || item.status === statusFilter;

    const matchesDate =
      !date || new Date(item.createdAt).toDateString() === date.toDateString();

    return matchesSearch && matchesStatus && matchesDate;
  });

  if (data.length === 0) {
    return (
      <Card className={className}>
        <Empty className="px-5.5 py-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <List />
            </EmptyMedia>
            <EmptyTitle>هنوز فاکتوری ثبت نشده است.</EmptyTitle>
            <EmptyDescription>
              پس از ثبت فاکتورهای جدید، اطلاعات آن‌ها در این بخش نمایش داده
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
          مدیریت فاکتورها
        </CardTitle>

        <div className="flex-1 flex lg:flex-row flex-col lg:items-center justify-end gap-3 flex-wrap lg:w-auto w-full">
          <Input
            value={searchStr}
            placeholder="جست‌وجوی نام بیمار یا توضیحات..."
            className="lg:w-62 w-full"
            onChange={(e) => setSearchStr(e.target.value)}
          />

          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as string)}
          >
            <SelectTrigger>
              <SelectValue placeholder="انتخاب وضعیت پرداخت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="همه">همه وضعیت‌ها</SelectItem>
              <SelectItem value="payed">پرداخت‌شده</SelectItem>
              <SelectItem value="not-payed">پرداخت‌نشده</SelectItem>
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
            <EmptyTitle>فاکتوری با مشخصات موردنظر یافت نشد.</EmptyTitle>
            <EmptyDescription>
              هیچ فاکتوری با عبارت جست‌وجو یا فیلترهای انتخاب‌شده مطابقت ندارد.
              لطفاً عبارت جست‌وجو یا فیلترها را تغییر دهید.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-background border-t border-input">
              <TableCell>نام و نام خانوادگی بیمار</TableCell>
              <TableCell>توضیحات</TableCell>
              <TableCell>مبلغ کل (تومان)</TableCell>
              <TableCell>مبلغ پرداخت‌شده (تومان)</TableCell>
              <TableCell>مانده حساب (تومان)</TableCell>
              <TableCell>تاریخ ثبت</TableCell>
              <TableCell>وضعیت پرداخت</TableCell>
              <TableCell className="text-left">عملیات</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>

                <TableCell className="max-w-48 truncate">
                  {item.description}
                </TableCell>

                <TableCell className="tabular-nums">
                  {formatPersianNumber(item.totalPrice)}
                </TableCell>

                <TableCell className="tabular-nums">
                  {formatPersianNumber(item.payed)}
                </TableCell>

                <TableCell className="tabular-nums">
                  {formatPersianNumber(
                    Math.max(0, item.totalPrice - item.payed),
                  )}
                </TableCell>

                <TableCell>
                  {persianNoTimeDateFormatter.format(new Date(item.createdAt))}
                </TableCell>

                <TableCell>
                  <Badge
                    className={cn(
                      "bg-current/10",
                      item.status === "payed" ? "text-primary" : "text-red-500",
                    )}
                  >
                    {item.status === "payed" ? "پرداخت‌شده" : "پرداخت‌نشده"}
                  </Badge>
                </TableCell>

                <TableCell className="flex items-center justify-end gap-2">
                  <EditInvoiceDialog data={item} />
                  <DeleteInvoiceDialog data={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
