"use client";

import { RecentHospitolizedTableProps } from "@/type/component";
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
} from "@/component/ui/table";
import { Card, CardHeader, CardTitle } from "@/component/ui/card";
import { BedDouble, ChevronLeft } from "lucide-react";
import { Button } from "@/component/ui/button";
import Link from "next/link";
import { cn } from "cn";
import { Badge } from "@/component/ui/badge";
import { digitsEnToFa } from "@persian-tools/persian-tools";

export default function RecentHospitolizedTable({
  className,
  data,
}: RecentHospitolizedTableProps) {
  if (data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>بستری‌های اخیر</CardTitle>
        </CardHeader>
        <Empty className="px-5.5">
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <BedDouble />
            </EmptyMedia>
            <EmptyTitle>بیماری بستری نشده است</EmptyTitle>
            <EmptyDescription>
              اطلاعات بیماران بستری‌شده در این بخش نمایش داده می‌شوند.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Card>
    );
  } else {
    return (
      <Card className={cn("pb-0", className)}>
        <CardHeader className="flex items-center justify-between gap-3">
          <CardTitle className="block truncate">بستری‌های اخیر</CardTitle>
          <Button
            variant={"link"}
            className={"p-0 shrink-0"}
            render={
              <Link href={"/beds"}>
                مشاهده همه
                <ChevronLeft />
              </Link>
            }
          />
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="bg-background border-t border-input">
              <TableCell>بیمار</TableCell>
              <TableCell>پزشک معالج</TableCell>
              <TableCell>اتاق و تخت</TableCell>
              <TableCell>وضعیت</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={`recent-hospitalized-table-row-${index}`}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.doctor}</TableCell>
                <TableCell>
                  اتاق {digitsEnToFa(item.room.roomNumber)}، تخت{" "}
                  {digitsEnToFa(item.room.bedNumber)}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "bg-current/10",
                      item.status === "hospitolized"
                        ? "text-primary"
                        : item.status === "ready-to-discharge"
                          ? "text-amber-500"
                          : "text-green-500",
                    )}
                  >
                    {item.status === "hospitolized"
                      ? "بستری شده"
                      : item.status === "ready-to-discharge"
                        ? "آماده ترخیص"
                        : "ترخیص شده"}
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
