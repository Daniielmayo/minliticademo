import React, { useMemo } from 'react';
import { DataTable } from '@/shared/ui/Table';
import { machineryMetrics } from '../../constants';
import { machineryColumns } from './columns';

interface Props {
  selectedTitles?: string[];
  selectedMines?: string[];
}

export const MachineryMetricsTable: React.FC<Props> = ({ selectedTitles = [], selectedMines = [] }) => {
  const filteredMachinery = useMemo(() => {
    return machineryMetrics.filter(item => {
      const matchTitle = selectedTitles.length === 0 || selectedTitles.includes(item.titulo);
      const matchMine = selectedMines.length === 0 || selectedMines.includes(item.mina);
      return matchTitle && matchMine;
    });
  }, [selectedTitles, selectedMines]);

  return (
    <section className="space-y-lg border-t border-card-border pt-lg">
      <h2 className="font-headline-md font-bold text-on-surface">Métricas de producción (maquinaria, HHs)</h2>
      <div className="flex flex-col gap-lg">
        {/* Machinery */}
        <div className="bg-card-surface border border-card-border rounded-2xl p-lg shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-headline-sm text-on-surface mb-md">Métricas de Maquinaria</h3>
          <div className="overflow-x-auto">
            <DataTable data={filteredMachinery} columns={machineryColumns} />
          </div>
        </div>
      </div>
    </section>
  );
};
