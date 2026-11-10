import statuses from "@/data/statuses";
import { addNewPatientFormType } from "../formSchema";
import { databaseId, ID, tablesDB, patientsTableId } from "./client";
import departments from "@/data/departments";
import { GETPatient } from "@/type/api";

export async function getPatients() {
  const response = await tablesDB.listRows<GETPatient>({
    databaseId,
    tableId: patientsTableId,
  });

  return response.rows;
}

export async function createPatient(data: addNewPatientFormType) {
  const status = statuses.find((item) => item.id === data.status);
  const department = departments.find((item) => item.id === data.department);

  return await tablesDB.createRow({
    databaseId,
    rowId: ID.unique(),
    tableId: patientsTableId,
    data: {
      ...data,
      status: status ? JSON.stringify(status) : "",
      department: department ? JSON.stringify(department) : "",
    },
  });
}

export async function updatePatient(data: addNewPatientFormType, id: string) {
  const status = statuses.find((item) => item.id === data.status);
  const department = departments.find((item) => item.id === data.department);

  return await tablesDB.updateRow({
    databaseId,
    rowId: id,
    tableId: patientsTableId,
    data: {
      ...data,
      status: status ? JSON.stringify(status) : "",
      department: department ? JSON.stringify(department) : "",
    },
  });
}

export async function deletePatient(id: string) {
  return await tablesDB.deleteRow({
    databaseId,
    rowId: id,
    tableId: patientsTableId,
  });
}
