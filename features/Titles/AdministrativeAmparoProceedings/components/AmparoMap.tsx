import React from 'react';
import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./AmparoMapClient'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-card-surface/70 text-secondary">Cargando mapa...</div>
});

export const AmparoMap = () => {
  return (
    <div className="w-full bg-card-surface border border-card-border rounded-2xl overflow-hidden shadow-sm relative h-[450px]">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-400 flex flex-col gap-2 pointer-events-none">
        <div className="bg-card-surface/90 backdrop-blur-md p-2 rounded-lg shadow-sm border border-card-border flex items-center gap-2 pointer-events-auto">
          <span className="material-symbols-outlined text-secondary text-md">map</span>
          <span className="text-label-md font-bold text-on-surface">Mapa de Concesiones Mineras</span>
        </div>
      </div>
      
      {/* Dynamic Leaflet Map */}
      <div className="absolute inset-0 z-0">
        <MapClient />
      </div>
    </div>
  );
};
