'use client';

import React from 'react';
import { Evidencia } from '../../types';

interface EvidenciaBadgeProps {
  evidencia?: Evidencia;
  onOpenModal?: (evidencia?: Evidencia) => void;
  readOnly?: boolean;
}

export const EvidenciaBadge: React.FC<EvidenciaBadgeProps> = ({
  evidencia,
  onOpenModal,
}) => {
  if (!evidencia) {
    return (
      <button
        type="button"
        onClick={() => onOpenModal && onOpenModal(undefined)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
        title="Sin evidencia cargada. Clic para adjuntar"
      >
        <span className="material-symbols-outlined text-[14px]">warning</span>
        <span>Sin evidencia</span>
      </button>
    );
  }

  const isLink = evidencia.tipo === 'link';

  return (
    <button
      type="button"
      onClick={() => {
        if (isLink && evidencia.link_url) {
          window.open(evidencia.link_url, '_blank', 'noopener,noreferrer');
        } else if (onOpenModal) {
          onOpenModal(evidencia);
        }
      }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs ${
        isLink
          ? 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'
          : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
      }`}
      title={evidencia.descripcion || (isLink ? 'Abrir enlace externo' : 'Ver archivo adjunto')}
    >
      <span className="material-symbols-outlined text-[15px]">
        {isLink ? 'link' : 'attach_file'}
      </span>
      <span className="truncate max-w-[130px]">
        {isLink ? 'Link externo' : evidencia.nombre_archivo || 'Archivo adjunto'}
      </span>
      <span className="material-symbols-outlined text-[12px] opacity-70">
        {isLink ? 'open_in_new' : 'visibility'}
      </span>
    </button>
  );
};
