import React from 'react';
import { Button } from '@/shared/ui/Button';

interface GeneralFiltersProps {
  selectedTitle: string;
  setSelectedTitle: (title: string) => void;
  selectedMine: string;
  setSelectedMine: (mine: string) => void;
  period: string;
  setPeriod: (period: string) => void;
}

export const GeneralFilters = ({
  selectedTitle,
  setSelectedTitle,
  selectedMine,
  setSelectedMine,
  period,
  setPeriod,
}: GeneralFiltersProps) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg items-end">
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
              <option value="T-001">T-001</option>
              <option value="T-002">T-002</option>
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
              <option value="Todas">Todas las Minas</option>
              <option value="Mina La Esmeralda">Mina La Esmeralda</option>
              <option value="Mina El Roble">Mina El Roble</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-md text-on-surface-variant">
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </div>
        </div>

        {/* Búsqueda / Período */}
        <div className="space-y-xs">
          <label className="block font-label-md text-label-md text-primary uppercase tracking-wider font-bold">
            Buscar Período
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              placeholder="Ej: Enero 2024..."
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full pl-11 pr-md py-3 border border-slate-200 rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-slate-50 focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Action Button Row */}
      <div className="flex justify-end mt-lg">
        <Button variant="secondary" className="flex items-center gap-sm ">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Exportar (FRI-ANM)
        </Button>
      </div>
    </div>
  );
};
