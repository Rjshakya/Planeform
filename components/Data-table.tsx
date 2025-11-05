"use client";

import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  ListFilterIcon,
  Loader,
  PinOffIcon,
  PlusIcon,
  Trash,
  TrashIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Iheads } from "@/app/dashboard/[workspaceId]/form/view/[formId]/_components/Submissions";
import { mutate } from "swr";
import { toast } from "sonner";
import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";

type Item = {
  id: string;
  name: string;
  email: string;
  location: string;
  flag: string;
  status: "Active" | "Inactive" | "Pending";
  balance: number;
};

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Item> = (row, columnId, filterValue) => {
  const searchableRowContent =
    `${row.original.name} ${row.original.email}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const getPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

export default function TanStackTable({
  columns,
  tableData,
  states,
  formId,
}: {
  columns: ColumnDef<Iheads>[];
  tableData: any[];
  states: {
    pagination: PaginationState;
    setPagination: Dispatch<SetStateAction<PaginationState>>;
    pageCount: number;
  };
  formId: string;
}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [data, setData] = useState<any[]>(tableData);

  const handleDeleteRows = async () => {
    try {
      const selectedRows = table.getSelectedRowModel().rows;
      const updatedData = data.filter(
        (item) => !selectedRows.some((row) => row.original?.id === item?.id)
      );
      const selectedRowsId = selectedRows.map((r) => r?.original?.id);
      await apiClient.put(`/api/respondent/multiple`, selectedRowsId);
      mutate(`/api/response/form/${formId}`);
      setData(updatedData);
      table.resetRowSelection();
      toast("selected rows deleted !");
    } catch (e) {
      toast("failed to delete selected rows");
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: states?.pageCount ?? -1,
    enableSortingRemoval: false,
    onPaginationChange: states.setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      columnFilters,
      columnVisibility,
      pagination: states.pagination,
    },
    columnResizeMode: "onChange",
  });

  return (
    <div className="space-y-4 overflow-auto">
      {/* Filters */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 py-1.5">
          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Columns3Icon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              {table?.getAllColumns()?.length &&
                table
                  ?.getAllColumns?.()
                  ?.filter((column) => column.getCanHide())
                  ?.map?.((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                        onSelect={(event) => event.preventDefault()}
                      >
                        {column.columnDef.header?.toString() || column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Delete button */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto" variant="outline">
                  <TrashIcon
                    className="-ms-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Delete
                  <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                    aria-hidden="true"
                  >
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {table.getSelectedRowModel().rows.length} selected{" "}
                      {table.getSelectedRowModel().rows.length === 1
                        ? "row"
                        : "rows"}
                      .
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {/* Add user button */}
          {/* <Button className="ml-auto" variant="outline">
            <PlusIcon
              className="-ms-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Add
          </Button> */}
        </div>
      </div>

      {/* Table */}
      <div className="bg-background overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const { column } = header;
                  const isPinned = column.getIsPinned();

                  const isLastLeftPinned =
                    isPinned === "left" && column.getIsLastColumn("left");
                  const isFirstRightPinned =
                    isPinned === "right" && column.getIsFirstColumn("right");

                  return (
                    <TableHead
                      key={header.id}
                      // style={{ width: `${header.getSize()}px` }}
                      className="h-11 relative border-t select-none last:[&>.cursor-col-resize]:opacity-0 bg-muted"
                      colSpan={header.colSpan}
                      style={{
                        ...getPinningStyles(column),
                        width: `${header.getSize()}px`,
                      }}
                      data-pinned={isPinned || undefined}
                      data-last-col={
                        isLastLeftPinned
                          ? "left"
                          : isFirstRightPinned
                          ? "right"
                          : undefined
                      }
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          <div className=" flex items-center gap-1">
                            {{
                              asc: (
                                <ChevronUpIcon
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              ),
                              desc: (
                                <ChevronDownIcon
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                            {header.column.getIsPinned() ? (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="-mr-1 size-7 shadow-none"
                                onClick={() => header.column.pin(false)}
                                aria-label={`Unpin ${
                                  header.column.columnDef.header as string
                                } column`}
                                title={`Unpin ${
                                  header.column.columnDef.header as string
                                } column`}
                              >
                                <PinOffIcon
                                  className="opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              </Button>
                            ) : (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="-mr-1 size-7 shadow-none"
                                    aria-label={`Pin options for ${
                                      header.column.columnDef.header as string
                                    } column`}
                                    title={`Pin options for ${
                                      header.column.columnDef.header as string
                                    } column`}
                                  >
                                    <EllipsisIcon
                                      className="opacity-60"
                                      size={16}
                                      aria-hidden="true"
                                    />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => header.column.pin("left")}
                                  >
                                    <ArrowLeftToLineIcon
                                      size={16}
                                      className="opacity-60"
                                      aria-hidden="true"
                                    />
                                    Stick to left
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => header.column.pin("right")}
                                  >
                                    <ArrowRightToLineIcon
                                      size={16}
                                      className="opacity-60"
                                      aria-hidden="true"
                                    />
                                    Stick to right
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>

                          {header.column.getCanResize() && (
                            <div
                              {...{
                                onDoubleClick: () => header.column.resetSize(),
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className:
                                  "absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px",
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows?.map((row) => {
                return (
                  row?.original?.id && (
                    <TableRow
                      key={row?.original?.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const { column, row } = cell;
                        const isPinned = column.getIsPinned();
                        const isLastLeftPinned =
                          isPinned === "left" && column.getIsLastColumn("left");
                        const isFirstRightPinned =
                          isPinned === "right" &&
                          column.getIsFirstColumn("right");

                        return (
                          <TableCell
                            key={cell.id}
                            className=" [&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 truncate data-pinned:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l border mx-8 p-3 align-middle"
                            style={{ ...getPinningStyles(column) }}
                            data-pinned={isPinned || undefined}
                            data-last-col={
                              isLastLeftPinned
                                ? "left"
                                : isFirstRightPinned
                                ? "right"
                                : undefined
                            }
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  )
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-8">
        {/* Results per page */}
        {/* <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Rows per page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
        {/* Page number information */}
        <div className="text-muted-foreground flex grow  text-sm whitespace-nowrap">
          <p
            className="text-muted-foreground text-sm whitespace-nowrap"
            aria-live="polite"
          >
            <span className="text-foreground">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            of <span className="text-foreground">{table.getPageCount()}</span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              {/* <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirstIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem> */}
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={async () => {
                    await mutate(
                      `/api/response/form/${formId}?pageIndex=${states.pagination.pageIndex}&pageSize=${states.pagination.pageSize}`,
                      [],
                      { revalidate: false }
                    );
                    table.previousPage();
                  }}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={async () => {
                    await mutate(
                      `/api/response/form/${formId}?pageIndex=${states.pagination.pageIndex}&pageSize=${states.pagination.pageSize}`,
                      [],
                      { revalidate: false }
                    );
                    table.nextPage();
                  }}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              {/* <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLastIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem> */}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export function RowActions({ row }: { row: Row<any> }) {
  const [deleting, setDeleting] = useState(false);

  const { formId } = useParams();
  const handleDelete = async (id: string) => {
    setDeleting(true);

    if (!id) return;
    try {
      await apiClient.delete(`/api/respondent/${id}`);
      mutate(`/api/response/form/${formId}`);
      toast("respondent deleted !");
    } catch (e) {
      toast("failed to delete");
    }

    setDeleting(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Edit item"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <AlertDialog>
          <AlertDialogTrigger className="hover:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 w-full flex items-center gap-2">
            <Trash />
            <p>Delete</p>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <CircleAlertIcon className="opacity-80" size={16} />
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  response
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(row?.original?.id)}
              >
                {deleting && <Loader className=" animate-spin" />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
