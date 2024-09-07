"use client";
import { PropsWithChildren, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTableHeader from "./Header";
import DataTablePagination from "./Pagination";
import DataTableRoot from "./Root";
import { useDataTableContext } from "~/contexts/dataTableContext";
import DeleteDataAlertDialog from "../DeleteDataAlertDialog";
import { useToast } from "~/hooks/use-toast";

interface DataTableProps<TData, TValue> extends PropsWithChildren {
  getColumns(): ColumnDef<TData>[];
  data: TData[];
  pages: number;
  queryKey: string;
  allowSearch?: boolean;
  getFunction: (params: {
    page: number;
    q?: string;
  }) => Promise<{ data: TData[]; pages: number }>;
  deleteFunction: ({ id }: { id: number }) => Promise<void>;
}

export default function DataTable<TData, TValue>({
  getColumns,
  data,
  pages,
  allowSearch,
  queryKey,
  getFunction,
  deleteFunction,
  children,
}: DataTableProps<TData, TValue>) {
  const [search, setSearch] = useState<string>();
  const [tablePages, setTablePages] = useState(pages);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(data);
  const { alertDialogIsOpen, setAlertDialogIsOpen, toDeleteDataId } =
    useDataTableContext();
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const { toast } = useToast();
  const pageFromUrl = params.get("page");

  const { isLoading } = useQuery({
    queryKey: [queryKey, currentPage, search],
    queryFn: async () => {
      const { data, pages } = await getFunction({
        page: search ? 1 : currentPage,
        q: search,
      });
      if (search) {
        setCurrentPage(1);
      }
      setTableData(data);
      setTablePages(pages);
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({
        title: "Sucesso",
        description: "Ação realizada com sucesso",
        variant: "success",
      });
    },
    onError: () => {
      setAlertDialogIsOpen(false);
      toast({
        title: "Erro",
        description: "Não foi possível realizar a ação. Tente novamente",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <DataTableHeader allowSearch={allowSearch} setSearch={setSearch}>
        {children}
      </DataTableHeader>
      <DataTableRoot
        isLoading={isLoading}
        columns={getColumns()}
        data={tableData}
      />
      <DataTablePagination
        pages={tablePages}
        currentPage={pageFromUrl ? parseInt(pageFromUrl) : currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <DeleteDataAlertDialog
        confirm={mutateAsync}
        isOpen={alertDialogIsOpen}
        setIsOpen={setAlertDialogIsOpen}
        dataId={toDeleteDataId}
      />
    </div>
  );
}
