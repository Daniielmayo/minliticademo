---
name: naming-conventions
description: Defines the official naming conventions and casing rules for files, folders, components, hooks, types, services, constants, and variables across the Minlitica Frontend project. This skill must be followed whenever generating or modifying code.
---

# Minlitica Naming Conventions & Casing Standards

## Purpose

This document defines the official, strict naming conventions for the repository.
Consistency is more important than personal preference.
Follow the existing project casing conventions, maintaining `PascalCase` for component/feature folders and `kebab-case` for Next.js App Router routes.

---

## Casing Rules at a Glance

| Resource / Target | Casing | Example |
|---|---|---|
| App Router Folders (`app/`) | `kebab-case` | `app/(auth)/forget-password/`, `app/(private)/dashboard/titles/` |
| Feature Folders (`features/`) | `PascalCase` | `features/Auth/`, `features/Titles/`, `features/MandatoryComplianceRequirements/` |
| Shared UI Folders (`shared/ui/`) | `PascalCase` | `shared/ui/Button/`, `shared/ui/Modal/`, `shared/ui/Charts/`, `shared/ui/Table/` |
| React Component Files | `PascalCase.tsx` | `LoginForm.tsx`, `DataTable.tsx`, `TitlesHeader.tsx` |
| Hooks | `camelCase.ts` | `useDataTable.ts`, `useAuth.ts` |
| Services & Utils | `camelCase.ts` | `authService.ts`, `formatDate.ts` |
| Type Files | `kebab-case.types.ts` or `types.ts` | `title.types.ts` or `types.ts` |
| Types / Interfaces / Props | `PascalCase` | `UserRole`, `LoginRequest`, `ButtonProps` |
| Variables / Functions | `camelCase` | `currentUser`, `selectedTitle`, `getTitles()` |
| Constants / Enums | `UPPER_SNAKE_CASE` | `DEFAULT_PAGE_SIZE`, `API_TIMEOUT` |

---

## General Rules

- Names MUST be descriptive and explicit.
- Avoid generic names such as `data`, `info`, `item`, `object`, `helper`, `utils2`, `Component1`.
- Avoid abbreviations unless universally accepted in tech (`API`, `URL`, `HTTP`, `ID`, `JWT`, `CSV`, `PDF`).
  - **Good:** `UserProfile`, `MandatoryComplianceRequirements`, `InvoiceStatusBadge`
  - **Bad:** `Profile`, `Info`, `Usr`, `Tbl`, `Cfg`, `Btn`

---

## Folders & Files Breakdown

### 1. Route Folders (`app/` -> `kebab-case`)

All route directories in Next.js App Router MUST use lowercase with hyphens:

- `app/(private)/dashboard/titles/`
- `app/(auth)/forget-password/`
- `app/(auth)/reset-password/`

### 2. Component & Feature Folders (`PascalCase`)

Directory names for features, shared UI components, and feature subfolders MUST use `PascalCase`:

- `features/Auth/`
- `features/Titles/`
- `shared/ui/Modal/`
- `shared/ui/AlertCard/`
- `shared/ui/Table/`

### 3. React Components (`PascalCase.tsx`)

Files that export React components MUST use `PascalCase`:

- `LoginForm.tsx`
- `DataTablePagination.tsx`
- `DonutChart.tsx`

### 4. Hooks (`use` + `camelCase.ts`)

Hooks MUST start with the `use` prefix:

- `useDataTable.ts`
- `usePagination.ts`

### 5. Services & API Helpers (`camelCase.ts`)

- `authService.ts`
- `titleService.ts`
- `getUsers.ts`

---

## Code-Level Conventions

### Variables & Booleans

- Variables: `camelCase` (e.g., `selectedTitle`, `tableColumns`).
- Booleans MUST use prefixes (`is`, `has`, `can`, `should`):
  - **Good:** `isLoading`, `isOpen`, `hasPermission`, `canEdit`
  - **Bad:** `loading`, `open`, `permission`

### Functions & Handlers

- Functions describe an action (`camelCase`): `getTitles()`, `calculateProgress()`.
- Event Handlers inside components MUST prefix with `handle`: `handleSubmit`, `handleDeleteRow`, `handleCloseModal`.
- Component Props for events MUST prefix with `on`: `onClick`, `onSubmit`, `onPageChange`.

### Types, Interfaces & Props

- Types / Interfaces: `PascalCase` (`User`, `LoginRequest`, `ApiResponse`).
- Component Props: Suffix with `Props` (`ButtonProps`, `ModalProps`, `DataTableProps`).
- Generics: Use explicit single/double words with `T` prefix (`TData`, `TValue`, `TRow`), NOT generic `T`, `U`, `X`.

---

## Import Grouping Order

When generating or formatting files, group imports strictly in this order:

1. React / Next.js core imports (`react`, `next/navigation`)
2. External libraries (`@tanstack/react-table`, `recharts`, `lucide-react`)
3. Shared components (`@/shared/ui/Button`, `@/shared/ui/Modal`)
4. Feature components (`@/features/Titles/components/...`)
5. Custom Hooks (`@/hooks/...` or local feature hooks)
6. Services (`@/services/...`)
7. Types / Interfaces
8. Utilities (`@/lib/utils`, `@/utils/...`)
9. Relative imports (`./types`, `./components/...`)

---

## Anti-Patterns & Banned Names

**NEVER** generate files or symbols with these patterns:

- Temporary names: `NewComponent`, `ComponentFinal`, `Component2`, `Temp`, `TestComponent`.
- Overly generic names: `Helper`, `Utils`, `Process()`, `Execute()`, `Data`.
- Route folder casing mismatches: `forgetPassword/` in `app/` (must be `forget-password/`).
- Component/Feature folder casing mismatches: `shared/ui/modal/` (must be `shared/ui/Modal/`).
- Missing `use` in hooks: `dataTableHook.ts` (must be `useDataTable.ts`).

---

## Pre-Code Verification

Before returning code, check:

1. [ ] Are `app/` route folders strictly in `kebab-case`?
2. [ ] Are `features/` and `shared/ui/` folders using `PascalCase`?
3. [ ] Are component files using `PascalCase.tsx`?
4. [ ] Do boolean variables start with `is`, `has`, `can`, or `should`?
