import type { UseQueryResult } from "@tanstack/react-query";
import type { Models } from "appwrite";

export type AuthFetchContextValue = UseQueryResult<
  Models.User<Models.Preferences>,
  Error
>;

export interface AuthFetchContextProviderProps {
  value: AuthFetchContextValue;
  children: React.ReactNode;
}
