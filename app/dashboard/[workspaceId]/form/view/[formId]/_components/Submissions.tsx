"use client";
import useSWR from "swr";
import TanStackTable, { RowActions } from "@/components/Data-table";
import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import { Loader, TriangleAlert } from "lucide-react";
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
    pageSize: 20,
  });

  const { data, error, isLoading } = useSWR(
    `/api/response/form/${formId}?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`,
    fetcher
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
              <div className="font-medium ">
                {date?.toDateString()}, {date?.toLocaleTimeString()}
              </div>
            );
          }

          return (
            <div className="font-medium ">
              {/* @ts-ignore */}
              <p className=" text-wrap">{row.getValue(h?.label)?.value}</p>
            </div>
          );
        },

        size: 200,
        enableHiding: true,
      };
    });

    columnArr?.unshift({
      id: "select",
      header: ({ table }) => (
        <div className=" grid place-content-center mr-1.5">
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
          className=" ml-1"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      size: 46,
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
  }, [heads]);

  if (error) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center gap-4">
        <span>
          <TriangleAlert className=" text-destructive" />
        </span>
        <p>failed to get form submissions</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      {data?.status === 200 && (
        <p className="">Your form submissions are here.</p>
      )}
      <TanStackTable
        states={{ pagination, setPagination, pageCount: responses?.totalPages }}
        tableData={data?.data?.responses?.res || []}
        columns={columns}
        formId={formId as string}
      />
    </>
  );
};
