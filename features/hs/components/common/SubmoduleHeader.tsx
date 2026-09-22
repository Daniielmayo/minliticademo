'use client';

import React from 'react';
import Link from 'next/link';

interface SubmoduleHeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
  miniKpiLabel?: string;
  miniKpiValue?: string | number;
  badgeText?: string;
}

export const SubmoduleHeader: React.FC<SubmoduleHeaderProps> = ({
  title,
  subtitle,
  icon = 'health_and_safety',
  miniKpiLabel,
  miniKpiValue,
  badgeText = 'Nivel 3 · Detalle del Bloque',
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-md bg-[#F3F6FA] border rounded-2xl p-lg shadow-sm">
      <div className="flex items-start gap-md">
        <Link
          href="/dashboard/hs"
          className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center text-primary hover:bg-surface-dim transition-colors shrink-0 shadow-xs"
          title="Volver al Dashboard General HS"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <div className="flex flex-col gap-xs">
          <div className="flex items-center gap-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
              {badgeText}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">{icon}</span>
            <h1 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
              {title}
            </h1>
          </div>
          <p className="font-body-sm text-on-surface-variant">{subtitle}</p>
        </div>
      </div>

      {miniKpiLabel && miniKpiValue !== undefined && (
        <div className="flex items-center gap-md bg-white border rounded-xl p-md shadow-xs shrink-0 self-start md:self-auto">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
            <span className="material-symbols-outlined text-[22px]">analytics</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant">
              {miniKpiLabel}
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-primary">
              {miniKpiValue}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
