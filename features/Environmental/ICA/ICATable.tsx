import React from 'react';
import { ICAReport } from '@/features/Environmental/types';
import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';

interface ICATableProps {
  reports: ICAReport[];
}

const helper = createColumnHelper<ICAReport>();

export const ICATable = ({ reports }: ICATableProps) => {
  const columns: ColumnDef<ICAReport, any>[] = [
    helper.accessor('id', {
      header: 'ID',
      cell: info => <span className="font-body-md font-bold text-on-surface">{info.getValue()}</span>,
    }),
    helper.accessor('period', {
      header: 'Período',
      cell: info => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
    }),
    helper.accessor('status', {
      header: 'Estado',
      cell: info => {
        const val = info.getValue();
        let badgeClass = 'bg-[#FBBF24]/10 text-[#b45309]'; // En Elaboración
        if (val === 'Presentado') badgeClass = 'bg-[#3B82F6]/10 text-[#3B82F6]';

        return (
          <span className={`px-2 py-1 rounded-full font-label-sm font-bold ${badgeClass}`}>
            {val}
          </span>
        );
      },
    }),
    helper.accessor('presentationDate', {
      header: 'Fecha Presentación',
      cell: info => <span className="font-body-md text-on-surface">{info.getValue() || 'N/A'}</span>,
    }),
    helper.display({
      id: 'document',
      header: 'Documento',
      cell: () => (
        <button className="text-white bg-brand-primary hover:bg-secondary transition-colors p-2 rounded-[50px] flex items-center justify-center shadow-xs" title="Descargar ICA">
          <span className="material-symbols-outlined text-[18px]">download</span>
        </button>
      ),
    })
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md">
      <div className="flex items-center gap-sm mb-md">
        <span className="material-symbols-outlined text-primary text-[24px]">description</span>
        <h3 className="font-bold text-headline-sm text-on-surface">Control ICA (Semestral)</h3>
      </div>
      <p className="font-body-sm text-on-surface-variant mb-lg">
        Informes de Cumplimiento Ambiental presentados ante la autoridad.
      </p>
      <div className="overflow-x-auto">
        <DataTable data={reports} columns={columns} showPagination={true} />
      </div>
    </div>
  );
};
