import { AddNewInvoiceFormType } from "../formSchema";
import { databaseId, tablesDB, ID, invoicesTableId } from "./client";
import { GETInvoices } from "@/type/api";

export async function getInvoices() {
  const response = await tablesDB.listRows<GETInvoices>({
    databaseId,
    tableId: invoicesTableId,
  });

  return response.rows;
}

export async function createInvoice(data: AddNewInvoiceFormType) {
  return await tablesDB.createRow({
    databaseId,
    rowId: ID.unique(),
    tableId: invoicesTableId,
    data,
  });
}

export async function updateInvoice(data: AddNewInvoiceFormType, id: string) {
  return await tablesDB.updateRow({
    databaseId,
    rowId: id,
    tableId: invoicesTableId,
    data: data,
  });
}

export async function deleteInvoice(id: string) {
  return await tablesDB.deleteRow({
    databaseId,
    rowId: id,
    tableId: invoicesTableId,
  });
}
