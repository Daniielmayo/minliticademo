import { COLOR_PALETTE } from '@/shared/constants/colors';

/**
 * Colores oficiales de simulación de escenarios y visualización de datos (Data Viz)
 * Documentados en DESIGN_TOKENS.md
 */

export const SCENARIO_COLORS = {
  scenarioA: COLOR_PALETTE.secondary,     // Escenario 1 - Secundario (#0077e5)
  scenarioB: COLOR_PALETTE.primary,       // Escenario 2 - Primario (#101939)
  scenarioC: COLOR_PALETTE.secondaryLight,// Escenario 3 - Secundario Claro (#9dd8f2)
  scenarioD: COLOR_PALETTE.details,       // Escenario 4 - Detalles (#f1ba3a)
} as const;

export const FINANCIAL_FLOW_COLORS = {
  positive: '#10B981', // Flujo Positivo / Ganancia - Emerald 500
  negative: '#EF4444', // Flujo Negativo / Costo - Red 500
  cashFlowPrimary: COLOR_PALETTE.secondary,
  cashFlowNavy: COLOR_PALETTE.primary,
} as const;

export const CHART_GRID_COLORS = {
  grid: '#E5E7EB',
  axisText: '#6B7280',
} as const;

export const SCENARIO_SERIES_MAP = [
  { id: 'scenarioA', label: 'Escenario 1 (A)', color: SCENARIO_COLORS.scenarioA },
  { id: 'scenarioB', label: 'Escenario 2 (B)', color: SCENARIO_COLORS.scenarioB },
  { id: 'scenarioC', label: 'Escenario 3 (C)', color: SCENARIO_COLORS.scenarioC },
  { id: 'scenarioD', label: 'Escenario 4 (D)', color: SCENARIO_COLORS.scenarioD },
];
