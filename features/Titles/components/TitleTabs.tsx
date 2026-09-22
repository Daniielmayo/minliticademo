'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface TitleTabsProps {
  id: string;
}

export const TitleTabs = ({ id }: TitleTabsProps) => {
  const pathname = usePathname();

  const tabs = [
    {
      label: 'Cumplimiento de obligaciones',
      href: `/dashboard/titles/${id}/mandatory-compliance-requirements`,
    },
    {
      label: 'Requerimientos Regulatorios',
      href: `/dashboard/titles/${id}/mandatory-requirements`,
    },
    {
      label: 'Amparos Administrativos',
      href: `/dashboard/titles/${id}/administrative-amparo-proceedings`,
    },
  ];

  return (
    <nav className="flex " aria-label="Tabs de navegación de título">
      <div className="flex gap-lg">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "pb-md font-body-md transition-all relative cursor-pointer px-xs select-none",
                isActive
                  ? "text-secondary font-bold"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
