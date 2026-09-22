# Minlitica Design Tokens & Theme Specification

Este documento define el sistema oficial de tokens de diseño, paletas de colores, tipografía, botones, badges y directrices visuales de la aplicación **Minlitica Frontend** (basada en Tailwind CSS v4 y React 19).

---

## 1. Colores de Marca y Principales (Brand Colors)

| Token / Variable | Valor Hex / Color | Uso en la Aplicación |
|---|---|---|
| `--color-primary` / `--brand-primary` | `#101939` | **PRIMARIO**: Azul corporativo oscuro. Títulos principales, sidebar, botones primarios. |
| `--color-secondary` / `--brand-secondary` | `#0077e5` | **SECUNDARIO**: Azul eléctrico brillante. Estados activos, CTAs e indicadores clave. |
| `--color-details` / `--accent-details` | `#f1ba3a` | **COLOR PARA DETALLES**: Amarillo/Dorado para acentos, destacados y badges. |
| `--color-secondary-light` / `--accent-light` | `#9dd8f2` | **SECUNDARIO CLARO**: Azul cielo para fondos secundarios y contenedores. |
| `--color-white` | `#FFFFFF` | **BLANCO**: Fondos neutros y textos en contraste. |
| `--color-black` | `#000000` | **NEGRO**: Textos oscuros y acentos de contraste profundo. |

---

## 3. Colores de Escenarios y Data Visualization (Gráficos)

Ubicados en `features/ScenarioSimulation/constants/scenarioColors.ts`:

| Escenario / Métrica | Color Hex | Propósito |
|---|---|---|
| **Escenario 1 (A)** | `#2563EB` (Blue 600) | Primera serie comparativa o escenario base. |
| **Escenario 2 (B)** | `#475569` (Slate 600) | Segundo escenario de comparación. |
| **Escenario 3 (C)** | `#94A3B8` (Slate 400) | Tercer escenario de comparación. |
| **Escenario 4 (D)** | `#0F172A` (Slate 900) | Cuarto escenario de comparación. |
| **Flujo Positivo / Ganancia** | `#10B981` (Emerald 500) | Barras de ingresos o resultados financieros positivos. |
| **Flujo Negativo / Costo** | `#EF4444` (Red 500) | Pérdidas, gastos o alertas. |
| **Serie Flujo de Caja** | `#0077E5` y `#020D3E` | Proyecciones en gráficos de barras/líneas. |
| **Líneas de Grilla / Ejes** | `#E5E7EB` y `#6B7280` | Coordenadas y texto de ejes en gráficos Recharts. |

---

## 4. Superficies, Fondos y Estados de Alerta

| Token / Componente | Valor / Clase | Propósito |
|---|---|---|
| `--page-bg` | `oklch(0.975 0 0)` (~`#F8F9FA`) | Fondo neutro claro de todas las pantallas interiores. |
| **Superficie de Tarjetas (Cards)** | `--color-card-surface` | `#F3F6FA` | Fondo oficial para todos los paneles, tarjetas y contenedores del proyecto. |
| **Bordes de Tarjetas** | `--color-card-border` | `#DCE5F2` | Borde tenue y armónico para separar elementos de superficie. |
| **Dashboard Cards** | Fondo: `#F3F6FA`<br>Borde: `#DCE5F2`<br>Hover: `#E8EFF8` | Tarjetas y contenedores del sistema. |
| **Cajas Informativas (`--info`)** | Fondo: `color-mix(#2c365e 8%, white)`<br>Borde: `color-mix(#2c365e 25%, white)` | Banners de aviso contextuales. |
| **Estados de Archivo (Upload)** | • Neutro: `bg-white hover:border-blue-200`<br>• Dragging: `bg-blue-50 border-blue-500`<br>• Éxito: `bg-green-50 border-green-300`<br>• Error: `bg-red-50 border-red-300` | Zona de carga drag & drop. |
| **Destructive / Error** | `oklch(0.577 0.245 27.325)` / `text-red-600` / `bg-red-600` | Acciones irreversibles o eliminación de registros. |

---

## 5. Estructura y Estilos de Botones (Unificados con Border Radius 50px)

Todos los botones de la aplicación están unificados a un **border radius de 50px (`rounded-[50px]`)**, con fondo principal de marca (`bg-brand-primary`) y hover secundario (`hover:bg-secondary`).

1. **Botón Primario / Acción General:**
   ```tsx
   <Button className="bg-brand-primary hover:bg-secondary text-white font-bold shadow-md px-8 py-3 rounded-[50px] cursor-pointer">
     Continuar →
   </Button>
   ```
2. **Botón CTA de Entrada (Login):**
   ```tsx
   <Button size="lg" className="rounded-[50px] text-base bg-brand-primary hover:bg-secondary text-white font-bold">
     Iniciar Sesión
   </Button>
   ```
3. **Botón Secundario / Outline:**
   ```tsx
   <Button variant="outline" className="border border-border text-foreground hover:bg-secondary hover:text-white px-8 py-3 rounded-[50px] cursor-pointer">
     Atrás
   </Button>
   ```
4. **Botón Destructivo / Peligro:**
   ```tsx
   <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white rounded-[50px]">
     Eliminar registro
   </Button>
   <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 rounded-[50px]">
     Cancelar
   </Button>
   ```
5. **Botón Ghost / Ícono:**
   ```tsx
   <Button variant="ghost" size="icon" className="h-9 w-9 rounded-[50px] cursor-pointer">
     <Pencil className="size-4" />
   </Button>
   ```
6. **Botón Deshabilitado (Disabled):**
   ```tsx
   className="bg-gray-300 text-gray-600 max-w-md px-8 py-3 rounded-[50px] cursor-not-allowed opacity-50"
   ```

---

## 6. Badges y Etiquetas

Ubicados en `components/ui/badge.tsx`:

- **Badge Presupuesto / Financiero:** `bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-medium px-2.5 py-1 rounded-full`
- **Badge de Estado / Escenario:** `bg-white border border-gray-200 text-text-body text-xs rounded-full`
- **Cinta "Próximamente" en Dashboard:** `bg-gray-700/90 text-white text-[10px] uppercase tracking-wider rotate-45`

---

## 7. Jerarquía Tipográfica

- **Page Title (H1):** `1.875rem (30px)` / Bold (700) -> `text-brand-primary` / `text-text-heading`
- **Section Title (H2):** `1.25rem (20px)` / Semibold (600) -> `text-text-heading`
- **Subsection Title (H3):** `1.125rem (18px)` / Semibold (600) -> `text-text-heading`
- **Form Label:** `1rem (16px)` / Semibold (600) -> `text-text-body`
- **Body / Párrafos:** `0.875rem - 1rem (14-16px)` / Normal (400) -> `text-text-body`
- **Muted / Subtítulos:** `0.875rem (14px)` / Normal (400) -> `text-text-muted`
- **Helper Text:** `0.75rem (12px)` -> `text-text-muted`

---

## 8. Layout, Sombras y Bordes

- **Radio de redondeo (`--radius`):** `0.625rem (10px)`. `rounded-sm: 6px`, `rounded-md: 8px`, `rounded-lg: 10px`, `rounded-xl: 14px`, `rounded-2xl: 18px`, `rounded-3xl: 22px`.
- **Header:** Sticky, fondo blanco translúcido (`backdrop-blur-md`), borde inferior `#020D3ED4` y sombra difuminada `shadow-[0_0_10px_rgba(255,255,255,0.5)]`.
- **Sidebar:** Flotante y colapsable en azul corporativo `#2C365E` con tipografía e íconos en blanco.
- **Footer:** Barra sólida inferior en `#020D3ED4` con texto blanco centrado.
