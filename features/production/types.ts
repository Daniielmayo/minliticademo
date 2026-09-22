export interface ProductionLog {
  id: string;
  lote: string;
  mineral: string;
  cantidad: number; // in Toneladas (t)
  fecha: string;
  encargado: string;
  estado: 'Completado' | 'En Proceso' | 'Pendiente';
  location: string;
}

export interface ProductionMetric {
  mes: string;
  esperado: number;
  real: number;
}

export interface ProductionRecord {
  id: string;
  titulo: string;
  minaFrente: string;
  fecha: string;
  onzasProducidas: number;
  hhs: number;
  maquinaria: string;
  estado: 'Validado' | 'En Revisión' | 'Detenida';
}

export interface AccumulatedMetric {
  mes: string;
  real: number;
  budget: number;
}

export interface MineDistribution {
  name: string;
  onzas: number;
  maxVal: number; // For progress bar percentage
}

export interface RoyaltyRecord {
  id: string;
  titulo: string;
  mina: string;
  fechaPago: string;
  monto: number;
  estado: 'Pagado' | 'Pendiente' | 'En Revisión';
}

export interface MachineryMetric {
  equipo: string;
  horasOperativas: number;
  horasMantenimiento: number;
  disponibilidad: number; // Porcentaje
}
