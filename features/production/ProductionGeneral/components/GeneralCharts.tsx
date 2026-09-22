import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { accumulatedMetrics, mineDistributions } from '../../constants';
import { COLOR_PALETTE } from '@/shared/constants/colors';

export const GeneralCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
      {/* Chart Left: Producción Acumulada vs Budget */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md flex flex-col lg:col-span-8 justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sm pb-md border-b border-slate-100">
          <div>
            <h3 className="font-bold text-[18px] text-brand-primary tracking-tight">Producción Acumulada vs Budget</h3>
            <p className="text-[13px] text-slate-500 font-medium">Comparativa mensual programada vs real</p>
          </div>

          {/* Legend Custom */}
          <div className="flex items-center gap-md text-[13px]">
            <div className="flex items-center gap-1.5 font-bold text-brand-primary">
              <span className="w-3.5 h-3.5 rounded-full bg-secondary"></span>
              <span>Real</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-slate-500">
              <span className="w-3.5 h-3.5 rounded-full bg-slate-300"></span>
              <span>Budget</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full mt-md">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accumulatedMetrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5eeff" />
              <XAxis dataKey="mes" stroke="#76767f" axisLine={false} tickLine={false} />
              <YAxis stroke="#76767f" axisLine={false} tickLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="real"
                stroke={COLOR_PALETTE.secondary}
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="budget"
                stroke="#b4b4be"
                strokeWidth={4}
                strokeDasharray="6 6"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* List Right: Producción por Mina (Secondary Enerlitica Color Background) */}
      <div className="bg-gradient-to-br from-secondary via-[#0070da] to-[#005fb8] text-white rounded-2xl p-lg shadow-lg shadow-secondary/25 border border-secondary/40 flex flex-col lg:col-span-4 justify-between relative overflow-hidden group">
        <div className="flex items-center justify-between pb-md border-b border-white/20 z-10">
          <div>
            <h3 className="font-bold text-[18px] text-white tracking-tight">Producción por Mina</h3>
            <p className="text-[13px] text-blue-100 font-medium">Distribución de onzas por frente</p>
          </div>
          <span className="px-2.5 py-1 bg-white/15 text-white text-[11px] font-bold rounded-full border border-white/25 backdrop-blur-md">
            4 Minas
          </span>
        </div>

        <div className="space-y-md mt-md flex-1 flex flex-col justify-center z-10">
          {mineDistributions.map((mine, index) => {
            const percentage = (mine.onzas / mine.maxVal) * 100;
            return (
              <div key={index} className="space-y-1.5 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
                <div className="flex justify-between text-[13px] font-bold">
                  <span className="text-white">{mine.name}</span>
                  <span className="text-details font-mono font-bold">
                    {mine.onzas.toLocaleString('en-US')} oz
                  </span>
                </div>
                <div className="w-full bg-black/25 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-details h-full rounded-full transition-all duration-500 shadow-xs"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/15 transition-all pointer-events-none" />
      </div>
    </div>
  );
};
