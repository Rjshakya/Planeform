"use client";
import useSWR from "swr";
import TanStackTable, { RowActions } from "@/components/Data-table";
import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";

import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export interface Iheads {
  label: string;
}

const fetcher = (url: string) => apiClient.get(url);

export const Submissions = () => {
  const { formId } = useParams();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });
  useEffect(() => {
    console.log("Pagination state changed:", pagination);
  }, [pagination]);
  const { data, error, isLoading } = useSWR(
    `/api/response/form/${formId}?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`,
    fetcher,
    {
      dedupingInterval: 0,
      // revalidateIfStale
    }
  );

  const responses = data?.data?.responses;
  const heads: Iheads[] = responses?.headers;
  const columns = useMemo(() => {
    const columnArr: ColumnDef<Iheads>[] = heads?.map((h) => {
      return {
        id: h?.label,
        header: h?.label,
        accessorKey: h?.label,
        cell: ({ row }) => {
          // @ts-ignore
          const isTime = row.getValue(h.label)?.id === "time";
          if (isTime) {
            // @ts-ignore
            const time = row.getValue(h.label)?.value;
            const date = new Date(time);
            return (
              // @ts-ignore
              <div className="font-medium">
                {date?.toDateString()}, {date?.toLocaleTimeString()}
              </div>
            );
          }

          return (
            // @ts-ignore
            <div className="font-medium">{row.getValue(h?.label)?.value}</div>
          );
        },
        size: 180,
        enableHiding: true,
      };
    });

    columnArr?.unshift({
      id: "select",
      header: ({ table }) => (
        <div className=" grid place-content-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <Checkbox
          className=""
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
    });

    return columnArr;
  }, [data]);

  if (error) return <p>error occurred</p>;
  if (isLoading)
    return (
      <div className=" w-full min-h-[50vh] grid place-content-center">
        <Loader className=" animate-spin" />
      </div>
    );

  return (
    <TanStackTable
      states={{ pagination, setPagination, pageCount: responses?.totalPages }}
      tableData={data?.data?.responses?.res || []}
      columns={columns}
      formId={formId as string}
    />
  );
};
