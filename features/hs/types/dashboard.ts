export type CategoriaComplianceEnum =
  | 'SG-SST'
  | 'Seguridad social'
  | 'Gestión de riesgos'
  | 'Seguridad minera crítica'
  | 'Maquinaria/equipos'
  | 'Emergencias'
  | 'Capacitación/EPP'
  | 'Accidentes/investigaciones'
  | 'Cierre de hallazgos';

export interface CategoriaCumplimiento {
  categoria: CategoriaComplianceEnum;
  peso: number; // Decimal (e.g. 0.15 = 15%)
  porcentaje_cumplimiento: number; // 0 to 100
}

export interface DashboardKPIs {
  titulosActivos: number;
  operadores: number;
  subcontratos: number;
  trabajadores: number;
  porcentajeCumplimientoSST: number;
  hallazgosCriticos: number;
  hallazgosVencidos: number;
  accidentesUltimos12Meses: number;
  porcentajeAccionesCerradas: number;
}

export interface BloqueGestionInfo {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;
  miniKpiLabel: string;
  miniKpiValue: string | number;
  porcentajeCumplimiento: number; // 0 to 100
  miniKpiStatus?: 'success' | 'warning' | 'error' | 'info';
}
