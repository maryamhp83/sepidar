import { addNewDepartmentFormType } from "../formSchema";
import { databaseId, tablesDB, departmentsTableId, ID } from "./client";
import { GETDepartment } from "@/type/api";

export async function getDepartments() {
  const response = await tablesDB.listRows<GETDepartment>({
    databaseId,
    tableId: departmentsTableId,
  });

  return response.rows;
}

export async function createDepartment(data: addNewDepartmentFormType) {
  return await tablesDB.createRow({
    databaseId,
    rowId: ID.unique(),
    tableId: departmentsTableId,
    data,
  });
}

export async function updateDepartment(
  data: addNewDepartmentFormType,
  id: string,
) {
  return await tablesDB.updateRow({
    databaseId,
    rowId: id,
    tableId: departmentsTableId,
    data: data,
  });
}

export async function deleteDepartment(id: string) {
  return await tablesDB.deleteRow({
    databaseId,
    rowId: id,
    tableId: departmentsTableId,
  });
}
