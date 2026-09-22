import { DataTable } from '@/shared/ui/Table';
import { InventoryItem } from '@/features/Explosives/types';
import { inventoryColumns } from '@/features/Explosives/InventoryReport/components/columns';

interface InventorySummaryTableProps {
  data: InventoryItem[];
}

export const InventorySummaryTable = ({ data }: InventorySummaryTableProps) => {
  return (
    <div className="bg-card-surface border border-card-border rounded-2xl p-lg shadow-sm h-full flex flex-col">
      <h3 className="font-bold text-headline-sm text-on-surface mb-xs">Reporte de Inventario</h3>
      <p className="font-body-sm text-on-surface-variant mb-lg">
        Existencia o remanente de cada ítem consumido (agentes de voladura y accesorios).
      </p>

      <div className="flex-1 overflow-y-auto">
        <DataTable data={data} columns={inventoryColumns} showPagination={true} />
      </div>
    </div>
  );
};
