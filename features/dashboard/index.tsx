import React from 'react';
import { PageTitle } from '@/shared/components/ui/PageTitle';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/components/ui/badge';

export const Dashboard = () => {
    return (
        <div className="space-y-lg">
            <PageTitle
                level={1}
                title="Métricas & Visualizaciones Operativas"
                subtitle=" Espacios de análisis gráfico asignados para el seguimiento continuo de los módulos clave."
            />

            {/* Section: Key Module Visualizations & Chart Spaces */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="text-xs px-4 py-1.5">
                            <span className="material-symbols-outlined text-[16px] mr-1">calendar_today</span>
                            Últimos 12 Meses
                        </Button>
                        <Button variant="outline" className="text-xs px-4 py-1.5">
                            <span className="material-symbols-outlined text-[16px] mr-1">tune</span>
                            Filtrar
                        </Button>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chart 1: Producción & Extracción */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-[50px] bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                    <span className="material-symbols-outlined text-xl">factory</span>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-text-heading">
                                        Producción • Extracción vs Metas Mensuales
                                    </h3>
                                    <p className="text-xs text-text-muted">
                                        Seguimiento de tonelaje extraído y cumplimiento de proyección operativa.
                                    </p>
                                </div>
                            </div>
                            <Badge variant="budget">Producción</Badge>
                        </div>

                        {/* Chart Canvas Area Placeholder */}
                        <div className="w-full h-64 rounded-xl border border-dashed border-border bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden group">
                            {/* Background Grid Lines */}
                            <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none opacity-25">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="border-b border-r border-slate-300" />
                                ))}
                            </div>
                            <div className="flex flex-col items-center z-10 text-center px-4">
                                <div className="w-12 h-12 rounded-[50px] bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-2 shadow-2xs">
                                    <span className="material-symbols-outlined text-2xl">bar_chart</span>
                                </div>
                                <span className="text-sm font-bold text-text-heading">
                                    Gráfico de Producción
                                </span>
                                <span className="text-xs text-text-muted mt-0.5">
                                    Espacio asignado para visualización de toneladas y metas
                                </span>
                            </div>
                        </div>

                        {/* Legend Placeholder */}
                        <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-border/60 text-xs text-text-muted">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-brand-dark" />
                                <span>Toneladas Reales</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-400" />
                                <span>Meta Proyectada</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart 2: Títulos Mineros */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-[50px] bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                    <span className="material-symbols-outlined text-xl">description</span>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-text-heading">
                                        Títulos Mineros • Distribución por Etapa y Estado
                                    </h3>
                                    <p className="text-xs text-text-muted">
                                        Proporción de títulos en Exploración, Construcción y Explotación.
                                    </p>
                                </div>
                            </div>
                            <Badge variant="status">Títulos</Badge>
                        </div>

                        {/* Chart Canvas Area Placeholder */}
                        <div className="w-full h-64 rounded-xl border border-dashed border-border bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none opacity-25">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="border-b border-r border-slate-300" />
                                ))}
                            </div>
                            <div className="flex flex-col items-center z-10 text-center px-4">
                                <div className="w-12 h-12 rounded-[50px] bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-2 shadow-2xs">
                                    <span className="material-symbols-outlined text-2xl">pie_chart</span>
                                </div>
                                <span className="text-sm font-bold text-text-heading">
                                    Distribución de Títulos
                                </span>
                                <span className="text-xs text-text-muted mt-0.5">
                                    Espacio asignado para gráfico de composición y vigencias
                                </span>
                            </div>
                        </div>

                        {/* Legend Placeholder */}
                        <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-border/60 text-xs text-text-muted">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-brand-dark" />
                                <span>Explotación</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <span>Construcción</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-400" />
                                <span>Exploración</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart 3: Explosivos */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-[50px] bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                    <span className="material-symbols-outlined text-xl">warning</span>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-text-heading">
                                        Explosivos • Consumo y Nivel de Polvorín
                                    </h3>
                                    <p className="text-xs text-text-muted">
                                        Control de existencias y egresos de material regulado por período.
                                    </p>
                                </div>
                            </div>
                            <Badge variant="status">Explosivos</Badge>
                        </div>

                        {/* Chart Canvas Area Placeholder */}
                        <div className="w-full h-64 rounded-xl border border-dashed border-border bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none opacity-25">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="border-b border-r border-slate-300" />
                                ))}
                            </div>
                            <div className="flex flex-col items-center z-10 text-center px-4">
                                <div className="w-12 h-12 rounded-[50px] bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-2 shadow-2xs">
                                    <span className="material-symbols-outlined text-2xl">monitoring</span>
                                </div>
                                <span className="text-sm font-bold text-text-heading">
                                    Inventario y Consumo
                                </span>
                                <span className="text-xs text-text-muted mt-0.5">
                                    Espacio asignado para monitoreo de stock en polvorines
                                </span>
                            </div>
                        </div>

                        {/* Legend Placeholder */}
                        <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-border/60 text-xs text-text-muted">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-brand-dark" />
                                <span>Consumo</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span>Stock Disponible</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart 4: Gestión Ambiental ICA */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-[50px] bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                    <span className="material-symbols-outlined text-xl">eco</span>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-text-heading">
                                        Ambiental • Cumplimiento ICA por Componente
                                    </h3>
                                    <p className="text-xs text-text-muted">
                                        Seguimiento de compromisos bióticos, abióticos y socioeconómicos.
                                    </p>
                                </div>
                            </div>
                            <Badge variant="budget">Ambiental</Badge>
                        </div>

                        {/* Chart Canvas Area Placeholder */}
                        <div className="w-full h-64 rounded-xl border border-dashed border-border bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none opacity-25">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="border-b border-r border-slate-300" />
                                ))}
                            </div>
                            <div className="flex flex-col items-center z-10 text-center px-4">
                                <div className="w-12 h-12 rounded-[50px] bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-2 shadow-2xs">
                                    <span className="material-symbols-outlined text-2xl">ssid_chart</span>
                                </div>
                                <span className="text-sm font-bold text-text-heading">
                                    Cumplimiento de Obligaciones ICA
                                </span>
                                <span className="text-xs text-text-muted mt-0.5">
                                    Espacio asignado para porcentaje de avance y requerimientos
                                </span>
                            </div>
                        </div>

                        {/* Legend Placeholder */}
                        <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-border/60 text-xs text-text-muted">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-brand-dark" />
                                <span>Biótico</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <span>Abiótico</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span>Social</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


