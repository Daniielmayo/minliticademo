import React, { useMemo } from 'react';
import { DataTable } from '@/shared/ui/Table';
import { getColumns } from './columns';
import { TitleData } from '../types';

interface TitlesTableProps {
  data: TitleData[];
  selectedTitleId: string | null;
  onSelectTitle: (id: string | null) => void;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
  statusFilter?: string;
  onStatusFilterChange?: (val: string) => void;
}

const STATUS_FILTER_OPTIONS = [
  { label: 'Todos los Estados', value: 'Todos' },
  { label: 'Activo', value: 'Activo' },
  { label: 'Inactivo', value: 'Inactivo' },
  { label: 'Suspendido', value: 'Suspendido' },
];

export function TitlesTable({
  data,
  selectedTitleId,
  onSelectTitle,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: TitlesTableProps) {
  const tableColumns = useMemo(() => getColumns(onSelectTitle), [onSelectTitle]);

  return (
    <DataTable
      tableTitle="Catálogo de Títulos Mineros"
      columns={tableColumns}
      data={data}
      showPagination={true}
      onRowClick={(row) => onSelectTitle(row.id)}
      searchPlaceholder="Buscar por placa, titular..."
      searchValue={searchTerm}
      onSearchChange={onSearchChange}
      filterOptions={STATUS_FILTER_OPTIONS}
      filterValue={statusFilter}
      onFilterChangeValue={onStatusFilterChange}
    />
  );
}
