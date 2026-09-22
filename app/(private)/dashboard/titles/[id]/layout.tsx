import React from 'react';
import { titlesData } from '@/features/Titles/constants';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TitleTabs } from '@/features/Titles/components/TitleTabs';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function TitleDetailLayout({ children, params }: LayoutProps) {
  const { id } = await params;

  // Find the selected title
  const title = titlesData.find(t => t.id === id);
  if (!title) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-lg h-full">
      {/* Header with back button and title detail */}
      <div className="flex flex-col gap-md">
        <Link
          href="/dashboard/titles"
          className="flex items-center gap-xs text-secondary hover:text-primary transition-colors font-label-md w-fit cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver a Títulos
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div>
            <div className="flex items-center gap-sm mt-xs text-secondary font-medium">
              <span className="material-symbols-outlined text-md">folder_open</span>
              <span className="font-body-md">Expediente: {title.placa} ({title.titular})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <TitleTabs id={id} />

      {/* Tab Content */}
      <div className="flex-1 mt-md">
        {children}
      </div>
    </div>
  );
}
