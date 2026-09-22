---
name: tailwind-ui
description: Defines the Tailwind CSS v4 and UI styling standards for the Minlitica Frontend application. Use this skill whenever writing CSS classes, styling components, using design system tokens, or creating responsive layouts.
---

# Tailwind CSS v4 & UI Styling Standards

## Purpose

This document defines styling conventions and UI consistency rules.
The objective is to maintain a unified visual system, avoid arbitrary values, and ensure correct responsive design across all devices.

---

## Core Styling Rules

1. **Use Theme Tokens Exclusively:** Use semantic color variables from `globals.css` and `shadcn/ui` theme (`bg-background`, `text-primary`, `text-muted-foreground`, `border-outline`, `bg-card`).
2. **Dynamic Class Merging:** ALWAYS use the `cn()` utility function from `@/lib/utils` (combines `clsx` and `tailwind-merge`) when conditionally merging classes or accepting external `className` props.
3. **Responsive Mobile-First:** Write responsive classes starting with mobile defaults, then applying breakpoints (`sm:`, `md:`, `lg:`, `xl:`).

---

## Component Class Merging Pattern (`cn`)

```tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "success" | "warning" | "error";
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "success", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        {
          "bg-emerald-50 text-emerald-700 border-emerald-200": variant === "success",
          "bg-amber-50 text-amber-700 border-amber-200": variant === "warning",
          "bg-rose-50 text-rose-700 border-rose-200": variant === "error",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
```

---

## Card & Container Styling Convention

> **CRITICAL — this pattern is enforced across all views**

All chart containers, KPI cards, filter panels, and table wrappers must follow this exact pattern:

```tsx
// ✅ Correct
<div className="bg-[#F3F6FA] border rounded-xl p-lg shadow-sm">
  ...
</div>

// ✅ Chart/dashboard containers (larger rounding)
<div className="bg-[#F3F6FA] border rounded-2xl p-lg shadow-sm">
  ...
</div>

// ❌ WRONG — do not use
<div className="bg-card-surface border border-card-border rounded-xl p-lg shadow-sm">
// ❌ WRONG — do not use
<div className="bg-card-surface border border-border rounded-2xl p-6 shadow-sm">
```

### Rules
- `bg-[#F3F6FA]` — always this exact hex for content containers
- `border` — include only bare `border`, never with a color modifier
- Do NOT add `border-card-border`, `border-border`, `border-outline`, or any explicit border color
- `rounded-xl` for KPI / filter cards, `rounded-2xl` for chart cards
- `shadow-sm` standard; `shadow-2xl` only for the shared `DataTable` wrapper

### Applies to shared components
These shared components already use `bg-[#F3F6FA] border`:
- `shared/ui/Table/components/DataTable.tsx` — `bg-[#F3F6FA] border rounded-xl`
- `shared/ui/Charts/components/DonutChart.tsx` — `bg-[#F3F6FA] border rounded-2xl`

Do not revert these to `bg-card-surface` or add `border-card-border`.

### Applies to input/select inside filter panels
```tsx
// ✅ Correct
<select className="w-full px-md py-3 border rounded-lg text-on-surface font-body-sm bg-[#F3F6FA] appearance-none focus:outline-none focus:ring-2 focus:ring-secondary">
// ✅ Correct
<input className="w-full pl-11 pr-md py-3 border rounded-lg text-on-surface font-body-sm bg-[#F3F6FA] focus:outline-none focus:ring-2 focus:ring-secondary">
```

---

## Sidebar Styling Rules

The Sidebar (`shared/ui/Sidebar/index.tsx`) follows a **floating card** visual:

```tsx
// Aside element
className={`
  h-[calc(100vh-24px)] my-3 ml-3
  bg-brand-primary text-white flex flex-col
  fixed left-0 top-0 z-50
  transition-all duration-300 ease-in-out
  shadow-[0_8px_32px_rgba(2,13,62,0.28),0_2px_8px_rgba(2,13,62,0.18)]
  rounded-[28px]
  ${isCollapsed ? 'w-18' : 'w-64'}
`}
```

**Important:** Do NOT add `overflow-hidden` to the aside — it clips the fixed-position tooltips.

### Tooltip implementation (collapsed mode)
Tooltips are **not** CSS `group-hover` — they are React state-driven `position: fixed` elements rendered as siblings of the aside. This is required to avoid overflow clipping.

```tsx
// State
const [tooltip, setTooltip] = useState<TooltipState | null>(null);

// Trigger
onMouseEnter={(e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  setTooltip({ link, top: rect.top + rect.height / 2, left: rect.right + 12 });
}}

// Render (outside <aside>, as sibling in JSX fragment)
{tooltip && isCollapsed && (
  <div
    className="fixed z-[9999] pointer-events-auto"
    style={{ top: tooltip.top, left: tooltip.left, transform: 'translateY(-50%)' }}
    onMouseEnter={keepTooltip}
    onMouseLeave={hideTooltip}
  >
    ...tooltip content...
  </div>
)}
```

### Nav item element types (collapsed)
| Condition | Element |
|---|---|
| Disabled | `<div>` — no interaction |
| Has subitems | `<button>` — tooltip only |
| No subitems | `<Link>` — navigates + tooltip |

### Disabled state pattern
```tsx
const isDisabled = link.badge === 'Pronto' || (link.href === '#' && !hasSubs);

// Class
isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-brand-primary-hover'
```

---

## Layout Shell Rules

`shared/layout/dashboard.tsx`:

- **No Footer** — `<Footer>` is removed from the dashboard layout
- Content area margin accounts for floating sidebar:
  ```tsx
  isSidebarCollapsed
    ? 'ml-[calc(12px+72px+8px)]'   // 12px sidebar margin + 72px width + 8px gap
    : 'ml-[calc(12px+256px+8px)]'  // 12px sidebar margin + 256px width + 8px gap
  ```
- `<main>` uses `overflow-y-auto p-xl` — no `justify-between`, no `flex-col`

---

## Arbitrary Values — Avoid When Possible

Prefer Tailwind standard classes over arbitrary values. Common equivalences:

| Arbitrary | Standard |
|---|---|
| `py-[12px]` | `py-3` |
| `pl-[44px]` | `pl-11` |
| `min-h-[350px]` | `min-h-[350px]` *(no standard equivalent, keep)* |
| `max-h-[500px]` | `max-h-125` |
| `max-h-[200px]` | `max-h-50` |
| `min-w-[180px]` | `min-w-45` |
| `w-[72px]` | `w-18` |
| `bg-[var(--page-bg)]` | `bg-(--page-bg)` |
| `max-w-[1400px]` | `max-w-350` |

---

## Page Background

The application page background uses a CSS variable:
```tsx
bg-[var(--page-bg)]   // or the shorter: bg-(--page-bg)
```
This is distinct from `bg-background` and is set in `globals.css`.
