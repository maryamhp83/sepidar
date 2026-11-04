import type { ReactNode } from "react";

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
