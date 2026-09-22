'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  mockDashboardKPIs,
  mockCategoriasCumplimiento,
  mockBloquesGestion,
} from '../../constants/mockHsData';

import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { CategoriaCumplimiento } from '../../types';

const columnHelper = createColumnHelper<CategoriaCumplimiento>();

export const HsDashboardOverview: React.FC = () => {
  const [selectedMina, setSelectedMina] = useState<string>('todas');
  const [selectedTitulo, setSelectedTitulo] = useState<string>('todos');

  // Calculated overall weighted compliance percentage
  const totalWeightedCompliance = useMemo(() => {
    return mockCategoriasCumplimiento.reduce(
      (sum, item) => sum + item.peso * item.porcentaje_cumplimiento,
      0
    );
  }, []);

  const columns = useMemo<ColumnDef<CategoriaCumplimiento, any>[]>(() => [
    columnHelper.accessor('categoria', {
      header: 'Categoría',
      cell: (info) => <span className="font-semibold text-on-surface whitespace-nowrap">{info.getValue()}</span>,
    }),
    columnHelper.accessor('peso', {
      header: () => <div className="text-center w-full">Peso (%)</div>,
      cell: (info) => (
        <div className="text-center font-mono font-medium text-on-surface-variant whitespace-nowrap">
          {(info.getValue() * 100).toFixed(0)}%
        </div>
      ),
    }),
    columnHelper.accessor('porcentaje_cumplimiento', {
      header: () => <div className="text-center w-full">% Cumplimiento</div>,
      cell: (info) => (
        <div className="text-center font-bold text-primary whitespace-nowrap">
          {info.getValue().toFixed(1)}%
        </div>
      ),
    }),
    columnHelper.display({
      id: 'aporte',
      header: () => <div className="text-center w-full">Aporte Ponderado</div>,
      cell: (info) => {
        const cat = info.row.original;
        const aporte = (cat.peso * cat.porcentaje_cumplimiento).toFixed(2);
        return (
          <div className="text-center font-mono font-bold text-secondary whitespace-nowrap">
            +{aporte}%
          </div>
        );
      },
    }),
    columnHelper.accessor('porcentaje_cumplimiento', {
      id: 'progreso',
      header: 'Progreso Visual',
      cell: (info) => (
        <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden flex min-w-[120px]">
          <div
            className="bg-secondary h-full rounded-full transition-all duration-500"
            style={{ width: `${info.getValue()}%` }}
          />
        </div>
      ),
    }),
  ], []);

  return (
    <div className="flex flex-col gap-lg animate-in fade-in duration-300 max-w-[1400px] mx-auto w-full pb-xl">
      {/* ── Header & Global Filters ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-md bg-[#F3F6FA] border rounded-2xl p-lg shadow-sm">
        <div className="flex flex-col gap-xs">
          <div className="flex items-center gap-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary text-white">
              Módulo HS
            </span>
            <span className="text-[11px] font-semibold text-on-surface-variant">
              Seguridad y Salud en el Trabajo · Decreto 1886
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
            Tablero General de Cumplimiento HS
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Seguimiento de cumplimiento ponderado, control operativo, accidentalidad y gestión de riesgos mineros.
          </p>
        </div>

        {/* Global Filters */}
        <div className="flex flex-wrap items-center gap-sm bg-white border rounded-xl p-sm shadow-xs">
          <div className="flex items-center gap-2 px-2">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              filter_alt
            </span>
            <span className="font-label-md text-xs font-semibold text-on-surface">Filtros:</span>
          </div>
          <select
            value={selectedMina}
            onChange={(e) => setSelectedMina(e.target.value)}
            className="px-3 py-2 border rounded-lg text-xs font-body-sm bg-[#F3F6FA] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="todas">Todas las Minas</option>
            <option value="esmeralda">Mina La Esmeralda</option>
            <option value="roble">Mina El Roble</option>
          </select>

          <select
            value={selectedTitulo}
            onChange={(e) => setSelectedTitulo(e.target.value)}
            className="px-3 py-2 border rounded-lg text-xs font-body-sm bg-[#F3F6FA] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="todos">Todos los Títulos</option>
            <option value="1886-X">Placa 1886-X</option>
            <option value="2045-A">Placa 2045-A</option>
          </select>
        </div>
      </div>

      {/* ── Nivel 1: 9 Main KPI Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-md">
        {/* KPI 1: % Cumplimiento SST (Featured) */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 bg-[#101939] text-white border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[11px] font-bold uppercase tracking-wider text-slate-300">
              % Cumplimiento SST
            </span>
            <span className="material-symbols-outlined text-details text-[22px]">verified</span>
          </div>
          <div className="my-xs">
            <span className="font-headline-lg text-[34px] font-extrabold tracking-tight text-white">
              {totalWeightedCompliance.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>Calculado según matriz de 9 pesos</span>
          </div>
        </div>

        {/* KPI 2: Títulos Activos */}
        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Títulos Activos
          </span>
          <span className="font-headline-md text-[26px] font-bold text-on-surface my-xs">
            {mockDashboardKPIs.titulosActivos}
          </span>
          <span className="text-[11px] text-on-surface-variant">Mapeados al sistema</span>
        </div>

        {/* KPI 3: Operadores */}
        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Operadores
          </span>
          <span className="font-headline-md text-[26px] font-bold text-on-surface my-xs">
            {mockDashboardKPIs.operadores}
          </span>
          <span className="text-[11px] text-on-surface-variant">Personal directo mina</span>
        </div>

        {/* KPI 4: Subcontratos */}
        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Subcontratos
          </span>
          <span className="font-headline-md text-[26px] font-bold text-on-surface my-xs">
            {mockDashboardKPIs.subcontratos}
          </span>
          <span className="text-[11px] text-on-surface-variant">Empresas vinculadas</span>
        </div>

        {/* KPI 5: Trabajadores Totales */}
        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Trabajadores
          </span>
          <span className="font-headline-md text-[26px] font-bold text-on-surface my-xs">
            {mockDashboardKPIs.trabajadores}
          </span>
          <span className="text-[11px] text-on-surface-variant">Censo de personal activo</span>
        </div>

        {/* KPI 6: Hallazgos Críticos */}
        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Hallazgos Críticos
          </span>
          <span className="font-headline-md text-[26px] font-bold text-rose-700 my-xs">
            {mockDashboardKPIs.hallazgosCriticos}
          </span>
          <span className="text-[11px] text-rose-600 font-medium">Atención prioritaria</span>
        </div>

        {/* KPI 7: Hallazgos Vencidos */}
        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Hallazgos Vencidos
          </span>
          <span className="font-headline-md text-[26px] font-bold text-amber-700 my-xs">
            {mockDashboardKPIs.hallazgosVencidos}
          </span>
          <span className="text-[11px] text-amber-600 font-medium">Fuera de plazo</span>
        </div>

        {/* KPI 8: Accidentes 12m */}
        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Accidentes (12m)
          </span>
          <span className="font-headline-md text-[26px] font-bold text-on-surface my-xs">
            {mockDashboardKPIs.accidentesUltimos12Meses}
          </span>
          <span className="text-[11px] text-on-surface-variant">Eventos registrados</span>
        </div>

        {/* KPI 9: % Acciones Cerradas */}
        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            % Acciones Cerradas
          </span>
          <span className="font-headline-md text-[26px] font-bold text-emerald-700 my-xs">
            {mockDashboardKPIs.porcentajeAccionesCerradas}%
          </span>
          <span className="text-[11px] text-emerald-600 font-medium">Efectividad de cierre</span>
        </div>
      </div>

      {/* ── Nivel 1: Tabla de Cumplimiento Ponderado por Categoría ── */}
      <div className="flex flex-col gap-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-sm bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
          <div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Cumplimiento Ponderado por Categoría
            </h2>
            <p className="font-body-sm text-on-surface-variant">
              Distribución de los pesos fijos del sistema y su ponderación hacia el % total SST ({totalWeightedCompliance.toFixed(1)}%). Total Ponderado SST: <strong>{totalWeightedCompliance.toFixed(2)}%</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border shadow-xs text-xs font-semibold text-primary">
            <span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
            <span>Pesos Normativos Fijos</span>
          </div>
        </div>

        <DataTable data={mockCategoriasCumplimiento} columns={columns} showPagination={true} />
      </div>

      {/* ── Nivel 2: Grid de 7 Tarjetas de Gestión de HS ── */}
      <div className="flex flex-col gap-md pt-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
              Nivel 2 · Módulos Funcionales
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Gestión de HS (7 Bloques Operativos)
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant">
            Haz clic en una tarjeta para acceder a la gestión detallada (Nivel 3).
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
          {mockBloquesGestion.map((bloque) => (
            <Link
              key={bloque.id}
              href={`/dashboard/hs/${bloque.slug}`}
              className="group bg-[#F3F6FA] border rounded-2xl p-md shadow-sm hover:shadow-md hover:border-secondary/50 transition-all duration-200 flex flex-col justify-between gap-md cursor-pointer"
            >
              <div className="flex flex-col gap-xs">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center group-hover:bg-secondary transition-colors shadow-xs">
                    <span className="material-symbols-outlined text-[22px]">{bloque.icono}</span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all">
                    arrow_forward
                  </span>
                </div>
                <h3 className="font-headline-sm text-[17px] font-bold text-on-surface group-hover:text-secondary transition-colors mt-xs">
                  {bloque.nombre}
                </h3>
                <p className="font-body-sm text-[13px] text-on-surface-variant line-clamp-2 leading-relaxed">
                  {bloque.descripcion}
                </p>
              </div>

              {/* Mini-KPI Container with Progress Bar */}
              <div className="bg-white border rounded-xl p-sm flex flex-col gap-2 shadow-xs w-full">
                <div className="flex flex-wrap items-center justify-between gap-1 w-full min-w-0">
                  <span className="font-label-md text-[11px] font-medium text-on-surface-variant leading-tight break-words">
                    {bloque.miniKpiLabel}:
                  </span>
                  <span className="font-label-md text-[12px] font-bold text-primary shrink-0">
                    {bloque.miniKpiValue}
                  </span>
                </div>

                {/* Progress Bar (Lo que está vs Lo que falta) */}
                <div className="flex flex-col gap-1 w-full pt-0.5">
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        bloque.porcentajeCumplimiento >= 90
                          ? 'bg-emerald-500'
                          : bloque.porcentajeCumplimiento >= 75
                          ? 'bg-secondary'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${bloque.porcentajeCumplimiento}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-on-surface-variant">
                    <span className="text-emerald-700 font-bold">
                      {bloque.porcentajeCumplimiento}% completado
                    </span>
                    <span className="text-slate-500">
                      Falta {(100 - bloque.porcentajeCumplimiento).toFixed(1).replace('.0', '')}%
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
