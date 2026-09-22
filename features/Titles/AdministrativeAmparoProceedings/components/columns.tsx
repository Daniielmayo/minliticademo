import React from 'react';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { AmparoProceedingData } from '../types';

const columnHelper = createColumnHelper<AmparoProceedingData>();

export const columns: ColumnDef<AmparoProceedingData, any>[] = [
  columnHelper.accessor('disturbanceName', {
    header: 'Nombre de la Perturbación',
    cell: (info) => (
      <span className="font-body-md font-semibold text-primary">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('coordinates', {
    header: 'Coordenadas',
    cell: (info) => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
  }),
  columnHelper.accessor('registrationDate', {
    header: 'Fecha de Registro',
    cell: (info) => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
  }),
  columnHelper.accessor('applicationStatus', {
    header: 'Estado de la Solicitud',
    cell: (info) => {
      const status = info.getValue();
      let badgeClass = 'bg-surface-container text-on-surface-variant';
      
      if (status === 'En Trámite') {
        badgeClass = 'bg-surface-container-high text-on-surface-variant';
      } else if (status === 'Resuelto') {
        badgeClass = 'bg-secondary-fixed text-on-secondary-fixed-variant';
      } else if (status === 'Rechazado') {
        badgeClass = 'bg-error-container text-error-alert';
      }

      return (
        <span className={`px-md py-1 rounded-full text-label-xs font-medium uppercase ${badgeClass}`}>
          {status}
        </span>
      );
    },
  }),
  columnHelper.accessor('response', {
    header: 'Respuesta',
    cell: (info) => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
  }),
  columnHelper.accessor('dueDate', {
    header: 'Fecha de Vencimiento',
    cell: (info) => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
  }),
];
