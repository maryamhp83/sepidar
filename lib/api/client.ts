import { Account, Client, TablesDB, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

export const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const bedsTableId = process.env.NEXT_PUBLIC_APPWRITE_BEDS_TABLE_ID!;
export const patientsTableId =
  process.env.NEXT_PUBLIC_APPWRITE_PATIENTS_TABLE_ID!;

export const doctorsTableId =
  process.env.NEXT_PUBLIC_APPWRITE_DOCTORS_TABLE_ID!;

export const departmentsTableId =
  process.env.NEXT_PUBLIC_APPWRITE_DEPARTMENTS_TABLE_ID!;

export const appointmentsTableId =
  process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENTS_TABLE_ID!;

export const medicalRecordsTableId =
  process.env.NEXT_PUBLIC_APPWRITE_MEDICAL_RECORDS_TABLE_ID!;

export const invoicesTableId =
  process.env.NEXT_PUBLIC_APPWRITE_INVOICES_TABLE_ID!;

export { ID };
export { client };
