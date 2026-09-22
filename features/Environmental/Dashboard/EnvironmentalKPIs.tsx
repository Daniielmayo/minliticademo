import React from 'react';

interface EnvironmentalKPIsProps {
  totalTitles: number;
  inElaboration: number;
  presented: number;
  inRequirements: number;
  approved: number;
}

export const EnvironmentalKPIs = ({ totalTitles, inElaboration, presented, inRequirements, approved }: EnvironmentalKPIsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-md mb-lg">
      {/* 1. Total Portafolio */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Total Portafolio
          </span>
          <span className="text-[40px] font-extrabold text-white leading-none tracking-tight">
            {totalTitles}
          </span>
          <span className="text-[12px] text-slate-300 font-medium">Expedientes ambientales</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-details text-brand-primary flex items-center justify-center shrink-0 shadow-md z-10">
          <span className="material-symbols-outlined text-[26px]">folder_open</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all pointer-events-none" />
      </div>

      {/* 2. En Elaboración (A) */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            En Elaboración (A)
          </span>
          <span className="text-[40px] font-extrabold text-details leading-none tracking-tight">
            {inElaboration}
          </span>
          <span className="text-[12px] text-details font-semibold">Fase inicial</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-details text-brand-primary flex items-center justify-center shrink-0 shadow-md z-10">
          <span className="material-symbols-outlined text-[26px]">edit_document</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all pointer-events-none" />
      </div>

      {/* 3. Presentados (B) */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Presentados (B)
          </span>
          <span className="text-[40px] font-extrabold text-white leading-none tracking-tight">
            {presented}
          </span>
          <span className="text-[12px] text-slate-300 font-medium">Ante la autoridad</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-details flex items-center justify-center shrink-0 z-10">
          <span className="material-symbols-outlined text-[26px]">send</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all pointer-events-none" />
      </div>

      {/* 4. Requerimientos (C) */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Requerimientos (C)
          </span>
          <span className="text-[40px] font-extrabold text-details leading-none tracking-tight">
            {inRequirements}
          </span>
          <span className="text-[12px] text-details font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            Atención requerida
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-details text-brand-primary flex items-center justify-center shrink-0 shadow-md z-10">
          <span className="material-symbols-outlined text-[26px]">assignment_late</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all pointer-events-none" />
      </div>

      {/* 5. Licenciados (D) */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Licenciados (D)
          </span>
          <span className="text-[40px] font-extrabold text-white leading-none tracking-tight">
            {approved}
          </span>
          <span className="text-[12px] text-details font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-details inline-block shadow-[0_0_6px_rgba(241,186,58,0.8)]"></span> Licencia vigente
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-details flex items-center justify-center shrink-0 z-10">
          <span className="material-symbols-outlined text-[26px]">verified</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all pointer-events-none" />
      </div>
    </div>
  );
};
