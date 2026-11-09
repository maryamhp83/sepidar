import type { ReactNode } from "react";
import {
  AppointmentType,
  Department,
  DoctorType,
  PatientType,
} from "./general";
import { Matcher } from "react-day-picker";

export interface ChildrenOnlyProps {
  children: ReactNode;
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

export interface PatientsFilterableTableProps {
  className?: string;
  data: PatientType[];
}

export interface EditPatientDialogProps {
  className?: string;
  data: PatientType;
}

export type DeletePatientDialogProps = EditPatientDialogProps;

export interface DoctorsFilterableTableProps {
  className?: string;
  data: DoctorType[];
}

export interface EditDoctorDialogProps {
  className?: string;
  data: DoctorType;
}

export type DeleteDoctorDialogProps = EditDoctorDialogProps;

export interface DepartmentCardProps {
  className?: string;
  data: Department;
}

export interface EditDepartmentDialogProps extends DialogProps {
  data: Department;
}

export type DeleteDepartmentDialogProps = EditDepartmentDialogProps;

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
  className?: string;
}

export interface AppointmentsFiltrableTableProps {
  className?: string;
  data: AppointmentType[];
}

export interface EditAppointmentDialogProps {
  data: AppointmentType;
}

export type DeleteAppointmentDialogProps = EditAppointmentDialogProps;
