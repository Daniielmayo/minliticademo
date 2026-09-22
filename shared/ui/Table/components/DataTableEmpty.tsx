import React from 'react';

interface DataTableEmptyProps {
  message?: string;
  columnsCount: number;
}

export function DataTableEmpty({ message = 'No se encontraron resultados.', columnsCount }: DataTableEmptyProps) {
  return (
    <tr className="bg-card-surface">
      <td colSpan={columnsCount} className="px-xl py-12 text-center text-on-surface-variant font-body-lg">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[48px] text-outline opacity-50">
            search_off
          </span>
          <p>{message}</p>
        </div>
      </td>
    </tr>
  );
}
