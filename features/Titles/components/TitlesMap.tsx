import React from 'react';
import dynamic from 'next/dynamic';
import { TitleData } from '../types';

// Dynamic import for Leaflet map to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500 font-medium text-[13px]">Cargando mapa...</div>
});

interface TitlesMapProps {
  titles: TitleData[];
  selectedTitleId: string | null;
  onSelectTitle: (id: string | null) => void;
}

export const TitlesMap = (props: TitlesMapProps) => {
  return (
    <div className="relative w-full h-[420px] overflow-hidden border border-slate-200/90 bg-white rounded-2xl shadow-md">
      <MapComponent {...props} />
      
      {/* Map Legend Badge */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-sm z-1000">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
          <div className="w-2.5 h-2.5 bg-secondary rounded-full"></div>
          TÍTULOS EN MAPA ({props.titles.length})
        </div>
      </div>
    </div>
  );
};
