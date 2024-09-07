"use client";
import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "~/lib/queryClient";
import { DataTableContextProvider } from "~/contexts/dataTableContext";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <DataTableContextProvider>{children}</DataTableContextProvider>
    </QueryClientProvider>
  );
}
