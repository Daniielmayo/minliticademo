import { SortingState, ColumnFiltersState, ColumnVisibilityState, OnChangeFn, RowSelectionState, RowData } from '@tanstack/react-table';
import { LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import React from 'react';

export interface DataTableFilterOption {
  label: string;
  value: string;
}

export interface DataTableProps<TData extends RowData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  showPagination?: boolean;
  totalRows?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSortingChange?: OnChangeFn<SortingState>;
  onFilterChange?: OnChangeFn<ColumnFiltersState>;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onRowClick?: (row: TData) => void;
  
  // Optional controlled states
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  rowSelection?: RowSelectionState;
  columnVisibility?: ColumnVisibilityState;

  // Integrated Toolbar (Search & Dropdown Filters)
  tableTitle?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filterOptions?: DataTableFilterOption[];
  filterValue?: string;
  onFilterChangeValue?: (value: string) => void;
  toolbarActions?: React.ReactNode;
}
