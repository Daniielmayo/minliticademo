import React from 'react';
import { DataTable } from '@/shared/ui/Table';
import { BurningRecord } from '@/features/Explosives/types';
import { burningColumns } from '@/features/Explosives/ExplosivesAdministration/components/columns';

interface BurningRecordsTableProps {
  data: BurningRecord[];
}

export const BurningRecordsTable = ({ data }: BurningRecordsTableProps) => {
  return (
    <div className="bg-card-surface border border-card-border rounded-2xl p-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-lg gap-sm">
        <div>
          <h3 className="font-bold text-headline-sm text-on-surface mb-xs">Actas de Quema</h3>
          <p className="font-body-sm text-on-surface-variant">
            Registros de quema por frente de trabajo, mina y título.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <DataTable data={data} columns={burningColumns} showPagination={true} />
      </div>
    </div>
  );
};
