import statuses from "@/data/statuses";
import { addNewDoctorFormType } from "../formSchema";
import { databaseId, ID, tablesDB, doctorsTableId } from "./client";
import { GETDepartment, GETDoctor } from "@/type/api";

export async function getDoctors() {
  const response = await tablesDB.listRows<GETDoctor>({
    databaseId,
    tableId: doctorsTableId,
  });

  return response.rows;
}

export async function createDoctor(
  data: addNewDoctorFormType,
  departments: GETDepartment[],
) {
  const status = statuses.find((item) => item.id === data.status);
  const department = departments.find((item) => item.$id === data.department);

  return await tablesDB.createRow({
    databaseId,
    rowId: ID.unique(),
    tableId: doctorsTableId,
    data: {
      ...data,
      status: status ? JSON.stringify(status) : "",
      department: department ? JSON.stringify(department) : "",
    },
  });
}

export async function updateDoctor(
  data: addNewDoctorFormType,
  id: string,
  departments: GETDepartment[],
) {
  const status = statuses.find((item) => item.id === data.status);
  const department = departments.find((item) => item.$id === data.department);

  return await tablesDB.updateRow({
    databaseId,
    rowId: id,
    tableId: doctorsTableId,
    data: {
      ...data,
      status: status ? JSON.stringify(status) : "",
      department: department ? JSON.stringify(department) : "",
    },
  });
}

export async function deleteDoctor(id: string) {
  return await tablesDB.deleteRow({
    databaseId,
    rowId: id,
    tableId: doctorsTableId,
  });
}
