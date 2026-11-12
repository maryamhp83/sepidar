"use client";

import ApiLoader from "../api/apiLoader";
import AddNewMedicalRecordDialog from "@/component/dialog/medical-records/addNewMedicalRecordDialog";
import MedicalRecordsFilterableTable from "@/component/table/medicalRecordsFilterableTable";
import { getMedicalRecords } from "@/lib/api/medicalRecords";
import { Department, StatusType } from "@/type/general";
import { useQuery } from "@tanstack/react-query";

export default function MedicalRecordsPageContainer() {
  const query = useQuery({
    queryKey: ["medical-records"],
    queryFn: getMedicalRecords,
  });

  const medicalRecordsFromQuery = query.data;
  const medicalRecords = medicalRecordsFromQuery ?? [];

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
        <AddNewMedicalRecordDialog refetch={query.refetch} />
      </div>
      <MedicalRecordsFilterableTable
        refetch={query.refetch}
        data={medicalRecords.map((item) => {
          const status = JSON.parse(item.status) as StatusType;
          const department = JSON.parse(item.department) as Department;

          return {
            ...item,
            createdAt: item.$createdAt,
            department,
            status,
            id: item.$id,
          };
        })}
      />
    </ApiLoader>
  );
}
