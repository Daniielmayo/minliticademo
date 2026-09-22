import React from 'react';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { ObligationData } from '../types';

const columnHelper = createColumnHelper<ObligationData>();

export const columns: ColumnDef<ObligationData, any>[] = [
  columnHelper.accessor('component', {
    header: 'Componente',
    cell: (info) => (
      <div className="flex items-center gap-md">
        <span className="font-body-md text-body-md font-semibold text-primary">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('type', {
    header: 'Tipo de Obligación',
    cell: (info) => <span className="font-body-md text-body-md text-primary">{info.getValue()}</span>,
  }),
  columnHelper.accessor('dueDate', {
    header: 'Fecha de Vencimiento',
    cell: (info) => <span className="font-body-md text-body-md text-primary">{info.getValue()}</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Estado',
    cell: (info) => {
      const status = info.getValue();
      let badgeClass = '';
      let textClass = '';
      if (status === 'Crítico') {
        badgeClass = 'bg-error-container';
        textClass = 'text-error-alert';
      } else if (status === 'En Proceso') {
        badgeClass = 'bg-surface-container-high';
        textClass = 'text-on-surface-variant';
      } else if (status === 'Programado') {
        badgeClass = 'bg-secondary-fixed';
        textClass = 'text-on-secondary-fixed-variant';
      }
      return (
        <span className={`px-md py-1 rounded-full ${badgeClass} ${textClass} font-label-xs text-label-xs uppercase`}>
          {status}
        </span>
      );
    },
  }),
  columnHelper.accessor('responsible', {
    header: 'Responsable',
    cell: (info) => <span className="font-body-md text-body-md text-primary">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: 'support',
    header: 'Soporte',
    cell: () => (
      <button className="text-white bg-brand-primary hover:bg-secondary transition-colors cursor-pointer px-4 py-1.5 rounded-[50px] font-bold text-xs shadow-xs">
        Ver documento
      </button>
    ),
  }),
];
