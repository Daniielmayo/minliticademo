import React from 'react';
import { DataTable } from '@/shared/ui/Table';
import { columns } from './columns';
import { ObligationData } from '../types';

interface MandatoryComplianceRequirementsTableProps {
  data: ObligationData[];
  totalRows?: number;
}

export function MandatoryComplianceRequirementsTable({ data, totalRows }: MandatoryComplianceRequirementsTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      showPagination={true}
      totalRows={totalRows ?? data.length}
    />
  );
}
