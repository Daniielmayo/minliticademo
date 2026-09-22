// Explosives inventory item
export interface InventoryItem {
  id: string;
  categoria: 'Agente de Voladura' | 'Accesorio';
  item: string;
  unidad: string;
  existencia: number;
  tituloMinero: string;
  mina: string;
}

// Explosives quota per title
export interface ExplosiveQuota {
  id: string;
  tituloMinero: string;
  mina: string;
  item: string;
  unidad: string;
  cantidadConsumida: number;
  existencia: number;
  vigencia: string; // ISO Date string or simple date string
  estado: 'Vigente' | 'Por Vencer' | 'Vencido';
}

// Power Factor (Factor de Potencia) metric
export interface PowerFactorMetric {
  fecha: string;
  tituloMinero: string;
  mina: string;
  kgExplosivo: number;
  toneladasExtraidas: number;
  factorDePotencia: number; // kg / ton
}

// Burning record (Actas de Quema)
export interface BurningRecord {
  id: string;
  fecha: string;
  tituloMinero: string;
  mina: string;
  frenteTrabajo: string;
  cantidadConsumida: number;
  toneladasArrancadas: number;
  factorPotencia: number;
  responsable: string;
  documentoRef: string;
}

// Consumption statistics (monthly)
export interface ConsumptionStat {
  mes: string;
  tituloMinero?: string;
  mina?: string;
  indugelKg: number;
  anfoKg: number;
  detonadoresUds: number;
  mechasMts: number;
  toneladasExtraidas?: number;
  factorDePotencia?: number;
}
