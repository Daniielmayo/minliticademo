import React from 'react';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { ProductionRecord } from '../../types';

const columnHelper = createColumnHelper<ProductionRecord>();

export const columns: ColumnDef<ProductionRecord, any>[] = [
  columnHelper.accessor('titulo', {
    header: 'Título',
    cell: (info) => <span className="font-body-md font-bold text-on-surface">{info.getValue()}</span>,
  }),
  columnHelper.accessor('minaFrente', {
    header: 'Mina / Frente',
    cell: (info) => <span className="font-body-md text-on-surface">{info.getValue()}</span>,
  }),
  columnHelper.accessor('fecha', {
    header: 'Fecha',
    cell: (info) => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
  }),
  columnHelper.accessor('onzasProducidas', {
    header: 'Onzas Producidas',
    cell: (info) => (
      <span className="font-body-md font-bold text-on-surface">
        {info.getValue().toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
      </span>
    ),
  }),
  columnHelper.accessor('hhs', {
    header: 'HHS',
    cell: (info) => <span className="font-body-md text-on-surface">{info.getValue()}</span>,
  }),
  columnHelper.accessor('maquinaria', {
    header: 'Maquinaria',
    cell: (info) => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
  }),
  columnHelper.accessor('estado', {
    header: 'Estado',
    cell: (info) => {
      const estado = info.getValue();
      let badgeClass = '';
      if (estado === 'Validado') {
        badgeClass = 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]';
      } else if (estado === 'En Revisión') {
        badgeClass = 'bg-[#fef3c7] text-[#b45309] border-[#fde68a]';
      } else {
        badgeClass = 'bg-[#fee2e2] text-[#b91c1c] border-[#fecaca]';
      }

      return (
        <span className={`px-4 py-1.5 rounded-full text-[13px] font-bold border ${badgeClass}`}>
          {estado}
        </span>
      );
    },
  }),
];
