"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, MoreHorizontal } from "lucide-react";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";

import { Order } from "~/types";
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

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "status",
      header: "Status",
      meta: "string",
      cell: ({ row }) => {
        const status = row.original.status || "";

        const statusMap: { [key: string]: string } = {
          cancelled: "Cancelado",
          pending: "Em preparo",
          out_for_delivery: "Saiu para entrega",
          finished: "Finalizado",
        };

        return <span>{statusMap[status]}</span>;
      },
    },
    {
      id: "ingredients",
      header: "Itens do pedido",
      cell: ({ row }) => {
        const ingredients = row.original.ingredients;

        return (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Eye data-state="open" className="h-6 w-6 text-primary" />
            </HoverCardTrigger>
            <HoverCardContent className="max-h-[300px] w-80 overflow-y-auto">
              <ul>
                {ingredients.map(({ name, id }) => (
                  <li
                    key={id}
                    className="flex flex-col items-start gap-2 border-b border-gray-300 py-2"
                  >
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
        );
      },
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
        const order = row.original;

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
                  onClick={() => handleDeleteClick(order.id)}
                  variant="ghost"
                  className="!h-0 w-full justify-start px-2 py-4 text-left font-normal"
                >
                  Deletar
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-0 py-0">
                <Button
                  onClick={() => handleUpdateClick(order.id)}
                  variant="ghost"
                  className="!h-0 w-full justify-start px-2 py-4 text-left font-normal"
                >
                  Atualizar status
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
