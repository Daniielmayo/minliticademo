import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { TitleData } from '../types';
import Link from 'next/link';

const columnHelper = createColumnHelper<TitleData>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getColumns = (onSelectTitle?: (id: string | null) => void): ColumnDef<TitleData, any>[] => [
  columnHelper.accessor('placa', {
    header: 'Número de placa',
    cell: (info) => <span className="font-body-sm font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor('titular', {
    header: 'Titular',
    cell: (info) => <span className="font-body-sm">{info.getValue()}</span>,
  }),
  columnHelper.accessor('tipo', {
    header: 'Tipo de título',
    cell: (info) => <span className="font-body-sm">{info.getValue()}</span>,
  }),
  columnHelper.accessor('etapa', {
    header: 'Etapa',
    cell: (info) => <span className="font-body-sm">{info.getValue()}</span>,
  }),
  columnHelper.accessor('vigencia', {
    header: 'Vigencia',
    cell: (info) => <span className="font-body-sm">{info.getValue()}</span>,
  }),
  columnHelper.accessor('estado', {
    header: 'Estado',
    cell: (info) => {
      const estado = info.getValue();
      let badgeClass = '';
      if (estado === 'Activo') badgeClass = 'bg-[#4ade80]/20 text-[#101939]';
      else if (estado === 'Inactivo') badgeClass = 'bg-error-container text-on-error-container';
      else if (estado === 'Suspendido') badgeClass = 'bg-tertiary-fixed text-on-tertiary-fixed-variant';

      return (
        <span className={`px-2 py-1 rounded-full text-[12px] font-medium ${badgeClass}`}>
          {estado}
        </span>
      );
    },
  }),
  columnHelper.accessor('extension', {
    header: 'Extensión',
    cell: (info) => <span className="font-body-sm">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: 'acciones',
    header: 'Acciones',
    cell: ({ row }) => (
      <div className="flex gap-xs">
        <Link href={`/dashboard/titles/${row.original.id}/mandatory-compliance-requirements`}>
          <button
            className="text-white bg-brand-primary hover:bg-secondary transition-colors cursor-pointer p-2 rounded-[50px] flex items-center justify-center shadow-xs"
            title="Ver Detalle"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </button>
        </Link>
      </div>
    ),
  }),
];
