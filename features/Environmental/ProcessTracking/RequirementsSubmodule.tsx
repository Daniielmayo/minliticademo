import React from 'react';
import { ComplianceTask } from '@/features/Environmental/types';
import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';

interface RequirementsSubmoduleProps {
  tasks: ComplianceTask[];
}

const helper = createColumnHelper<ComplianceTask>();

export const RequirementsSubmodule = ({ tasks }: RequirementsSubmoduleProps) => {
  const columns: ColumnDef<ComplianceTask, any>[] = [
    helper.accessor('description', {
      header: 'Acción Requerida',
      cell: info => <span className="font-body-md text-on-surface">{info.getValue()}</span>,
    }),
    helper.accessor('responsible', {
      header: 'Responsable',
      cell: info => <span className="font-body-md font-bold text-primary">{info.getValue()}</span>,
    }),
    helper.accessor('dueDate', {
      header: 'Límite Interno',
      cell: info => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
    }),
    helper.accessor('status', {
      header: 'Estado',
      cell: info => {
        const val = info.getValue();
        let badgeClass = 'bg-surface-container text-on-surface-variant';
        if (val === 'Realizado') badgeClass = 'bg-[#10B981]/10 text-success-alert';
        else if (val === 'En Proceso') badgeClass = 'bg-primary/10 text-primary';
        else if (val === 'No Realizado') badgeClass = 'bg-error/10 text-error';

        return (
          <span className={`px-2 py-1 rounded-full font-label-sm font-bold ${badgeClass}`}>
            {val}
          </span>
        );
      },
    }),
    helper.display({
      id: 'notify',
      header: 'Notificar',
      cell: () => (
        <button className="text-white bg-brand-primary hover:bg-secondary transition-colors p-2 rounded-[50px] flex items-center justify-center shadow-xs" title="Enviar correo">
          <span className="material-symbols-outlined text-[18px]">mail</span>
        </button>
      ),
    })
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md mt-lg">
      <div className="flex items-center gap-sm mb-md">
        <span className="material-symbols-outlined text-error text-[24px]">assignment_late</span>
        <h3 className="font-bold text-headline-sm text-error">Desglose de Requerimientos (Estado C)</h3>
      </div>
      <p className="font-body-sm text-on-surface-variant mb-lg">
        Acciones técnicas a subsanar requeridas por la autoridad. Si no se cumplen antes del plazo de ley (30 días), el trámite será rechazado.
      </p>
      <div className="overflow-x-auto">
        <DataTable data={tasks} columns={columns} showPagination={true} />
      </div>
    </div>
  );
};
