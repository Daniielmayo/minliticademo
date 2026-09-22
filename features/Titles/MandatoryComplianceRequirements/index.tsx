'use client';

import React from 'react';
import { DonutChart } from '@/shared/ui/Charts';
import { AlertCard } from '@/shared/ui/AlertCard';
import { MandatoryComplianceRequirementsTable } from './components/MandatoryComplianceRequirementsTable';
import { ObligationData } from './types';

export const MandatoryComplianceRequirements = () => {
  const tableData: ObligationData[] = [
    { component: 'Ambiental', type: 'Pago Canon 2024', dueDate: 'Oct 25 2024', status: 'Crítico', responsible: 'Juan Pérez' },
    { component: 'Seguridad', type: 'Reporte de Aguas', dueDate: 'Nov 12 2024', status: 'En Proceso', responsible: 'María López' },
    { component: 'Social', type: 'Estabilidad de Taludes', dueDate: 'Dec 05 2024', status: 'Programado', responsible: 'Carlos Ruiz' },
  ];

  return (
    <div className="grid grid-cols-12 gap-lg">
      {/* Compliance Index (Pie Chart) */}
      <div className="col-span-12 lg:col-span-4">
        <DonutChart
          title="Índice de Cumplimiento"
          percentage={70}
          label="Global"
          legend={[
            { label: 'Cumplidos', count: 18, colorClass: 'bg-secondary' },
            { label: 'Atrasados', count: 8, colorClass: 'bg-error' },
          ]}
        />
      </div>

      {/* Alert Cards */}
      <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-lg">
        {/* Critical Alert */}
        <AlertCard
          variant="critical"
          icon="priority_high"
          badgeLabel="Crítico"
          title="Canon Superficiario"
          description="Pago urgente requerido para mantener vigencia."
          statusLabel="Vencimiento"
          statusValue="Vence en 2 días"
        />
        {/* Warning Alert */}
        <AlertCard
          variant="warning"
          icon="event_repeat"
          badgeLabel="Advertencia"
          title="Póliza de Garantía"
          description="Renovación en proceso con aseguradora regional."
          statusLabel="Estado"
          statusValue="Vence en 15 días"
        />
      </div>

      {/* Obligations Table */}
      <div className="col-span-12 w-full">
        <MandatoryComplianceRequirementsTable
          data={tableData}
          totalRows={24}
        />
      </div>
    </div>
  );
};
