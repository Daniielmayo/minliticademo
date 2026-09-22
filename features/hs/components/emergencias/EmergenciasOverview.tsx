'use client';

import React, { useState, useMemo } from 'react';
import { SubmoduleHeader } from '../common/SubmoduleHeader';
import { TabsContainer, TabItem } from '../common/TabsContainer';
import { EvidenciaBadge } from '../common/EvidenciaBadge';
import { EvidenciaModal } from '../common/EvidenciaModal';
import {
  mockPlanesEmergencia,
  mockBrigadas,
  mockSimulacros,
  mockEquiposEmergencia,
} from '../../constants/mockHsData';
import { Evidencia } from '../../types';

import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import {
  PlanEmergenciaItem,
  BrigadaItem,
  SimulacroItem,
  EquipoEmergenciaItem,
} from '../../types';

const planHelper = createColumnHelper<PlanEmergenciaItem>();
const brigadaHelper = createColumnHelper<BrigadaItem>();
const simulacroHelper = createColumnHelper<SimulacroItem>();
const equipoHelper = createColumnHelper<EquipoEmergenciaItem>();

export const EmergenciasOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('plan');
  const [selectedEvidencia, setSelectedEvidencia] = useState<Evidencia | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs: TabItem[] = [
    { id: 'plan', label: 'Planes de Emergencia', icon: 'menu_book', badgeCount: mockPlanesEmergencia.length },
    { id: 'brigadas', label: 'Brigadas de Rescate', icon: 'groups_3', badgeCount: mockBrigadas.length },
    { id: 'simulacros', label: 'Simulacros Ejecutados', icon: 'timer', badgeCount: mockSimulacros.length },
    { id: 'rutas-equipos', label: 'Equipos e Inspecciones', icon: 'e911_emergency', badgeCount: mockEquiposEmergencia.length },
  ];

  // Block KPIs calculations
  const totalBrigadistas = useMemo(() => {
    return mockBrigadas.reduce((sum, b) => sum + b.numero_brigadistas, 0);
  }, []);

  const tiempoPromedioEvacuacion = useMemo(() => {
    if (!mockSimulacros.length) return 0;
    const total = mockSimulacros.reduce((sum, s) => sum + s.tiempo_evacuacion_minutos, 0);
    return (total / mockSimulacros.length).toFixed(1);
  }, []);

  const porcentajeEquiposOperativos = useMemo(() => {
    if (!mockEquiposEmergencia.length) return 0;
    const ops = mockEquiposEmergencia.filter((e) => e.operativo).length;
    return Math.round((ops / mockEquiposEmergencia.length) * 100);
  }, []);

  const handleOpenModal = (ev?: Evidencia) => {
    setSelectedEvidencia(ev);
    setIsModalOpen(true);
  };

  const planColumns = useMemo<ColumnDef<PlanEmergenciaItem, any>[]>(() => [
    planHelper.accessor('tipo', {
      header: 'Tipo de Plan',
      cell: (info) => <span className="font-semibold text-on-surface capitalize">Plan de {info.getValue()}</span>,
    }),
    planHelper.accessor('fecha_actualizacion', {
      header: 'Fecha Última Actualización',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    planHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Evidencia Documento</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.documento_evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  const brigadaColumns = useMemo<ColumnDef<BrigadaItem, any>[]>(() => [
    brigadaHelper.accessor('conformada', {
      header: () => <div className="text-center w-full">Estado Conformación</div>,
      cell: () => (
        <div className="text-center whitespace-nowrap">
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Conformada y Activa
          </span>
        </div>
      ),
    }),
    brigadaHelper.accessor('fecha_conformacion', {
      header: 'Fecha Conformación',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    brigadaHelper.accessor('numero_brigadistas', {
      header: () => <div className="text-center w-full">N° Brigadistas</div>,
      cell: (info) => (
        <div className="text-center font-bold text-primary whitespace-nowrap">
          {info.getValue()} integrantes
        </div>
      ),
    }),
    brigadaHelper.display({
      id: 'responsable',
      header: 'Responsable / Líder',
      cell: (info) => <span className="font-medium whitespace-nowrap">{info.row.original.responsable.nombre}</span>,
    }),
    brigadaHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Acta de Conformación</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.acta_evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  const simulacroColumns = useMemo<ColumnDef<SimulacroItem, any>[]>(() => [
    simulacroHelper.accessor('tipo', {
      header: 'Tipo de Simulacro',
      cell: (info) => <span className="font-semibold text-on-surface">{info.getValue()}</span>,
    }),
    simulacroHelper.accessor('fecha', {
      header: 'Fecha',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    simulacroHelper.accessor('tiempo_evacuacion_minutos', {
      header: () => <div className="text-center w-full">Tiempo Evacuación</div>,
      cell: (info) => (
        <div className="text-center font-mono font-bold text-secondary whitespace-nowrap">
          {info.getValue()} min
        </div>
      ),
    }),
    simulacroHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Evidencia e Informe</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  const equipoColumns = useMemo<ColumnDef<EquipoEmergenciaItem, any>[]>(() => [
    equipoHelper.accessor('tipo', {
      header: 'Equipo de Emergencia',
      cell: (info) => <span className="font-semibold text-on-surface">{info.getValue()}</span>,
    }),
    equipoHelper.accessor('operativo', {
      header: () => <div className="text-center w-full">Estado Operativo</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
            info.getValue()
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : 'bg-rose-100 text-rose-800 border-rose-200'
          }`}>
            {info.getValue() ? '100% Operativo' : 'Inoperativo'}
          </span>
        </div>
      ),
    }),
    equipoHelper.accessor('fecha_ultima_inspeccion', {
      header: 'Última Inspección',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    equipoHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Evidencia Inspección</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  return (
    <div className="flex flex-col gap-lg animate-in fade-in duration-300 max-w-[1400px] mx-auto w-full pb-xl">
      <SubmoduleHeader
        title="Prevención y Respuesta ante Emergencias"
        subtitle="Control de planes de evacuación en mina subterránea, conformación de brigadas de salvamento minero, registros de simulacros y equipos de primeros auxilios."
        icon="e911_emergency"
        miniKpiLabel="Operatividad de Equipos"
        miniKpiValue={`${porcentajeEquiposOperativos}%`}
      />

      {/* ── Block KPIs Bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-md">
        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
            Brigada Conformada
          </span>
          <span className="font-headline-sm text-headline-sm font-extrabold text-emerald-700 my-xs">
            100% Activa
          </span>
          <span className="text-[11px] text-on-surface-variant">{totalBrigadistas} brigadistas certificados</span>
        </div>

        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
            Equipos Operativos
          </span>
          <span className="font-headline-sm text-headline-sm font-extrabold text-primary my-xs">
            {porcentajeEquiposOperativos}%
          </span>
          <span className="text-[11px] text-on-surface-variant">Extintores, camillas, autorescatadores</span>
        </div>

        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
            Tiempo Promedio Evacuación
          </span>
          <span className="font-headline-sm text-headline-sm font-extrabold text-secondary my-xs">
            {tiempoPromedioEvacuacion} min
          </span>
          <span className="text-[11px] text-on-surface-variant">Frente interior a superficie</span>
        </div>

        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
            Simulacros 2026
          </span>
          <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface my-xs">
            {mockSimulacros.length} / 2 Planeados
          </span>
          <span className="text-[11px] text-emerald-600 font-medium">100% de cumplimiento</span>
        </div>
      </div>

      <TabsContainer tabs={tabs} activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* ── TAB 1: PLANES DE EMERGENCIA ── */}
      {activeTab === 'plan' && (
        <div className="flex flex-col gap-md">
          <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Planes de Prevención, Preparación y Respuesta
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Documentos estratégicos de respuesta ante contingencias y desastres.
            </p>
          </div>

          <DataTable data={mockPlanesEmergencia} columns={planColumns} showPagination={true} />
        </div>
      )}

      {/* ── TAB 2: BRIGADAS ── */}
      {activeTab === 'brigadas' && (
        <div className="flex flex-col gap-md">
          <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Conformación de Brigadas de Salvamento
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Actas de constitución, integrantes capacitados y líder de brigada.
            </p>
          </div>

          <DataTable data={mockBrigadas} columns={brigadaColumns} showPagination={true} />
        </div>
      )}

      {/* ── TAB 3: SIMULACROS ── */}
      {activeTab === 'simulacros' && (
        <div className="flex flex-col gap-md">
          <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Ejecución de Simulacros
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Evaluación de tiempos de respuesta e informes de lecciones aprendidas.
            </p>
          </div>

          <DataTable data={mockSimulacros} columns={simulacroColumns} showPagination={true} />
        </div>
      )}

      {/* ── TAB 4: EQUIPOS E INSPECCIONES ── */}
      {activeTab === 'rutas-equipos' && (
        <div className="flex flex-col gap-md">
          <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Inspección de Equipos de Emergencia
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Estado operativo de extintores, autorescatadores, camillas y botiquines.
            </p>
          </div>

          <DataTable data={mockEquiposEmergencia} columns={equipoColumns} showPagination={true} />
        </div>
      )}

      <EvidenciaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        evidencia={selectedEvidencia}
      />
    </div>
  );
};
