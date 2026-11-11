import { Models } from "appwrite";

export interface GETPatient extends Models.Row {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  status: string; // strigified type of Status
  department: string; // strigified type of Department
}

export interface GETDoctor extends Models.Row {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  status: string; // strigified type of Status
  department: string; // strigified type of Department
}

export interface GETDepartment extends Models.Row {
  name: string;
  description: string;
}
