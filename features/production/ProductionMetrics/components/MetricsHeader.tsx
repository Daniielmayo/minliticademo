import React from 'react';
import { Button } from '@/shared/ui/Button';

export const MetricsHeader = () => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-md">
      <div className="flex flex-col gap-sm">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Métricas de Producción</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Análisis analítico del rendimiento de extracción mensual y cumplimiento de metas.
        </p>
      </div>
      <div className="flex gap-md">
        <Button variant="outline" className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Exportar (FRI - ANM)
        </Button>
        <Button variant="secondary" className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Ingreso de Datos
        </Button>
      </div>
    </header>
  );
};
