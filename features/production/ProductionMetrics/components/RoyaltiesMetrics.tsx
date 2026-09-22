import React, { useState, useMemo } from 'react';
import { Input } from '@/shared/ui/Input';
import { DataTable } from '@/shared/ui/Table';
import { royaltyRecords } from '../../constants';
import { royaltyColumns } from './columns';

interface Props {
  selectedTitles?: string[];
  selectedMines?: string[];
}

export const RoyaltiesMetrics: React.FC<Props> = ({ selectedTitles = [], selectedMines = [] }) => {
  const filteredRoyalties = useMemo(() => {
    return royaltyRecords.filter((item) => {
      const matchTitle = selectedTitles.length === 0 || selectedTitles.includes(item.titulo);
      const matchMine = selectedMines.length === 0 || selectedMines.includes(item.mina);
      return matchTitle && matchMine;
    });
  }, [selectedTitles, selectedMines]);

  const totalFilteredAmount = useMemo(() => {
    return filteredRoyalties.reduce((sum, curr) => sum + curr.monto, 0);
  }, [filteredRoyalties]);

  return (
    <section className="space-y-lg border-t border-card-border pt-lg">
      <h2 className="font-headline-md font-bold text-on-surface">Regalías (registros de regalías pagadas por titulo minero en producción)</h2>
      <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-md mb-lg">
          <div className="flex flex-col gap-sm">
            <h3 className="font-bold text-headline-sm text-on-surface mb-10">Registro de Regalías Pagadas</h3>
          </div>

          <div className="flex flex-col lg:items-end px-md mt-sm lg:mt-0">
            <span className="font-label-md text-on-surface-variant uppercase tracking-wider">Monto Total</span>
            <span className="font-bold text-primary text-2xl">
              ${totalFilteredAmount.toLocaleString('es-CO')} <span className="text-sm font-normal text-on-surface-variant">COP</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <DataTable data={filteredRoyalties} columns={royaltyColumns} showPagination={true} />
        </div>
      </div>
    </section>
  );
};
