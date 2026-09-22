import React from 'react';
import { DataTable } from '@/shared/ui/Table';
import { ExplosiveQuota } from '@/features/Explosives/types';
import { quotaColumns } from '@/features/Explosives/InventoryReport/components/columns';

interface QuotasTableProps {
  data: ExplosiveQuota[];
}

export const QuotasTable = ({ data }: QuotasTableProps) => {
  return (
    <div className="bg-card-surface border border-card-border rounded-2xl p-lg shadow-sm">
      <h3 className="font-bold text-headline-sm text-on-surface mb-xs">Cupos Asignados</h3>
      <p className="font-body-sm text-on-surface-variant mb-lg">
        Cantidad de cupo asignado por título y su respectiva vigencia.
      </p>

      <div className="overflow-x-auto">
        <DataTable data={data} columns={quotaColumns} />
      </div>
    </div>
  );
};
