'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { mockEnvironmentalTitles } from '@/features/Environmental/constants';
import { ProcessStepper } from '@/features/Environmental/ProcessTracking/ProcessStepper';
import { StateDetails } from '@/features/Environmental/ProcessTracking/StateDetails';
import { RequirementsSubmodule } from '@/features/Environmental/ProcessTracking/RequirementsSubmodule';
import { OperationalChecklist } from '@/features/Environmental/OperationalControl/OperationalChecklist';
import { ICATable } from '@/features/Environmental/ICA/ICATable';

export default function EnvironmentalTitlePage() {
  const params = useParams();
  const id = params?.id as string;

  const title = useMemo(() => {
    return mockEnvironmentalTitles.find(t => t.id === id);
  }, [id]);

  if (!title) {
    return notFound();
  }

  const { processInfo, licenseStatus, instrumentType } = title;
  const isApproved = licenseStatus === 'Vigente';
  
  // State for stepper navigation
  const [selectedPhase, setSelectedPhase] = useState<string>(processInfo.stateId);
  
  useEffect(() => {
    setSelectedPhase(processInfo.stateId);
  }, [processInfo.stateId]);

  const isShowingRequirements = selectedPhase === 'C';

  return (
    <div className="flex flex-col gap-lg animate-in fade-in duration-300 p-lg max-w-[1400px] mx-auto w-full">
      {/* Header and Breadcrumbs */}
      <div className="flex flex-col gap-xs">
        <Link href="/dashboard/environmental" className="text-secondary hover:underline flex items-center gap-xs font-label-md mb-sm w-fit">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver al Portafolio
        </Link>
        <div className="flex items-center gap-md">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Expediente: {title.id}</h2>
          <span className="px-3 py-1 bg-surface-container-low text-on-surface rounded-full font-label-md border border-outline-variant">
            {instrumentType === 'EIA' ? 'Estudio de Impacto Ambiental (EIA)' : instrumentType === 'PMA' ? 'Plan de Manejo Ambiental (PMA)' : instrumentType}
          </span>
          <span className={`px-3 py-1 rounded-full font-label-md font-bold ${isApproved ? 'bg-[#10B981]/10 text-success-alert' :
            licenseStatus === 'Rechazado' ? 'bg-error/10 text-error' :
              'bg-primary/10 text-primary'
            }`}>
            {licenseStatus}
          </span>
        </div>
        <p className="font-body-md text-on-surface-variant">
          Gestión detallada del trámite y obligaciones operativas del instrumento ambiental.
        </p>
      </div>

      {/* PASO 2: Fase de Trámite */}
      <section className="mt-md">
        <h3 className="font-label-lg text-on-surface mb-md border-b border-outline-variant pb-xs">Fase de Trámite del Instrumento</h3>
        <ProcessStepper 
          currentState={processInfo.stateId} 
          selectedState={selectedPhase}
          onSelectState={setSelectedPhase}
        />

        <StateDetails processInfo={processInfo} selectedState={selectedPhase} />

        {isShowingRequirements && processInfo.requirementsTasks && (
          <RequirementsSubmodule tasks={processInfo.requirementsTasks} />
        )}
      </section>

      {/* PASOS 3 y 4: Solo visibles si está licenciado Y se está visualizando la fase D */}
      {isApproved && selectedPhase === 'D' && (
        <section className="mt-xl pt-lg border-t-2 border-outline-variant flex flex-col gap-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h3 className="font-headline-sm text-on-surface mb-md">Fase Operativa y Cumplimiento</h3>
            {title.operationalTasks ? (
              <OperationalChecklist tasks={title.operationalTasks} />
            ) : (
              <p className="text-on-surface-variant font-body-md">No hay obligaciones operativas registradas.</p>
            )}
          </div>

          <div>
            {title.icaReports ? (
              <ICATable reports={title.icaReports} />
            ) : (
              <p className="text-on-surface-variant font-body-md">No hay reportes ICA registrados.</p>
            )}
          </div>
        </section>
      )}

      {/* Empty State message for unapproved phases (A, B, C) */}
      {['A', 'B', 'C'].includes(selectedPhase) && (
        <div className="mt-xl p-xl border border-outline-variant rounded-2xl flex flex-col items-center justify-center text-center bg-gradient-to-b from-white to-surface-container-lowest shadow-sm relative overflow-hidden animate-in fade-in duration-500">
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

          <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-md border border-outline-variant/50 shadow-sm relative">
            <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse"></div>
            <span className="material-symbols-outlined text-[36px] text-primary relative z-10">lock</span>
          </div>

          <h4 className="font-bold text-headline-sm text-on-surface mb-sm">Fase Operativa Bloqueada</h4>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            El control de obligaciones prácticas y la gestión de reportes ICA se habilitarán automáticamente una vez que la autoridad apruebe la licencia ambiental (Estado D).
          </p>
        </div>
      )}
    </div>
  );
}
