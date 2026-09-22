import { InventoryItem, ExplosiveQuota, PowerFactorMetric, BurningRecord, ConsumptionStat } from '@/features/Explosives/types';

export const inventoryMockData: InventoryItem[] = [
  { id: '1', categoria: 'Agente de Voladura', item: 'Indugel', unidad: 'kg', existencia: 450.5, tituloMinero: 'T-001', mina: 'Socavón Norte' },
  { id: '2', categoria: 'Agente de Voladura', item: 'Anfol', unidad: 'kg', existencia: 1200.0, tituloMinero: 'T-002', mina: 'Tajo Abierto' },
  { id: '3', categoria: 'Agente de Voladura', item: 'Gel inyectable', unidad: 'kg', existencia: 300.0, tituloMinero: 'T-001', mina: 'Nivel 4' },
  { id: '4', categoria: 'Accesorio', item: 'Mecha de seguridad', unidad: 'mts', existencia: 5000, tituloMinero: 'T-002', mina: 'Rampa Sur' },
  { id: '5', categoria: 'Accesorio', item: 'Detonadores comunes', unidad: 'uds', existencia: 2500, tituloMinero: 'T-001', mina: 'Socavón Norte' },
  { id: '6', categoria: 'Accesorio', item: 'Detonadores no eléctricos', unidad: 'uds', existencia: 1000, tituloMinero: 'T-002', mina: 'Tajo Abierto' },
  { id: '7', categoria: 'Accesorio', item: 'Detonadores eléctricos', unidad: 'uds', existencia: 800, tituloMinero: 'T-001', mina: 'Nivel 4' },
];

export const quotaMockData: ExplosiveQuota[] = [
  { id: 'Q1', tituloMinero: 'T-001', mina: 'Socavón Norte', item: 'Indugel', unidad: 'kg', cantidadConsumida: 3500, existencia: 1500, vigencia: '2024-12-31', estado: 'Vigente' },
  { id: 'Q2', tituloMinero: 'T-002', mina: 'Tajo Abierto', item: 'Anfol', unidad: 'kg', cantidadConsumida: 3000, existencia: 500, vigencia: '2023-11-15', estado: 'Por Vencer' },
  { id: 'Q3', tituloMinero: 'T-003', mina: 'Otra Mina', item: 'Mecha de seguridad', unidad: 'mts', cantidadConsumida: 1000, existencia: 0, vigencia: '2023-01-01', estado: 'Vencido' },
];

export const powerFactorMockData: PowerFactorMetric[] = [
  { fecha: '2023-10-01', tituloMinero: 'T-001', mina: 'Socavón Norte', kgExplosivo: 1200, toneladasExtraidas: 1000, factorDePotencia: 1.2 },
  { fecha: '2023-10-02', tituloMinero: 'T-002', mina: 'Tajo Abierto', kgExplosivo: 1050, toneladasExtraidas: 1000, factorDePotencia: 1.05 },
  { fecha: '2023-10-03', tituloMinero: 'T-001', mina: 'Nivel 4', kgExplosivo: 800, toneladasExtraidas: 1000, factorDePotencia: 0.8 },
];

export const burningRecordsMockData: BurningRecord[] = [
  { id: 'ACT-001', fecha: '2023-10-15', tituloMinero: 'T-001', mina: 'Socavón Norte', frenteTrabajo: 'Nivel 4', cantidadConsumida: 150.5, toneladasArrancadas: 250, factorPotencia: 0.6, responsable: 'Ing. Carlos Pérez', documentoRef: 'DOC-10293' },
  { id: 'ACT-002', fecha: '2023-10-16', tituloMinero: 'T-002', mina: 'Tajo Abierto', frenteTrabajo: 'Rampa Sur', cantidadConsumida: 300.0, toneladasArrancadas: 200, factorPotencia: 1.5, responsable: 'Ing. Ana Gómez', documentoRef: 'DOC-10294' },
];

export const consumptionStatsMock: ConsumptionStat[] = [
  { mes: 'May', tituloMinero: 'T-001', mina: 'Socavón Norte', indugelKg: 1000, anfoKg: 3000, detonadoresUds: 600, mechasMts: 600, toneladasExtraidas: 3500, factorDePotencia: 1.14 },
  { mes: 'Jun', tituloMinero: 'T-001', mina: 'Socavón Norte', indugelKg: 800, anfoKg: 2200, detonadoresUds: 450, mechasMts: 450, toneladasExtraidas: 2800, factorDePotencia: 1.07 },
  { mes: 'Jul', tituloMinero: 'T-001', mina: 'Socavón Norte', indugelKg: 0, anfoKg: 2000, detonadoresUds: 800, mechasMts: 0, toneladasExtraidas: 2200, factorDePotencia: 0.91 }, // Anomalía
  { mes: 'Ago', tituloMinero: 'T-002', mina: 'Tajo Abierto', indugelKg: 780, anfoKg: 2000, detonadoresUds: 500, mechasMts: 500, toneladasExtraidas: 2600, factorDePotencia: 1.07 },
  { mes: 'Sep', tituloMinero: 'T-002', mina: 'Tajo Abierto', indugelKg: 890, anfoKg: 1000, detonadoresUds: 300, mechasMts: 300, toneladasExtraidas: 2000, factorDePotencia: 0.95 },
  { mes: 'Oct', tituloMinero: 'T-002', mina: 'Tajo Abierto', indugelKg: 390, anfoKg: 2000, detonadoresUds: 550, mechasMts: 550, toneladasExtraidas: 2300, factorDePotencia: 1.04 },
];

