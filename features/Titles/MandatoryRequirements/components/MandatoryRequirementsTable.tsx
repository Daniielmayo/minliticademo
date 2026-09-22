import React from 'react';
import { DataTable } from '@/shared/ui/Table';
import { columns } from './columns';
import { RegulatoryRequirementData } from '../types';

interface MandatoryRequirementsTableProps {
  data: RegulatoryRequirementData[];
  totalRows?: number;
}

export function MandatoryRequirementsTable({ data, totalRows }: MandatoryRequirementsTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      showPagination={true}
      totalRows={totalRows ?? data.length}
    />
  );
}
