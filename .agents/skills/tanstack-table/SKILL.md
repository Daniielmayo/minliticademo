---
name: tanstack-table
description: Defines the standards for building data tables using TanStack Table v8 in the Minlitica Frontend application. Use this skill whenever creating table columns, handling pagination, sorting, row selection, or integrating feature data with shared/ui/Table.
---

# TanStack Table v8 Standards

## Purpose

This document establishes the architectural standards for tabular data displays in `minlitica-frontend`.
The core principle is strict separation: the generic table component (`shared/ui/Table/`) handles rendering and presentation, while the business module (`features/<Feature>/`) defines the columns, data mapping, and actions.

---

## Architecture & Responsibilities

```text
[features/Titles/components/TitlesTable.tsx] (Feature Layer)
 ├── 1. Defines Column Schema (`columns.tsx`) using ColumnDef<TData, TValue>
 ├── 2. Manages data fetching / pagination state via Custom Hook (`useTitlesTable.ts`)
 └── 3. Renders Generic DataTable Engine
       │
       ▼
[shared/ui/Table/DataTable.tsx] (Shared Presentation Layer)
 ├── Renders Table Header, Body, Rows, and Skeleton
 ├── Manages Table UI State (Pagination controls, Sorting UI)
 └── FORBIDDEN: Direct API fetching, endpoint knowledge, or DTO models
