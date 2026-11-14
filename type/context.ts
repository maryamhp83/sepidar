import type { UseQueryResult } from "@tanstack/react-query";
import type { Models } from "appwrite";
import { GETDepartment } from "./api";
import { ReactNode } from "react";

export type AuthFetchContextValue = UseQueryResult<
  Models.User<Models.Preferences>,
  Error
>;

export interface AuthFetchContextProviderProps {
  value: AuthFetchContextValue;
  children: ReactNode;
}

export type DepartmentsFetchContextValue = UseQueryResult<
  GETDepartment[],
  Error
>;

export interface DepartmentsFetchContextProviderProps {
  value: DepartmentsFetchContextValue;
  children: ReactNode;
}
