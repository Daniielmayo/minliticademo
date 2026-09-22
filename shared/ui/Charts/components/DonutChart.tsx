"use client"

import React from 'react';
import { DonutChartProps } from '../types';
import {
  Label,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"

export const DonutChart = ({ title, percentage, label, legend }: DonutChartProps) => {
  // Map legend into chart data for PieChart segments
  const chartData = legend ? legend.map(item => ({
    name: item.label,
    value: item.count || 0,
    fill: item.colorClass === 'bg-secondary' ? 'var(--color-secondary)' : 
          item.colorClass === 'bg-error' ? 'var(--color-error)' : 
          `var(--color-${item.colorClass.replace('bg-', '')})`
  })) : [
    { name: 'Cumplidos', value: percentage, fill: 'var(--color-secondary)' },
    { name: 'Atrasados', value: 100 - percentage, fill: 'var(--color-error)' }
  ];

  const chartConfig = {
    value: {
      label: "Cantidad",
    },
    ...chartData.reduce((acc, item) => ({
      ...acc,
      [item.name]: {
        label: item.name,
        color: item.fill,
      }
    }), {})
  } satisfies ChartConfig;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-md flex flex-col items-center justify-between text-center h-full w-full min-h-[350px]">
      <h3 className="font-bold text-2xl tracking-tight text-on-surface mb-4 w-full text-left leading-tight">
        {title}
      </h3>

      <div className="w-full h-48 flex items-center justify-center relative my-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full h-full max-h-[200px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={90}
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-secondary text-4xl font-bold font-headline-lg"
                        >
                          {percentage}%
                        </tspan>
                        {label && (
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-on-surface-variant text-[10px] font-bold tracking-wider uppercase"
                          >
                            {label}
                          </tspan>
                        )}
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {legend && legend.length > 0 && (
        <div className="flex gap-x-6 gap-y-2 flex-wrap justify-center mt-4 w-full border-t border-card-border/30 pt-4">
          {legend.map((item, index) => (
            <div key={index} className="flex items-center gap-sm">
              <div className={`w-3.5 h-3.5 rounded-full ${item.colorClass}`}></div>
              <span className="font-bold text-sm text-on-surface flex flex-col text-left leading-tight">
                <span>{item.label}</span>
                <span className="text-on-surface-variant font-medium text-xs">({item.count})</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
