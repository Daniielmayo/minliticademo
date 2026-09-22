import { Evidencia } from './evidencia';
import { ResponsableRef, TrabajadorRef } from './common';

// ── Bloque 1: Sistema de gestión SST ──
export interface PoliticaSST {
  id: string;
  item: 'política SST' | 'evaluación inicial' | 'plan anual' | 'matriz de riesgos';
  existe: boolean;
  fecha_expedicion: string;
  divulgada: boolean;
  fecha_divulgacion?: string;
  firmada: boolean;
  responsable: ResponsableRef;
  evidencia?: Evidencia;
}

export interface Capacitacion {
  id: string;
  tema: 'maquinaria' | 'EPP' | 'política de seguridad' | 'procedimientos seguros' | 'trabajos seguros' | string;
  fecha: string;
  numero_asistentes: number;
  horas: number;
  evidencia?: Evidencia;
}

export interface InduccionReinduccion {
  id: string;
  trabajador: TrabajadorRef;
  tipo: 'inducción' | 'reinducción';
  fecha: string;
  periodicidad_reinduccion: string;
  evidencia?: Evidencia;
}

export interface Copasst {
  id: string;
  miembro_nombre: string;
  rol: 'representante trabajadores' | 'representante empresa';
  fecha_eleccion: string;
  periodicidad_reuniones: string;
  reglamento_evidencia?: Evidencia;
  responsable: ResponsableRef;
}

// ── Bloque 2: Seguridad Social ──
export type TipoTrabajadorFilter = 'mina' | 'administrativo' | 'área';
export type OrigenDato = 'propio' | 'contratista';

export interface SeguridadSocialItem {
  id: string;
  trabajador: TrabajadorRef;
  tipo_trabajador: TipoTrabajadorFilter;
  area_custom?: string;
  eps: string;
  eps_vigente: boolean;
  arl: string;
  arl_vigente: boolean;
  fondo_pensiones: string;
  fondo_pensiones_vigente: boolean;
  fecha_examen_medico_inicial: string;
  fecha_examen_medico_periodico?: string;
  evidencia_examen?: Evidencia;
  origen_dato: OrigenDato;
  // Si tipo_trabajador === 'mina'
  requiere_espacio_confinado?: boolean;
  evidencia_entrega_epp?: Evidencia;
  evidencia_capacitacion?: Evidencia;
}

// ── Bloque 3: Riesgos y Peligros ──
export type TipoGeneralRiesgo = 'físico' | 'químico' | 'biológico' | 'psicosocial' | 'biomecánico' | 'otro';

export interface CategoriaRiesgo {
  id: string;
  nombre: string;
  tipo_general: TipoGeneralRiesgo;
  es_predefinida: boolean;
  activa: boolean;
}

export interface MatrizRiesgoItem {
  id: string;
  categoria_riesgo_id: string;
  categoria_nombre: string;
  tipo_labor: string;
  nivel_riesgo: 'bajo' | 'medio' | 'alto';
  controles_existentes: string;
  fecha_ultima_revision: string;
  responsable: ResponsableRef;
  evidencia?: Evidencia;
}

// ── Bloque 4: Seguridad Minera ──
export interface SeguridadVialItem {
  id: string;
  documento_politica_evidencia?: Evidencia;
  divulgada: boolean;
  fecha_divulgacion?: string;
  responsable: ResponsableRef;
}

export interface MaquinariaItem {
  id: string;
  codigo: string;
  tipo: string;
  fecha_inicio_operativa: string;
  vida_util_estimada: string;
  programa_mantenimiento_existe: boolean;
  fecha_ultimo_mantenimiento?: string;
  evidencia_mantenimiento?: Evidencia;
  documentacion_evidencia?: Evidencia;
}

export interface InstalacionElectricaItem {
  id: string;
  nombre_instalacion: string;
  certificacion_retie_vigente: boolean;
  fecha_certificacion: string;
  fecha_ultima_inspeccion: string;
  responsable: ResponsableRef;
  evidencia?: Evidencia;
}

// ── Bloque 5: EPP ──
export interface EppEntregaItem {
  id: string;
  trabajador: TrabajadorRef;
  riesgo_actividad_id?: string; // Nullable como especificado
  tipo_epp: string;
  fecha_entrega: string;
  costo_unitario?: number;
  evidencia_entrega?: Evidencia;
  evidencia_capacitacion_uso?: Evidencia;
}

export interface EppResumenItem {
  tipo_epp: string;
  total_entregado: number;
  costo_total: number;
}

// ── Bloque 6: Emergencias ──
export interface PlanEmergenciaItem {
  id: string;
  tipo: 'prevención' | 'preparación' | 'respuesta';
  documento_evidencia?: Evidencia;
  fecha_actualizacion: string;
}

export interface BrigadaItem {
  id: string;
  conformada: boolean;
  fecha_conformacion: string;
  acta_evidencia?: Evidencia;
  responsable: ResponsableRef;
  numero_brigadistas: number;
}

export interface SimulacroItem {
  id: string;
  fecha: string;
  tipo: string;
  tiempo_evacuacion_minutos: number;
  evidencia?: Evidencia;
}

export interface EquipoEmergenciaItem {
  id: string;
  tipo: string;
  operativo: boolean;
  fecha_ultima_inspeccion: string;
  evidencia?: Evidencia;
}

// ── Bloque 7: Accidentalidad ──
export type TipoEventoAccidentalidad = 'accidente' | 'incidente' | 'accidente grave' | 'accidente mortal' | 'enfermedad laboral';
export type EstadoEvento = 'abierto' | 'cerrado' | 'vencido';

export interface EventoAccidentalidadItem {
  id: string;
  tipo: TipoEventoAccidentalidad;
  fecha: string;
  lugar: string;
  actividad: string;
  trabajador: TrabajadorRef;
  contratista?: string;
  causa_inmediata: string;
  causa_basica: string;
  medidas_correctivas: string;
  responsable: ResponsableRef;
  fecha_limite: string;
  evidencia?: Evidencia;
  estado: EstadoEvento;
}

export interface InvestigacionItem {
  id: string;
  evento_id: string;
  evento_descripcion: string;
  informe_evidencia?: Evidencia;
  fecha_investigacion: string;
}

export interface AccionCorrectivaItem {
  id: string;
  evento_id?: string;
  accion: string;
  fecha_inicio: string;
  fecha_cierre?: string;
  responsable: ResponsableRef;
  evidencia?: Evidencia;
  estado: EstadoEvento;
}

export interface HorasHombreItem {
  id: string;
  periodo: string; // MM/YYYY
  titulo_placa?: string;
  numero_trabajadores: number;
  horas_turno: number;
  turnos_dia: number;
  dias_periodo: number;
  total_horas_hombre: number;
}

export interface IndicadoresAccidentalidad {
  indice_frecuencia: number;
  indice_severidad: number;
  fatalidades_periodo: number;
  lti_count: number;
}
