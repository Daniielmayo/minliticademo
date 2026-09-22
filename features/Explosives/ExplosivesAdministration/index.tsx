'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { BurningRecordsTable } from '@/features/Explosives/ExplosivesAdministration/components/BurningRecordsTable';
import { DocumentLinksCard } from '@/features/Explosives/ExplosivesAdministration/components/DocumentLinksCard';
import { AdministrationActions } from '@/features/Explosives/ExplosivesAdministration/components/AdministrationActions';
import { ConsumptionStats } from '@/features/Explosives/ExplosivesAdministration/components/ConsumptionStats';
import { burningRecordsMockData, consumptionStatsMock } from '@/features/Explosives/constants';

export const ExplosivesAdministration = () => {
  const [selectedTitle, setSelectedTitle] = useState<string>('Todos');
  const [selectedMine, setSelectedMine] = useState<string>('Todos');
  const [period, setPeriod] = useState<string>('');

  const TITULOS_OPTIONS = ["T-001", "T-002", "T-003"];
  const TITLE_MINE_MAP: Record<string, string[]> = {
    "T-001": ["Socavón Norte", "Nivel 4"],
    "T-002": ["Tajo Abierto", "Rampa Sur"],
    "T-003": ["Otra Mina"],
  };

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

  const filteredStats = useMemo(() => {
    let targetMonthStr = '';
    if (period) {
      const monthIndex = period.split('-')[1];
      const monthMap: Record<string, string> = {
        '01': 'ene', '02': 'feb', '03': 'mar', '04': 'abr', '05': 'may', '06': 'jun',
        '07': 'jul', '08': 'ago', '09': 'sep', '10': 'oct', '11': 'nov', '12': 'dic'
      };
      targetMonthStr = monthMap[monthIndex] || '';
    }

    return consumptionStatsMock.filter(item => {
      const matchTitle = selectedTitle === 'Todos' || item.tituloMinero === selectedTitle;
      const matchMine = selectedMine === 'Todos' || item.mina === selectedMine;
      const matchPeriod = !period || item.mes.toLowerCase().includes(targetMonthStr);
      return matchTitle && matchMine && matchPeriod;
    });
  }, [selectedTitle, selectedMine, period]);

  const filteredRecords = useMemo(() => {
    return burningRecordsMockData.filter(item => {
      const matchTitle = selectedTitle === 'Todos' || item.tituloMinero === selectedTitle;
      const matchMine = selectedMine === 'Todos' || item.mina === selectedMine;
      // For burning records, period can match the date string
      const matchPeriod = !period || item.fecha.includes(period);
      return matchTitle && matchMine && matchPeriod;
    });
  }, [selectedTitle, selectedMine, period]);

  return (
    <div className="flex flex-col gap-lg animate-in fade-in duration-300">
      <div className="flex flex-col gap-xs">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Administración de Explosivos</h2>
        <p className="font-body-md text-on-surface-variant">
          Gestión de actas de quema, evidencias y reportes de descargos.
        </p>
      </div>

      {/* Unified Filters */}
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
                {availableMines.map((mine: string) => (
                  <option key={mine} value={mine}>{mine}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-md text-on-surface-variant">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          {/* Período */}
          <div className="space-y-xs">
            <label className="block font-label-md text-label-md text-primary uppercase tracking-wider font-bold">
              Período
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                calendar_today
              </span>
              <input
                type="month"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full pl-11 pr-md py-3 border border-slate-200 rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-slate-50 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        {/* Left/Top side: Document Link */}
        <DocumentLinksCard />

        {/* Right/Bottom side: Actions */}
        <AdministrationActions />
      </div>

      <div className="grid grid-cols-1 gap-lg">
        {/* Statistics Chart */}
        <ConsumptionStats data={filteredStats} />

        {/* Burning Records table spans full width */}
        <BurningRecordsTable data={filteredRecords} />
      </div>
    </div>
  );
};
