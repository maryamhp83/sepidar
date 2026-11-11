"use client";

import type {
  DepartmentsFetchContextProviderProps,
  DepartmentsFetchContextValue,
} from "@/type/context";
import { createContext, useContext } from "react";

const DepartmentsFetchContext =
  createContext<DepartmentsFetchContextValue | null>(null);

export function DepartmentsFetchProvider({
  value,
  children,
}: DepartmentsFetchContextProviderProps) {
  return (
    <DepartmentsFetchContext.Provider value={value}>
      {children}
    </DepartmentsFetchContext.Provider>
  );
}

export function useDepartmentsFetch() {
  const context = useContext(DepartmentsFetchContext);

  if (context === null) {
    throw new Error(
      "useDeparmentsFetch must be used within DepartmentsFetchProvider",
    );
  }

  return context;
}
