"use client";

import { useQuery } from "@tanstack/react-query";
import ApiLoader from "../api/apiLoader";
import { getInvoices } from "@/lib/api/invoices";
import AddNewInvoiceDialog from "../dialog/invoices/addNewInvoiceDialog";
import InvoicesFilterableTable from "../table/invoicesFilterableTable";

export default function InvoicesPageContainer() {
  const query = useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });

  const invoicesFromQuery = query.data;
  const invoices = invoicesFromQuery ?? [];

  return (
    <ApiLoader
      isLoading={query.isLoading}
      isError={query.isError}
      refetch={query.refetch}
    >
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          مدیریت امور مالی، پرداخت‌ها و مطالبات بیماران
        </span>
        <AddNewInvoiceDialog refetch={query.refetch} />
      </div>
      <InvoicesFilterableTable
        refetch={query.refetch}
        data={invoices.map((item) => ({
          ...item,
          createdAt: item.$createdAt,
          id: item.$id,
        }))}
      />
    </ApiLoader>
  );
}
