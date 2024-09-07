"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import { Ingredient } from "~/types";
import { useDataTableContext } from "~/contexts/dataTableContext";

function getColumns() {
  const { setAlertDialogIsOpen, setToDeleteDataId, setToUpdateDataId } =
    useDataTableContext();

  function handleDeleteClick(id: number) {
    setAlertDialogIsOpen(true);
    setToDeleteDataId(id);
  }

  function handleUpdateClick(id: number) {
    setToUpdateDataId(id);
  }

  const columns: ColumnDef<Ingredient>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      meta: "string",
    },
    {
      accessorKey: "quantity",
      header: "Quantidade",
      meta: "number",
    },
    {
      accessorKey: "createdAt",
      header: "Criado em",
      meta: "date",
      cell: ({ row }) => {
        const createdAt = format(
          new Date(row.original.createdAt),
          "MM/dd/yyyy",
        );

        return createdAt;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const ingredient = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="px-0 py-0">
                <Button
                  onClick={() => handleDeleteClick(ingredient.id)}
                  variant="ghost"
                  className="!h-0 w-full justify-start px-2 py-4 text-left font-normal"
                >
                  Deletar
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-0 py-0">
                <Button
                  onClick={() => handleUpdateClick(ingredient.id)}
                  variant="ghost"
                  className="!h-0 w-full justify-start px-2 py-4 text-left font-normal"
                >
                  Editar
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
}

export default getColumns;
