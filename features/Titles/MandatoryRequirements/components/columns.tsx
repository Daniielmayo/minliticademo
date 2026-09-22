import React from 'react';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { RegulatoryRequirementData } from '../types';

const columnHelper = createColumnHelper<RegulatoryRequirementData>();

export const columns: ColumnDef<RegulatoryRequirementData, any>[] = [
  columnHelper.accessor('component', {
    header: 'Componente',
    cell: (info) => {
      return (
        <div className="flex items-center gap-md">
          <span className="font-body-md text-body-md font-semibold text-primary">{info.getValue()}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor('administrativeAct', {
    header: 'Número de Acto Administrativo',
    cell: (info) => <span className="font-body-md text-body-md text-primary">{info.getValue()}</span>,
  }),
  columnHelper.accessor('requirement', {
    header: 'Requerimiento',
    cell: (info) => <span className="font-body-md text-body-md text-primary">{info.getValue()}</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Estado',
    cell: (info) => {
      const status = info.getValue();
      let badgeClass = 'bg-surface-container-high text-on-surface-variant';
      if (status === 'Crítico') {
        badgeClass = 'bg-error-container text-error-alert';
      } else if (status === 'En Proceso') {
        badgeClass = 'bg-surface-container-high text-on-surface-variant';
      } else if (status === 'Programado') {
        badgeClass = 'bg-secondary-fixed text-on-secondary-fixed-variant';
      }

      return (
        <span className={`px-md py-1 rounded-full ${badgeClass} font-label-xs text-label-xs uppercase`}>
          {status}
        </span>
      );
    },
  }),
  columnHelper.accessor('responsible', {
    header: 'Responsable',
    cell: (info) => <span className="font-body-md text-body-md text-primary">{info.getValue()}</span>,
  }),
  columnHelper.accessor('dueDate', {
    header: 'Fecha de Vencimiento',
    cell: (info) => <span className="font-body-md text-body-md text-primary">{info.getValue()}</span>,
  }),
];
