import React from 'react';
import { AuthLayout } from '@/shared/layout/auth';

interface AuthRouteLayoutProps {
  children: React.ReactNode;
}

export default function AuthRouteLayout({ children }: AuthRouteLayoutProps) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
}
