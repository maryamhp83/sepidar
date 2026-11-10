"use client";

import PatientsFilterableTable from "@/component/table/patientsFilterableTable";
import { getPatients } from "@/lib/api/patients";
import { useQuery } from "@tanstack/react-query";
import AddNewPatientDialog from "../dialog/patients/addNewPatientDialog";
import { Department, StatusType } from "@/type/general";
import ApiLoader from "../api/apiLoader";

export default function PatientsPageContainer() {
  const query = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  return (
    <ApiLoader
      isError={query.isError}
      isLoading={query.isLoading}
      refetch={query.refetch}
    >
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          مشاهده، ثبت و ویرایش اطلاعات بیماران بیمارستان
        </span>
        <AddNewPatientDialog refetch={query.refetch} />
      </div>
      <PatientsFilterableTable
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
