import type { ReactNode } from "react";
import {
  AppointmentType,
  BedType,
  Department,
  DoctorType,
  InvoiceType,
  MedicalRecordType,
  PatientType,
} from "./general";
import { DateRange, Matcher } from "react-day-picker";

export interface ChildrenOnlyProps {
  children: ReactNode;
}

export interface APIDialogProps<T> {
  className?: string;
  refetch?: () => void;
  data?: T;
}

export interface ClassOnlyProps {
  className?: string;
}

export interface RecoveryFormProps {
  className?: string;
  userId?: string;
  secret?: string;
  expire?: string;
}

export interface AuthGuardProps {
  children: ReactNode;
  mode?: "auth-only" | "disabled" | "no-auth-only";
}

export interface AlertScreenProps {
  className?: string;
  title: string;
  description: string;
  variant: "default" | "destructive";
  button?: ReactNode;
}

export interface LoadingScreenProps {
  className?: string;
}

export interface StaticBreadCrumbProps {
  className?: string;
  values: string[];
}

export interface MainLayoutProps {
  className?: string;
  children: ReactNode;
  mode?: "auth-only" | "disabled" | "no-auth-only";
}

export interface DialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface NavbarStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface StatusCardProps {
  title: string;
  icon: {
    element: ReactNode;
    color: `text-${string}`;
  };
  className?: string;
  amount: number;
  unit?: "toman" | "people" | "none";
}

export interface AppointmentsChartCardProps {
  className?: string;
  data: {
    month: string;
    newPatient: number;
    appointment: number;
  }[];
}

export interface BedOccupancyCardProps {
  className?: string;
  data: {
    totalBeds: number;
    occupiedBeds: number;
  };
}

export interface RecentAppointmentsTableProps {
  className?: string;
  data: {
    name: string;
    doctor: string;
    dateAndTime: string; // ISO
    status: "done" | "scheduled" | "cancled";
  }[];
}

export interface RecentHospitolizedTableProps {
  className?: string;
  data: {
    name: string;
    doctor: string;
    room: {
      roomNumber: number;
      bedNumber: number;
    };
    status: "hospitolized" | "ready-to-discharge" | "discharged";
  }[];
}

export interface FilterableTableProps<T> {
  className?: string;
  data: T;
  refetch?: () => void;
}

export type DoctorsFilterableTableProps = FilterableTableProps<DoctorType[]>;
export type PatientsFilterableTableProps = FilterableTableProps<PatientType[]>;
export type BedsFilterableTableProps = FilterableTableProps<BedType[]>;
export type InvoicesFilterableTableProps = FilterableTableProps<InvoiceType[]>;
export type MedicalRecordsFilterableTableProps = FilterableTableProps<
  MedicalRecordType[]
>;

export type AppointmentsFilterableTableProps = FilterableTableProps<
  AppointmentType[]
>;

export type AddNewPatientDialogProps = APIDialogProps<undefined>;
export type AddNewDoctorDialogProps = APIDialogProps<undefined>;
export type AddNewDepartmentDialogProps = APIDialogProps<undefined>;
export type AddNewAppointmentDialogProps = APIDialogProps<undefined>;
export type AddNewBedDialogProps = APIDialogProps<undefined>;
export type AddNewMedicalRecordDialogProps = APIDialogProps<undefined>;
export type AddNewInvoiceRecordDialogProps = APIDialogProps<undefined>;

export type EditPatientDialogProps = APIDialogProps<PatientType>;
export type EditAppointmentDialogProps = APIDialogProps<AppointmentType>;
export type EditBedDialogProps = APIDialogProps<BedType>;
export type EditDoctorDialogProps = APIDialogProps<DoctorType>;
export type EditMedicalRecordDialogProps = APIDialogProps<MedicalRecordType>;
export type EditInvoiceDialogProps = APIDialogProps<InvoiceType>;
export type EditDepartmentDialogProps = APIDialogProps<Department> &
  DialogProps;

export type DeletePatientDialogProps = APIDialogProps<PatientType>;
export type DeleteDoctorDialogProps = APIDialogProps<DoctorType>;
export type DeleteBedDialogProps = APIDialogProps<BedType>;
export type DeleteAppointmentDialogProps = APIDialogProps<AppointmentType>;
export type DeleteMedicalRecordDialogProps = APIDialogProps<MedicalRecordType>;
export type DeleteInvoiceDialogProps = APIDialogProps<InvoiceType>;
export type DeleteDepartmentDialogProps = APIDialogProps<Department> &
  DialogProps;

export interface DepartmentCardProps {
  className?: string;
  data: Department;
  refetch?: () => void;
}

export interface DatePickerProps {
  value?: Date;
  invalid?: boolean;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  disabledDates?: Matcher | Matcher[];
  minDate?: Date;
  maxDate?: Date;
  hasReset?: boolean;
  range?: boolean;
  rangeValue?: DateRange;
  onRangeChange?: (range: DateRange | undefined) => void;
  className?: string;
}

export interface AppointmentsCalendarCardProps {
  className?: string;
  data: AppointmentType[];
}

export interface ApiLoaderProps {
  children: ReactNode;
  isLoading: boolean;
  isError: boolean;
  refetch?: () => void;
}
