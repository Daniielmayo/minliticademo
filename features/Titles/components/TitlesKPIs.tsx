import React from 'react';
import { TitleData } from '../types';

interface TitlesKPIsProps {
  titles: TitleData[];
}

export const TitlesKPIs: React.FC<TitlesKPIsProps> = ({ titles }) => {
  const totalTitles = titles.length;
  const activeTitles = titles.filter(t => t.estado === 'Activo').length;
  const inProcessTitles = titles.filter(t => t.estado === 'Suspendido' || t.tipo === 'Solicitud').length;
  
  // Calculate total extension in Ha
  const totalExtension = titles.reduce((acc, t) => {
    const num = parseFloat(t.extension.replace(/[^0-9.]/g, '')) || 0;
    return acc + num;
  }, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
      {/* 1. Total Portafolio */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Total Títulos
          </span>
          <span className="text-[40px] font-extrabold text-white leading-none tracking-tight">
            {totalTitles}
          </span>
          <span className="text-[12px] text-slate-300 font-medium">Expedientes registrados</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-details text-brand-primary flex items-center justify-center shrink-0 shadow-md z-10">
          <span className="material-symbols-outlined text-[26px]">folder_open</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all" />
      </div>

      {/* 2. Títulos Activos */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Títulos Activos
          </span>
          <span className="text-[40px] font-extrabold text-white leading-none tracking-tight">
            {activeTitles}
          </span>
          <span className="text-[12px] text-details font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-details inline-block shadow-[0_0_6px_rgba(241,186,58,0.8)]"></span> En operación regular
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-details flex items-center justify-center shrink-0 z-10">
          <span className="material-symbols-outlined text-[26px]">verified</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all" />
      </div>

      {/* 3. Área Amparada */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Área Amparada
          </span>
          <span className="text-[40px] font-extrabold text-white leading-none tracking-tight">
            {totalExtension.toLocaleString()} <span className="text-lg font-bold text-details ml-1">Ha</span>
          </span>
          <span className="text-[12px] text-slate-300 font-medium">Superficie otorgada</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-details flex items-center justify-center shrink-0 z-10">
          <span className="material-symbols-outlined text-[26px]">map</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all" />
      </div>

      {/* 4. Atención / Trámite */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Atención / Trámite
          </span>
          <span className="text-[40px] font-extrabold text-details leading-none tracking-tight">
            {inProcessTitles}
          </span>
          <span className="text-[12px] text-details font-bold">Solicitud / Suspendidos</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-details text-brand-primary flex items-center justify-center shrink-0 shadow-md z-10">
          <span className="material-symbols-outlined text-[26px]">warning</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all" />
      </div>
    </div>
  );
};
