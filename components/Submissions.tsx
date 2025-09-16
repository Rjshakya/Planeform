"use client";
import useSWR from "swr";
import TanStackTable, { RowActions } from "./comp-485";
import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export interface Iheads {
  label: string;
}

const fetcher = (url: string) => apiClient.get(url);

export const Submissions = () => {
  const { formId } = useParams();
  const { data, error, isLoading } = useSWR(
    `/api/response/form/${formId}`,
    fetcher
  );

  const responses = data?.data?.responses;
  const heads: Iheads[] = responses?.headers;
  const columns = useMemo(() => {
    const columnArr: ColumnDef<Iheads>[] = heads?.map((h) => {
      return {
        id:h?.label,
        header: h?.label,
        accessorKey: h?.label,
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue(h?.label)}</div>
        ),
        size: 180,
        enableHiding: true,
        
      };
    });

    columnArr?.unshift({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      size: 28,
      enableSorting: false,
      enableHiding: false,
    });

    columnArr?.push({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },)

    return columnArr;
  }, [data]);

  if (error) return <p>error occurred</p>;
  if (isLoading) return <Loader className=" animate-spin" />;

  

  return <TanStackTable tableData={responses?.res} columns={columns} />;
};
