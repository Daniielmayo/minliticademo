"use client";

import React, { useState } from 'react';
import { MetricsHeader } from './components/MetricsHeader';
import { ProductionIndicators } from './components/ProductionIndicators';
import { MachineryMetricsTable } from './components/MachineryMetricsTable';
import { RoyaltiesMetrics } from './components/RoyaltiesMetrics';

const TITULOS_OPTIONS = ["T-001", "T-002"];
const TITLE_MINE_MAP: Record<string, string[]> = {
  "T-001": ["Socavón Norte", "Nivel 4"],
  "T-002": ["Tajo Abierto", "Rampa Sur"]
};

export const ProductionMetrics = () => {
  const [selectedTitle, setSelectedTitle] = useState<string>('Todos');
  const [selectedMine, setSelectedMine] = useState<string>('Todos');

  // Update available mines based on selected titles
  const availableMines = React.useMemo(() => {
    if (selectedTitle === 'Todos') {
      return Object.values(TITLE_MINE_MAP).flat();
    }
    return TITLE_MINE_MAP[selectedTitle] || [];
  }, [selectedTitle]);

  // Remove selected mine if it is no longer valid when title changes
  React.useEffect(() => {
    if (selectedMine !== 'Todos' && !availableMines.includes(selectedMine)) {
      setSelectedMine('Todos');
    }
  }, [selectedTitle, availableMines, selectedMine]);

  const selectedTitlesArray = selectedTitle === 'Todos' ? [] : [selectedTitle];
  const selectedMinesArray = selectedMine === 'Todos' ? [] : [selectedMine];

  return (
    <div className="flex flex-col gap-lg pb-lg">
      <MetricsHeader />
      
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

      <ProductionIndicators selectedTitles={selectedTitlesArray} selectedMines={selectedMinesArray} />
      <MachineryMetricsTable selectedTitles={selectedTitlesArray} selectedMines={selectedMinesArray} />
      <RoyaltiesMetrics selectedTitles={selectedTitlesArray} selectedMines={selectedMinesArray} />
    </div>
  );
};
