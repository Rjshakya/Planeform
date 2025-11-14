"use client";
import useSWR from "swr";
import TanStackTable, { RowActions } from "@/components/Data-table";
import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import { Loader, TriangleAlert } from "lucide-react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";

import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { format, setDate } from "date-fns";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface Iheads {
  label: string;
  id: string;
}

const fetcher = (url: string) => apiClient.get(url)?.then((d) => d.data);

export const Submissions = () => {
  const { formId } = useParams();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const {
    data: submissionData,
    error,
    isLoading,
  } = useSWR(
    () =>
      `/api/response/form/${formId}?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`,
    fetcher
  );
  const [tableData, setTableData] = useState<any[]>();
  const [totalPages , setTotalPages] = useState(0)
  const [columns, setColumns] = useState<ColumnDef<Iheads>[]>([]);

 
  // const columns = useMemo(() => {
  //   const columnArr: ColumnDef<Iheads>[] = heads?.map((h) => {
  //     return {
  //       id: h?.id,
  //       header: h?.label,
  //       accessorKey: h?.id,
  //       cell: ({ row }) => {
  //         // @ts-ignore
  //         const value = row.getValue(h?.id)?.value;
  //         const dateSchema = z.iso.datetime();
  //         const imgUrlSchema = z.httpUrl({
  //           pattern:
  //             /^https:\/\/bucket\.planetform\.xyz\/[\w\-\.\/]+\.(jpg|jpeg|png|gif|webp|svg)$/i,
  //         });
  //         const parsed = dateSchema.safeParse(value);
  //         const parsedImg = imgUrlSchema.safeParse(value);

  //         if (parsed.success) {
  //           const date = new Date(parsed.data);
  //           return <div className="font-medium ">{format(date, "Pp")}</div>;
  //         }
  //         if (parsedImg.success) {
  //           return (
  //             <div className="font-medium ">
  //               <Image
  //                 className=""
  //                 width={80}
  //                 height={80}
  //                 src={parsedImg.data}
  //                 alt="uploaded-img"
  //               />
  //             </div>
  //           );
  //         }

  //         return (
  //           <div className="font-medium ">
  //             {/* @ts-ignore */}
  //             <p className=" text-wrap">{row.getValue(h?.id)?.value}</p>
  //           </div>
  //         );
  //       },

  //       size: 200,
  //       enableHiding: true,
  //     };
  //   });

  //   columnArr?.unshift({
  //     id: "select",
  //     header: ({ table }) => (
  //       <div className=" grid place-content-center mr-1">
  //         <Checkbox
  //           checked={
  //             table.getIsAllPageRowsSelected() ||
  //             (table.getIsSomePageRowsSelected() && "indeterminate")
  //           }
  //           onCheckedChange={(value) =>
  //             table.toggleAllPageRowsSelected(!!value)
  //           }
  //           aria-label="Select all"
  //         />
  //       </div>
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         className=" ml-1"
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     size: 46,
  //     enableSorting: false,
  //     enableHiding: false,
  //   });

  //   columnArr?.push({
  //     id: "actions",
  //     header: () => <span className="sr-only">Actions</span>,
  //     cell: ({ row }) => <RowActions row={row} />,
  //     size: 60,
  //     enableHiding: false,
  //   });

  //   return columnArr;
  // }, [data, heads]);
  
  useEffect(() => {
    if(!submissionData)return;
    const responses = submissionData.responses;
    const heads: Iheads[] = responses?.headers;
    if (!heads) return;

    const columnArr: ColumnDef<Iheads>[] = heads?.map((h) => {
      return {
        id: h?.id,
        header: h?.label,
        accessorKey: h?.id,
        cell: ({ row }) => {
          // @ts-ignore
          const value = row.getValue(h?.id)?.value;
          const dateSchema = z.iso.datetime();
          const imgUrlSchema = z.httpUrl({
            pattern:
              /^https:\/\/bucket\.planetform\.xyz\/[\w\-\.\/]+\.(jpg|jpeg|png|gif|webp|svg)$/i,
          });
          const parsed = dateSchema.safeParse(value);
          const parsedImg = imgUrlSchema.safeParse(value);

          if (parsed.success) {
            const date = new Date(parsed.data);
            return <div className="font-medium ">{format(date, "Pp")}</div>;
          }
          if (parsedImg.success) {
            return (
              <div className="font-medium ">
                <Image
                  className=""
                  width={80}
                  height={80}
                  src={parsedImg.data}
                  alt="uploaded-img"
                />
              </div>
            );
          }

          return (
            <div className="font-medium ">
              {/* @ts-ignore */}
              <p className=" text-wrap">{row.getValue(h?.id)?.value}</p>
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
        <div className=" grid place-content-center mr-1">
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

    setColumns(columnArr);
    setTotalPages(responses?.totalPages)
    setTableData(responses?.res)

  }, [submissionData , pagination]);

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
      {submissionData && <p className="">Your form submissions are here.</p>}
      {/* <Button onClick={() => mutate()} variant={"secondary"} size={"icon"}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Button> */}
      <TanStackTable
        states={{ pagination, setPagination, pageCount: totalPages }}
        // tableData={responses?.res || []}
        columns={columns || []}
        formId={formId as string}
        data={tableData || []}
        setData={setTableData}
      />
    </>
  );
};
