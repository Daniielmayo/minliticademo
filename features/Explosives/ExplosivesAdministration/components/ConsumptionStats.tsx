'use client';

import React, { useState } from 'react';
import {
  ComposedChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ConsumptionStat } from '@/features/Explosives/types';

interface ConsumptionStatsProps {
  data: ConsumptionStat[];
}

export const ConsumptionStats = ({ data }: ConsumptionStatsProps) => {
  const [accesoriosFilter, setAccesoriosFilter] = useState<'Todos' | 'Detonadores' | 'Mechas'>('Todos');

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-lg gap-sm">
        <div>
          <h3 className="font-bold text-headline-sm text-on-surface mb-xs">Estadísticas de Consumo</h3>
          <p className="font-body-sm text-on-surface-variant">
            Histórico de consumo mensual de explosivos y accesorios.
          </p>
        </div>
        <div className="flex gap-md bg-card-surface/70 p-md rounded-xl">
          <div className="flex flex-col">
            <span className="font-label-md text-on-surface-variant">Frecuencia Voladuras</span>
            <span className="font-bold text-headline-sm text-primary">3.2 <span className="text-sm font-normal">/ sem</span></span>
          </div>
          <div className="w-px bg-outline-variant mx-xs"></div>
          <div className="flex flex-col">
            <span className="font-label-md text-on-surface-variant">Consumo Promedio</span>
            <span className="font-bold text-headline-sm text-secondary">2.8k <span className="text-sm font-normal">kg/mes</span></span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 gap-xl w-full mt-lg">
        {/* Explosivos Chart */}
        <div className="flex flex-col min-h-64">
          <h4 className="font-label-lg text-on-surface mb-sm">Consumo de Explosivos (kg vs ton)</h4>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5f6368' }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5f6368' }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar yAxisId="left" dataKey="toneladasExtraidas" name="Piedra Arrancada (t)" fill="#10B981" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar yAxisId="left" dataKey="indugelKg" name="Indugel (kg)" stackId="explosivos" fill="#4B6BFB" barSize={24} />
              <Bar yAxisId="left" dataKey="anfoKg" name="Anfo (kg)" stackId="explosivos" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={24} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Accesorios Chart */}
        <div className="flex flex-col min-h-64">
          <div className="flex justify-between items-center mb-sm">
            <h4 className="font-label-lg text-on-surface">Consumo de Accesorios (uds/mts)</h4>
            <select
              value={accesoriosFilter}
              onChange={(e) => setAccesoriosFilter(e.target.value as 'Todos' | 'Detonadores' | 'Mechas')}
              className="px-sm py-xs border border-slate-200 rounded-lg font-body-sm text-on-surface bg-slate-50 focus:bg-white outline-none focus:border-primary transition-colors"
            >
              <option value="Todos">Todos</option>
              <option value="Detonadores">Detonadores</option>
              <option value="Mechas">Mechas</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5f6368' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5f6368' }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              {(accesoriosFilter === 'Todos' || accesoriosFilter === 'Detonadores') && (
                <Bar dataKey="detonadoresUds" name="Detonadores (uds)" stackId="accesorios" fill="#F2994A" barSize={32} />
              )}
              {(accesoriosFilter === 'Todos' || accesoriosFilter === 'Mechas') && (
                <Bar dataKey="mechasMts" name="Mechas (mts)" stackId="accesorios" fill="#FBBF24" radius={[4, 4, 0, 0]} barSize={32} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
