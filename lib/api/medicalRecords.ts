import statuses from "@/data/statuses";
import { addNewAppointmentFormType } from "../formSchema";
import { databaseId, tablesDB, ID, medicalRecordsTableId } from "./client";
import { GETMedicalRecords, GETDepartment } from "@/type/api";

export async function getMedicalRecords() {
  const response = await tablesDB.listRows<GETMedicalRecords>({
    databaseId,
    tableId: medicalRecordsTableId,
  });

  return response.rows;
}

export async function createMedicalRecord(
  data: addNewAppointmentFormType,
  departments: GETDepartment[],
) {
  const status = statuses.find((item) => item.id === data.status);
  const department = departments.find((item) => item.$id === data.department);

  return await tablesDB.createRow({
    databaseId,
    rowId: ID.unique(),
    tableId: medicalRecordsTableId,
    data: {
      ...data,
      status: status ? JSON.stringify(status) : "",
      date: new Date().toISOString(),
      department: department ? JSON.stringify(department) : "",
    },
  });
}

export async function updateMedicalRecord(
  data: addNewAppointmentFormType,
  id: string,
  departments: GETDepartment[],
) {
  const status = statuses.find((item) => item.id === data.status);
  const department = departments.find((item) => item.$id === data.department);

  return await tablesDB.updateRow({
    databaseId,
    rowId: id,
    tableId: medicalRecordsTableId,
    data: {
      ...data,
      status: status ? JSON.stringify(status) : "",
      date: new Date().toISOString(),
      department: department ? JSON.stringify(department) : "",
    },
  });
}

export async function deleteMedicalRecord(id: string) {
  return await tablesDB.deleteRow({
    databaseId,
    rowId: id,
    tableId: medicalRecordsTableId,
  });
}
