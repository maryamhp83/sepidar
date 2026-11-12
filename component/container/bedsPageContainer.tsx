"use client";

import ApiLoader from "../api/apiLoader";
import AddNewBedDialog from "@/component/dialog/beds/addNewBedDialog";
import BedsFilterableTable from "@/component/table/bedsFilterableTable";
import { getBeds } from "@/lib/api/beds";
import { Department, StatusType } from "@/type/general";
import { useQuery } from "@tanstack/react-query";

export default function BedsPageContainer() {
  const query = useQuery({
    queryKey: ["beds"],
    queryFn: getBeds,
  });

  const bedsData = query.data;
  const beds = bedsData ?? [];

  return (
    <ApiLoader
      isLoading={query.isLoading}
      isError={query.isError}
      refetch={query.refetch}
    >
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          پذیرش، تخصیص تخت و ترخیص بیماران
        </span>
        <AddNewBedDialog refetch={query.refetch} />
      </div>
      <BedsFilterableTable
        refetch={query.refetch}
        data={beds.map((item) => {
          const status = JSON.parse(item.status) as StatusType;
          const department = JSON.parse(item.department) as Department;
          const parsedDate = JSON.parse(item.date) as {
            to: string;
            from: string;
          };

          return {
            ...item,
            createdAt: item.$createdAt,
            date: parsedDate,
            department,
            status,
            id: item.$id,
          };
        })}
      />
    </ApiLoader>
  );
}
