import React from 'react';
import Link from 'next/link';

export interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
    return (
        <div className="flex w-full min-h-screen bg-[var(--page-bg)]">
            {/* Left Side: Dynamic Content */}
            <div className="w-full lg:w-[45%] flex flex-col px-md sm:px-lg md:px-3xl py-xl overflow-y-auto justify-center">
                <Link href="/login" className="flex items-center mb-xl">
                    <span
                        className="material-symbols-outlined text-brand-primary text-[32px] mr-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        dataset
                    </span>
                    <span className="font-headline-md text-headline-md font-bold text-brand-primary tracking-tight">
                        Minlítica
                    </span>
                </Link>

                <div className="flex flex-col w-full justify-center items-center h-full">
                    {/* Header Content */}
                    {title && (
                        <div className="mb-xl w-[80%]">
                            <h1 className="font-headline-lg text-headline-lg text-text-heading mb-xs font-bold leading-tight">
                                {title}
                            </h1>
                            {description && (
                                <p className="font-body-md text-body-md text-text-muted">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}

                    {children}
                </div>
            </div>

            {/* Right Side: Navy Dark Visual Container (Brand Primary) */}
            <div className="hidden lg:flex lg:w-[55%] bg-brand-primary relative overflow-hidden p-2 m-2 rounded-[32px] shadow-2xl">
                {/* Abstract Glow */}
                <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-dark opacity-30 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-sky-400 opacity-15 blur-[100px] rounded-full" />

                {/* Dashboard Preview Components */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="relative w-full flex items-center justify-center">
                        {/* Main Dashboard Window */}
                        <div className="w-[600px] bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                            <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                <div className="w-3 h-3 rounded-full bg-slate-400/80" />
                                <div className="w-3 h-3 rounded-full bg-blue-400/80" />
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-2">
                                        <div className="h-2 w-32 bg-white/20 rounded-full" />
                                        <div className="h-5 w-48 bg-white/30 rounded-full" />
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-brand-dark/40 border border-white/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white">person</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-28 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" />
                                    <div className="h-28 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" />
                                    <div className="h-28 rounded-xl bg-brand-primary/30 border border-brand-primary/50 flex flex-col justify-end p-3 hover:bg-brand-primary/40 transition-colors">
                                        <div className="h-2 w-full bg-white/20 rounded-full mb-2" />
                                        <div className="h-2 w-2/3 bg-white/30 rounded-full" />
                                    </div>
                                </div>
                                <div className="h-40 rounded-xl bg-linear-to-r from-white/5 to-white/10 border border-white/10 relative overflow-hidden">
                                    <svg className="absolute bottom-0 w-full h-24" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <path d="M0,100 L0,50 Q25,20 50,60 T100,30 L100,100 Z" fill="rgba(255,255,255,0.05)" />
                                        <path d="M0,50 Q25,20 50,60 T100,30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Floating Indicator 1 (Upper Left) */}
                        <div className="absolute top-0 left-2 bg-card-surface border border-card-border p-md rounded-xl app-card-shadow floating-element z-20 flex items-center gap-md shadow-2xl -translate-y-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-brand-dark text-[20px]">
                                    precision_manufacturing
                                </span>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">
                                    OEE Global
                                </p>
                                <p className="text-headline-sm text-brand-primary font-bold">
                                    84.2%
                                </p>
                            </div>
                            <div className="ml-sm h-8 w-1 bg-brand-dark rounded-full" />
                        </div>

                        {/* Floating Indicator 2 (Lower Right) */}
                        <div
                            className="absolute bottom-8 right-8 bg-card-surface border border-card-border p-md rounded-xl app-card-shadow floating-element z-20 shadow-2xl translate-y-4"
                            style={{ animationDelay: "-3s" }}
                        >
                            <div className="flex items-center gap-sm mb-xs">
                                <span className="material-symbols-outlined text-red-600 text-[18px]">
                                    warning
                                </span>
                                <p className="text-[11px] font-bold text-text-heading">
                                    Alertas Activas
                                </p>
                            </div>
                            <div className="flex items-baseline gap-xs">
                                <span className="text-headline-md text-brand-primary font-bold">
                                    03
                                </span>
                                <span className="text-[12px] text-red-600 font-semibold">
                                    Críticas
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

