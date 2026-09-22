import React from 'react';
import { ProcessTrackingInfo } from '@/features/Environmental/types';

interface StateDetailsProps {
  processInfo: ProcessTrackingInfo;
  selectedState: string;
}

export const StateDetails = ({ processInfo, selectedState }: StateDetailsProps) => {

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md mt-lg animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-lg">
        <h3 className="font-bold text-headline-sm text-on-surface">Detalles de la Fase {selectedState}</h3>
      </div>

      <div className="flex flex-col gap-xl">
        {selectedState === 'A' && (
          <section>
            <h4 className="font-bold text-title-md text-primary mb-md border-b border-card-border pb-xs">Fase A: Elaboración</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div>
                <span className="block font-label-sm text-on-surface-variant">Fecha Inicio Elaboración</span>
                <span className="font-body-md text-on-surface">{processInfo.elaborationStartDate || 'N/A'}</span>
              </div>
              <div>
                <span className="block font-label-sm text-on-surface-variant">Fecha Estimada Finalización</span>
                <span className="font-body-md text-on-surface">{processInfo.estimatedEndDate || 'N/A'}</span>
              </div>
              <div>
                <span className="block font-label-sm text-on-surface-variant">Modalidad</span>
                <span className="font-body-md text-on-surface">{processInfo.modality || 'N/A'}</span>
              </div>
              <div>
                <span className="block font-label-sm text-on-surface-variant">Contratista</span>
                <span className="font-body-md text-on-surface">{processInfo.contractorName || 'N/A'}</span>
              </div>
              {processInfo.elaborationSupportUrl && (
                <div className="md:col-span-2 pt-xs">
                  <a href={processInfo.elaborationSupportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-xs text-primary hover:underline font-label-md bg-primary/5 px-3 py-2 rounded-lg border border-primary/10 w-fit transition-colors hover:bg-primary/10">
                    <span className="material-symbols-outlined text-[20px]">folder_open</span>
                    Ver Soporte Documental (Contrato / Acta de inicio)
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {selectedState === 'B' && (
          <section>
            <h4 className="font-bold text-title-md text-primary mb-md border-b border-card-border pb-xs">Fase B: Presentado</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div>
                <span className="block font-label-sm text-on-surface-variant">Fecha Presentación Interna</span>
                <span className="font-body-md text-on-surface">{processInfo.presentationDate || 'N/A'}</span>
              </div>
              <div>
                <span className="block font-label-sm text-on-surface-variant">Radicado Oficial</span>
                <span className="font-body-md text-on-surface">{processInfo.radicationDate || 'N/A'}</span>
              </div>
              <div>
                <span className="block font-label-sm text-on-surface-variant">Derechos Ambientales (Pago)</span>
                <span className="font-body-md text-on-surface">
                  {processInfo.financialRightsPaid ? `Pagado (${processInfo.financialRightsDate})` : 'Pendiente'}
                </span>
              </div>
              <div>
                <span className="block font-label-sm text-on-surface-variant">Monto (COP)</span>
                <span className="font-body-md text-on-surface">
                  {processInfo.financialRightsAmount ? `$${processInfo.financialRightsAmount.toLocaleString('es-CO')}` : 'N/A'}
                </span>
              </div>
              {processInfo.presentationSupportUrl && (
                <div className="md:col-span-2 pt-xs">
                  <a href={processInfo.presentationSupportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-xs text-primary hover:underline font-label-md bg-primary/5 px-3 py-2 rounded-lg border border-primary/10 w-fit transition-colors hover:bg-primary/10">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                    Ver Soporte Documental (Estudio Ambiental y Radicado)
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {selectedState === 'C' && (
          <section>
            <h4 className="font-bold text-title-md text-error mb-md border-b border-error/20 pb-xs">Fase C: Requerimientos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div>
                <span className="block font-label-sm text-error font-bold">Notificación de Requerimientos</span>
                <span className="font-body-md text-on-surface">{processInfo.requirementsNotificationDate || 'N/A'}</span>
              </div>
              <div>
                <span className="block font-label-sm text-error font-bold">Fecha Límite Legal (30 días)</span>
                <span className="font-body-md text-on-surface">{processInfo.requirementsDeadline || 'N/A'}</span>
              </div>
            </div>
          </section>
        )}

        {selectedState === 'D' && (
          <section>
            <h4 className="font-bold text-title-md text-success-alert mb-md border-b border-success-alert/20 pb-xs">Fase D: Aprobado</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div>
                <span className="block font-label-sm text-on-surface-variant">Número de Resolución</span>
                <span className="font-body-md font-bold text-success-alert">{processInfo.resolutionNumber || 'N/A'}</span>
              </div>
              <div>
                <span className="block font-label-sm text-on-surface-variant">Fecha Resolución</span>
                <span className="font-body-md text-on-surface">{processInfo.resolutionDate || 'N/A'}</span>
              </div>
              {processInfo.approvalSupportUrl && (
                <div className="md:col-span-2 pt-xs">
                  <a href={processInfo.approvalSupportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-xs text-primary hover:underline font-label-md bg-primary/5 px-3 py-2 rounded-lg border border-primary/10 w-fit transition-colors hover:bg-primary/10">
                    <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                    Ver Soporte Documental (Resolución Aprobatoria PDF)
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {selectedState === 'E' && (
          <section>
            <h4 className="font-bold text-title-md text-error mb-md border-b border-error/20 pb-xs">Fase E: Rechazado</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div>
                <span className="block font-label-sm text-error font-bold">Fecha de Rechazo</span>
                <span className="font-body-md text-on-surface">{processInfo.rejectionDate || 'N/A'}</span>
              </div>
              <div>
                <span className="block font-label-sm text-error font-bold">Resolución de Rechazo</span>
                <span className="font-body-md text-on-surface">{processInfo.rejectionResolutionNumber || 'N/A'}</span>
              </div>
              <div className="md:col-span-2">
                <span className="block font-label-sm text-error font-bold">Observaciones</span>
                <p className="font-body-md text-on-surface mt-1">{processInfo.rejectionObservations || 'N/A'}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
