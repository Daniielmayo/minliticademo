'use client';

import React, { useState, useMemo } from 'react';
import { SubmoduleHeader } from '../common/SubmoduleHeader';
import { TabsContainer, TabItem } from '../common/TabsContainer';
import { EvidenciaBadge } from '../common/EvidenciaBadge';
import { EvidenciaModal } from '../common/EvidenciaModal';
import {
  mockSeguridadVial,
  mockMaquinaria,
  mockInstalacionesElectricas,
} from '../../constants/mockHsData';
import { Evidencia } from '../../types';

import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import {
  SeguridadVialItem,
  MaquinariaItem,
  InstalacionElectricaItem,
} from '../../types';

const vialHelper = createColumnHelper<SeguridadVialItem>();
const maquinariaHelper = createColumnHelper<MaquinariaItem>();
const electricaHelper = createColumnHelper<InstalacionElectricaItem>();

export const SeguridadMineraOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('maquinaria');
  const [selectedEvidencia, setSelectedEvidencia] = useState<Evidencia | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs: TabItem[] = [
    { id: 'vial', label: 'Seguridad Vial', icon: 'minor_crash', badgeCount: mockSeguridadVial.length },
    { id: 'maquinaria', label: 'Maquinaria y Equipos', icon: 'precision_manufacturing', badgeCount: mockMaquinaria.length },
    { id: 'electricas', label: 'Instalaciones Eléctricas RETIE', icon: 'electrical_services', badgeCount: mockInstalacionesElectricas.length },
  ];

  const handleOpenModal = (ev?: Evidencia) => {
    setSelectedEvidencia(ev);
    setIsModalOpen(true);
  };

  // KPI calculations for Maquinaria
  const porcentajeMantenimientosAlDia = Math.round(
    (mockMaquinaria.filter((m) => m.programa_mantenimiento_existe).length / mockMaquinaria.length) * 100
  );

  const vialColumns = useMemo<ColumnDef<SeguridadVialItem, any>[]>(() => [
    vialHelper.display({
      id: 'politica',
      header: 'Política de Seguridad Vial',
      cell: () => <span className="font-semibold text-on-surface whitespace-nowrap">Política Plan Estratégico de Seguridad Vial (PESV)</span>,
    }),
    vialHelper.accessor('divulgada', {
      header: () => <div className="text-center w-full">Divulgada</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
            info.getValue()
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : 'bg-rose-100 text-rose-800 border-rose-200'
          }`}>
            {info.getValue() ? 'Sí' : 'No'}
          </span>
        </div>
      ),
    }),
    vialHelper.accessor('fecha_divulgacion', {
      header: 'Fecha Divulgación',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue() || '-'}</span>,
    }),
    vialHelper.display({
      id: 'responsable',
      header: 'Responsable',
      cell: (info) => <span className="font-medium whitespace-nowrap">{info.row.original.responsable.nombre}</span>,
    }),
    vialHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Evidencia Documento</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.documento_politica_evidencia} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  const maquinariaColumns = useMemo<ColumnDef<MaquinariaItem, any>[]>(() => [
    maquinariaHelper.accessor('codigo', {
      header: 'Código / Identificador',
      cell: (info) => <span className="font-mono font-bold text-primary whitespace-nowrap">{info.getValue()}</span>,
    }),
    maquinariaHelper.accessor('tipo', {
      header: 'Tipo de Maquinaria',
      cell: (info) => <span className="font-semibold text-on-surface whitespace-nowrap">{info.getValue()}</span>,
    }),
    maquinariaHelper.accessor('fecha_inicio_operativa', {
      header: 'Inicio Operación',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    maquinariaHelper.accessor('vida_util_estimada', {
      header: 'Vida Útil Estimada',
      cell: (info) => <span className="text-xs font-medium text-on-surface-variant whitespace-nowrap">{info.getValue()}</span>,
    }),
    maquinariaHelper.accessor('programa_mantenimiento_existe', {
      header: () => <div className="text-center w-full">Programa Mantenimiento</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
            info.getValue()
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : 'bg-amber-100 text-amber-800 border-amber-200'
          }`}>
            {info.getValue() ? 'Vigente' : 'Pendiente'}
          </span>
        </div>
      ),
    }),
    maquinariaHelper.accessor('fecha_ultimo_mantenimiento', {
      header: 'Último Mantenimiento',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue() || '-'}</span>,
    }),
    maquinariaHelper.display({
      id: 'evidencias',
      header: () => <div className="text-center w-full">Evidencias</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.evidencia_mantenimiento} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  const electricasColumns = useMemo<ColumnDef<InstalacionElectricaItem, any>[]>(() => [
    electricaHelper.accessor('nombre_instalacion', {
      header: 'Instalación / Subestación',
      cell: (info) => <span className="font-semibold text-on-surface whitespace-nowrap">{info.getValue()}</span>,
    }),
    electricaHelper.accessor('certificacion_retie_vigente', {
      header: () => <div className="text-center w-full">Certificado RETIE</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
            info.getValue()
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : 'bg-rose-100 text-rose-800 border-rose-200'
          }`}>
            {info.getValue() ? 'Vigente RETIE' : 'Vencido'}
          </span>
        </div>
      ),
    }),
    electricaHelper.accessor('fecha_certificacion', {
      header: 'Fecha Certificación',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    electricaHelper.accessor('fecha_ultima_inspeccion', {
      header: 'Última Inspección',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    electricaHelper.display({
      id: 'responsable',
      header: 'Responsable RETIE',
      cell: (info) => <span className="font-medium text-xs whitespace-nowrap">{info.row.original.responsable.nombre}</span>,
    }),
    electricaHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Evidencia Certificado</div>,
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
        title="Seguridad Minera Crítica"
        subtitle="Control operativo de plan de seguridad vial, mantenimientos preventivos de maquinaria (malacates, ventilación, bombas) y certificaciones eléctricas RETIE."
        icon="construction"
        miniKpiLabel="Mantenimiento al día"
        miniKpiValue={`${porcentajeMantenimientosAlDia}%`}
      />

      <TabsContainer tabs={tabs} activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* ── TAB 1: SEGURIDAD VIAL ── */}
      {activeTab === 'vial' && (
        <div className="flex flex-col gap-md">
          <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Plan de Seguridad Vial Minero
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Política de transporte interno, divulgación y responsables.
            </p>
          </div>

          <DataTable data={mockSeguridadVial} columns={vialColumns} showPagination={true} />
        </div>
      )}

      {/* ── TAB 2: MAQUINARIA Y EQUIPOS ── */}
      {activeTab === 'maquinaria' && (
        <div className="flex flex-col gap-md">
          <div className="flex items-center justify-between bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Inventario de Maquinaria Crítica
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                Programa de mantenimiento, bitácoras y vida útil estimada.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border text-xs font-bold text-emerald-700">
              <span className="material-symbols-outlined text-[18px]">build</span>
              <span>{porcentajeMantenimientosAlDia}% Cumplimiento Mantenimiento</span>
            </div>
          </div>

          <DataTable data={mockMaquinaria} columns={maquinariaColumns} showPagination={true} />
        </div>
      )}

      {/* ── TAB 3: INSTALACIONES ELÉCTRICAS RETIE ── */}
      {activeTab === 'electricas' && (
        <div className="flex flex-col gap-md">
          <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Instalaciones Eléctricas Mineras (RETIE)
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Alertas de vencimiento de certificación y registro de inspecciones técnicas.
            </p>
          </div>

          <DataTable data={mockInstalacionesElectricas} columns={electricasColumns} showPagination={true} />
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
