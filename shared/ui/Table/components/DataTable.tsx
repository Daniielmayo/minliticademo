'use client';

import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { DataTableProps } from '../types';
import { useDataTable } from '../hooks/useDataTable';
import { DataTablePagination } from './DataTablePagination';
import { DataTableSkeleton } from './DataTableSkeleton';
import { DataTableEmpty } from './DataTableEmpty';
import { RowData } from '@tanstack/react-table';

export function DataTable<TData extends RowData, TValue = unknown>({
  data,
  columns,
  loading,
  showPagination,
  totalRows,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onSortingChange,
  onFilterChange,
  onRowSelectionChange,
  onRowClick,
  sorting,
  columnFilters,
  rowSelection,
  columnVisibility,
  tableTitle,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filterOptions,
  filterValue,
  onFilterChangeValue,
  toolbarActions,
}: DataTableProps<TData, TValue>) {
  const table = useDataTable({
    data,
    columns,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onSortingChange,
    onFilterChange,
    onRowSelectionChange,
    sorting,
    columnFilters,
    rowSelection,
    columnVisibility,
  });

  if (loading) {
    return <DataTableSkeleton columns={columns.length} />;
  }

  const { rows } = table.getRowModel();
  const hasToolbar = Boolean(tableTitle || searchPlaceholder || onSearchChange || filterOptions || toolbarActions);

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl shadow-md overflow-hidden">
      {/* ── Integrated Table Toolbar ── */}
      {hasToolbar && (
        <div className="px-xl py-3 border-b border-slate-200/90 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md bg-white select-none">
          {tableTitle ? (
            <div className="flex items-center gap-sm">
              <h3 className="text-[17px] font-bold text-brand-primary tracking-tight">{tableTitle}</h3>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80">
                {data.length} {data.length === 1 ? 'registro' : 'registros'}
              </span>
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-sm flex-wrap">
            {/* Integrated Search Input */}
            {onSearchChange && (
              <div className="relative min-w-[220px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder={searchPlaceholder || "Buscar..."}
                  value={searchValue ?? ''}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-[13px] bg-slate-50 border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 text-slate-800 font-medium placeholder:text-slate-400"
                />
              </div>
            )}

            {/* Integrated Dropdown Filter */}
            {filterOptions && filterOptions.length > 0 && onFilterChangeValue && (
              <div className="relative min-w-[170px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-400 pointer-events-none">
                  filter_alt
                </span>
                <select
                  value={filterValue ?? ''}
                  onChange={(e) => onFilterChangeValue(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-[13px] bg-slate-50 border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 text-slate-800 font-bold appearance-none cursor-pointer"
                >
                  {filterOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-slate-400 pointer-events-none">
                  expand_more
                </span>
              </div>
            )}

            {toolbarActions}
          </div>
        </div>
      )}

      {/* ── Table Content ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-slate-50/90 border-b border-slate-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-xl py-3 text-[12px] font-bold uppercase tracking-wider text-slate-600 whitespace-nowrap select-none"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-blue-50/40 transition-colors group ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onRowClick && onRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-xl py-3 text-[14px] font-medium text-slate-800">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <DataTableEmpty columnsCount={columns.length} />
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {(showPagination || table.getPageCount() > 1 || totalRows !== undefined) && (
        <DataTablePagination 
          table={table} 
          totalRows={totalRows} 
          onPageChange={onPageChange} 
        />
      )}
    </div>
  );
}
