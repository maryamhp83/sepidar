"use client";

import { RecentAppointmentsTableProps } from "@/type/component";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { ChevronLeft, List } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "cn";
import { persianDateFormatter } from "@/lib/date";
import { Badge } from "../ui/badge";

export default function RecentAppotinmetsTable({
  className,
  data,
}: RecentAppointmentsTableProps) {
  if (data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>نوبت‌های اخیر</CardTitle>
        </CardHeader>
        <Empty className="px-5.5">
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <List />
            </EmptyMedia>
            <EmptyTitle>هنوز نوبتی ثبت نشده است</EmptyTitle>
            <EmptyDescription>
              نوبت‌های ثبت‌شده بیماران در این بخش نمایش داده می‌شوند.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Card>
    );
  } else {
    return (
      <Card className={cn("pb-0", className)}>
        <CardHeader className="flex items-center justify-between gap-3">
          <CardTitle className="block truncate">نوبت‌های اخیر</CardTitle>
          <Button
            variant={"link"}
            className={"p-0"}
            render={
              <Link href={"/appointments"}>
                مشاهده همه
                <ChevronLeft />
              </Link>
            }
          />
        </CardHeader>
        <Table>
          <TableHeader className="border-t border-input bg-background">
            <TableCell>بیمار</TableCell>
            <TableCell>پزشک</TableCell>
            <TableCell>زمان</TableCell>
            <TableCell>وضعیت</TableCell>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={`recent-appointments-table-row-${index}`}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.doctor}</TableCell>
                <TableCell>
                  {persianDateFormatter.format(new Date(item.dateAndTime))}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "bg-current/10",
                      item.status === "done"
                        ? "text-green-500"
                        : item.status === "cancled"
                          ? "text-red-500"
                          : "text-primary",
                    )}
                  >
                    {item.status === "done"
                      ? "تکمیل شده "
                      : item.status === "cancled"
                        ? "لغو شده"
                        : "برنامه‌ریزی شده"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }
}
