'use client';

import React from 'react';
import { DonutChart } from '@/shared/ui/Charts';
import { AlertCard } from '@/shared/ui/AlertCard';
import { MandatoryRequirementsTable } from './components/MandatoryRequirementsTable';
import { RegulatoryRequirementData } from './types';

export const MandatoryRequirements = () => {
  const tableData: RegulatoryRequirementData[] = [
    {
      component: 'Económica',
      administrativeAct: 'Res. 0452-2023',
      requirement: 'Pago Canon 2024',
      status: 'Crítico',
      responsible: 'Dpto. Financiero',
      dueDate: 'Oct 25 2024',
    },
    {
      component: 'Ambiental',
      administrativeAct: 'Auto 128-2024',
      requirement: 'Reporte de Aguas',
      status: 'En Proceso',
      responsible: 'Gestión Ambiental',
      dueDate: 'Nov 12 2024',
    },
    {
      component: 'Seguridad',
      administrativeAct: 'Res. 0915-2023',
      requirement: 'Estabilidad de Taludes',
      status: 'Programado',
      responsible: 'Ingeniería Minas',
      dueDate: 'Dec 05 2024',
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-lg">
      {/* Compliance Index (Pie Chart) */}
      <div className="col-span-12 lg:col-span-4">
        <DonutChart
          title="Índice de Cumplimiento"
          percentage={86}
          label="Global"
          legend={[
            { label: 'Cumplidos', count: 18, colorClass: 'bg-secondary' },
            { label: 'Atrasados', count: 3, colorClass: 'bg-error' },
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

      {/* Requirements Table */}
      <div className="col-span-12 w-full">
        <MandatoryRequirementsTable
          data={tableData}
          totalRows={24}
        />
      </div>
    </div>
  );
};
