"use client";

import { DepartmentCardProps } from "@/type/component";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis, Pen, Trash } from "lucide-react";
import { formatPersianNumber } from "@/lib/number";
import EditDepartmentDialog from "../dialog/departments/editDepartmentDialog";
import { useState } from "react";
import DeleteDepartmentDialog from "../dialog/departments/deleteDepartmentDialog";

export default function DepartmentCard({
  className,
  data,
}: DepartmentCardProps) {
  const [editDialogOpened, setEditDialogOpened] = useState(false);
  const [deleteDialogOpened, setDeleteDialogOpened] = useState(false);

  return (
    <>
      <EditDepartmentDialog
        data={data}
        open={editDialogOpened}
        onOpenChange={setEditDialogOpened}
      />
      <DeleteDepartmentDialog
        data={data}
        open={deleteDialogOpened}
        onOpenChange={setDeleteDialogOpened}
      />
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between gap-4 mb-2">
            <CardTitle className="flex-1 truncate">{data.name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button size="icon-sm" variant={"outline"}>
                    <Ellipsis />
                  </Button>
                }
              />
              <DropdownMenuContent className={"w-44"}>
                <DropdownMenuItem onClick={() => setEditDialogOpened(true)}>
                  <Pen />
                  ویرایش دپارتمان
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeleteDialogOpened(true)}
                  variant="destructive"
                >
                  <Trash />
                  حذف دپارتمان
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <ul className="space-y-2 [&>li]:text-sm [&>li]:font-normal">
            <li>پزشک فعال : {formatPersianNumber(data.doctorsCount)}</li>
            <li>بیمار فعال : {formatPersianNumber(data.patientsCount)}</li>
          </ul>
        </CardFooter>
      </Card>
    </>
  );
}
