import React from 'react';

export const DocumentLinksCard = () => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md">
      <h3 className="font-bold text-headline-sm text-on-surface mb-xs">Documentos de Referencia</h3>
      <p className="font-body-sm text-on-surface-variant mb-lg">
        Documentación principal de cupos de explosivos.
      </p>

      <div className="flex items-center p-md bg-secondary/5 border border-secondary/20 rounded-xl hover:bg-secondary/10 transition-colors cursor-pointer group">
        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mr-md group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-[24px]">description</span>
        </div>
        <div className="flex-1">
          <h4 className="font-label-lg font-bold text-on-surface">Entrega de cupo de explosivos</h4>
          <p className="font-body-sm text-on-surface-variant">Ver documento oficial PDF</p>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">
          open_in_new
        </span>
      </div>
    </div>
  );
};
