import React from 'react';

export interface PaginationProps {
    currentRecords: number;
    totalRecords: number;
}

export const Pagination = ({ currentRecords, totalRecords }: PaginationProps) => {
    return (
        <div className="px-xl py-lg border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-md bg-card-surface">
            <div className="text-label-md text-on-surface-variant">
                Mostrando <span className="font-bold text-on-surface">{currentRecords}</span> de <span className="font-bold text-on-surface">{totalRecords}</span> registros
            </div>
            <div className="flex items-center gap-xs">
                <button className="flex items-center gap-xs px-md py-2 rounded-[50px] text-on-surface-variant hover:bg-secondary hover:text-white transition-colors font-bold cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    Anterior
                </button>
                <div className="flex items-center gap-xs">
                    <button className="w-10 h-10 flex items-center justify-center rounded-[50px] bg-brand-primary text-white font-bold text-label-md shadow-sm cursor-pointer">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-[50px] text-on-surface-variant hover:bg-secondary hover:text-white transition-colors font-bold text-label-md cursor-pointer">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-[50px] text-on-surface-variant hover:bg-secondary hover:text-white transition-colors font-bold text-label-md cursor-pointer">3</button>
                    <span className="px-2 text-on-surface-variant">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-[50px] text-on-surface-variant hover:bg-secondary hover:text-white transition-colors font-bold text-label-md cursor-pointer">8</button>
                </div>
                <button className="flex items-center gap-xs px-md py-2 rounded-[50px] text-on-surface-variant hover:bg-secondary hover:text-white transition-colors font-bold cursor-pointer">
                    Siguiente
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
            </div>
        </div>
    );
};
