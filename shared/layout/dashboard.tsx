"use client";

import React, { useState } from 'react';
import { Sidebar } from '../ui/Sidebar';
import { Topbar } from '../ui/Topbar';

export interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-[var(--page-bg)]">
            {/* Sidebar Component */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col h-screen bg-[var(--page-bg)] relative transition-all duration-300 ${isSidebarCollapsed ? 'ml-[calc(12px+80px+8px)]' : 'ml-[calc(12px+288px+8px)]'}`}>
                <Topbar />

                <main className="flex-1 overflow-y-auto p-xl bg-[var(--page-bg)]">
                    <div className="max-w-[1400px] w-full mx-auto space-y-lg">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
