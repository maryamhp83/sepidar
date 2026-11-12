import statuses from "@/data/statuses";
import { addNewBedFormType } from "../formSchema";
import { databaseId, tablesDB, ID, bedsTableId } from "./client";
import { GETBeds, GETDepartment } from "@/type/api";

export async function getBeds() {
  const response = await tablesDB.listRows<GETBeds>({
    databaseId,
    tableId: bedsTableId,
  });

  return response.rows;
}

export async function createBed(
  data: addNewBedFormType,
  departments: GETDepartment[],
) {
  const status = statuses.find((item) => item.id === data.status);
  const department = departments.find((item) => item.$id === data.department);

  return await tablesDB.createRow({
    databaseId,
    rowId: ID.unique(),
    tableId: bedsTableId,
    data: {
      fullName: data.fullName,
      nationalCode: data.nationalCode,
      phoneNumber: data.phoneNumber,
      status: status ? JSON.stringify(status) : "",
      department: department ? JSON.stringify(department) : "",
      date: JSON.stringify({
        from: data.fromDate.toISOString(),
        to: data.toDate.toISOString(),
      }),
    },
  });
}

export async function updateBed(
  data: addNewBedFormType,
  id: string,
  departments: GETDepartment[],
) {
  const status = statuses.find((item) => item.id === data.status);
  const department = departments.find((item) => item.$id === data.department);

  return await tablesDB.updateRow({
    databaseId,
    rowId: id,
    tableId: bedsTableId,
    data: {
      fullName: data.fullName,
      nationalCode: data.nationalCode,
      phoneNumber: data.phoneNumber,
      status: status ? JSON.stringify(status) : "",
      department: department ? JSON.stringify(department) : "",
      date: JSON.stringify({
        from: data.fromDate.toISOString(),
        to: data.toDate.toISOString(),
      }),
    },
  });
}

export async function deleteBed(id: string) {
  return await tablesDB.deleteRow({
    databaseId,
    rowId: id,
    tableId: bedsTableId,
  });
}
