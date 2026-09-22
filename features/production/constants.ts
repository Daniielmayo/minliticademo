import { ProductionRecord, AccumulatedMetric, MineDistribution, ProductionLog, ProductionMetric, RoyaltyRecord, MachineryMetric } from './types';

// Mockup screen data
export const productionRecords: ProductionRecord[] = [
  {
    id: "REC-001",
    titulo: "T-001",
    minaFrente: "Socavón Norte",
    fecha: "Oct 24, 2023",
    onzasProducidas: 145.2,
    hhs: 320,
    maquinaria: "Perf-01, Carg-02",
    estado: "Validado",
  },
  {
    id: "REC-002",
    titulo: "T-001",
    minaFrente: "Nivel 4",
    fecha: "Oct 24, 2023",
    onzasProducidas: 89.5,
    hhs: 180,
    maquinaria: "Perf-03",
    estado: "En Revisión",
  },
  {
    id: "REC-003",
    titulo: "T-002",
    minaFrente: "Tajo Abierto",
    fecha: "Oct 23, 2023",
    onzasProducidas: 210.8,
    hhs: 450,
    maquinaria: "Exc-01, Volq-12",
    estado: "Validado",
  },
  {
    id: "REC-004",
    titulo: "T-002",
    minaFrente: "Rampa Sur",
    fecha: "Oct 23, 2023",
    onzasProducidas: 0.0,
    hhs: 120,
    maquinaria: "Mantenimiento",
    estado: "Detenida",
  }
];

export const accumulatedMetrics: AccumulatedMetric[] = [
  { mes: "ENE", real: 1200, budget: 1500 },
  { mes: "FEB", real: 2500, budget: 2400 },
  { mes: "MAR", real: 4500, budget: 4200 },
  { mes: "ABR", real: 7000, budget: 6800 },
  { mes: "MAY", real: 9500, budget: 9200 },
  { mes: "JUN", real: 12450, budget: 12000 }
];

export const mineDistributions: MineDistribution[] = [
  { name: "Socavón Norte", onzas: 4250, maxVal: 4500 },
  { name: "Tajo Abierto", onzas: 3800, maxVal: 4500 },
  { name: "Nivel 4", onzas: 2900, maxVal: 4500 },
  { name: "Rampa Sur", onzas: 1500, maxVal: 4500 }
];

// Production Metrics View data
export const productionLogs: ProductionLog[] = [
  {
    id: "PROD-001",
    lote: "Lote A-12",
    mineral: "Carbón Térmico",
    cantidad: 1540,
    fecha: "2026-08-12",
    encargado: "Ing. Carlos Mendoza",
    estado: "Completado",
    location: "Mina La Esmeralda",
  },
  {
    id: "PROD-002",
    lote: "Lote B-05",
    mineral: "Oro (Concentrado)",
    cantidad: 12.5,
    fecha: "2026-08-12",
    encargado: "Dra. Sofía Ortega",
    estado: "Completado",
    location: "Planta El Peñón",
  },
  {
    id: "PROD-003",
    lote: "Lote A-13",
    mineral: "Carbón Metalúrgico",
    cantidad: 980,
    fecha: "2026-08-11",
    encargado: "Ing. Carlos Mendoza",
    estado: "Completado",
    location: "Mina La Esmeralda",
  },
  {
    id: "PROD-004",
    lote: "Lote C-22",
    mineral: "Cobre",
    cantidad: 450,
    fecha: "2026-08-10",
    encargado: "Ing. Andrés Castro",
    estado: "En Proceso",
    location: "Tajo Abierto Norte",
  },
  {
    id: "PROD-005",
    lote: "Lote B-06",
    mineral: "Oro (Concentrado)",
    cantidad: 8.2,
    fecha: "2026-08-10",
    encargado: "Dra. Sofía Ortega",
    estado: "En Proceso",
    location: "Planta El Peñón",
  },
  {
    id: "PROD-006",
    lote: "Lote A-14",
    mineral: "Carbón Térmico",
    cantidad: 1200,
    fecha: "2026-08-09",
    encargado: "Ing. Carlos Mendoza",
    estado: "Completado",
    location: "Mina La Esmeralda",
  },
  {
    id: "PROD-007",
    lote: "Lote D-01",
    mineral: "Yeso",
    cantidad: 2300,
    fecha: "2026-08-08",
    encargado: "Ing. Clara Beltrán",
    estado: "Pendiente",
    location: "Cantera Sur",
  }
];

export const productionMetrics: ProductionMetric[] = [
  { mes: "Ene", esperado: 4200, real: 4050 },
  { mes: "Feb", esperado: 4500, real: 4600 },
  { mes: "Mar", esperado: 4800, real: 4950 },
  { mes: "Abr", esperado: 5000, real: 4800 },
  { mes: "May", esperado: 5200, real: 5400 },
  { mes: "Jun", esperado: 5500, real: 5750 },
  { mes: "Jul", esperado: 5800, real: 5900 },
  { mes: "Ago", esperado: 6000, real: 3200 }
];

export const comparativeMetrics = [
  { year: "2020", gramosAu: 41812.86, ton: 510.18, tenorPonderado: 83.95, titulos: ["T-001", "T-002"], minas: ["Socavón Norte", "Tajo Abierto"] },
  { year: "2021", gramosAu: 38276.04, ton: 1564.69, tenorPonderado: 24.11, titulos: ["T-001"], minas: ["Nivel 4"] },
  { year: "2022", gramosAu: 69283.39, ton: 1969.36, tenorPonderado: 34.67, titulos: ["T-002"], minas: ["Rampa Sur"] },
];


export const distributionMetrics = [
  { name: "Carbón Térmico", value: 45 },
  { name: "Carbón Metalúrgico", value: 25 },
  { name: "Oro (Concentrado)", value: 15 },
  { name: "Cobre", value: 10 },
  { name: "Otros", value: 5 }
];

export const royaltyRecords: RoyaltyRecord[] = [
  { id: "REG-001", titulo: "T-001", mina: "Socavón Norte", fechaPago: "2023-10-15", monto: 12500000, estado: "Pagado" },
  { id: "REG-002", titulo: "T-002", mina: "Tajo Abierto", fechaPago: "2023-10-16", monto: 8400000, estado: "En Revisión" },
  { id: "REG-003", titulo: "T-001", mina: "Nivel 4", fechaPago: "2023-11-02", monto: 4200000, estado: "Pendiente" },
];

export const machineryMetrics: (MachineryMetric & { titulo: string; mina: string })[] = [
  { equipo: "Excavadora 01", horasOperativas: 240, horasMantenimiento: 20, disponibilidad: 92.3, titulo: "T-001", mina: "Socavón Norte" },
  { equipo: "Cargador Frontal 03", horasOperativas: 180, horasMantenimiento: 45, disponibilidad: 80.0, titulo: "T-002", mina: "Tajo Abierto" },
  { equipo: "Volqueta 12", horasOperativas: 310, horasMantenimiento: 10, disponibilidad: 96.8, titulo: "T-001", mina: "Nivel 4" },
  { equipo: "Perforadora 02", horasOperativas: 150, horasMantenimiento: 60, disponibilidad: 71.4, titulo: "T-002", mina: "Rampa Sur" },
];
