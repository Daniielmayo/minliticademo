import React from 'react';
import { AlertCardProps } from '../types';

export const AlertCard = ({
    variant,
    icon,
    badgeLabel,
    title,
    description,
    statusLabel,
    statusValue,
    onClick
}: AlertCardProps) => {
    const variants = {
        critical: {
            container: "bg-[#FDE2E2] border-[#FBC4C4] hover:shadow-xl hover:shadow-[#FDE2E2]/30",
            iconBg: "bg-[#FFF0F0]",
            iconAndArrow: "text-[#8B0000]",
            badge: "bg-[#8B0000] text-white",
            title: "text-[#8B0000]",
            description: "text-[#A83232]",
            statusLabel: "text-[#C05656]",
            statusValue: "text-[#8B0000]"
        },
        warning: {
            container: "bg-[#FEE3A2] border-[#FDD475] hover:shadow-xl hover:shadow-[#FEE3A2]/50",
            iconBg: "bg-[#FFF6DF]",
            iconAndArrow: "text-[#2B2302]",
            badge: "bg-[#2B2302] text-white",
            title: "text-[#2B2302]",
            description: "text-[#4A3D0B]",
            statusLabel: "text-[#6B5A1C]",
            statusValue: "text-[#2B2302]"
        },
        success: {
            container: "bg-[#D1F2D9] border-[#A3E5B5] hover:shadow-xl hover:shadow-[#D1F2D9]/30",
            iconBg: "bg-[#EEFBF2]",
            iconAndArrow: "text-[#0F5132]",
            badge: "bg-[#0F5132] text-white",
            title: "text-[#0F5132]",
            description: "text-[#157347]",
            statusLabel: "text-[#198754]",
            statusValue: "text-[#0F5132]"
        },
        info: {
            container: "bg-[#D3E2FD] border-[#A8C7FA] hover:shadow-xl hover:shadow-[#D3E2FD]/30",
            iconBg: "bg-[#EEF4FF]",
            iconAndArrow: "text-[#0B5ED7]",
            badge: "bg-[#0B5ED7] text-white",
            title: "text-[#0B5ED7]",
            description: "text-[#3182CE]",
            statusLabel: "text-[#4299E1]",
            statusValue: "text-[#0B5ED7]"
        }
    };

    const currentStyle = variants[variant] || variants.info;

    return (
        <div 
            className={`${currentStyle.container} border-[1.5px] rounded-[32px] p-8 shadow-sm flex flex-col justify-between group transition-all duration-300 min-h-[320px] ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            <div className="flex justify-between items-start w-full">
                <div className={`w-12 h-12 flex items-center justify-center ${currentStyle.iconBg} rounded-2xl shadow-sm`}>
                    <span className={`material-symbols-outlined text-[24px] ${currentStyle.iconAndArrow}`} style={{ fontVariationSettings: '"FILL" 1' }}>
                        {icon}
                    </span>
                </div>
                <span className={`${currentStyle.badge} text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider`}>
                    {badgeLabel}
                </span>
            </div>
            
            <div className="mt-8 flex-1 flex flex-col justify-center">
                <h4 className={`font-bold text-2xl tracking-tight ${currentStyle.title} mb-2`}>
                    {title}
                </h4>
                <p className={`text-base leading-relaxed ${currentStyle.description}`}>
                    {description}
                </p>
            </div>
            
            <div className="mt-8 flex items-end justify-between w-full">
                <div className="flex flex-col">
                    <span className={`text-[10px] font-bold tracking-wider ${currentStyle.statusLabel} uppercase mb-1`}>
                        {statusLabel}
                    </span>
                    <span className={`text-xl font-bold ${currentStyle.statusValue}`}>
                        {statusValue}
                    </span>
                </div>
                <span className={`material-symbols-outlined text-[28px] ${currentStyle.iconAndArrow} group-hover:translate-x-1.5 transition-transform duration-300`}>
                    arrow_forward
                </span>
            </div>
        </div>
    );
};
