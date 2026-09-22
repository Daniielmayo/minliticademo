'use client';

import React, { useState, useMemo } from 'react';
import { SubmoduleHeader } from '../common/SubmoduleHeader';
import { TabsContainer, TabItem } from '../common/TabsContainer';
import { EvidenciaBadge } from '../common/EvidenciaBadge';
import { EvidenciaModal } from '../common/EvidenciaModal';
import {
  mockEventosAccidentalidad,
  mockInvestigaciones,
  mockAccionesCorrectivas,
  mockHorasHombre,
  mockIndicadoresAccidentalidad,
} from '../../constants/mockHsData';
import { Evidencia } from '../../types';

import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import {
  EventoAccidentalidadItem,
  InvestigacionItem,
  AccionCorrectivaItem,
  HorasHombreItem,
} from '../../types';

const eventoHelper = createColumnHelper<EventoAccidentalidadItem>();
const investigacionHelper = createColumnHelper<InvestigacionItem>();
const accionHelper = createColumnHelper<AccionCorrectivaItem>();
const horasHombreHelper = createColumnHelper<HorasHombreItem>();

export const AccidentalidadOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('eventos');
  const [selectedEvidencia, setSelectedEvidencia] = useState<Evidencia | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs: TabItem[] = [
    { id: 'eventos', label: 'Registro de Eventos', icon: 'report_problem', badgeCount: mockEventosAccidentalidad.length },
    { id: 'investigaciones', label: 'Investigaciones', icon: 'find_in_page', badgeCount: mockInvestigaciones.length },
    { id: 'acciones', label: 'Acciones Correctivas', icon: 'check_box', badgeCount: mockAccionesCorrectivas.length },
    { id: 'indicadores', label: 'Indicadores IF / IS / HHT', icon: 'bar_chart', badgeCount: 4 },
  ];

  // Calculate total Horas Hombre Trabajadas (HHT)
  const totalHHT = useMemo(() => {
    return mockHorasHombre.reduce((sum, h) => sum + h.total_horas_hombre, 0);
  }, []);

  const handleOpenModal = (ev?: Evidencia) => {
    setSelectedEvidencia(ev);
    setIsModalOpen(true);
  };

  const eventosColumns = useMemo<ColumnDef<EventoAccidentalidadItem, any>[]>(() => [
    eventoHelper.accessor('tipo', {
      header: 'Tipo Evento',
      cell: (info) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize border whitespace-nowrap ${
          info.getValue() === 'incidente'
            ? 'bg-sky-100 text-sky-800 border-sky-200'
            : 'bg-rose-100 text-rose-800 border-rose-200'
        }`}>
          {info.getValue()}
        </span>
      ),
    }),
    eventoHelper.display({
      id: 'fecha_lugar',
      header: 'Fecha / Lugar',
      cell: (info) => {
        const evt = info.row.original;
        return (
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-mono text-xs">{evt.fecha}</span>
            <span className="text-[11px] text-on-surface-variant">{evt.lugar}</span>
          </div>
        );
      },
    }),
    eventoHelper.display({
      id: 'trabajador',
      header: 'Trabajador Afectado',
      cell: (info) => {
        const evt = info.row.original;
        return (
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-semibold text-on-surface">{evt.trabajador.nombreCompleto}</span>
            <span className="text-[11px] text-on-surface-variant">{evt.trabajador.cargo}</span>
          </div>
        );
      },
    }),
    eventoHelper.accessor('causa_inmediata', {
      header: 'Causa Inmediata',
      cell: (info) => (
        <span className="text-xs text-on-surface-variant max-w-xs block">{info.getValue()}</span>
      ),
    }),
    eventoHelper.accessor('fecha_limite', {
      header: 'Fecha Límite',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    eventoHelper.display({
      id: 'estado',
      header: () => <div className="text-center w-full">Estado</div>,
      cell: (info) => {
        const evt = info.row.original;
        const isVencido = evt.estado === 'abierto' && new Date(evt.fecha_limite) < new Date();
        const estadoFinal = isVencido ? 'vencido' : evt.estado;
        return (
          <div className="text-center whitespace-nowrap">
            <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border whitespace-nowrap ${
              estadoFinal === 'cerrado'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : estadoFinal === 'vencido'
                ? 'bg-rose-100 text-rose-800 border-rose-200'
                : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
              {estadoFinal}
            </span>
          </div>
        );
      },
    }),
    eventoHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Evidencia Soporte</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  const investigacionesColumns = useMemo<ColumnDef<InvestigacionItem, any>[]>(() => [
    investigacionHelper.accessor('evento_descripcion', {
      header: 'Descripción del Evento',
      cell: (info) => <span className="font-semibold text-on-surface">{info.getValue()}</span>,
    }),
    investigacionHelper.accessor('fecha_investigacion', {
      header: 'Fecha Investigación',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    investigacionHelper.display({
      id: 'informe_evidencia',
      header: () => <div className="text-center w-full">Informe Técnico Evidencia</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.informe_evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  const accionesColumns = useMemo<ColumnDef<AccionCorrectivaItem, any>[]>(() => [
    accionHelper.accessor('accion', {
      header: 'Acción Compromiso',
      cell: (info) => <span className="font-semibold text-on-surface">{info.getValue()}</span>,
    }),
    accionHelper.accessor('fecha_inicio', {
      header: 'Fecha Inicio',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    accionHelper.accessor('fecha_cierre', {
      header: 'Fecha Cierre',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue() || '-'}</span>,
    }),
    accionHelper.display({
      id: 'responsable',
      header: 'Responsable',
      cell: (info) => <span className="font-medium whitespace-nowrap">{info.row.original.responsable.nombre}</span>,
    }),
    accionHelper.accessor('estado', {
      header: () => <div className="text-center w-full">Estado</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border ${
            info.getValue() === 'cerrado'
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : 'bg-amber-100 text-amber-800 border-amber-200'
          }`}>
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    accionHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Evidencia Cumplimiento</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  const horasHombreColumns = useMemo<ColumnDef<HorasHombreItem, any>[]>(() => [
    horasHombreHelper.accessor('periodo', {
      header: 'Periodo (MM/YYYY)',
      cell: (info) => <span className="font-mono font-bold text-primary whitespace-nowrap">{info.getValue()}</span>,
    }),
    horasHombreHelper.accessor('titulo_placa', {
      header: 'Título Placa',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue() || '-'}</span>,
    }),
    horasHombreHelper.accessor('numero_trabajadores', {
      header: () => <div className="text-center w-full">N° Trabajadores</div>,
      cell: (info) => <div className="text-center font-semibold">{info.getValue()}</div>,
    }),
    horasHombreHelper.accessor('horas_turno', {
      header: () => <div className="text-center w-full">Horas Turno</div>,
      cell: (info) => <div className="text-center font-mono text-xs">{info.getValue()} hrs</div>,
    }),
    horasHombreHelper.accessor('turnos_dia', {
      header: () => <div className="text-center w-full">Turnos Día</div>,
      cell: (info) => <div className="text-center font-mono text-xs">{info.getValue()}</div>,
    }),
    horasHombreHelper.accessor('dias_periodo', {
      header: () => <div className="text-center w-full">Días Periodo</div>,
      cell: (info) => <div className="text-center font-mono text-xs">{info.getValue()} días</div>,
    }),
    horasHombreHelper.accessor('total_horas_hombre', {
      header: () => <div className="text-right w-full">Total HHT</div>,
      cell: (info) => (
        <div className="text-right font-mono font-bold text-secondary">
          {info.getValue().toLocaleString('es-CO')} HHT
        </div>
      ),
    }),
  ], []);

  return (
    <div className="flex flex-col gap-lg animate-in fade-in duration-300 max-w-[1400px] mx-auto w-full pb-xl">
      <SubmoduleHeader
        title="Accidentalidad e Indicadores de Siniestralidad"
        subtitle="Registro de accidentes e incidentes, investigaciones de causas raíz, plan de acciones correctivas y cálculo normativo de índices IF e IS."
        icon="report_problem"
        miniKpiLabel="Índice de Frecuencia (IF)"
        miniKpiValue={mockIndicadoresAccidentalidad.indice_frecuencia.toFixed(2)}
      />

      <TabsContainer tabs={tabs} activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* ── TAB 1: REGISTRO DE EVENTOS ── */}
      {activeTab === 'eventos' && (
        <div className="flex flex-col gap-md">
          <div className="flex items-center justify-between bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Registro de Accidentes e Incidentes
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                Control de eventos con marca automática de "vencido" según fecha límite.
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5 border-none cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Reportar Nuevo Evento</span>
            </button>
          </div>

          <DataTable data={mockEventosAccidentalidad} columns={eventosColumns} showPagination={true} />
        </div>
      )}

      {/* ── TAB 2: INVESTIGACIONES ── */}
      {activeTab === 'investigaciones' && (
        <div className="flex flex-col gap-md">
          <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Investigaciones de Accidentes (Informe de Causa Raíz)
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Informes técnicos de investigación y lecciones aprendidas.
            </p>
          </div>

          <DataTable data={mockInvestigaciones} columns={investigacionesColumns} showPagination={true} />
        </div>
      )}

      {/* ── TAB 3: ACCIONES CORRECTIVAS ── */}
      {activeTab === 'acciones' && (
        <div className="flex flex-col gap-md">
          <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Plan de Acciones Correctivas y Preventivas
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Seguimiento de compromisos de cierre y planes de acción.
            </p>
          </div>

          <DataTable data={mockAccionesCorrectivas} columns={accionesColumns} showPagination={true} />
        </div>
      )}

      {/* ── TAB 4: INDICADORES CALCULADOS ── */}
      {activeTab === 'indicadores' && (
        <div className="flex flex-col gap-lg">
          {/* Indicadores Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-md">
            <div className="bg-[#F3F6FA] border rounded-2xl p-lg shadow-sm flex flex-col justify-between">
              <span className="font-label-md text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Índice de Frecuencia (IF)
              </span>
              <div className="font-headline-lg text-[32px] font-extrabold text-secondary my-xs">
                {mockIndicadoresAccidentalidad.indice_frecuencia.toFixed(2)}
              </div>
              <span className="text-[11px] text-on-surface-variant">Accidentes incapacitantes por 240,000 HHT</span>
            </div>

            <div className="bg-[#F3F6FA] border rounded-2xl p-lg shadow-sm flex flex-col justify-between">
              <span className="font-label-md text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Índice de Severidad (IS)
              </span>
              <div className="font-headline-lg text-[32px] font-extrabold text-primary my-xs">
                {mockIndicadoresAccidentalidad.indice_severidad.toFixed(2)}
              </div>
              <span className="text-[11px] text-on-surface-variant">Días cargados/perdidos por 240,000 HHT</span>
            </div>

            <div className="bg-[#F3F6FA] border rounded-2xl p-lg shadow-sm flex flex-col justify-between">
              <span className="font-label-md text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Casos LTI (Incapacitantes)
              </span>
              <div className="font-headline-lg text-[32px] font-extrabold text-amber-700 my-xs">
                {mockIndicadoresAccidentalidad.lti_count}
              </div>
              <span className="text-[11px] text-on-surface-variant">Lost Time Injuries</span>
            </div>

            <div className="bg-[#F3F6FA] border rounded-2xl p-lg shadow-sm flex flex-col justify-between">
              <span className="font-label-md text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Fatalidades (Periodo)
              </span>
              <div className="font-headline-lg text-[32px] font-extrabold text-emerald-700 my-xs">
                {mockIndicadoresAccidentalidad.fatalidades_periodo}
              </div>
              <span className="text-[11px] text-emerald-600 font-bold">Cero fatalidades registradas</span>
            </div>
          </div>

          {/* Horas Hombre Table */}
          <div className="flex flex-col gap-md">
            <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Consolidado de Horas Hombre Trabajadas (HHT)
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                Cálculo automático: N° Trabajadores × Horas Turno × Turnos/Día × Días Periodo. Total acumulado: <strong>{totalHHT.toLocaleString('es-CO')} HHT</strong>.
              </p>
            </div>

            <DataTable data={mockHorasHombre} columns={horasHombreColumns} showPagination={true} />
          </div>
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
