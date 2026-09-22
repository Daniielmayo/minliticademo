'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { EnvironmentalTitle } from '@/features/Environmental/types';
import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';

interface InventoryTableProps {
  data: EnvironmentalTitle[];
}

const helper = createColumnHelper<EnvironmentalTitle>();

const STATUS_OPTIONS = [
  { label: 'Todos los Estados', value: 'Todos' },
  { label: 'Vigente', value: 'Vigente' },
  { label: 'En Trámite', value: 'En Trámite' },
  { label: 'Rechazado', value: 'Rechazado' },
];

export const InventoryTable = ({ data }: InventoryTableProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.instrumentType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || item.licenseStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  const columns: ColumnDef<EnvironmentalTitle, any>[] = [
    helper.accessor('id', {
      header: 'Identificador',
      cell: info => <span className="font-body-md font-bold text-slate-900">{info.getValue()}</span>,
    }),
    helper.accessor('instrumentType', {
      header: 'Instrumento',
      cell: info => {
        const val = info.getValue();
        const displayLabel = val === 'EIA'
          ? 'Estudio de Impacto Ambiental (EIA)'
          : val === 'PMA'
            ? 'Plan de Manejo Ambiental (PMA)'
            : val;

        return (
          <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md font-medium text-[13px] whitespace-nowrap border border-slate-200/80">
            {displayLabel}
          </span>
        );
      },
    }),
    helper.accessor('licenseStatus', {
      header: 'Estado Licencia',
      cell: info => {
        const val = info.getValue();
        let badgeClass = 'bg-slate-100 text-slate-700';
        if (val === 'Vigente') badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
        else if (val === 'En Trámite') badgeClass = 'bg-blue-100 text-blue-800 border-blue-200';
        else if (val === 'Rechazado') badgeClass = 'bg-rose-100 text-rose-800 border-rose-200';

        return (
          <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-bold border ${badgeClass}`}>
            {val}
          </span>
        );
      },
    }),
    helper.accessor('processInfo.stateId', {
      header: 'Fase Trámite',
      cell: info => {
        const stateId = info.getValue();
        const map: Record<string, string> = {
          'A': 'En Elaboración',
          'B': 'Presentado',
          'C': 'Requerimientos',
          'D': 'Aprobado',
          'E': 'Rechazado'
        };
        return <span className="font-medium text-slate-800 text-[13px]">{stateId} - {map[stateId]}</span>;
      }
    }),
    helper.display({
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => (
        <button
          onClick={() => router.push(`/dashboard/environmental/${row.original.id}`)}
          className="text-white bg-brand-primary hover:bg-secondary font-bold text-xs px-3.5 py-1.5 rounded-[50px] transition-colors flex items-center gap-xs shadow-xs cursor-pointer border-none"
        >
          <span>Ver Expediente</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      ),
    }),
  ];

  return (
    <DataTable 
      tableTitle="Inventario de Títulos Ambientales"
      data={filteredData} 
      columns={columns} 
      showPagination={true}
      searchPlaceholder="Buscar por identificador o instrumento..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      filterOptions={STATUS_OPTIONS}
      filterValue={statusFilter}
      onFilterChangeValue={setStatusFilter}
    />
  );
};
