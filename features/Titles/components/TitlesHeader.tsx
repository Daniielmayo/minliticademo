import React from 'react';
import { PageTitle } from '@/shared/ui/PageTitle';
import { Button } from '@/shared/ui/Button';

export const TitlesHeader: React.FC = () => {
  return (
    <PageTitle
      title="Títulos Mineros & Expedientes"
      subtitle="Monitoreo cartográfico de concesiones, vigencias y amparos administrativos"
      level={1}
      actions={
        <Button variant="secondary" className="flex items-center gap-1.5 text-[13px] font-semibold py-2.5 px-4 rounded-xl shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nuevo Expediente
        </Button>
      }
    />
  );
};
