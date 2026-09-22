"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export const Topbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full h-20 flex justify-between items-center px-margin-desktop bg-white/95 backdrop-blur-md border-b border-brand-primary/15 shadow-[0_2px_12px_rgba(2,13,62,0.06)] transition-all">
            <div className="flex items-center gap-3">
                <span className="ml-4 font-headline-sm text-[17px] font-bold text-brand-primary tracking-tight">
                    Minlítica • Sistema de Gestión Minera
                </span>
            </div>

            {/* User Profile */}
            <div className="relative">
                <div
                    className="flex items-center gap-md cursor-pointer select-none"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary/20 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            alt="User Profile"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrYlSiSIM7_a_3XnPMbxcbLq586Dn8iJq_vml6hk0LHUw1rs6ByX5HuoB7X2_T_cfBPwJQ-bsolGChnMw2HnItref-_tLOWav2SvjTO6Eb3Ea84cd6i8oxXI0eMpTIrwvl08wUFNcvvWXPYkyyceyptT4HuaCDvgM4GVdGa3U-WlyoW7RcN3sH0PZLjo-nEiXvg6-0twfp7MESsv-nYaan-YsDB6uvb-2RJDkMxR9SC_l9puc1LwpobIByl77p9PoP3HhgcO5_9HA"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] text-brand-primary font-bold leading-tight">Natashia Bunny</span>
                        <span className="text-[12px] text-slate-500 font-medium">natashiabunny@mail.com</span>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-text-muted ml-sm">
                        keyboard_arrow_down
                    </span>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <>
                        {/* Invisible overlay to close dropdown when clicking outside */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsDropdownOpen(false)}
                        ></div>
                        <div className="absolute top-16 right-0 w-48 bg-card-surface rounded-xl shadow-2xl border border-border py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <Link href="#" className="flex items-center px-lg py-3 hover:bg-brand-primary/5 transition-all group">
                                <span className="material-symbols-outlined text-text-muted group-hover:text-brand-primary mr-sm">person</span>
                                <span className="font-body-md text-text-body">Perfil</span>
                            </Link>
                            <Link href="#" className="flex items-center px-lg py-3 hover:bg-brand-primary/5 transition-all group">
                                <span className="material-symbols-outlined text-text-muted group-hover:text-brand-primary mr-sm">settings</span>
                                <span className="font-body-md text-text-body">Configuración</span>
                            </Link>
                            <div className="h-px bg-border my-2"></div>
                            <Link href="/login" className="flex items-center px-lg py-3 hover:bg-red-50 transition-all group">
                                <span className="material-symbols-outlined text-red-600 mr-sm">logout</span>
                                <span className="font-body-md text-red-600 font-medium">Salir</span>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

