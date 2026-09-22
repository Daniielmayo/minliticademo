'use client';

import React, { useState, useMemo } from 'react';
import { SubmoduleHeader } from '../common/SubmoduleHeader';
import { EvidenciaBadge } from '../common/EvidenciaBadge';
import { EvidenciaModal } from '../common/EvidenciaModal';
import { mockSeguridadSocial } from '../../constants/mockHsData';
import { Evidencia, TipoTrabajadorFilter, OrigenDato } from '../../types';

import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { SeguridadSocialItem } from '../../types';

const columnHelper = createColumnHelper<SeguridadSocialItem>();

export const SeguridadSocialOverview: React.FC = () => {
  const [filterTipo, setFilterTipo] = useState<string>('todos');
  const [filterOrigen, setFilterOrigen] = useState<string>('todos');
  const [filterVigencia, setFilterVigencia] = useState<string>('todos');

  const [selectedEvidencia, setSelectedEvidencia] = useState<Evidencia | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = useMemo(() => {
    return mockSeguridadSocial.filter((item) => {
      if (filterTipo !== 'todos' && item.tipo_trabajador !== filterTipo) return false;
      if (filterOrigen !== 'todos' && item.origen_dato !== filterOrigen) return false;
      if (filterVigencia === 'vigente') {
        if (!item.eps_vigente || !item.arl_vigente || !item.fondo_pensiones_vigente) return false;
      } else if (filterVigencia === 'vencido') {
        if (item.eps_vigente && item.arl_vigente && item.fondo_pensiones_vigente) return false;
      }
      return true;
    });
  }, [filterTipo, filterOrigen, filterVigencia]);

  const handleOpenModal = (ev?: Evidencia) => {
    setSelectedEvidencia(ev);
    setIsModalOpen(true);
  };

  const columns = useMemo<ColumnDef<SeguridadSocialItem, any>[]>(() => [
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
    columnHelper.display({
      id: 'tipo_origen',
      header: 'Tipo / Origen',
      cell: (info) => {
        const item = info.row.original;
        return (
          <div className="flex flex-col items-start gap-1 whitespace-nowrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20 capitalize whitespace-nowrap">
              {item.tipo_trabajador === 'área' ? item.area_custom || 'Área' : item.tipo_trabajador}
            </span>
            <span className={`inline-flex items-center text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border whitespace-nowrap ${
              item.origen_dato === 'propio'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {item.origen_dato}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor('eps', {
      header: 'EPS',
      cell: (info) => {
        const item = info.row.original;
        return (
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className={`w-2 h-2 rounded-full shrink-0 ${item.eps_vigente ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className="font-medium text-xs">{item.eps}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor('arl', {
      header: 'ARL',
      cell: (info) => {
        const item = info.row.original;
        return (
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className={`w-2 h-2 rounded-full shrink-0 ${item.arl_vigente ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className="font-medium text-xs">{item.arl}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor('fondo_pensiones', {
      header: 'Pensión',
      cell: (info) => {
        const item = info.row.original;
        return (
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className={`w-2 h-2 rounded-full shrink-0 ${item.fondo_pensiones_vigente ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className="font-medium text-xs">{item.fondo_pensiones}</span>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'examen_medico',
      header: 'Examen Médico',
      cell: (info) => {
        const item = info.row.original;
        return (
          <div className="flex flex-col gap-1 items-start whitespace-nowrap">
            <span className="text-[11px] font-mono">Periódico: {item.fecha_examen_medico_periodico || item.fecha_examen_medico_inicial}</span>
            <EvidenciaBadge evidencia={item.evidencia_examen} onOpenModal={handleOpenModal} />
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'espacio_confinado',
      header: () => <div className="text-center w-full">Espacio Confinado</div>,
      cell: (info) => {
        const item = info.row.original;
        const isMina = item.tipo_trabajador === 'mina';
        return (
          <div className="text-center whitespace-nowrap">
            {isMina ? (
              <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border whitespace-nowrap ${
                item.requiere_espacio_confinado
                  ? 'bg-purple-100 text-purple-800 border-purple-200'
                  : 'bg-gray-100 text-gray-700 border-gray-200'
              }`}>
                {item.requiere_espacio_confinado ? 'Apto Confinado' : 'No Aplica'}
              </span>
            ) : (
              <span className="text-on-surface-variant text-xs">-</span>
            )}
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'evidencias_epp',
      header: () => <div className="text-center w-full">Evidencias EPP/Capacitación</div>,
      cell: (info) => {
        const item = info.row.original;
        const isMina = item.tipo_trabajador === 'mina';
        return (
          <div className="text-center whitespace-nowrap">
            {isMina ? (
              <div className="flex flex-col items-center gap-1">
                <EvidenciaBadge evidencia={item.evidencia_entrega_epp} onOpenModal={handleOpenModal} />
              </div>
            ) : (
              <span className="text-center block text-on-surface-variant text-xs">-</span>
            )}
          </div>
        );
      },
    }),
  ], [handleOpenModal]);

  return (
    <div className="flex flex-col gap-lg animate-in fade-in duration-300 max-w-[1400px] mx-auto w-full pb-xl">
      <SubmoduleHeader
        title="Seguridad Social y Exámenes Ocupacionales"
        subtitle="Control diferenciado de afiliaciones a EPS, ARL, Fondos de Pensiones y Exámenes Médicos Ocupacionales para personal propio y contratistas."
        icon="verified_user"
        miniKpiLabel="Trabajadores al día"
        miniKpiValue={`${filteredData.length} / ${mockSeguridadSocial.length}`}
      />

      {/* ── Filters Panel ── */}
      <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm flex flex-wrap items-center justify-between gap-md">
        <div className="flex flex-wrap items-center gap-md">
          {/* Filter 1: Tipo Trabajador */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Tipo Trabajador
            </label>
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="px-3 py-2 border rounded-lg text-xs font-body-sm bg-white text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="todos">Todos los tipos (Mina / Admin / Área)</option>
              <option value="mina">Mina</option>
              <option value="administrativo">Administrativo</option>
              <option value="área">Área Personalizada</option>
            </select>
          </div>

          {/* Filter 2: Origen Dato */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Origen Dato
            </label>
            <select
              value={filterOrigen}
              onChange={(e) => setFilterOrigen(e.target.value)}
              className="px-3 py-2 border rounded-lg text-xs font-body-sm bg-white text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="todos">Todos (Propio y Contratista)</option>
              <option value="propio">Propio</option>
              <option value="contratista">Contratista</option>
            </select>
          </div>

          {/* Filter 3: Vigencia Seguridad Social */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Estado Afiliaciones
            </label>
            <select
              value={filterVigencia}
              onChange={(e) => setFilterVigencia(e.target.value)}
              className="px-3 py-2 border rounded-lg text-xs font-body-sm bg-white text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="todos">Todas las vigencias</option>
              <option value="vigente">100% Vigentes</option>
              <option value="vencido">Con Algún Vencimiento</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5 border-none cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Registrar Seguridad Social</span>
        </button>
      </div>

      {/* ── Table ── */}
      <DataTable data={filteredData} columns={columns} showPagination={true} />

      <EvidenciaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        evidencia={selectedEvidencia}
      />
    </div>
  );
};
