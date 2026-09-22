'use client';

import React, { useState, useMemo } from 'react';
import { SubmoduleHeader } from '../common/SubmoduleHeader';
import { EvidenciaBadge } from '../common/EvidenciaBadge';
import { EvidenciaModal } from '../common/EvidenciaModal';
import { mockCategoriasRiesgo, mockMatrizRiesgos } from '../../constants/mockHsData';
import { CategoriaRiesgo, MatrizRiesgoItem, Evidencia, TipoGeneralRiesgo } from '../../types';

import { DataTable } from '@/shared/ui/Table';
import { legacyCreateColumnHelper as createColumnHelper, LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';

const columnHelper = createColumnHelper<MatrizRiesgoItem>();

export const RiesgosPeligrosOverview: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaRiesgo[]>(mockCategoriasRiesgo);
  const [matriz, setMatriz] = useState<MatrizRiesgoItem[]>(mockMatrizRiesgos);
  const [filterLabor, setFilterLabor] = useState<string>('todos');

  // Category Config Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCatNombre, setNewCatNombre] = useState('');
  const [newCatTipoGeneral, setNewCatTipoGeneral] = useState<TipoGeneralRiesgo>('físico');

  // Evidence Modal State
  const [selectedEvidencia, setSelectedEvidencia] = useState<Evidencia | undefined>();
  const [isEvidenciaModalOpen, setIsEvidenciaModalOpen] = useState(false);

  const handleToggleCategory = (catId: string) => {
    setCategorias((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, activa: !c.activa } : c))
    );
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatNombre.trim()) return;
    const created: CategoriaRiesgo = {
      id: `cat-${Date.now()}`,
      nombre: newCatNombre.trim(),
      tipo_general: newCatTipoGeneral,
      es_predefinida: false,
      activa: true,
    };
    setCategorias((prev) => [...prev, created]);
    setNewCatNombre('');
    setIsCategoryModalOpen(false);
  };

  const filteredMatriz = matriz.filter((item) => {
    if (filterLabor !== 'todos' && !item.tipo_labor.toLowerCase().includes(filterLabor.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleOpenEvidencia = (ev?: Evidencia) => {
    setSelectedEvidencia(ev);
    setIsEvidenciaModalOpen(true);
  };

  const columns = useMemo<ColumnDef<MatrizRiesgoItem, any>[]>(() => [
    columnHelper.accessor('categoria_nombre', {
      header: 'Categoría del Riesgo',
      cell: (info) => <span className="font-semibold text-on-surface whitespace-nowrap">{info.getValue()}</span>,
    }),
    columnHelper.accessor('tipo_labor', {
      header: 'Tipo de Labor / Ocupación',
      cell: (info) => <span className="font-medium text-xs text-primary whitespace-nowrap">{info.getValue()}</span>,
    }),
    columnHelper.accessor('nivel_riesgo', {
      header: () => <div className="text-center w-full">Nivel de Riesgo</div>,
      cell: (info) => {
        const val = info.getValue();
        return (
          <div className="text-center whitespace-nowrap">
            <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase border ${
              val === 'alto'
                ? 'bg-rose-100 text-rose-800 border-rose-200'
                : val === 'medio'
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : 'bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}>
              {val}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor('controles_existentes', {
      header: 'Controles Existentes',
      cell: (info) => <span className="text-xs text-on-surface-variant max-w-xs block">{info.getValue()}</span>,
    }),
    columnHelper.accessor('fecha_ultima_revision', {
      header: 'Última Revisión',
      cell: (info) => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
    }),
    columnHelper.display({
      id: 'responsable',
      header: 'Responsable',
      cell: (info) => <span className="font-medium text-xs whitespace-nowrap">{info.row.original.responsable.nombre}</span>,
    }),
    columnHelper.display({
      id: 'evidencia',
      header: () => <div className="text-center w-full">Evidencia Soporte</div>,
      cell: (info) => (
        <div className="text-center whitespace-nowrap">
          <EvidenciaBadge evidencia={info.row.original.evidencia} onOpenModal={handleOpenEvidencia} />
        </div>
      ),
    }),
  ], [handleOpenEvidencia]);

  return (
    <div className="flex flex-col gap-lg animate-in fade-in duration-300 max-w-[1400px] mx-auto w-full pb-xl">
      <SubmoduleHeader
        title="Gestión de Riesgos y Peligros (Constructor Configurable)"
        subtitle="Identificación y evaluación de riesgos por tipo de labor minera. Permite personalizar categorías normativas del Decreto 1886 y adaptar controles existentes."
        icon="warning"
        miniKpiLabel="Categorías Activas"
        miniKpiValue={`${categorias.filter((c) => c.activa).length} / ${categorias.length}`}
      />

      {/* ── Action & Config Bar ── */}
      <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm flex flex-wrap items-center justify-between gap-md">
        <div className="flex items-center gap-md">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white border border-primary/30 text-primary text-xs font-bold hover:bg-primary/5 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            <span>Configurar Categorías de Riesgo ({categorias.length})</span>
          </button>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 border rounded-xl">
            <span className="font-label-md text-xs text-on-surface-variant font-semibold">Filtrar por Labor:</span>
            <input
              type="text"
              placeholder="ej. Malacatero, Explosivista..."
              value={filterLabor === 'todos' ? '' : filterLabor}
              onChange={(e) => setFilterLabor(e.target.value || 'todos')}
              className="px-2 py-1 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary w-48"
            />
          </div>
        </div>

        <button
          onClick={() => handleOpenEvidencia()}
          className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5 border-none cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Agregar Riesgo a Matriz</span>
        </button>
      </div>

      {/* ── Matriz de Riesgos Table ── */}
      <div className="flex flex-col gap-md">
        <div className="bg-[#F3F6FA] border rounded-2xl p-md shadow-sm">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Matriz de Riesgos Identificados
          </h3>
          <p className="font-body-sm text-on-surface-variant">
            Evaluación de severidad, controles de ingeniería e historial de revisiones.
          </p>
        </div>

        <DataTable data={filteredMatriz} columns={columns} showPagination={true} />
      </div>

      {/* ── Category Config Modal ── */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-primary-container/60 backdrop-blur-xs cursor-pointer" onClick={() => setIsCategoryModalOpen(false)} />
          <div className="relative bg-[#F3F6FA] border w-full max-w-xl rounded-2xl shadow-2xl p-lg flex flex-col gap-md z-10">
            <div className="flex items-center justify-between border-b pb-sm">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Configurador de Categorías de Riesgo
              </h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="w-8 h-8 rounded-full border-none bg-transparent cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* List of categories */}
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {categorias.map((cat) => (
                <div key={cat.id} className="bg-white border rounded-xl p-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${cat.activa ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                    <span className="font-semibold text-xs text-on-surface">{cat.nombre}</span>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                      {cat.tipo_general}
                    </span>
                    {cat.es_predefinida && (
                      <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                        Decreto 1886
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleToggleCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border-none cursor-pointer ${
                      cat.activa ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    {cat.activa ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              ))}
            </div>

            {/* Add new category form */}
            <form onSubmit={handleAddCategory} className="flex flex-col gap-sm border-t pt-md">
              <h4 className="font-label-md text-xs font-bold text-on-surface">Agregar Nueva Categoría Personalizada</h4>
              <div className="grid grid-cols-3 gap-sm">
                <input
                  type="text"
                  placeholder="Nombre de categoría..."
                  value={newCatNombre}
                  onChange={(e) => setNewCatNombre(e.target.value)}
                  className="col-span-2 px-3 py-2 border rounded-lg text-xs font-body-sm bg-white"
                />
                <select
                  value={newCatTipoGeneral}
                  onChange={(e) => setNewCatTipoGeneral(e.target.value as TipoGeneralRiesgo)}
                  className="px-3 py-2 border rounded-lg text-xs font-body-sm bg-white"
                >
                  <option value="físico">Físico</option>
                  <option value="químico">Químico</option>
                  <option value="biológico">Biológico</option>
                  <option value="psicosocial">Psicosocial</option>
                  <option value="biomecánico">Biomecánico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <button type="submit" className="self-end px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg border-none cursor-pointer">
                Guardar Categoría
              </button>
            </form>
          </div>
        </div>
      )}

      <EvidenciaModal
        isOpen={isEvidenciaModalOpen}
        onClose={() => setIsEvidenciaModalOpen(false)}
        evidencia={selectedEvidencia}
      />
    </div>
  );
};
