import React from 'react';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { BurningRecord } from '@/features/Explosives/types';

const burningHelper = createColumnHelper<BurningRecord>();
export const burningColumns: ColumnDef<BurningRecord, any>[] = [
  burningHelper.accessor('fecha', {
    header: 'Fecha',
    cell: info => <span className="font-body-md text-on-surface">{info.getValue()}</span>,
  }),
  burningHelper.accessor('tituloMinero', {
    header: 'Título Minero',
    cell: info => <span className="font-body-md font-bold text-on-surface">{info.getValue()}</span>,
  }),
  burningHelper.accessor('mina', {
    header: 'Mina',
    cell: info => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
  }),
  burningHelper.accessor('frenteTrabajo', {
    header: 'Frente de Trabajo',
    cell: info => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
  }),
  burningHelper.accessor('cantidadConsumida', {
    header: 'Consumido (kg)',
    cell: info => (
      <span className="font-body-md font-medium text-primary">
        {info.getValue().toLocaleString('es-CO')}
      </span>
    ),
  }),
  burningHelper.accessor('toneladasArrancadas', {
    header: 'Arrancadas (t)',
    cell: info => (
      <span className="font-body-md text-on-surface">
        {info.getValue().toLocaleString('es-CO')}
      </span>
    ),
  }),
  burningHelper.accessor('factorPotencia', {
    header: 'Factor Potencia',
    cell: info => {
      const value = info.getValue();
      let colorClass = 'text-success-alert';
      if (value < 1.0) colorClass = 'text-error';
      else if (value <= 1.1) colorClass = 'text-[#b45309]';
      return (
        <span className={`font-body-md font-bold ${colorClass}`}>
          {value.toFixed(2)}
        </span>
      );
    },
  }),
  burningHelper.accessor('responsable', {
    header: 'Responsable',
    cell: info => <span className="font-body-md text-on-surface">{info.getValue()}</span>,
  }),
  burningHelper.accessor('documentoRef', {
    header: 'Soporte / Evidencia',
    cell: info => (
      <div className="flex items-center gap-sm">
        <a href="#" className="font-label-md text-secondary hover:underline flex items-center gap-xs" title="Descargar Soporte">
          <span className="material-symbols-outlined text-[18px]">link</span>
          {info.getValue()}
        </a>
        <button 
          title="Subir Evidencia"
          className="p-2 rounded-[50px] bg-brand-primary hover:bg-secondary text-white transition-colors flex items-center justify-center shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
        </button>
      </div>
    ),
  }),
];
