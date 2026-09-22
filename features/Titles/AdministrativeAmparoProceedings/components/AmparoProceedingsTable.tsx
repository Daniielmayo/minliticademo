import React from 'react';
import { DataTable } from '@/shared/ui/Table';
import { columns } from './columns';
import { AmparoProceedingData } from '../types';

interface AmparoProceedingsTableProps {
  data: AmparoProceedingData[];
  totalRows?: number;
}

export function AmparoProceedingsTable({ data, totalRows }: AmparoProceedingsTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      showPagination={true}
      totalRows={totalRows ?? data.length}
    />
  );
}
