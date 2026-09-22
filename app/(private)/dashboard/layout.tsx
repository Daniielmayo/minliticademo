import React from 'react';
import { DashboardLayout } from '@/shared/layout/dashboard';

interface DashboardRootLayoutProps {
  children: React.ReactNode;
}

export default function DashboardRootLayout({ children }: DashboardRootLayoutProps) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
