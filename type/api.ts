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

export interface GETAppointment extends Models.Row {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  date: string;
  status: string; // strigified type of Status
  department: string; // strigified type of Department
}

export interface GETBeds extends Models.Row {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  date: string; // Stringifed type of : {from: string; to: string;} . In ISO Format
  status: string; // strigified type of Status
  department: string; // strigified type of Department
}
