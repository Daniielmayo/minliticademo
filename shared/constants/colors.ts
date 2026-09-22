/**
 * Centralized Minlitica Brand Color Palette
 * Direct reference for Recharts, Leaflet, and JavaScript theme contexts.
 */
export const COLOR_PALETTE = {
  primary: '#101939',       // PRIMARIO (Navy dark)
  secondary: '#0077e5',     // SECUNDARIO (Brand blue)
  details: '#f1ba3a',       // COLOR PARA DETALLES (Gold / Yellow accent)
  secondaryLight: '#9dd8f2',// SECUNDARIO CLARO (Light sky blue accent)
  white: '#FFFFFF',         // BLANCO
  black: '#000000',         // NEGRO

  // Derived / Translucent variants
  pageBg: '#EEEEEE',
  primaryHover: '#1B2854',
  primaryTranslucent: '#101939D4',
  secondaryHover: '#0062BD',
  secondaryContainer: '#9DD8F2',
  cardSurface: '#FFFFFF',
  cardBorder: '#E2E8F0',
} as const;

export type ColorPalette = typeof COLOR_PALETTE;
