import type { ReactNode } from "react";
import {
  patientsDepartmentsType,
  patientsStatusesType,
  PatientType,
} from "./general";

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
