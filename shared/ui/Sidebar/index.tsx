"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarSubItem {
    label: string;
    href: string;
    icon: string;
    badge?: string;
}

export interface SidebarLink {
    label: string;
    icon: string;
    href: string;
    category?: string;
    badge?: string;
    subItems?: SidebarSubItem[];
}

export interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

interface SidebarSection {
    category: string;
    links: SidebarLink[];
}

interface TooltipState {
    link: SidebarLink;
    top: number;
    left: number;
}

const SIDEBAR_SECTIONS: SidebarSection[] = [
    {
        category: "Principal",
        links: [
            { label: "Home", icon: "dashboard", href: "/dashboard" },
            { label: "Títulos", icon: "description", href: "/dashboard/titles" },
        ]
    },
    {
        category: "Operaciones",
        links: [
            {
                label: "Producción",
                icon: "factory",
                href: "#",
                subItems: [
                    { label: "Producción General", href: "/dashboard/production/general", icon: "analytics" },
                    { label: "Métricas de Producción", href: "/dashboard/production/metrics", icon: "bar_chart" },
                ]
            },
            {
                label: "Explosivos",
                icon: "warning",
                href: "#",
                subItems: [
                    { label: "Reporte de Inventario", href: "/dashboard/explosives/inventory", icon: "inventory" },
                    { label: "Administración", href: "/dashboard/explosives/administration", icon: "admin_panel_settings" },
                ]
            },
        ]
    },
    {
        category: "Gestión & Control",
        links: [
            { label: "Ambiental", icon: "eco", href: "/dashboard/environmental" },
            { label: "Riesgos", icon: "report_problem", href: "#", badge: "Pronto" },
            { label: "HS (SST)", icon: "health_and_safety", href: "/dashboard/hs" },
        ]
    }
];

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
    const pathname = usePathname();
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
    const [tooltip, setTooltip] = useState<TooltipState | null>(null);
    const tooltipHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Check if a link has an active subitem
    const hasActiveSubItem = (link: SidebarLink) => {
        return link.subItems?.some(sub => pathname === sub.href || pathname.startsWith(sub.href)) ?? false;
    };

    // Keep active menus expanded on load or pathname change
    useEffect(() => {
        SIDEBAR_SECTIONS.forEach(section => {
            section.links.forEach(link => {
                if (link.subItems && hasActiveSubItem(link)) {
                    setExpandedMenus(prev => ({ ...prev, [link.label]: true }));
                }
            });
        });
    }, [pathname]);

    // Hide tooltip when sidebar expands
    useEffect(() => {
        if (!isCollapsed) setTooltip(null);
    }, [isCollapsed]);

    const isLinkActive = (link: SidebarLink) => {
        if (link.subItems) return hasActiveSubItem(link);
        if (link.href === '#') return false;
        if (link.href === '/dashboard') return pathname === '/dashboard';
        return pathname.startsWith(link.href);
    };

    const toggleSubMenu = (label: string) => {
        setExpandedMenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const showTooltip = useCallback((e: React.MouseEvent<HTMLElement>, link: SidebarLink) => {
        if (!isCollapsed) return;
        if (tooltipHideTimer.current) clearTimeout(tooltipHideTimer.current);
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setTooltip({
            link,
            top: rect.top + rect.height / 2,
            left: rect.right + 12,
        });
    }, [isCollapsed]);

    const hideTooltip = useCallback(() => {
        tooltipHideTimer.current = setTimeout(() => setTooltip(null), 120);
    }, []);

    const keepTooltip = useCallback(() => {
        if (tooltipHideTimer.current) clearTimeout(tooltipHideTimer.current);
    }, []);

    return (
        <>
            {/* ── Sidebar ── */}
            <aside
                className={`
                    h-[calc(100vh-24px)] my-3 ml-3
                    bg-brand-primary text-white flex flex-col
                    fixed left-0 top-0 z-50
                    transition-all duration-300 ease-in-out
                    shadow-[0_8px_32px_rgba(2,13,62,0.28),0_2px_8px_rgba(2,13,62,0.18)]
                    rounded-[28px]
                    ${isCollapsed ? 'w-20' : 'w-72'}
                `}
            >
                {/* Header / Brand Logo */}
                <div className={`px-5 flex items-center h-20 shrink-0 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isCollapsed ? (
                        <div className="flex items-center gap-3 animate-in fade-in duration-300 select-none">
                            <div className="w-10 h-10 rounded-[50px] bg-brand-dark flex items-center justify-center shadow-md shrink-0">
                                <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    dataset
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-headline-sm text-[18px] font-bold tracking-tight text-white leading-tight">
                                    Minlítica
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold">
                                    Enerlítica SAS
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-[50px] bg-brand-dark flex items-center justify-center shadow-md">
                            <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                dataset
                            </span>
                        </div>
                    )}

                    {!isCollapsed && (
                        <button
                            onClick={onToggle}
                            title="Contraer Menú"
                            className="flex items-center justify-center w-8 h-8 rounded-[50px] text-white/70 hover:bg-brand-primary-hover hover:text-white cursor-pointer transition-all duration-200 border-none bg-transparent active:scale-95 shrink-0"
                        >
                            <span className="material-symbols-outlined text-[22px]">menu_open</span>
                        </button>
                    )}
                </div>

                {/* Expand button when collapsed */}
                {isCollapsed && (
                    <div className="flex justify-center pt-1 pb-2 shrink-0">
                        <button
                            onClick={onToggle}
                            title="Expandir Menú"
                            className="flex items-center justify-center w-9 h-9 rounded-[50px] text-white/70 hover:bg-brand-primary-hover hover:text-white cursor-pointer transition-all duration-200 border-none bg-transparent active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[22px]">menu</span>
                        </button>
                    </div>
                )}

                {/* Navigation Links */}
                <nav className="flex-1 px-3.5 space-y-4 pt-2 overflow-y-auto custom-scrollbar">
                    {SIDEBAR_SECTIONS.map((section, sIndex) => (
                        <div key={sIndex} className="space-y-1">
                            {/* Section Header (expanded only) */}
                            {!isCollapsed && (
                                <div className="px-3 pt-2 pb-1">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300/90 select-none">
                                        {section.category}
                                    </span>
                                </div>
                            )}

                            {/* Section divider when collapsed */}
                            {isCollapsed && sIndex > 0 && (
                                <div className="w-9 h-px bg-white/10 mx-auto my-2" />
                            )}

                            {/* Section Items */}
                            {section.links.map((link, idx) => {
                                const isActive = isLinkActive(link);
                                const isExpanded = !!expandedMenus[link.label];
                                const hasSubs = !!link.subItems;
                                const hasActiveSub = hasSubs && hasActiveSubItem(link);
                                const isDisabled = link.badge === 'Pronto' || (link.href === '#' && !hasSubs);

                                const iconContent = (
                                    <div className="relative shrink-0 flex items-center justify-center">
                                        <span className={`material-symbols-outlined text-[24px] transition-all duration-200 ${
                                            isDisabled
                                                ? 'text-white/30'
                                                : isActive
                                                    ? 'text-white'
                                                    : 'text-white/75 group-hover:text-white group-hover:scale-110'
                                        }`}>
                                            {link.icon}
                                        </span>
                                        {/* Sub-indicator dot (collapsed only) */}
                                        {isCollapsed && hasSubs && (
                                            <span className={`
                                                absolute -top-0.5 -right-1 w-2.5 h-2.5 rounded-full border-[1.5px] border-brand-primary
                                                transition-all duration-200
                                                ${hasActiveSub
                                                    ? 'bg-details shadow-[0_0_6px_rgba(241,186,58,0.8)]'
                                                    : 'bg-white/40'
                                                }
                                            `} />
                                        )}
                                    </div>
                                );

                                const baseClass = `
                                    relative flex items-center justify-between
                                    transition-all duration-150 group select-none
                                    ${isCollapsed ? 'w-12 h-12 mx-auto rounded-2xl justify-center px-0' : 'py-3 px-4 rounded-[50px] w-full'}
                                    ${isDisabled
                                        ? 'opacity-40 cursor-not-allowed'
                                        : isActive
                                            ? 'cursor-pointer bg-brand-dark text-white font-semibold shadow-md shadow-secondary/20'
                                            : 'cursor-pointer text-white/80 hover:bg-brand-primary-hover hover:text-white'
                                    }
                                `;

                                return (
                                    <div key={idx} className="flex flex-col">
                                        {/* ── COLLAPSED MODE ── */}
                                        {isCollapsed ? (
                                            isDisabled ? (
                                                <div className={`${baseClass}`}>
                                                    {iconContent}
                                                </div>
                                            ) : hasSubs ? (
                                                <button
                                                    className={`${baseClass} border-none`}
                                                    onMouseEnter={(e) => showTooltip(e, link)}
                                                    onMouseLeave={hideTooltip}
                                                >
                                                    {iconContent}
                                                </button>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className={baseClass}
                                                    onMouseEnter={(e) => showTooltip(e, link)}
                                                    onMouseLeave={hideTooltip}
                                                    onClick={() => setTooltip(null)}
                                                >
                                                    {iconContent}
                                                </Link>
                                            )
                                        ) : isDisabled ? (
                                            /* ── EXPANDED + DISABLED ── */
                                            <div className={baseClass}>
                                                <div className="flex items-center gap-3.5 min-w-0">
                                                    {iconContent}
                                                    <span className="font-body-md text-[15px] font-medium whitespace-nowrap tracking-normal truncate text-white/30">
                                                        {link.label}
                                                    </span>
                                                </div>
                                                <span className="ml-auto shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-[50px] bg-white/10 text-white/40">
                                                    {link.badge}
                                                </span>
                                            </div>
                                        ) : hasSubs ? (
                                            /* ── EXPANDED + HAS SUBS ── accordion toggle */
                                            <button
                                                onClick={() => toggleSubMenu(link.label)}
                                                className={`${baseClass} border-none text-left`}
                                            >
                                                <div className="flex items-center gap-3.5 min-w-0">
                                                    {iconContent}
                                                    <span className={`font-body-md text-[15px] whitespace-nowrap tracking-normal transition-all duration-200 truncate ${isActive ? "font-bold text-white" : "font-semibold text-white/90 group-hover:text-white"}`}>
                                                        {link.label}
                                                    </span>
                                                </div>
                                                <span className={`material-symbols-outlined ml-auto shrink-0 text-[20px] text-white/60 group-hover:text-white transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                                                    expand_more
                                                </span>
                                            </button>
                                        ) : (
                                            /* ── EXPANDED + NO SUBS ── regular Link */
                                            <Link href={link.href} className={baseClass}>
                                                <div className="flex items-center gap-3.5 min-w-0">
                                                    {iconContent}
                                                    <span className={`font-body-md text-[15px] whitespace-nowrap tracking-normal transition-all duration-200 truncate ${isActive ? "font-bold text-white" : "font-semibold text-white/90 group-hover:text-white"}`}>
                                                        {link.label}
                                                    </span>
                                                </div>
                                            </Link>
                                        )}

                                        {/* Subitems Accordion (expanded mode only) */}
                                        {hasSubs && !isCollapsed && (
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-125 opacity-100 mt-1 mb-1 pl-4 ml-4 border-l-2 border-white/15 space-y-1' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                                                {link.subItems?.map((sub, sIdx) => {
                                                    const isSubActive = pathname === sub.href || pathname.startsWith(sub.href);
                                                    return (
                                                        <Link
                                                            key={sIdx}
                                                            href={sub.href}
                                                            className={`flex items-center gap-2.5 py-2 px-4 rounded-[50px] text-[13.5px] transition-all duration-150 group/sub ${
                                                                isSubActive
                                                                    ? "bg-brand-dark text-white font-bold shadow-xs"
                                                                    : "text-white/75 font-medium hover:bg-brand-primary-hover hover:text-white"
                                                            }`}
                                                        >
                                                            <span className={`material-symbols-outlined text-[18px] transition-colors ${isSubActive ? "text-details" : "text-white/60 group-hover/sub:text-white"}`}>
                                                                {sub.icon}
                                                            </span>
                                                            <span className="leading-tight whitespace-normal">{sub.label}</span>
                                                            {isSubActive && (
                                                                <span className="ml-auto w-2 h-2 rounded-full bg-details shrink-0" />
                                                            )}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                {/* Footer: System Status */}
                <div className="shrink-0 p-3.5">
                    {!isCollapsed ? (
                        <div className="px-4 py-3 rounded-[50px] bg-brand-primary-hover/30 flex items-center justify-between text-[12px] text-white/90 select-none border border-white/5">
                            <div className="flex items-center gap-2.5">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="font-semibold text-[12px]">Plataforma Online</span>
                            </div>
                            <span className="text-[10px] text-white/60 font-mono font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-[50px]">
                                v2.4
                            </span>
                        </div>
                    ) : (
                        <div className="flex justify-center py-1 select-none">
                            <span className="relative flex h-3 w-3" title="Sistema Online">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                        </div>
                    )}
                </div>
            </aside>

            {/* ── Tooltip Portal (rendered outside sidebar to avoid overflow clipping) ── */}
            {tooltip && isCollapsed && (
                <div
                    className="fixed z-[9999] pointer-events-auto"
                    style={{
                        top: tooltip.top,
                        left: tooltip.left,
                        transform: 'translateY(-50%)',
                    }}
                    onMouseEnter={keepTooltip}
                    onMouseLeave={hideTooltip}
                >
                    {/* Arrow */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-[5px] w-0 h-0 border-[5px] border-transparent border-r-brand-primary" />

                    {/* Tooltip box */}
                    <div className={`
                        bg-brand-primary text-white rounded-2xl shadow-2xl border border-white/10
                        animate-in fade-in slide-in-from-left-2 duration-150
                        ${tooltip.link.subItems ? 'p-3 min-w-[190px]' : 'px-3 py-2'}
                    `}>
                        {tooltip.link.subItems ? (
                            <div className="flex flex-col gap-1.5">
                                {/* Header */}
                                <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-0.5">
                                    <span className="font-bold text-white text-[11px] uppercase tracking-wider">
                                        {tooltip.link.label}
                                    </span>
                                    <span className="text-[9px] text-slate-400 font-mono bg-white/5 px-1.5 py-0.5 rounded-full">
                                        SUBMENÚ
                                    </span>
                                </div>
                                {/* Sub-links */}
                                {tooltip.link.subItems.map((sub, i) => {
                                    const isSubActive = pathname === sub.href || pathname.startsWith(sub.href);
                                    return (
                                        <Link
                                            key={i}
                                            href={sub.href}
                                            onClick={() => setTooltip(null)}
                                            className={`px-3 py-1.5 rounded-xl text-[12px] flex items-center gap-2 transition-colors ${
                                                isSubActive
                                                    ? 'bg-brand-primary text-white font-semibold'
                                                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            <span className={`material-symbols-outlined text-[15px] ${isSubActive ? 'text-details' : ''}`}>
                                                {sub.icon}
                                            </span>
                                            <span>{sub.label}</span>
                                            {isSubActive && (
                                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-details shrink-0" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <span className="font-medium text-[12px] whitespace-nowrap">
                                {tooltip.link.label}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
