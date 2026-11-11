"use client";

import { DepartmentCardProps } from "@/type/component";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis, Pen, Trash } from "lucide-react";
import EditDepartmentDialog from "../dialog/departments/editDepartmentDialog";
import { useState } from "react";
import DeleteDepartmentDialog from "../dialog/departments/deleteDepartmentDialog";

export default function DepartmentCard({
  className,
  data,
  refetch,
}: DepartmentCardProps) {
  const [editDialogOpened, setEditDialogOpened] = useState(false);
  const [deleteDialogOpened, setDeleteDialogOpened] = useState(false);

  return (
    <>
      <EditDepartmentDialog
        data={data}
        open={editDialogOpened}
        onOpenChange={setEditDialogOpened}
        refetch={refetch}
      />
      <DeleteDepartmentDialog
        data={data}
        open={deleteDialogOpened}
        refetch={refetch}
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
      </Card>
    </>
  );
}
