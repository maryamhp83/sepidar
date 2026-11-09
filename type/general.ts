import {
  departments as patientDepartments,
  statuses as patientStatuses,
} from "@/component/dialog/patients/addNewPatientDialog";

import {
  departments as doctorsDepartments,
  statuses as doctorsStatuses,
} from "@/component/dialog/doctors/addNewDoctorDialog";

export type patientsDepartmentsType = (typeof patientDepartments)[number];
export type patientsStatusesType = (typeof patientStatuses)[number];

export type doctorsDepartmentsType = (typeof doctorsDepartments)[number];
export type doctorsStatusesType = (typeof doctorsStatuses)[number];

export interface PatientType {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  department: patientsDepartmentsType;
  status: patientsStatusesType;
  createdAt: string;
  id: string;
}

export interface DoctorType {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  department: doctorsDepartmentsType;
  status: doctorsStatusesType;
  createdAt: string;
  id: string;
}
