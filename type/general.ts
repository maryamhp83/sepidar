import {
  departments as patientDepartments,
  statuses as patientStatuses,
} from "@/component/dialog/patients/addNewPatientDialog";

export type patientsDepartmentsType = (typeof patientDepartments)[number];
export type patientsStatusesType = (typeof patientStatuses)[number];

export interface PatientType {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  department: patientsDepartmentsType;
  status: patientsStatusesType;
  createdAt: string;
  id: string;
}
