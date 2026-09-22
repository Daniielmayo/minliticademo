import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Bar,
  Line,
  LabelList
} from 'recharts';
import { comparativeMetrics } from '../../constants';
import { COLOR_PALETTE } from '@/shared/constants/colors';

interface Props {
  selectedTitles?: string[];
  selectedMines?: string[];
}

export const ProductionIndicators: React.FC<Props> = ({ selectedTitles = [], selectedMines = [] }) => {
  const filteredComparativeMetrics = useMemo(() => {
    return comparativeMetrics.filter(metric => {
      const matchTitle = selectedTitles.length === 0 || (metric.titulos && metric.titulos.some(t => selectedTitles.includes(t)));
      const matchMine = selectedMines.length === 0 || (metric.minas && metric.minas.some(m => selectedMines.includes(m)));
      return matchTitle && matchMine;
    });
  }, [selectedTitles, selectedMines]);

  return (
    <section className="space-y-lg border-t border-slate-200 pt-lg">
      <h2 className="text-[20px] font-bold text-brand-primary tracking-tight">Visualización de Indicadores de Producción</h2>
      <div className="space-y-lg">
        {/* Main Chart: Tonelaje / Ley Comparativo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md flex flex-col justify-between lg:col-span-2">
            <h3 className="font-bold text-[18px] text-brand-primary mb-md tracking-tight">
              Tonelaje / Ley Comparativo por Año 2020 - 2022
            </h3>
            <div className="h-96 w-full mt-sm">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={filteredComparativeMetrics} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5eeff" vertical={false} />
                  <XAxis dataKey="year" stroke="#76767f" tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }} />
                  <YAxis yAxisId="left" stroke="#76767f" tick={{ fill: '#475569', fontSize: 12 }} domain={[0, 80000]} tickCount={9} />
                  <YAxis yAxisId="right" orientation="right" stroke="#dc2626" tick={{ fill: '#dc2626', fontSize: 12, fontWeight: 600 }} domain={[0, 90]} tickCount={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: COLOR_PALETTE.white, border: '1px solid #cbd5e1', borderRadius: '12px', color: '#0f172a', boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                  />
                  <Legend wrapperStyle={{ color: '#334155', paddingTop: '16px', fontWeight: 600 }} />
                  <Bar yAxisId="left" name="Gramos Au" dataKey="gramosAu" fill={COLOR_PALETTE.secondary} barSize={70} radius={[6, 6, 0, 0]}>
                    <LabelList dataKey="gramosAu" position="top" fill="#1e293b" fontSize={12} fontWeight={700} formatter={(val: any) => Number(val).toLocaleString('es-CO')} />
                  </Bar>
                  <Bar yAxisId="left" name="Ton" dataKey="ton" fill={COLOR_PALETTE.secondaryLight} barSize={70} radius={[6, 6, 0, 0]}>
                    <LabelList dataKey="ton" position="top" fill="#1e293b" fontSize={12} fontWeight={700} formatter={(val: any) => Number(val).toLocaleString('es-CO')} />
                  </Bar>
                  {/* Tenor Ponderado Line & Label - High Contrast Red (#dc2626) */}
                  <Line yAxisId="right" name="Tenor Ponderado" type="linear" dataKey="tenorPonderado" stroke="#dc2626" strokeWidth={3.5} dot={{ r: 6, fill: '#dc2626', stroke: '#ffffff', strokeWidth: 2 }}>
                    <LabelList dataKey="tenorPonderado" position="right" fill="#dc2626" fontSize={13} fontWeight={700} formatter={(val: any) => Number(val).toLocaleString('es-CO')} />
                  </Line>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
