'use client';

import React, { useState, useEffect } from 'react';
import { Evidencia, TipoEvidencia } from '../../types';

interface EvidenciaModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidencia?: Evidencia;
  onSave?: (newEvidencia: Evidencia) => void;
}

export const EvidenciaModal: React.FC<EvidenciaModalProps> = ({
  isOpen,
  onClose,
  evidencia,
  onSave,
}) => {
  const [tipo, setTipo] = useState<TipoEvidencia>('archivo');
  const [archivoNombre, setArchivoNombre] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (evidencia) {
      setTipo(evidencia.tipo);
      setArchivoNombre(evidencia.nombre_archivo || '');
      setLinkUrl(evidencia.link_url || '');
      setDescripcion(evidencia.descripcion || '');
    } else {
      setTipo('archivo');
      setArchivoNombre('');
      setLinkUrl('');
      setDescripcion('');
    }
  }, [evidencia, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Evidencia = {
      id: evidencia?.id || `ev-${Date.now()}`,
      tipo,
      archivo_url: tipo === 'archivo' ? `/uploads/${archivoNombre || 'documento.pdf'}` : undefined,
      nombre_archivo: tipo === 'archivo' ? archivoNombre || 'documento.pdf' : undefined,
      link_url: tipo === 'link' ? linkUrl : undefined,
      descripcion,
      fecha_carga: new Date().toISOString().split('T')[0],
      cargado_por: 'Usuario Actual',
    };
    if (onSave) onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary-container/60 backdrop-blur-xs cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#F3F6FA] border w-full max-w-lg rounded-2xl shadow-2xl p-lg flex flex-col gap-md z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-sm border-b">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                {tipo === 'archivo' ? 'folder_open' : 'link'}
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {evidencia ? 'Detalle de Evidencia' : 'Adjuntar Evidencia'}
              </h3>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                Selecciona si la evidencia es un archivo subido o un enlace URL externo.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-dim transition-colors border-none bg-transparent cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tipo Selector Tabs */}
        <div className="grid grid-cols-2 p-1 bg-surface-container-low rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setTipo('archivo')}
            className={`py-2 px-3 rounded-lg font-label-md text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border-none ${
              tipo === 'archivo'
                ? 'bg-white text-primary shadow-xs font-bold'
                : 'text-on-surface-variant hover:text-on-surface bg-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">attach_file</span>
            <span>Archivo Adjunto</span>
          </button>
          <button
            type="button"
            onClick={() => setTipo('link')}
            className={`py-2 px-3 rounded-lg font-label-md text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border-none ${
              tipo === 'link'
                ? 'bg-white text-secondary shadow-xs font-bold'
                : 'text-on-surface-variant hover:text-on-surface bg-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">link</span>
            <span>Link Externo URL</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          {tipo === 'archivo' ? (
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-xs text-on-surface font-semibold">
                Nombre de Archivo / Documento
              </label>
              <input
                type="text"
                placeholder="ej. acta_copasst_febrero_2026.pdf"
                value={archivoNombre}
                onChange={(e) => setArchivoNombre(e.target.value)}
                className="w-full px-md py-2.5 border rounded-lg text-on-surface font-body-sm bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <p className="text-[11px] text-on-surface-variant">
                Admite archivos PDF, DOCX, XLSX, JPG o PNG almacenados en el storage del sistema.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-xs text-on-surface font-semibold">
                Enlace Externo (URL completo)
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/drive/folders/..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full px-md py-2.5 border rounded-lg text-on-surface font-body-sm bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <p className="text-[11px] text-on-surface-variant">
                Pega la dirección URL de la carpeta de Drive, SharePoint u otro repositorio del cliente.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-xs text-on-surface font-semibold">
              Descripción / Observaciones (Opcional)
            </label>
            <textarea
              rows={2}
              placeholder="Detalle o contexto adicional sobre esta evidencia..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-md py-2 border rounded-lg text-on-surface font-body-sm bg-white focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
            />
          </div>

          {evidencia && (
            <div className="p-sm bg-surface-container rounded-lg text-[12px] text-on-surface-variant flex items-center justify-between">
              <span>Cargado por: <strong>{evidencia.cargado_por}</strong></span>
              <span>Fecha: <strong>{evidencia.fecha_carga}</strong></span>
            </div>
          )}

          <div className="flex items-center justify-end gap-sm pt-sm border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-label-md text-xs border text-on-surface hover:bg-surface-dim transition-colors bg-white cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-label-md text-xs bg-primary text-white hover:bg-primary/90 transition-colors border-none cursor-pointer font-semibold shadow-xs"
            >
              Guardar Evidencia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
