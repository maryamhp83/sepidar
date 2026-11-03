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
