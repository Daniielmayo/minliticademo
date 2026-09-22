import React from 'react';

export const GeneralHeader = () => {
  return (
    <header className="flex flex-col gap-xs">
      <h2 className="font-headline-lg text-headline-lg text-on-surface">Control de Producción</h2>
      <p className="font-body-md text-on-surface-variant">
        Monitoreo de extracción y métricas operativas
      </p>
    </header>
  );
};
