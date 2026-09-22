import React from 'react';
import { PowerFactorMetric } from '@/features/Explosives/types';

interface PowerFactorCardProps {
  metrics: PowerFactorMetric[];
}

export const PowerFactorCard = ({ metrics }: PowerFactorCardProps) => {
  if (!metrics || metrics.length === 0) {
    return (
      <div className="bg-brand-primary text-white border border-white/10 rounded-2xl p-lg shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
        <div>
          <h3 className="font-bold text-[18px] text-white tracking-tight">Indicador de Uso de Explosivos</h3>
          <p className="text-[13px] text-slate-300 font-medium mt-0.5">
            Factor de Potencia (kg por tonelada de piedra arrancada)
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-lg rounded-2xl border border-dashed border-white/20 bg-white/5 backdrop-blur-md mt-md">
          <span className="material-symbols-outlined text-slate-400 text-[48px] mb-xs">info</span>
          <span className="text-slate-300 font-medium text-[13px] text-center">No hay datos disponibles para los filtros seleccionados.</span>
        </div>
      </div>
    );
  }

  // We take the latest metric for the main KPI display
  const latestMetric = metrics[metrics.length - 1];
  const { factorDePotencia, kgExplosivo, toneladasExtraidas } = latestMetric;

  // Determine status color and text for dark primary background contrast
  let statusBadgeClass = '';
  let statusTextColor = '';
  let statusLabel = '';
  let icon = '';

  if (factorDePotencia < 1.0) {
    statusBadgeClass = 'bg-rose-500/20 text-rose-300 border-rose-400/30';
    statusTextColor = 'text-rose-300';
    statusLabel = 'Alerta Crítica';
    icon = 'warning';
  } else if (factorDePotencia >= 1.0 && factorDePotencia <= 1.1) {
    statusBadgeClass = 'bg-details/20 text-details border-details/40';
    statusTextColor = 'text-details';
    statusLabel = 'Atención';
    icon = 'info';
  } else {
    statusBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
    statusTextColor = 'text-emerald-300';
    statusLabel = 'Óptimo';
    icon = 'check_circle';
  }

  return (
    <div className="bg-brand-primary text-white border border-white/10 rounded-2xl p-lg shadow-xl flex flex-col justify-between h-full relative overflow-hidden group">
      <div>
        <h3 className="font-bold text-[18px] text-white tracking-tight">Indicador de Uso de Explosivos</h3>
        <p className="text-[13px] text-slate-300 font-medium mt-0.5">
          Factor de Potencia (kg por tonelada de piedra arrancada)
        </p>
      </div>

      {/* Main Factor Metric Display */}
      <div className="p-lg rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col items-center justify-center text-center flex-1 my-md shadow-inner relative z-10">
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border mb-sm ${statusBadgeClass}`}>
          <span className="material-symbols-outlined text-[16px]">{icon}</span>
          <span>{statusLabel}</span>
        </div>

        <span className="text-[48px] font-extrabold text-white leading-none tracking-tight my-1">
          {factorDePotencia.toFixed(2)}
        </span>

        <span className="text-[11px] font-bold uppercase tracking-widest text-details">
          kg / tonelada
        </span>
      </div>

      {/* Bottom Metrics Grid */}
      <div className="grid grid-cols-2 gap-md z-10">
        <div className="p-md bg-white/10 backdrop-blur-md rounded-xl border border-white/15 flex flex-col gap-1">
          <span className="text-slate-300 text-[11px] font-bold uppercase tracking-wider">Kilogramos Usados</span>
          <span className="text-[20px] font-extrabold text-details font-mono">
            {kgExplosivo.toLocaleString('es-CO')} <span className="text-xs font-normal text-slate-300">kg</span>
          </span>
        </div>
        <div className="p-md bg-white/10 backdrop-blur-md rounded-xl border border-white/15 flex flex-col gap-1">
          <span className="text-slate-300 text-[11px] font-bold uppercase tracking-wider">Toneladas Arrancadas</span>
          <span className="text-[20px] font-extrabold text-details font-mono">
            {toneladasExtraidas.toLocaleString('es-CO')} <span className="text-xs font-normal text-slate-300">t</span>
          </span>
        </div>
      </div>

      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all pointer-events-none" />
    </div>
  );
};
