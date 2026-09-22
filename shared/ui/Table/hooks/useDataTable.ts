'use client'
import { useState } from 'react';
import {
  SortingState,
  ColumnFiltersState,
  ColumnVisibilityState,
  RowSelectionState,
  RowData,
} from '@tanstack/react-table';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useLegacyTable as useReactTable,
} from '@tanstack/react-table/legacy';
import { DataTableProps } from '../types';

export function useDataTable<TData extends RowData, TValue>({
  data,
  columns,
  page,
  pageSize,
  onSortingChange,
  onFilterChange,
  onRowSelectionChange,
  sorting: controlledSorting,
  columnFilters: controlledColumnFilters,
  rowSelection: controlledRowSelection,
  columnVisibility: controlledColumnVisibility,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Use controlled state if provided, otherwise use internal state
  const isServerPagination = page !== undefined && pageSize !== undefined;

  const table = useReactTable({
    data,
    columns: columns as any,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: onSortingChange ?? setSorting,
    onColumnFiltersChange: onFilterChange ?? setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: onRowSelectionChange ?? setRowSelection,
    state: {
      sorting: controlledSorting ?? sorting,
      columnFilters: controlledColumnFilters ?? columnFilters,
      columnVisibility: controlledColumnVisibility ?? columnVisibility,
      rowSelection: controlledRowSelection ?? rowSelection,
      ...(isServerPagination && {
        pagination: {
          pageIndex: page - 1, // TanStack table is 0-indexed
          pageSize,
        },
      }),
    },
    // If server pagination is enabled, we tell TanStack Table not to paginate internally
    manualPagination: isServerPagination,
    manualSorting: controlledSorting !== undefined,
    manualFiltering: controlledColumnFilters !== undefined,
  });

  return table;
}
