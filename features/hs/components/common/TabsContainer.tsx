'use client';

import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badgeCount?: number;
}

interface TabsContainerProps {
  tabs: TabItem[];
  activeTab: string;
  onChangeTab: (tabId: string) => void;
}

export const TabsContainer: React.FC<TabsContainerProps> = ({
  tabs,
  activeTab,
  onChangeTab,
}) => {
  return (
    <div className="flex items-center gap-2 border-b border-outline-variant/40 pb-px overflow-x-auto custom-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`
              relative py-3 px-4 font-body-md text-sm font-semibold transition-all duration-150 whitespace-nowrap
              flex items-center gap-2 border-none bg-transparent cursor-pointer select-none
              ${
                isActive
                  ? 'text-secondary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }
            `}
          >
            {tab.icon && (
              <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-secondary' : 'text-on-surface-variant'}`}>
                {tab.icon}
              </span>
            )}
            <span>{tab.label}</span>

            {tab.badgeCount !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isActive ? 'bg-secondary text-white' : 'bg-surface-container text-on-surface-variant'
              }`}>
                {tab.badgeCount}
              </span>
            )}

            {/* Active Bottom Bar Indicator */}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-t-full shadow-xs" />
            )}
          </button>
        );
      })}
    </div>
  );
};
