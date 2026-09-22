import React from 'react';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { MachineryMetric, RoyaltyRecord } from '../../types';

// --- Machinery Table ---
const machineryHelper = createColumnHelper<MachineryMetric>();
export const machineryColumns: ColumnDef<MachineryMetric, any>[] = [
  machineryHelper.accessor('equipo', {
    header: 'Equipo',
    cell: info => <span className="font-body-md font-bold text-on-surface">{info.getValue()}</span>,
  }),
  machineryHelper.accessor('horasOperativas', {
    header: 'Hrs. Operativas',
    cell: info => <span className="font-body-md text-on-surface-variant">{info.getValue()}h</span>,
  }),
  machineryHelper.accessor('horasMantenimiento', {
    header: 'Hrs. Mantenimiento',
    cell: info => <span className="font-body-md text-on-surface-variant">{info.getValue()}h</span>,
  }),
  machineryHelper.accessor('disponibilidad', {
    header: 'Disponibilidad',
    cell: info => <span className="font-body-md font-bold text-primary">{info.getValue()}%</span>,
  }),
];

// --- Royalties Detailed Table ---
const royaltyHelper = createColumnHelper<RoyaltyRecord>();
export const royaltyColumns: ColumnDef<RoyaltyRecord, any>[] = [
  royaltyHelper.accessor('id', {
    header: 'ID Registro',
    cell: info => <span className="font-body-md font-medium text-on-surface">{info.getValue()}</span>,
  }),
  royaltyHelper.accessor('titulo', {
    header: 'Título Minero',
    cell: info => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
  }),
  royaltyHelper.accessor('mina', {
    header: 'Mina / Frente',
    cell: info => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
  }),
  royaltyHelper.accessor('fechaPago', {
    header: 'Fecha de Pago',
    cell: info => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
  }),
  royaltyHelper.accessor('monto', {
    header: 'Monto (COP)',
    cell: info => <span className="font-body-md font-medium">${info.getValue().toLocaleString('es-CO')}</span>,
  }),
  royaltyHelper.accessor('estado', {
    header: 'Estado',
    cell: info => {
      const estado = info.getValue();
      const badgeClass = estado === 'Pagado' ? 'bg-success-alert-icon-bg text-success-alert' : 
                         estado === 'En Revisión' ? 'bg-secondary/10 text-secondary' : 
                         'bg-error-container text-error';
      return (
        <span className={`px-sm py-1 rounded-full text-xs font-medium ${badgeClass}`}>
          {estado}
        </span>
      );
    },
  }),
];


