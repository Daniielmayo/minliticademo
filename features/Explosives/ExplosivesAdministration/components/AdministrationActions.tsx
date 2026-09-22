import React from 'react';
import { Button } from '@/shared/ui/Button';

export const AdministrationActions = () => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md flex flex-col gap-md">
      <div>
        <h3 className="font-bold text-headline-sm text-on-surface mb-xs">Acciones Administrativas</h3>
        <p className="font-body-sm text-on-surface-variant">
          Carga de evidencias y reportes.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-md mt-sm">
        {/* Primary CTA: Reporte de descargos */}
        <Button variant="primary" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Reporte de descargos
        </Button>

        {/* Secondary: Carga de evidencias — outline/lower weight */}
        <label className="cursor-pointer border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all font-bold text-sm px-8 py-3 rounded-[50px] flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[20px]">attach_file</span>
          Carga de evidencias
          <input type="file" className="hidden" multiple />
        </label>
      </div>
    </div>
  );
};
