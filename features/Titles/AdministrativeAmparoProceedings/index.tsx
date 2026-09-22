'use client';

import React from 'react';
import { DonutChart } from '@/shared/ui/Charts';
import { AmparoMap } from './components/AmparoMap';
import { AmparoProceedingsTable } from './components/AmparoProceedingsTable';
import { AmparoProceedingData } from './types';

export const AdministrativeAmparoProceedings = () => {
  const tableData: AmparoProceedingData[] = [
    {
      id: '1',
      disturbanceName: 'Invasión Sector Norte',
      coordinates: '7.1234, -75.5678',
      registrationDate: 'Sep 12 2024',
      applicationStatus: 'En Trámite',
      response: 'Pendiente',
      dueDate: 'Oct 25 2024',
    },
    {
      id: '2',
      disturbanceName: 'Minería Ilegal Quebrada',
      coordinates: '7.1245, -75.5689',
      registrationDate: 'Aug 05 2024',
      applicationStatus: 'Resuelto',
      response: 'Otorgado',
      dueDate: 'Nov 12 2024',
    },
    {
      id: '3',
      disturbanceName: 'Ocupación de Hecho',
      coordinates: '7.1256, -75.5701',
      registrationDate: 'Oct 01 2024',
      applicationStatus: 'Rechazado',
      response: 'No Otorgado',
      dueDate: 'Dec 05 2024',
    },
  ];

  return (
    <div className="flex flex-col gap-lg w-full">
      {/* Top Section: Metrics and Map */}
      <div className="flex flex-col lg:flex-row gap-lg">
        {/* Compliance Index Card */}
        <div className="w-full lg:w-1/3">
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

        {/* Map Area */}
        <div className="w-full lg:w-2/3">
          <AmparoMap />
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full">
        <AmparoProceedingsTable
          data={tableData}
          totalRows={24}
        />
      </div>
    </div>
  );
};
