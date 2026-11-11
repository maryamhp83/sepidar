"use client";

import AddNewDoctorDialog from "@/component/dialog/doctors/addNewDoctorDialog";
import DoctorsFilterableTable from "@/component/table/doctorsFilterableTable";
import { getDoctors } from "@/lib/api/doctors";
import { useQuery } from "@tanstack/react-query";
import ApiLoader from "../api/apiLoader";
import { Department, StatusType } from "@/type/general";

export default function DoctorsPageContainer() {
  const query = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  return (
    <ApiLoader
      isError={query.isError}
      isLoading={query.isLoading}
      refetch={query.refetch}
    >
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          اطلاعات، برنامه کاری و وضعیت پزشکان
        </span>
        <AddNewDoctorDialog refetch={query.refetch} />
      </div>
      <DoctorsFilterableTable
        refetch={query.refetch}
        data={
          query.data
            ? query.data.map((item) => {
                const status = JSON.parse(item.status) as StatusType;
                const department = JSON.parse(item.department) as Department;

                return {
                  ...item,
                  id: item.$id,
                  createdAt: item.$createdAt,
                  status,
                  department,
                };
              })
            : []
        }
      />
    </ApiLoader>
  );
}
