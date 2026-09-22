'use client';

import React, { useState, useMemo } from 'react';
import { SubmoduleHeader } from '../common/SubmoduleHeader';
import { TabsContainer, TabItem } from '../common/TabsContainer';
import { EvidenciaBadge } from '../common/EvidenciaBadge';
import { EvidenciaModal } from '../common/EvidenciaModal';
import {
  mockPoliticasSST,
  mockCapacitaciones,
  mockInducciones,
  mockCopasst,
} from '../../constants/mockHsData';
import { Evidencia } from '../../types';

import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import {
  PoliticaSST,
  Capacitacion,
  InduccionReinduccion,
  Copasst,
} from '../../types';

const politicaHelper = createColumnHelper<PoliticaSST>();
const capacitacionHelper = createColumnHelper<Capacitacion>();
const induccionHelper = createColumnHelper<InduccionReinduccion>();
const copasstHelper = createColumnHelper<Copasst>();

export const SgSstOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('politica');
  const [selectedEvidencia, setSelectedEvidencia] = useState<Evidencia | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs: TabItem[] = [
    { id: 'politica', label: 'Política SST', icon: 'policy', badgeCount: mockPoliticasSST.length },
    { id: 'capacitaciones', label: 'Capacitaciones', icon: 'school', badgeCount: mockCapacitaciones.length },
    { id: 'induccion', label: 'Inducción y Reinducción', icon: 'badge', badgeCount: mockInducciones.length },
    { id: 'copasst', label: 'COPASST', icon: 'groups', badgeCount: mockCopasst.length },
  ];

  const handleOpenModal = (ev?: Evidencia) => {
    setSelectedEvidencia(ev);
    setIsModalOpen(true);
  };

  const politicaColumns = useMemo<ColumnDef<PoliticaSST, any>[]>(() => [
    politicaHelper.accessor('item', {
      header: 'Ítem Normativo',
      cell: (info) => <span className="font-semibold text-on-surface capitalize whitespace-nowrap">{info.getValue()}</span>,
    }),
    politicaHelper.accessor('existe', {
      header: () => <div className="text-center w-full">Existe</div>,
      cell: () => (
        <div className="text-center whitespace-nowrap">
          <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
        </div>
      ),
    }),
    politicaHelper.accessor('fecha_expedicion', {
      header: 'Fecha Expedición',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    politicaHelper.accessor('divulgada', {
      header: () => <div className="text-center w-full">Divulgada</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
            info.getValue() ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'
          }`}>
            {info.getValue() ? 'Sí' : 'No'}
          </span>
        </div>
      ),
    }),
    politicaHelper.accessor('fecha_divulgacion', {
      header: 'Fecha Divulgación',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue() || '-'}</span>,
    }),
    politicaHelper.accessor('firmada', {
      header: () => <div className="text-center w-full">Firmada</div>,
      cell: () => (
        <div className="text-center whitespace-nowrap">
          <span className="material-symbols-outlined text-emerald-600 text-[20px]">draw</span>
        </div>
      ),
    }),
    politicaHelper.display({
      id: 'responsable',
      header: 'Responsable',
      cell: (info) => <span className="font-medium whitespace-nowrap">{info.row.original.responsable.nombre}</span>,
    }),
    politicaHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Evidencia Soporte</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  const capacitacionColumns = useMemo<ColumnDef<Capacitacion, any>[]>(() => [
    capacitacionHelper.accessor('tema', {
      header: 'Tema',
      cell: (info) => <span className="font-semibold text-on-surface capitalize whitespace-nowrap">{info.getValue()}</span>,
    }),
    capacitacionHelper.accessor('fecha', {
      header: 'Fecha',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    capacitacionHelper.accessor('numero_asistentes', {
      header: () => <div className="text-center w-full">Asistentes</div>,
      cell: (info) => (
        <div className="text-center font-bold text-primary whitespace-nowrap">
          {info.getValue()} pers.
        </div>
      ),
    }),
    capacitacionHelper.accessor('horas', {
      header: () => <div className="text-center w-full">Horas</div>,
      cell: (info) => (
        <div className="text-center font-mono text-xs whitespace-nowrap">
          {info.getValue()} hrs
        </div>
      ),
    }),
    capacitacionHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Evidencia Soporte</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  const induccionColumns = useMemo<ColumnDef<InduccionReinduccion, any>[]>(() => [
    induccionHelper.display({
      id: 'trabajador_nombre',
      header: 'Trabajador',
      cell: (info) => <span className="font-semibold text-on-surface whitespace-nowrap">{info.row.original.trabajador.nombreCompleto}</span>,
    }),
    induccionHelper.display({
      id: 'trabajador_doc',
      header: 'Documento',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.row.original.trabajador.documento}</span>,
    }),
    induccionHelper.accessor('tipo', {
      header: () => <div className="text-center w-full">Tipo Evento</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
            info.getValue() === 'inducción'
              ? 'bg-sky-100 text-sky-800 border-sky-200'
              : 'bg-indigo-100 text-indigo-800 border-indigo-200'
          }`}>
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    induccionHelper.accessor('fecha', {
      header: 'Fecha',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    induccionHelper.accessor('periodicidad_reinduccion', {
      header: 'Periodicidad',
      cell: (info) => <span className="text-xs font-medium whitespace-nowrap">{info.getValue()}</span>,
    }),
    induccionHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Evidencia Soporte</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  const copasstColumns = useMemo<ColumnDef<Copasst, any>[]>(() => [
    copasstHelper.accessor('miembro_nombre', {
      header: 'Nombre Miembro',
      cell: (info) => <span className="font-semibold text-on-surface whitespace-nowrap">{info.getValue()}</span>,
    }),
    copasstHelper.accessor('rol', {
      header: 'Rol en Comité',
      cell: (info) => <span className="text-xs font-medium capitalize whitespace-nowrap">{info.getValue()}</span>,
    }),
    copasstHelper.accessor('fecha_eleccion', {
      header: 'Fecha Elección',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    copasstHelper.accessor('periodicidad_reuniones', {
      header: 'Periodicidad Reuniones',
      cell: (info) => <span className="text-xs font-medium whitespace-nowrap">{info.getValue()}</span>,
    }),
    copasstHelper.display({
      id: 'responsable',
      header: 'Responsable',
      cell: (info) => <span className="font-medium whitespace-nowrap">{info.row.original.responsable.nombre}</span>,
    }),
    copasstHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Reglamento Evidencia</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.reglamento_evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  return (
    <div className="flex flex-col gap-lg animate-in fade-in duration-300 max-w-[1400px] mx-auto w-full pb-xl">
      <SubmoduleHeader
        title="Sistema de Gestión SST"
        subtitle="Cumplimiento normativo del Decreto 1886 (Labores Mineras Subterráneas) y Decreto 2024. Gestión de Política, Capacitaciones, Inducción y COPASST."
        icon="policy"
        miniKpiLabel="Ítems de política con evidencia"
        miniKpiValue="100%"
      />

      <TabsContainer tabs={tabs} activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* ── TAB 1: POLÍTICA SST ── */}
      {activeTab === 'politica' && (
        <div className="flex flex-col gap-md">
          <div className="flex items-center justify-between bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Requisitos de Política SST
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                Estado de expedición, firma, divulgación y evidencias soporte.
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5 border-none cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Nuevo Ítem de Política</span>
            </button>
          </div>

          <DataTable data={mockPoliticasSST} columns={politicaColumns} showPagination={true} />
        </div>
      )}

      {/* ── TAB 2: CAPACITACIONES ── */}
      {activeTab === 'capacitaciones' && (
        <div className="flex flex-col gap-md">
          <div className="flex items-center justify-between bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Registro de Capacitaciones
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                Control de sesiones, temas impartidos, horas e intensidades.
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5 border-none cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Registrar Capacitación</span>
            </button>
          </div>

          <DataTable data={mockCapacitaciones} columns={capacitacionColumns} showPagination={true} />
        </div>
      )}

      {/* ── TAB 3: INDUCCIÓN Y REINDUCCIÓN ── */}
      {activeTab === 'induccion' && (
        <div className="flex flex-col gap-md">
          <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Inducciones y Reinducciones por Trabajador
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Control de inducción inicial y vigencia anual de reinducción.
            </p>
          </div>

          <DataTable data={mockInducciones} columns={induccionColumns} showPagination={true} />
        </div>
      )}

      {/* ── TAB 4: COPASST ── */}
      {activeTab === 'copasst' && (
        <div className="flex flex-col gap-md">
          <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Comité Paritario de Seguridad y Salud en el Trabajo (COPASST)
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Miembros constituidos, acta de elección y reglamento interno.
            </p>
          </div>

          <DataTable data={mockCopasst} columns={copasstColumns} showPagination={true} />
        </div>
      )}

      {/* Reusable Evidencia Modal */}
      <EvidenciaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        evidencia={selectedEvidencia}
      />
    </div>
  );
};
