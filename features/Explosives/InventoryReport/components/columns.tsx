import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { InventoryItem, ExplosiveQuota } from '@/features/Explosives/types';

const inventoryHelper = createColumnHelper<InventoryItem>();
export const inventoryColumns: ColumnDef<InventoryItem, any>[] = [
  inventoryHelper.accessor('categoria', {
    header: 'Categoría',
    cell: info => <span className="font-body-md font-medium text-on-surface">{info.getValue()}</span>,
  }),
  inventoryHelper.accessor('item', {
    header: 'Ítem',
    cell: info => <span className="font-body-md text-on-surface">{info.getValue()}</span>,
  }),
  inventoryHelper.accessor('existencia', {
    header: 'Existencia',
    cell: info => (
      <span className="font-body-md font-bold text-primary">
        {info.getValue().toLocaleString('es-CO')} <span className="text-sm font-normal text-on-surface-variant">{info.row.original.unidad}</span>
      </span>
    ),
  }),
];

const quotaHelper = createColumnHelper<ExplosiveQuota>();
export const quotaColumns: ColumnDef<ExplosiveQuota, any>[] = [
  quotaHelper.accessor('tituloMinero', {
    header: 'Título Minero',
    cell: info => <span className="font-body-md font-bold text-on-surface">{info.getValue()}</span>,
  }),
  quotaHelper.accessor('item', {
    header: 'Ítem',
    cell: info => <span className="font-body-md text-on-surface">{info.getValue()}</span>,
  }),
  quotaHelper.accessor('cantidadConsumida', {
    header: 'Cupo Consumido',
    cell: info => (
      <span className="font-body-md font-medium text-primary">
        {info.getValue().toLocaleString('es-CO')} <span className="text-sm font-normal text-on-surface-variant">{info.row.original.unidad}</span>
      </span>
    ),
  }),
  quotaHelper.accessor('existencia', {
    header: 'Existencia',
    cell: info => (
      <span className="font-body-md font-medium text-primary">
        {info.getValue().toLocaleString('es-CO')} <span className="text-sm font-normal text-on-surface-variant">{info.row.original.unidad}</span>
      </span>
    ),
  }),
  quotaHelper.accessor('vigencia', {
    header: 'Vigencia',
    cell: info => <span className="font-body-md text-on-surface">{info.getValue()}</span>,
  }),
  quotaHelper.accessor('estado', {
    header: 'Estado',
    cell: info => {
      const estado = info.getValue();
      let badgeClass = '';
      if (estado === 'Vigente') badgeClass = 'bg-success-alert-icon-bg text-success-alert';
      else if (estado === 'Por Vencer') badgeClass = 'bg-[#fef3c7] text-[#b45309]';
      else badgeClass = 'bg-error-container text-error';

      return (
        <span className={`px-sm py-1 rounded-full text-xs font-medium ${badgeClass}`}>
          {estado}
        </span>
      );
    },
  }),
];
