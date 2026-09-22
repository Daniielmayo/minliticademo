'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { InventorySummaryTable } from '@/features/Explosives/InventoryReport/components/InventorySummaryTable';
import { PowerFactorCard } from '@/features/Explosives/InventoryReport/components/PowerFactorCard';
import { QuotasTable } from '@/features/Explosives/InventoryReport/components/QuotasTable';
import { inventoryMockData, powerFactorMockData, quotaMockData } from '@/features/Explosives/constants';

const TITULOS_OPTIONS = ["T-001", "T-002", "T-003"];
const TITLE_MINE_MAP: Record<string, string[]> = {
  "T-001": ["Socavón Norte", "Nivel 4"],
  "T-002": ["Tajo Abierto", "Rampa Sur"],
  "T-003": ["Otra Mina"],
};

export const InventoryReport = () => {
  const [selectedTitle, setSelectedTitle] = useState<string>('Todos');
  const [selectedMine, setSelectedMine] = useState<string>('Todos');

  // Update available mines based on selected titles
  const availableMines = useMemo(() => {
    if (selectedTitle === 'Todos') {
      return Object.values(TITLE_MINE_MAP).flat();
    }
    return TITLE_MINE_MAP[selectedTitle] || [];
  }, [selectedTitle]);

  // Remove selected mine if it is no longer valid when title changes
  useEffect(() => {
    if (selectedMine !== 'Todos' && !availableMines.includes(selectedMine)) {
      setSelectedMine('Todos');
    }
  }, [selectedTitle, availableMines, selectedMine]);

  const filteredInventory = useMemo(() => {
    return inventoryMockData.filter(item => {
      const matchTitle = selectedTitle === 'Todos' || item.tituloMinero === selectedTitle;
      const matchMine = selectedMine === 'Todos' || item.mina === selectedMine;
      return matchTitle && matchMine;
    });
  }, [selectedTitle, selectedMine]);

  const filteredPowerFactor = useMemo(() => {
    return powerFactorMockData.filter(item => {
      const matchTitle = selectedTitle === 'Todos' || item.tituloMinero === selectedTitle;
      const matchMine = selectedMine === 'Todos' || item.mina === selectedMine;
      return matchTitle && matchMine;
    });
  }, [selectedTitle, selectedMine]);

  const filteredQuota = useMemo(() => {
    return quotaMockData.filter(item => {
      const matchTitle = selectedTitle === 'Todos' || item.tituloMinero === selectedTitle;
      const matchMine = selectedMine === 'Todos' || item.mina === selectedMine;
      return matchTitle && matchMine;
    });
  }, [selectedTitle, selectedMine]);

  return (
    <div className="flex flex-col gap-lg animate-in fade-in duration-300">
      <div className="flex flex-col gap-xs">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Reporte de Inventario</h2>
        <p className="font-body-md text-on-surface-variant">
          Control de existencias de agentes de voladura, accesorios y estado de cupos.
        </p>
      </div>

      {/* Unified Filters */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg items-end">
          {/* Título Minero */}
          <div className="space-y-xs">
            <label className="block font-label-md text-label-md text-primary uppercase tracking-wider font-bold">
              Título Minero
            </label>
            <div className="relative">
              <select
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                className="w-full px-md py-3 border border-slate-200 rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-slate-50 focus:bg-white appearance-none transition-colors"
              >
                <option value="Todos">Todos los Títulos</option>
                {TITULOS_OPTIONS.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-md text-on-surface-variant">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          {/* Mina / Frente */}
          <div className="space-y-xs">
            <label className="block font-label-md text-label-md text-primary uppercase tracking-wider font-bold">
              Mina / Frente
            </label>
            <div className="relative">
              <select
                value={selectedMine}
                onChange={(e) => setSelectedMine(e.target.value)}
                className="w-full px-md py-3 border border-slate-200 rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-slate-50 focus:bg-white appearance-none transition-colors"
              >
                <option value="Todos">Todas las Minas</option>
                {availableMines.map(mine => (
                  <option key={mine} value={mine}>{mine}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-md text-on-surface-variant">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Left side: Inventory Table (takes 2/3 width on large screens) */}
        <div className="lg:col-span-2">
          <InventorySummaryTable data={filteredInventory} />
        </div>

        {/* Right side: Power Factor KPI (takes 1/3 width on large screens) */}
        <div className="lg:col-span-1">
          <PowerFactorCard metrics={filteredPowerFactor} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg">
        {/* Quotas table spans full width */}
        <QuotasTable data={filteredQuota} />
      </div>
    </div>
  );
};
