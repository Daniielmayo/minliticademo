import React from 'react';
import { RowData } from '@tanstack/react-table';
import { LegacyReactTable as Table } from '@tanstack/react-table/legacy';

interface DataTablePaginationProps<TData extends RowData> {
  table: Table<TData>;
  totalRows?: number;
  onPageChange?: (page: number) => void;
}

export function DataTablePagination<TData extends RowData>({
  table,
  totalRows,
  onPageChange,
}: DataTablePaginationProps<TData>) {
  const currentRecords = table.getRowModel().rows.length;
  // If we have server-side totalRows, use it. Otherwise use the client-side length.
  const displayTotal = totalRows ?? table.getFilteredRowModel().rows.length;
  
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const handlePrevious = () => {
    if (onPageChange) {
      onPageChange(pageIndex); // onPageChange uses 1-based index, so previous is pageIndex
    } else {
      table.previousPage();
    }
  };

  const handleNext = () => {
    if (onPageChange) {
      onPageChange(pageIndex + 2); // onPageChange uses 1-based index, so next is pageIndex + 2
    } else {
      table.nextPage();
    }
  };

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      table.setPageIndex(page - 1);
    }
  };

  // Generate page numbers for simple pagination including ellipsis
  const getVisiblePages = (): (number | string)[] => {
    // If page count is small, show all pages
    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }
    
    // Simplistic ellipsis logic matching typical designs
    if (pageIndex < 3) return [1, 2, 3, '...', pageCount];
    if (pageIndex > pageCount - 4) return [1, '...', pageCount - 2, pageCount - 1, pageCount];
    return [1, '...', pageIndex + 1, '...', pageCount];
  };

  return (
    <div className="px-xl py-lg border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-md bg-card-surface">
      <div className="text-label-md text-on-surface-variant">
        Mostrando <span className="font-bold text-on-surface">{currentRecords}</span> de <span className="font-bold text-on-surface">{displayTotal}</span> registros
      </div>
      <div className="flex items-center gap-xs">
        <button
          onClick={handlePrevious}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center gap-xs px-md py-2 rounded-[50px] text-on-surface-variant hover:bg-surface-container transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          Anterior
        </button>
        <div className="flex items-center gap-xs">
          {getVisiblePages().map((pageItem, idx) => {
            if (pageItem === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 text-on-surface-variant">
                  ...
                </span>
              );
            }

            const pageNumber = pageItem as number;
            const isActive = pageIndex + 1 === pageNumber;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`w-10 h-10 flex items-center justify-center rounded-[50px] font-bold text-label-md transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:bg-secondary hover:text-white'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
        <button
          onClick={handleNext}
          disabled={!table.getCanNextPage()}
          className="flex items-center gap-xs px-md py-2 rounded-[50px] text-on-surface-variant hover:bg-surface-container transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Siguiente
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
