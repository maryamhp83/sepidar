"use client";

import { ChildrenOnlyProps } from "@/type/component";
import { QueryClientProvider as QCP, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryClientProvider({ children }: ChildrenOnlyProps) {
  return <QCP client={queryClient}>{children}</QCP>;
}
