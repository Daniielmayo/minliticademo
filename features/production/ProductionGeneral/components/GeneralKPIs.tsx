import React from 'react';

export const GeneralKPIs = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
      {/* Card 1: Producción Total Agregada */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Producción Total Agregada
          </span>
          <span className="text-[40px] font-extrabold text-white leading-none tracking-tight">
            12,450.0 <span className="text-lg font-bold text-details">oz</span>
          </span>
          <span className="text-[12px] text-emerald-400 font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +8.2% vs mes anterior
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-details text-brand-primary flex items-center justify-center shrink-0 shadow-md z-10">
          <span className="material-symbols-outlined text-[26px]">bar_chart</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all" />
      </div>

      {/* Card 2: Regalías Pagadas */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Regalías Pagadas
          </span>
          <span className="text-[40px] font-extrabold text-white leading-none tracking-tight">
            $425.8k <span className="text-lg font-bold text-details">USD</span>
          </span>
          <span className="text-[12px] text-slate-300 font-medium">Títulos T-001 & T-002</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-details text-brand-primary flex items-center justify-center shrink-0 shadow-md z-10">
          <span className="material-symbols-outlined text-[26px]">payments</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all" />
      </div>

      {/* Card 3: Cumplimiento Budget */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Cumplimiento Budget
          </span>
          <span className="text-[40px] font-extrabold text-white leading-none tracking-tight">
            96.4<span className="text-lg font-bold text-details">%</span>
          </span>
          <span className="text-[12px] text-details font-semibold">Meta mensual alcanzada</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-details flex items-center justify-center shrink-0 z-10">
          <span className="material-symbols-outlined text-[26px]">analytics</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all" />
      </div>

      {/* Card 4: Frentes de Mina Activos */}
      <div className="bg-brand-primary text-white rounded-2xl p-lg shadow-lg shadow-brand-primary/20 border border-white/10 flex items-center justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden group">
        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
            Frentes Activos
          </span>
          <span className="text-[40px] font-extrabold text-white leading-none tracking-tight">
            4 <span className="text-lg font-bold text-details">Minas</span>
          </span>
          <span className="text-[12px] text-slate-300 font-medium">Operación continua</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-details flex items-center justify-center shrink-0 z-10">
          <span className="material-symbols-outlined text-[26px]">factory</span>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all" />
      </div>
    </div>
  );
};
