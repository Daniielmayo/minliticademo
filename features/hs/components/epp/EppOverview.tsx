'use client';

import React, { useState, useMemo } from 'react';
import { SubmoduleHeader } from '../common/SubmoduleHeader';
import { EvidenciaBadge } from '../common/EvidenciaBadge';
import { EvidenciaModal } from '../common/EvidenciaModal';
import { mockEppEntregas } from '../../constants/mockHsData';
import { Evidencia } from '../../types';

import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { EppEntregaItem } from '../../types';

const columnHelper = createColumnHelper<EppEntregaItem>();

export const EppOverview: React.FC = () => {
  const [filterTipoEpp, setFilterTipoEpp] = useState<string>('todos');
  const [selectedEvidencia, setSelectedEvidencia] = useState<Evidencia | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEntregas = useMemo(() => {
    return mockEppEntregas.filter((item) => {
      if (filterTipoEpp !== 'todos' && !item.tipo_epp.toLowerCase().includes(filterTipoEpp.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [filterTipoEpp]);

  // Aggregated calculations for EPP
  const totalCostoEPP = useMemo(() => {
    return mockEppEntregas.reduce((sum, item) => sum + (item.costo_unitario || 0), 0);
  }, []);

  const handleOpenModal = (ev?: Evidencia) => {
    setSelectedEvidencia(ev);
    setIsModalOpen(true);
  };

  const columns = useMemo<ColumnDef<EppEntregaItem, any>[]>(() => [
    columnHelper.accessor('trabajador', {
      header: 'Trabajador / Documento',
      cell: (info) => {
        const item = info.row.original;
        return (
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-semibold text-on-surface">{item.trabajador.nombreCompleto}</span>
            <span className="text-[11px] font-mono text-on-surface-variant">
              CC: {item.trabajador.documento} · {item.trabajador.cargo}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor('tipo_epp', {
      header: 'Tipo de EPP Entregado',
      cell: (info) => <span className="font-medium text-xs text-primary whitespace-nowrap">{info.getValue()}</span>,
    }),
    columnHelper.accessor('fecha_entrega', {
      header: 'Fecha Entrega',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    columnHelper.accessor('costo_unitario', {
      header: () => <div className="text-right w-full">Costo Unitario</div>,
      cell: (info) => (
        <div className="text-right font-mono font-bold text-on-surface whitespace-nowrap">
          ${info.getValue() ? info.getValue()?.toLocaleString('es-CO') : '0'}
        </div>
      ),
    }),
    columnHelper.accessor('riesgo_actividad_id', {
      header: () => <div className="text-center w-full">Riesgo Actividad (FK)</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          {info.getValue() ? (
            <span className="px-2 py-0.5 rounded-full bg-surface-container font-mono text-[11px] text-on-surface-variant">
              {info.getValue()}
            </span>
          ) : (
            <span className="text-on-surface-variant text-[11px] italic">Sin vincular</span>
          )}
        </div>
      ),
    }),
    columnHelper.display({
      id: 'evidencia_entrega',
      header: () => <div className="text-center w-full">Evidencia Entrega</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.evidencia_entrega} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
    columnHelper.display({
      id: 'evidencia_capacitacion',
      header: () => <div className="text-center w-full">Evidencia Capacitación</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.evidencia_capacitacion_uso} onOpenModal={handleOpenModal} />
        </div>
      ),
    }),
  ], [handleOpenModal]);

  return (
    <div className="flex flex-col gap-lg animate-in fade-in duration-300 max-w-[1400px] mx-auto w-full pb-xl">
      <SubmoduleHeader
        title="Elementos de Protección Personal (EPP)"
        subtitle="Registro de entrega, capacitación en uso adecuado y control de costos acumulados por trabajador y tipo de equipo."
        icon="health_and_safety"
        miniKpiLabel="Costo Total Invertido"
        miniKpiValue={`$${totalCostoEPP.toLocaleString('es-CO')}`}
      />

      {/* ── Summary Stats Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
              Total Entregas Registradas
            </span>
            <div className="font-headline-sm text-headline-sm font-bold text-primary mt-xs">
              {mockEppEntregas.length} kits
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">inventory_2</span>
          </div>
        </div>

        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
              Capacitación de Uso
            </span>
            <div className="font-headline-sm text-headline-sm font-bold text-emerald-700 mt-xs">
              100% Con Evidencia
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">school</span>
          </div>
        </div>

        <div className="bg-[#F3F6FA] border rounded-xl p-md shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
              Inversión Promedio por Kit
            </span>
            <div className="font-headline-sm text-headline-sm font-bold text-secondary mt-xs">
              ${Math.round(totalCostoEPP / (mockEppEntregas.length || 1)).toLocaleString('es-CO')}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">payments</span>
          </div>
        </div>
      </div>

      {/* ── Table & Filter ── */}
      <div className="flex flex-col gap-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Historial de Entrega de EPP
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Firma de recibo, capacitaciones y vinculación opcional a matriz de riesgo.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5 border-none cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Registrar Entrega de EPP</span>
          </button>
        </div>

        <DataTable data={filteredEntregas} columns={columns} showPagination={true} />
      </div>

      <EvidenciaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        evidencia={selectedEvidencia}
      />
    </div>
  );
};
