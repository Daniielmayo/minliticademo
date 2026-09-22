import React from 'react';

interface DataTableSkeletonProps {
  columns: number;
  rows?: number;
}

export function DataTableSkeleton({ columns, rows = 5 }: DataTableSkeletonProps) {
  return (
    <div className="w-full bg-card-surface border border-card-border rounded-xl shadow-2xl overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-card-surface/70 border-b border-card-border">
              {Array.from({ length: columns }).map((_, idx) => (
                <th key={idx} className="px-xl py-md">
                  <div className="h-4 bg-surface-container rounded w-3/4"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-card-surface transition-colors group">
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-xl py-lg">
                    <div className="h-4 bg-surface-container rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-xl py-lg border-t border-card-border flex justify-between items-center bg-card-surface">
        <div className="h-4 bg-surface-container rounded w-1/4"></div>
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-surface-container rounded-full"></div>
          <div className="h-10 w-32 bg-surface-container rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
