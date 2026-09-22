'use client';

import React, { useMemo } from 'react';
import { EnvironmentalKPIs } from '@/features/Environmental/Dashboard/EnvironmentalKPIs';
import { InventoryTable } from '@/features/Environmental/Dashboard/InventoryTable';
import { mockEnvironmentalTitles } from '@/features/Environmental/constants';

export default function EnvironmentalDashboardPage() {
  const kpis = useMemo(() => {
    return {
      totalTitles: mockEnvironmentalTitles.length,
      inElaboration: mockEnvironmentalTitles.filter(t => t.processInfo.stateId === 'A').length,
      presented: mockEnvironmentalTitles.filter(t => t.processInfo.stateId === 'B').length,
      inRequirements: mockEnvironmentalTitles.filter(t => t.processInfo.stateId === 'C').length,
      approved: mockEnvironmentalTitles.filter(t => t.processInfo.stateId === 'D').length,
    };
  }, []);

  return (
    <div className="flex flex-col gap-lg animate-in fade-in duration-300 p-lg max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col gap-xs">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Portafolio Ambiental</h2>
        <p className="font-body-md text-on-surface-variant">
          Control general de los instrumentos ambientales (EIA / PMA) y licencias.
        </p>
      </div>

      <EnvironmentalKPIs {...kpis} />
      
      <InventoryTable data={mockEnvironmentalTitles} />
    </div>
  );
}
