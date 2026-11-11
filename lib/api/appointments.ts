import statuses from "@/data/statuses";
import { addNewAppointmentFormType } from "../formSchema";
import { databaseId, tablesDB, appointmentsTableId, ID } from "./client";
import { GETAppointment, GETDepartment } from "@/type/api";

export async function getAppointments() {
  const response = await tablesDB.listRows<GETAppointment>({
    databaseId,
    tableId: appointmentsTableId,
  });

  return response.rows;
}

export async function createAppointment(
  data: addNewAppointmentFormType,
  departments: GETDepartment[],
) {
  const status = statuses.find((item) => item.id === data.status);
  const department = departments.find((item) => item.$id === data.department);

  return await tablesDB.createRow({
    databaseId,
    rowId: ID.unique(),
    tableId: appointmentsTableId,
    data: {
      ...data,
      status: status ? JSON.stringify(status) : "",
      date: new Date().toISOString(),
      department: department ? JSON.stringify(department) : "",
    },
  });
}

export async function updateDoctor(
  data: addNewAppointmentFormType,
  id: string,
  departments: GETDepartment[],
) {
  const status = statuses.find((item) => item.id === data.status);
  const department = departments.find((item) => item.$id === data.department);

  return await tablesDB.updateRow({
    databaseId,
    rowId: id,
    tableId: appointmentsTableId,
    data: {
      ...data,
      status: status ? JSON.stringify(status) : "",
      date: new Date().toISOString(),
      department: department ? JSON.stringify(department) : "",
    },
  });
}

export async function deleteDoctor(id: string) {
  return await tablesDB.deleteRow({
    databaseId,
    rowId: id,
    tableId: appointmentsTableId,
  });
}
