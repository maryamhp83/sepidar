export interface Department {
  name: string;
  id: string;
  description: string;
}

export interface StatusType {
  name: string;
  id: string;
}

export interface PatientType {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  department: Department;
  status: StatusType;
  createdAt: string;
  id: string;
}

export interface DoctorType {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  department: Department;
  status: StatusType;
  createdAt: string;
  id: string;
}

export interface AppointmentType {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  date: string;
  department: Department;
  status: StatusType;
  createdAt: string;
  id: string;
}

export interface BedType {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  date: {
    from: string;
    to: string;
  };
  department: Department;
  status: StatusType;
  createdAt: string;
  id: string;
}

export interface MedicalRecordType {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  date: string;
  department: Department;
  status: StatusType;
  createdAt: string;
  id: string;
}

export interface InvoiceType {
  id: string;
  fullName: string;
  description: string;
  totalPrice: number;
  payed: number;
  createdAt: string;
  status: "payed" | "not-payed";
}
