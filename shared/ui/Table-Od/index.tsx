import React from 'react';
import { Pagination } from './components/Pagination';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  showPagination?: boolean;
  totalRecords?: number;
}

export function Table<T>({ columns, data, showPagination = false, totalRecords = 0 }: TableProps<T>) {
  return (
    <div className="w-full bg-card-surface border border-card-border rounded-xl shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-card-surface/70">
              {columns.map((col, idx) => (
                <th key={String(col.key) + idx} className="px-xl py-md font-label-md text-label-md text-on-surface-variant uppercase whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {data.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-card-surface transition-colors group">
                {columns.map((col, colIdx) => (
                  <td key={String(col.key) + colIdx} className="px-xl py-lg">
                    {col.render ? col.render(row) : (row as Record<string, unknown>)[col.key as string] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPagination && (
        <Pagination currentRecords={data.length} totalRecords={totalRecords} />
      )}
    </div>
  );
}
