import {
  DashboardKPIs,
  CategoriaCumplimiento,
  BloqueGestionInfo,
  PoliticaSST,
  Capacitacion,
  InduccionReinduccion,
  Copasst,
  SeguridadSocialItem,
  CategoriaRiesgo,
  MatrizRiesgoItem,
  SeguridadVialItem,
  MaquinariaItem,
  InstalacionElectricaItem,
  EppEntregaItem,
  PlanEmergenciaItem,
  BrigadaItem,
  SimulacroItem,
  EquipoEmergenciaItem,
  EventoAccidentalidadItem,
  InvestigacionItem,
  AccionCorrectivaItem,
  HorasHombreItem,
  IndicadoresAccidentalidad,
  ResponsableRef,
  TrabajadorRef,
  Evidencia,
} from '../types';

// ── Shared Transversal References ──
export const mockResponsables: ResponsableRef[] = [
  { id: 'resp-1', nombre: 'Ing. Carlos Mendoza', cargo: 'Director HSEQ / HS', email: 'carlos.mendoza@enerlitica.com' },
  { id: 'resp-2', nombre: 'Dra. María Paula Gómez', cargo: 'Coordinadora SST', email: 'maria.gomez@enerlitica.com' },
  { id: 'resp-3', nombre: 'Ing. Andrés Villalba', cargo: 'Superintendente de Mina', email: 'andres.villalba@enerlitica.com' },
];

export const mockTrabajadores: TrabajadorRef[] = [
  {
    id: 'trab-1',
    nombreCompleto: 'Juan Camilo Pérez',
    documento: '1.094.882.110',
    tipo: 'mina',
    tituloPlaca: '1886-X',
    minaNombre: 'Mina La Esmeralda',
    cargo: 'Operador de Malacate',
    empresaTipo: 'propio',
  },
  {
    id: 'trab-2',
    nombreCompleto: 'Hernán Darío Torres',
    documento: '98.542.100',
    tipo: 'mina',
    tituloPlaca: '2045-A',
    minaNombre: 'Mina El Roble',
    cargo: 'Explosivista Senior',
    empresaTipo: 'contratista',
    nombreEmpresa: 'Explosivos & Minas S.A.S.',
  },
  {
    id: 'trab-3',
    nombreCompleto: 'Laura Restrepo Henao',
    documento: '1.020.441.902',
    tipo: 'administrativo',
    areaNombre: 'Gestión Humana',
    cargo: 'Analista de Seguridad Social',
    empresaTipo: 'propio',
  },
  {
    id: 'trab-4',
    nombreCompleto: 'Roberto Gómez Bolaños',
    documento: '79.432.119',
    tipo: 'área',
    areaNombre: 'Mantenimiento Electromecánico',
    cargo: 'Técnico Electricista RETIE',
    empresaTipo: 'subcontrato',
    nombreEmpresa: 'ElectroMinería Ltda.',
  },
];

// ── Sample Evidencias ──
export const mockEvidenciaArchivo: Evidencia = {
  id: 'ev-1',
  tipo: 'archivo',
  archivo_url: '/docs/politica_sst_signed.pdf',
  nombre_archivo: 'politica_sst_firmada_2026.pdf',
  descripcion: 'Documento original firmado por gerencia general',
  fecha_carga: '2026-01-15',
  cargado_por: 'María Paula Gómez',
};

export const mockEvidenciaLink: Evidencia = {
  id: 'ev-2',
  tipo: 'link',
  link_url: 'https://drive.google.com/drive/folders/minlitica-hs-capacitaciones-2026',
  descripcion: 'Carpeta de evidencias fotográficas y listas de asistencia en Google Drive',
  fecha_carga: '2026-02-10',
  cargado_por: 'Carlos Mendoza',
};

// ── Dashboard KPIs ──
export const mockDashboardKPIs: DashboardKPIs = {
  titulosActivos: 12,
  operadores: 85,
  subcontratos: 4,
  trabajadores: 142,
  porcentajeCumplimientoSST: 88.5,
  hallazgosCriticos: 3,
  hallazgosVencidos: 1,
  accidentesUltimos12Meses: 2,
  porcentajeAccionesCerradas: 94.2,
};

// ── Categorías de Cumplimiento Ponderado ──
export const mockCategoriasCumplimiento: CategoriaCumplimiento[] = [
  { categoria: 'SG-SST', peso: 0.15, porcentaje_cumplimiento: 92.0 },
  { categoria: 'Seguridad social', peso: 0.10, porcentaje_cumplimiento: 98.0 },
  { categoria: 'Gestión de riesgos', peso: 0.15, porcentaje_cumplimiento: 85.0 },
  { categoria: 'Seguridad minera crítica', peso: 0.25, porcentaje_cumplimiento: 90.0 },
  { categoria: 'Maquinaria/equipos', peso: 0.10, porcentaje_cumplimiento: 88.0 },
  { categoria: 'Emergencias', peso: 0.10, porcentaje_cumplimiento: 82.0 },
  { categoria: 'Capacitación/EPP', peso: 0.05, porcentaje_cumplimiento: 94.0 },
  { categoria: 'Accidentes/investigaciones', peso: 0.05, porcentaje_cumplimiento: 75.0 },
  { categoria: 'Cierre de hallazgos', peso: 0.05, porcentaje_cumplimiento: 90.0 },
];

// ── Bloques de Gestión (Nivel 2) ──
export const mockBloquesGestion: BloqueGestionInfo[] = [
  {
    id: 'bloque-1',
    slug: 'sg-sst',
    nombre: 'Sistema de gestión SST',
    descripcion: 'Cumplimiento de decreto 1886: Política, Capacitaciones, Inducción y COPASST.',
    icono: 'policy',
    miniKpiLabel: 'Evidencia vigente',
    miniKpiValue: '92%',
    porcentajeCumplimiento: 92,
    miniKpiStatus: 'success',
  },
  {
    id: 'bloque-2',
    slug: 'seguridad-social',
    nombre: 'Seguridad social',
    descripcion: 'Control de EPS, ARL, Pensión y Exámenes Médicos Ocupacionales por trabajador.',
    icono: 'verified_user',
    miniKpiLabel: 'Afiliaciones vigentes',
    miniKpiValue: '98%',
    porcentajeCumplimiento: 98,
    miniKpiStatus: 'success',
  },
  {
    id: 'bloque-3',
    slug: 'riesgos-peligros',
    nombre: 'Riesgos y peligros',
    descripcion: 'Matriz de identificación de peligros y controles por tipo de labor minera.',
    icono: 'warning',
    miniKpiLabel: 'Riesgos evaluados',
    miniKpiValue: '28 riesgos',
    porcentajeCumplimiento: 85,
    miniKpiStatus: 'info',
  },
  {
    id: 'bloque-4',
    slug: 'seguridad-minera',
    nombre: 'Seguridad minera',
    descripcion: 'Planes de seguridad vial, mantenimientos de maquinaria e inspección RETIE.',
    icono: 'construction',
    miniKpiLabel: 'Mantenimientos al día',
    miniKpiValue: '90%',
    porcentajeCumplimiento: 90,
    miniKpiStatus: 'success',
  },
  {
    id: 'bloque-5',
    slug: 'epp',
    nombre: 'EPP',
    descripcion: 'Entrega y capacitación en el uso de Elementos de Protección Personal.',
    icono: 'health_and_safety',
    miniKpiLabel: 'Entregas registradas',
    miniKpiValue: '142 / 142',
    porcentajeCumplimiento: 100,
    miniKpiStatus: 'success',
  },
  {
    id: 'bloque-6',
    slug: 'emergencias',
    nombre: 'Emergencias',
    descripcion: 'Planes de respuesta, conformación de brigadas, simulacros y equipos.',
    icono: 'e911_emergency',
    miniKpiLabel: 'Simulacros / Brigadas',
    miniKpiValue: '82% Operatividad',
    porcentajeCumplimiento: 82,
    miniKpiStatus: 'warning',
  },
  {
    id: 'bloque-7',
    slug: 'accidentalidad',
    nombre: 'Accidentalidad',
    descripcion: 'Registro de accidentes, investigaciones, acciones correctivas e indicadores IF/IS.',
    icono: 'report_problem',
    miniKpiLabel: 'Acciones cerradas',
    miniKpiValue: '94.2%',
    porcentajeCumplimiento: 94.2,
    miniKpiStatus: 'success',
  },
];

// ── Bloque 1 Data ──
export const mockPoliticasSST: PoliticaSST[] = [
  {
    id: 'pol-1',
    item: 'política SST',
    existe: true,
    fecha_expedicion: '2026-01-10',
    divulgada: true,
    fecha_divulgacion: '2026-01-20',
    firmada: true,
    responsable: mockResponsables[0],
    evidencia: mockEvidenciaArchivo,
  },
  {
    id: 'pol-2',
    item: 'evaluación inicial',
    existe: true,
    fecha_expedicion: '2026-01-15',
    divulgada: true,
    fecha_divulgacion: '2026-01-22',
    firmada: true,
    responsable: mockResponsables[1],
    evidencia: mockEvidenciaLink,
  },
  {
    id: 'pol-3',
    item: 'plan anual',
    existe: true,
    fecha_expedicion: '2026-01-05',
    divulgada: true,
    fecha_divulgacion: '2026-01-12',
    firmada: true,
    responsable: mockResponsables[0],
    evidencia: mockEvidenciaArchivo,
  },
  {
    id: 'pol-4',
    item: 'matriz de riesgos',
    existe: true,
    fecha_expedicion: '2026-02-01',
    divulgada: true,
    fecha_divulgacion: '2026-02-05',
    firmada: true,
    responsable: mockResponsables[1],
    evidencia: mockEvidenciaLink,
  },
];

export const mockCapacitaciones: Capacitacion[] = [
  {
    id: 'cap-1',
    tema: 'maquinaria',
    fecha: '2026-02-15',
    numero_asistentes: 24,
    horas: 4,
    evidencia: mockEvidenciaLink,
  },
  {
    id: 'cap-2',
    tema: 'EPP',
    fecha: '2026-02-28',
    numero_asistentes: 45,
    horas: 2,
    evidencia: mockEvidenciaArchivo,
  },
  {
    id: 'cap-3',
    tema: 'trabajos seguros',
    fecha: '2026-03-02',
    numero_asistentes: 18,
    horas: 6,
    evidencia: mockEvidenciaArchivo,
  },
];

export const mockInducciones: InduccionReinduccion[] = [
  {
    id: 'ind-1',
    trabajador: mockTrabajadores[0],
    tipo: 'inducción',
    fecha: '2025-06-10',
    periodicidad_reinduccion: 'Anual',
    evidencia: mockEvidenciaArchivo,
  },
  {
    id: 'ind-2',
    trabajador: mockTrabajadores[1],
    tipo: 'reinducción',
    fecha: '2026-01-18',
    periodicidad_reinduccion: 'Anual',
    evidencia: mockEvidenciaLink,
  },
];

export const mockCopasst: Copasst[] = [
  {
    id: 'cop-1',
    miembro_nombre: 'Hernán Darío Torres',
    rol: 'representante trabajadores',
    fecha_eleccion: '2025-05-10',
    periodicidad_reuniones: 'Mensual',
    reglamento_evidencia: mockEvidenciaArchivo,
    responsable: mockResponsables[1],
  },
  {
    id: 'cop-2',
    miembro_nombre: 'Dra. María Paula Gómez',
    rol: 'representante empresa',
    fecha_eleccion: '2025-05-10',
    periodicidad_reuniones: 'Mensual',
    reglamento_evidencia: mockEvidenciaArchivo,
    responsable: mockResponsables[0],
  },
];

// ── Bloque 2 Data ──
export const mockSeguridadSocial: SeguridadSocialItem[] = [
  {
    id: 'ss-1',
    trabajador: mockTrabajadores[0],
    tipo_trabajador: 'mina',
    eps: 'Sura EPS',
    eps_vigente: true,
    arl: 'Positiva ARL',
    arl_vigente: true,
    fondo_pensiones: 'Protección',
    fondo_pensiones_vigente: true,
    fecha_examen_medico_inicial: '2025-06-01',
    fecha_examen_medico_periodico: '2026-06-01',
    evidencia_examen: mockEvidenciaArchivo,
    origen_dato: 'propio',
    requiere_espacio_confinado: true,
    evidencia_entrega_epp: mockEvidenciaArchivo,
    evidencia_capacitacion: mockEvidenciaLink,
  },
  {
    id: 'ss-2',
    trabajador: mockTrabajadores[1],
    tipo_trabajador: 'mina',
    eps: 'Sanitas EPS',
    eps_vigente: true,
    arl: 'Sura ARL',
    arl_vigente: true,
    fondo_pensiones: 'Porvenir',
    fondo_pensiones_vigente: true,
    fecha_examen_medico_inicial: '2024-03-10',
    fecha_examen_medico_periodico: '2026-03-10',
    evidencia_examen: mockEvidenciaLink,
    origen_dato: 'contratista',
    requiere_espacio_confinado: true,
    evidencia_entrega_epp: mockEvidenciaArchivo,
    evidencia_capacitacion: mockEvidenciaArchivo,
  },
  {
    id: 'ss-3',
    trabajador: mockTrabajadores[2],
    tipo_trabajador: 'administrativo',
    eps: 'Compensar',
    eps_vigente: true,
    arl: 'Positiva ARL',
    arl_vigente: true,
    fondo_pensiones: 'Colpensiones',
    fondo_pensiones_vigente: true,
    fecha_examen_medico_inicial: '2023-01-15',
    fecha_examen_medico_periodico: '2026-01-15',
    evidencia_examen: mockEvidenciaArchivo,
    origen_dato: 'propio',
  },
  {
    id: 'ss-4',
    trabajador: mockTrabajadores[3],
    tipo_trabajador: 'área',
    area_custom: 'Mantenimiento Electromecánico',
    eps: 'Coosalud',
    eps_vigente: true,
    arl: 'AXA Colpatria',
    arl_vigente: true,
    fondo_pensiones: 'Skandia',
    fondo_pensiones_vigente: true,
    fecha_examen_medico_inicial: '2025-09-01',
    fecha_examen_medico_periodico: '2026-09-01',
    evidencia_examen: mockEvidenciaLink,
    origen_dato: 'contratista',
  },
];

// ── Bloque 3 Data ──
export const mockCategoriasRiesgo: CategoriaRiesgo[] = [
  { id: 'cat-1', nombre: 'Geomecánico / Caída de rocas', tipo_general: 'físico', es_predefinida: true, activa: true },
  { id: 'cat-2', nombre: 'Maquinaria pesada / Malacates', tipo_general: 'físico', es_predefinida: true, activa: true },
  { id: 'cat-3', nombre: 'Espacios confinados y ventilación', tipo_general: 'físico', es_predefinida: true, activa: true },
  { id: 'cat-4', nombre: 'Manejo de Explosivos', tipo_general: 'químico', es_predefinida: true, activa: true },
  { id: 'cat-5', nombre: 'Polvo de carbón y sílice', tipo_general: 'químico', es_predefinida: true, activa: true },
  { id: 'cat-6', nombre: 'Riesgo eléctrico RETIE', tipo_general: 'físico', es_predefinida: true, activa: true },
  { id: 'cat-7', nombre: 'Ergonomía en transporte manual', tipo_general: 'biomecánico', es_predefinida: false, activa: true },
];

export const mockMatrizRiesgos: MatrizRiesgoItem[] = [
  {
    id: 'mat-1',
    categoria_riesgo_id: 'cat-1',
    categoria_nombre: 'Geomecánico / Caída de rocas',
    tipo_labor: 'Malacatero / Minero de frente',
    nivel_riesgo: 'alto',
    controles_existentes: 'Sostenimiento con arcos de acero e inspección previa de techo',
    fecha_ultima_revision: '2026-02-10',
    responsable: mockResponsables[2],
    evidencia: mockEvidenciaArchivo,
  },
  {
    id: 'mat-2',
    categoria_riesgo_id: 'cat-4',
    categoria_nombre: 'Manejo de Explosivos',
    tipo_labor: 'Explosivista',
    nivel_riesgo: 'alto',
    controles_existentes: 'Protocolo de voladura controlada, polvorín certificado e inicio mediante detonador electrónico',
    fecha_ultima_revision: '2026-02-20',
    responsable: mockResponsables[0],
    evidencia: mockEvidenciaLink,
  },
  {
    id: 'mat-3',
    categoria_riesgo_id: 'cat-3',
    categoria_nombre: 'Espacios confinados y ventilación',
    tipo_labor: 'Operador de bomba de agua / Vía interior',
    nivel_riesgo: 'medio',
    controles_existentes: 'Medidor multigas portátil, ventilación auxiliar forzada 500 CFM',
    fecha_ultima_revision: '2026-01-30',
    responsable: mockResponsables[1],
    evidencia: mockEvidenciaArchivo,
  },
];

// ── Bloque 4 Data ──
export const mockSeguridadVial: SeguridadVialItem[] = [
  {
    id: 'vial-1',
    documento_politica_evidencia: mockEvidenciaArchivo,
    divulgada: true,
    fecha_divulgacion: '2026-01-25',
    responsable: mockResponsables[0],
  },
];

export const mockMaquinaria: MaquinariaItem[] = [
  {
    id: 'maq-1',
    codigo: 'MAL-01',
    tipo: 'Malacate de arrastre electro-hidráulico',
    fecha_inicio_operativa: '2020-04-15',
    vida_util_estimada: '10 años',
    programa_mantenimiento_existe: true,
    fecha_ultimo_mantenimiento: '2026-02-12',
    evidencia_mantenimiento: mockEvidenciaArchivo,
    documentacion_evidencia: mockEvidenciaLink,
  },
  {
    id: 'maq-2',
    codigo: 'VEN-03',
    tipo: 'Ventilador principal axiales 15 HP',
    fecha_inicio_operativa: '2022-08-01',
    vida_util_estimada: '8 años',
    programa_mantenimiento_existe: true,
    fecha_ultimo_mantenimiento: '2026-02-25',
    evidencia_mantenimiento: mockEvidenciaLink,
    documentacion_evidencia: mockEvidenciaArchivo,
  },
];

export const mockInstalacionesElectricas: InstalacionElectricaItem[] = [
  {
    id: 'inst-1',
    nombre_instalacion: 'Subestación Principal de Mina La Esmeralda',
    certificacion_retie_vigente: true,
    fecha_certificacion: '2024-05-10',
    fecha_ultima_inspeccion: '2026-01-10',
    responsable: mockResponsables[2],
    evidencia: mockEvidenciaArchivo,
  },
  {
    id: 'inst-2',
    nombre_instalacion: 'Tablero de Control de Iluminación y Malacate',
    certificacion_retie_vigente: true,
    fecha_certificacion: '2023-11-20',
    fecha_ultima_inspeccion: '2026-02-01',
    responsable: mockResponsables[2],
    evidencia: mockEvidenciaLink,
  },
];

// ── Bloque 5 Data ──
export const mockEppEntregas: EppEntregaItem[] = [
  {
    id: 'epp-1',
    trabajador: mockTrabajadores[0],
    riesgo_actividad_id: 'mat-1',
    tipo_epp: 'Casco de minero con lámpara LED + Botas dieléctricas',
    fecha_entrega: '2026-01-10',
    costo_unitario: 350000,
    evidencia_entrega: mockEvidenciaArchivo,
    evidencia_capacitacion_uso: mockEvidenciaLink,
  },
  {
    id: 'epp-2',
    trabajador: mockTrabajadores[1],
    riesgo_actividad_id: 'mat-2',
    tipo_epp: 'Respirador N95 + Protectores auditivos copa',
    fecha_entrega: '2026-02-01',
    costo_unitario: 180000,
    evidencia_entrega: mockEvidenciaArchivo,
    evidencia_capacitacion_uso: mockEvidenciaArchivo,
  },
];

// ── Bloque 6 Data ──
export const mockPlanesEmergencia: PlanEmergenciaItem[] = [
  { id: 'plan-1', tipo: 'prevención', documento_evidencia: mockEvidenciaArchivo, fecha_actualizacion: '2026-01-10' },
  { id: 'plan-2', tipo: 'preparación', documento_evidencia: mockEvidenciaLink, fecha_actualizacion: '2026-01-12' },
  { id: 'plan-3', tipo: 'respuesta', documento_evidencia: mockEvidenciaArchivo, fecha_actualizacion: '2026-01-15' },
];

export const mockBrigadas: BrigadaItem[] = [
  {
    id: 'brig-1',
    conformada: true,
    fecha_conformacion: '2025-04-10',
    acta_evidencia: mockEvidenciaArchivo,
    responsable: mockResponsables[1],
    numero_brigadistas: 14,
  },
];

export const mockSimulacros: SimulacroItem[] = [
  {
    id: 'sim-1',
    fecha: '2025-11-20',
    tipo: 'Evacuación por colapso de frente e incendio',
    tiempo_evacuacion_minutos: 8.5,
    evidencia: mockEvidenciaLink,
  },
  {
    id: 'sim-2',
    fecha: '2026-02-18',
    tipo: 'Primeros auxilios e intoxicación por CO',
    tiempo_evacuacion_minutos: 6.2,
    evidencia: mockEvidenciaArchivo,
  },
];

export const mockEquiposEmergencia: EquipoEmergenciaItem[] = [
  { id: 'eq-1', tipo: 'Extintores Solkaflam 10lb (x12)', operativo: true, fecha_ultima_inspeccion: '2026-02-01', evidencia: mockEvidenciaArchivo },
  { id: 'eq-2', tipo: 'Camilla rígida de rescate en mina', operativo: true, fecha_ultima_inspeccion: '2026-01-15', evidencia: mockEvidenciaLink },
  { id: 'eq-3', tipo: 'Autorescatador de oxígeno químico 30 min (x25)', operativo: true, fecha_ultima_inspeccion: '2026-02-10', evidencia: mockEvidenciaArchivo },
];

// ── Bloque 7 Data ──
export const mockEventosAccidentalidad: EventoAccidentalidadItem[] = [
  {
    id: 'evt-1',
    tipo: 'incidente',
    fecha: '2026-01-28',
    lugar: 'Frente 3 Nivel 2 - Mina La Esmeralda',
    actividad: 'Carga de vagón en malacate',
    trabajador: mockTrabajadores[0],
    causa_inmediata: 'Desprendimiento menor de roca en astilla',
    causa_basica: 'Falta de desabombe previo al turno',
    medidas_correctivas: 'Capacitación obligatoria en técnica de desabombe de roca',
    responsable: mockResponsables[2],
    fecha_limite: '2026-02-15',
    evidencia: mockEvidenciaArchivo,
    estado: 'cerrado',
  },
  {
    id: 'evt-2',
    tipo: 'accidente',
    fecha: '2026-02-10',
    lugar: 'Taller de Mantenimiento',
    actividad: 'Reparación de guaya de malacate',
    trabajador: mockTrabajadores[3],
    contratista: 'ElectroMinería Ltda.',
    causa_inmediata: 'Atrapamiento leve de falange distal',
    causa_basica: 'Uso de guantes no adecuados para manipulación de guaya tensionada',
    medidas_correctivas: 'Sustitución de EPP por guantes anticorte de nitrilo reforzado',
    responsable: mockResponsables[1],
    fecha_limite: '2026-02-25',
    evidencia: mockEvidenciaLink,
    estado: 'cerrado',
  },
];

export const mockInvestigaciones: InvestigacionItem[] = [
  {
    id: 'inv-1',
    evento_id: 'evt-2',
    evento_descripcion: 'Atrapamiento leve en reparación de guaya',
    informe_evidencia: mockEvidenciaArchivo,
    fecha_investigacion: '2026-02-12',
  },
];

export const mockAccionesCorrectivas: AccionCorrectivaItem[] = [
  {
    id: 'acc-1',
    evento_id: 'evt-1',
    accion: 'Implementar lista de chequeo de desabombe antes de inicio de turno',
    fecha_inicio: '2026-02-01',
    fecha_cierre: '2026-02-14',
    responsable: mockResponsables[2],
    evidencia: mockEvidenciaArchivo,
    estado: 'cerrado',
  },
  {
    id: 'acc-2',
    evento_id: 'evt-2',
    accion: 'Rediseñar procedimiento seguro de mantenimiento para malacates',
    fecha_inicio: '2026-02-15',
    responsable: mockResponsables[0],
    evidencia: mockEvidenciaLink,
    estado: 'abierto',
  },
];

export const mockHorasHombre: HorasHombreItem[] = [
  {
    id: 'hh-1',
    periodo: '01/2026',
    titulo_placa: '1886-X',
    numero_trabajadores: 85,
    horas_turno: 8,
    turnos_dia: 2,
    dias_periodo: 25,
    total_horas_hombre: 34000,
  },
  {
    id: 'hh-2',
    periodo: '02/2026',
    titulo_placa: '1886-X',
    numero_trabajadores: 85,
    horas_turno: 8,
    turnos_dia: 2,
    dias_periodo: 24,
    total_horas_hombre: 32640,
  },
];

export const mockIndicadoresAccidentalidad: IndicadoresAccidentalidad = {
  indice_frecuencia: 15.02, // (N° accidentes / Total HHT) * 240,000
  indice_severidad: 45.06,  // (Días perdidos / Total HHT) * 240,000
  fatalidades_periodo: 0,
  lti_count: 1,
};
