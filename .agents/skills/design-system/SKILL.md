---
name: design-system
description: Defines the official Design System, color tokens, typography styles, spacing configurations, and visual guidelines of the Minlitica Frontend application (Tailwind CSS v4).
---

# Minlitica Design System & Theme Specifications

## Purpose
This document specifies the typography, spacing, border radiuses, and color tokens defined in `app/globals.css` and used across the Minlitica application. It also documents **layout conventions** and **interaction patterns** established during active development iterations.

---

## 1. Color Palette

Every custom color represents a Tailwind v4 token (`bg-[token]`, `text-[token]`, `border-[token]`).

### Primary & Brand Colors
- **Primary:** `#101939` (`bg-primary`, `text-primary`, `bg-brand-primary`)
- **Secondary:** `#0077e5` (`bg-secondary`, `text-secondary`, `bg-brand-secondary`)
- **Color para Detalles:** `#f1ba3a` (`bg-details`, `text-details`, `border-details`)
- **Secondary Light:** `#9dd8f2` (`bg-secondary-light`, `text-secondary-light`)
- **White:** `#FFFFFF` (`bg-white`, `text-white`)
- **Black:** `#000000` (`bg-black`, `text-black`)

### Surface & Neutral Containers
- **Background:** `#f8f9ff` (`bg-background`)
- **Surface:** `#f8f9ff` (`bg-surface`)
- **Surface Bright:** `#f8f9ff` (`bg-surface-bright`)
- **Surface Dim:** `#cbdbf5` (`bg-surface-dim`)
- **Surface Container Lowest:** `#ffffff` (`bg-surface-container-lowest`)
- **Surface Container Low:** `#eff4ff` (`bg-surface-container-low`)
- **Surface Container:** `#e5eeff` (`bg-surface-container`)
- **Surface Container High:** `#dce9ff` (`bg-surface-container-high`)
- **Surface Container Highest:** `#d3e4fe` (`bg-surface-container-highest`)

### Outlines & Borders
- **Outline:** `#76767f` (`border-outline`)
- **Outline Variant:** `#c6c5cf` (`border-outline-variant`)

### Semantic Alerts & Feedback
- **Error:** `#ba1a1a` (`bg-error`, `text-error`)
- **Error Container:** `#ffdad6` (`bg-error-container`)
- **Warning Container (Tertiary Fixed):** `#ffdea1` (`bg-tertiary-fixed`)

#### Critical Alert Cards (Red variant)
- **Container BG:** `#FDE2E2` (`bg-critical-alert-container`)
- **Container Border:** `#FBC4C4` (`border-critical-alert-border`)
- **Icon Container BG:** `#FFF0F0` (`bg-critical-alert-icon-bg`)
- **Icon / Arrow / Badge BG / Title / Status Value:** `#8B0000` (`text-critical-alert`, `bg-critical-alert`)
- **Description:** `#A83232` (`text-critical-alert-description`)
- **Status Label:** `#C05656` (`text-critical-alert-label`)

#### Warning Alert Cards (Yellow/Amber variant)
- **Container BG:** `#FEE3A2` (`bg-warning-alert-container`)
- **Container Border:** `#FDD475` (`border-warning-alert-border`)
- **Icon Container BG:** `#FFF6DF` (`bg-warning-alert-icon-bg`)
- **Icon / Arrow / Badge BG / Title / Status Value:** `#2B2302` (`text-warning-alert`, `bg-warning-alert`)
- **Description:** `#4A3D0B` (`text-warning-alert-description`)
- **Status Label:** `#6B5A1C` (`text-warning-alert-label`)

#### Success Alert Cards (Green variant)
- **Container BG:** `#D1F2D9` (`bg-success-alert-container`)
- **Container Border:** `#A3E5B5` (`border-success-alert-border`)
- **Icon Container BG:** `#EEFBF2` (`bg-success-alert-icon-bg`)
- **Icon / Arrow / Badge BG / Title / Status Value:** `#0F5132` (`text-success-alert`, `bg-success-alert`)
- **Description:** `#157347` (`text-success-alert-description`)
- **Status Label:** `#198754` (`text-success-alert-label`)

#### Info Alert Cards (Blue variant)
- **Container BG:** `#D3E2FD` (`bg-info-alert-container`)
- **Container Border:** `#A8C7FA` (`border-info-alert-border`)
- **Icon Container BG:** `#EEF4FF` (`bg-info-alert-icon-bg`)
- **Icon / Arrow / Badge BG / Title / Status Value:** `#0B5ED7` (`text-info-alert`, `bg-info-alert`)
- **Description:** `#3182CE` (`text-info-alert-description`)
- **Status Label:** `#4299E1` (`text-info-alert-label`)

---

## 2. Typography

All text elements must use custom size and font tokens mapped to Inter (`--font-inter`).

| Class / Style | Font Size | Line Height | Font Weight | Letter Spacing |
|---|---|---|---|---|
| `font-headline-lg` | `32px` | `40px` | `700` | `-0.02em` |
| `font-headline-md` | `24px` | `32px` | `600` | `-0.01em` |
| `font-headline-sm` | `20px` | `28px` | `600` | — |
| `font-body-lg` | `18px` | `28px` | `400` | — |
| `font-body-md` | `16px` | `24px` | `400` | — |
| `font-body-sm` | `14px` | `20px` | `400` | — |
| `font-label-md` | `12px` | `16px` | `600` | `0.05em` |

---

## 3. Spacing System

Spacing tokens are mapped directly to custom sizes.

| Spacing Token | Value | Tailwind equivalent |
|---|---|---|
| `--spacing-xs` | `4px` | `gap-xs`, `m-xs`, `p-xs` |
| `--spacing-base` | `4px` | `gap-base`, `p-base` |
| `--spacing-sm` | `8px` | `gap-sm`, `p-sm`, `m-sm` |
| `--spacing-md` | `16px` | `gap-md`, `p-md`, `m-md` |
| `--spacing-lg` | `24px` | `gap-lg`, `p-lg`, `m-lg` |
| `--spacing-xl` | `32px` | `gap-xl`, `p-xl`, `m-xl` |
| `--spacing-2xl` | `48px` | `gap-2xl`, `p-2xl` |
| `--spacing-3xl` | `64px` | `gap-3xl` |
| `--spacing-gutter` | `24px` | Standard page gutters |

---

## 4. Rounding & Corners (Border Radius)

- **Default:** `0.25rem` (`rounded-default`)
- **Large:** `0.5rem` (`rounded-lg`)
- **Extra Large:** `0.75rem` (`rounded-xl`)
- **2XL:** `1rem` (`rounded-2xl`)
- **Pills / Circles:** `9999px` (`rounded-full` / `rounded-[50px]`)
- **Alert Cards / Main Containers:** `rounded-[32px]` (Figma specification)
- **Sidebar (floating):** `rounded-[28px]`

---

## 5. Container & Card Background Convention

> **ESTABLISHED PATTERN (enforced in all views)**

All chart containers, filter panels, KPI cards, and table wrappers must use:

```
bg-[#F3F6FA]   ← Light blue-grey surface (replaces bg-card-surface)
border          ← Border present but WITHOUT explicit color (uses default border color)
rounded-xl      ← Or rounded-2xl for chart/dashboard containers
shadow-sm       ← Standard shadow
```

**Do NOT use:**
- `bg-card-surface` — replaced by `bg-[#F3F6FA]`
- `border-card-border` — removed entirely; only bare `border` class allowed
- `border-border` — removed
- Any explicit `border-{color}` on card containers

**Correct example:**
```tsx
<div className="bg-[#F3F6FA] border rounded-xl p-lg shadow-sm">
  ...
</div>
```

This applies to:
- KPI stat cards
- Chart wrapper divs
- Filter panels
- Table wrappers
- DataTable shared component
- DonutChart shared component
- Select / input containers inside filters

**Exception:** Map containers (`TitlesMap`, `AmparoMap`) keep their own visual treatment since they contain Leaflet maps.

---

## 6. Layout — Dashboard Shell

The dashboard layout lives in `shared/layout/dashboard.tsx`:

- **Sidebar:** floating (`position: fixed`, `my-3 ml-3`, `rounded-[28px]`, `shadow-[0_8px_32px_...]`)
- **Content area margin:** `ml-[calc(12px+256px+8px)]` (expanded) / `ml-[calc(12px+72px+8px)]` (collapsed)
- **No footer** — the `<Footer>` component has been removed from the dashboard layout
- **Main padding:** `p-xl`

---

## 7. Sidebar Design Specification

### Visual
- **Floating style:** `my-3 ml-3 rounded-[28px]` — appears detached from the viewport edge
- **Shadow:** `shadow-[0_8px_32px_rgba(2,13,62,0.28),0_2px_8px_rgba(2,13,62,0.18)]`
- **Background:** `bg-brand-primary` (dark navy)
- **Collapsed width:** `w-18` (72px)
- **Expanded width:** `w-64` (256px)
- **No `overflow-hidden` on the aside** — required so tooltips render outside the sidebar bounds

### Nav Items — Behavior Matrix

| State | Type | Element | Action |
|---|---|---|---|
| Collapsed | No subitems | `<Link>` | Navigates + shows tooltip on hover |
| Collapsed | Has subitems | `<button>` | Shows submenu tooltip on hover |
| Collapsed | Disabled (`Pronto`) | `<div>` | No interaction, `opacity-40`, `cursor-not-allowed` |
| Expanded | No subitems | `<Link>` | Navigates directly |
| Expanded | Has subitems | `<button>` | Toggles accordion |
| Expanded | Disabled (`Pronto`) | `<div>` | No interaction, `opacity-40`, text muted |

### Disabled Items
Items are disabled when `link.badge === 'Pronto'` or `link.href === '#' && !hasSubs`.
- Visual: `opacity-40 cursor-not-allowed text-white/30`
- No hover effects, no navigation, no tooltip

### Collapsed Tooltip System
Tooltips are rendered as **`position: fixed`** elements **outside** the `<aside>` DOM tree (sibling in JSX fragment) to avoid `overflow-hidden` clipping.

- Controlled by React state (`useState<TooltipState | null>`)
- Triggered by `onMouseEnter` / `onMouseLeave` on nav items
- 120ms hide delay (`setTimeout`) allows mouse to move from item to tooltip without it disappearing
- `onMouseEnter` on the tooltip itself cancels the hide timer (`keepTooltip`)
- For subitems tooltip: each `<Link>` calls `onClick={() => setTooltip(null)}` to close on navigation

### Active State Indicators
- **Active item:** `bg-brand-dark text-white font-semibold shadow-md`
- **Active subitem (expanded):** `bg-brand-dark text-white font-semibold` + green dot `w-1.5 h-1.5 rounded-full bg-emerald-400`
- **Sub-indicator dot (collapsed, parent has subs):**
  - Gray `bg-white/40` → has subitems but none active
  - Green glow `bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]` → currently inside a subitem
