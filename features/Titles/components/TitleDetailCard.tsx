import React from 'react';
import Link from 'next/link';
import { TitleData } from '../types';

interface TitleDetailCardProps {
  selectedTitle: TitleData | null;
  onClearSelection: () => void;
}

export const TitleDetailCard: React.FC<TitleDetailCardProps> = ({ selectedTitle, onClearSelection }) => {
  if (!selectedTitle) {
    return (
      <div className="h-[420px] bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-md">
          <span className="material-symbols-outlined text-slate-400 text-[32px]">touch_app</span>
        </div>
        <h4 className="text-[16px] font-bold text-brand-primary mb-xs">Selecciona un Título Minero</h4>
        <p className="text-[13px] text-slate-500 max-w-xs font-medium">
          Haz clic en un marcador del mapa o en una fila de la tabla para inspeccionar los detalles del expediente.
        </p>
      </div>
    );
  }

  let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  if (selectedTitle.estado === 'Inactivo') badgeColor = 'bg-red-100 text-red-800 border-red-300';
  if (selectedTitle.estado === 'Suspendido') badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';

  return (
    <div className="h-[420px] bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md flex flex-col justify-between overflow-hidden relative group">
      {/* Top Bar: Placa Badge & Clear Action */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-brand-primary text-white rounded-full text-[13px] font-bold tracking-tight shadow-xs">
            {selectedTitle.placa}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeColor}`}>
            {selectedTitle.estado}
          </span>
        </div>
        <button
          onClick={onClearSelection}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
          title="Deseleccionar"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Main Info Body */}
      <div className="flex-1 py-3 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Titular del Registro</span>
          <h3 className="text-[18px] font-bold text-brand-primary leading-snug mt-0.5">
            {selectedTitle.titular}
          </h3>
        </div>

        {/* Spec Grid */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase block">Tipo</span>
            <span className="text-[13px] font-semibold text-slate-800">{selectedTitle.tipo}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase block">Etapa</span>
            <span className="text-[13px] font-semibold text-slate-800">{selectedTitle.etapa}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase block">Vigencia Hasta</span>
            <span className="text-[13px] font-semibold text-slate-800">{selectedTitle.vigencia}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase block">Extensión</span>
            <span className="text-[13px] font-semibold text-slate-800">{selectedTitle.extension}</span>
          </div>
        </div>

        {/* Coordinates */}
        <div className="flex items-center gap-2 text-[12px] text-slate-500 font-medium pt-1">
          <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
          <span>Lat: {selectedTitle.coordinates.lat}, Lng: {selectedTitle.coordinates.lng}</span>
        </div>
      </div>


    </div>
  );
};
