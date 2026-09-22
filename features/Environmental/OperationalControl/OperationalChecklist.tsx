'use client';

import React, { useState } from 'react';
import { ComplianceTask, ComponentType } from '@/features/Environmental/types';
import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';

interface OperationalChecklistProps {
  tasks: ComplianceTask[];
}

const helper = createColumnHelper<ComplianceTask>();

export const OperationalChecklist = ({ tasks }: OperationalChecklistProps) => {
  const [activeTab, setActiveTab] = useState<ComponentType>('Biótico');

  const filteredTasks = tasks.filter(t => t.component === activeTab);

  const columns: ColumnDef<ComplianceTask, any>[] = [
    helper.accessor('description', {
      header: 'Acción en Terreno',
      cell: info => <span className="font-body-md text-on-surface">{info.getValue()}</span>,
    }),
    helper.accessor('responsible', {
      header: 'Responsable',
      cell: info => <span className="font-body-md text-on-surface-variant">{info.getValue()}</span>,
    }),
    helper.accessor('dueDate', {
      header: 'Fecha Límite',
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
      id: 'evidence',
      header: 'Evidencia',
      cell: () => (
        <button className="text-white bg-brand-primary hover:bg-secondary transition-colors p-2 rounded-[50px] flex items-center justify-center shadow-xs" title="Cargar/Ver Evidencia">
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
        </button>
      ),
    })
  ];

  const TABS: ComponentType[] = ['Biótico', 'Abiótico', 'Social'];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md">
      <h3 className="font-bold text-headline-sm text-on-surface mb-md">Control Operativo (Licenciado)</h3>
      <p className="font-body-sm text-on-surface-variant mb-lg">
        Gestión de obligaciones prácticas dictadas por la resolución ambiental.
      </p>

      {/* Tabs */}
      <div className="flex border-b border-card-border mb-lg">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-lg py-sm font-label-md transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-primary text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Componente {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <DataTable data={filteredTasks} columns={columns} showPagination={true} />
      </div>
    </div>
  );
};
