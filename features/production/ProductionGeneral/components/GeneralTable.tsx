'use client';

import React, { useState, useMemo } from 'react';
import { DataTable } from '@/shared/ui/Table';
import { ProductionRecord } from '../../types';
import { columns } from './columns';

interface GeneralTableProps {
  data: ProductionRecord[];
}

const STATUS_FILTER_OPTIONS = [
  { label: 'Todos los Estados', value: 'Todos' },
  { label: 'Validado', value: 'Validado' },
  { label: 'En Revisión', value: 'En Revisión' },
  { label: 'Detenida', value: 'Detenida' },
];

export const GeneralTable = ({ data }: GeneralTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch =
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.minaFrente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.maquinaria.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'Todos' || item.estado === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  return (
    <DataTable
      tableTitle="Registros de Control de Producción"
      columns={columns}
      data={filteredData}
      showPagination={true}
      searchPlaceholder="Buscar por título, mina o maquinaria..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      filterOptions={STATUS_FILTER_OPTIONS}
      filterValue={statusFilter}
      onFilterChangeValue={setStatusFilter}
    />
  );
};
