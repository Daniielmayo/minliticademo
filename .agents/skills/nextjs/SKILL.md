---
name: nextjs
description: Defines Next.js 16 (App Router) and React 19 development standards for the Minlitica Frontend application. This skill MUST be used whenever creating or modifying routes, layouts, pages, loading states, error boundaries, server/client components, metadata, or navigation.
---

# Next.js 16 (App Router) Development Standards

## Purpose
This document defines how Next.js 16 and React 19 must be used across the `minlitica-frontend` codebase. Follow these standards strictly. The application uses Next.js **App Router** exclusively. Never introduce Pages Router patterns or legacy APIs.

---

## Tech Stack & Compatibility
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Strictly Forbidden Legacy APIs:** `pages/`, `getServerSideProps`, `getStaticProps`, `getInitialProps`, `next/router`.

---

## The Role of `app/` (Routing & Orchestration Only)
The `app/` directory is strictly responsible for routing, layout hierarchy, and page orchestration.

```text
app/
├── (auth)/             # Route Groups (kebab-case)
│   ├── forget-password/
│   │   └── page.tsx
│   └── login/
│       └── page.tsx
├── (private)/
│   └── dashboard/
│       └── titles/
│           ├── page.tsx
│           ├── loading.tsx
│           ├── error.tsx
│           └── [id]/   # Dynamic Route
│               └── page.tsx
├── layout.tsx
└── globals.css
```

### Page Pattern (`page.tsx`)
Pages MUST be lightweight orchestrators. A `page.tsx` reads parameters, initiates initial server fetch, and delegates immediately to a Feature container.

```tsx
// GOOD: app/(private)/dashboard/titles/page.tsx
import { TitlesOverview } from "@/features/Titles/components/TitlesOverview";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TitlesPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const query = await searchParams;
  return <TitlesOverview id={id} query={query} />;
}
```

**FORBIDDEN IN `page.tsx`:**
- Direct business logic, state management, complex hooks.
- Raw API calls, data mutations, or UI rendering beyond feature orchestration.

---

## Server vs. Client Components Strategy

### Default Choice: Server Components (RSC)
Components are **Server Components by default**. Keep as much rendering on the server as possible.

### Client Components (`"use client"`)
Use `"use client"` **only at the leaf level** when required by:
- React State / Effects (`useState`, `useEffect`, `useReducer`).
- Event listeners (`onClick`, `onChange`, `onSubmit`).
- Browser APIs (`localStorage`, `window`, `document`).
- Interactive UI libraries (e.g., Framer Motion, TanStack Table interactive hooks).

**Rule:** NEVER mark an entire `page.tsx` or `layout.tsx` as `"use client"` unless strictly necessary. Wrap only the interactive child UI component with `"use client"`.

---

## Next.js 16 Async Request APIs (`params` & `searchParams`)
In Next.js 16, route parameters (`params`) and search query parameters (`searchParams`) in `page.tsx`, `layout.tsx`, and `route.ts` are **Promises** and MUST be awaited.

```tsx
// Next.js 16 Standard
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;
  return <div />;
}
```

---

## Route Organization & Conventions

### Route Groups (`(group)`)
- Use route groups to organize layouts (e.g., `(auth)` for public pages, `(private)` for dashboard).
- Do NOT treat route groups as business domain folders.

### Dynamic Routes (`[id]`)
- Folder names use brackets: `[id]`, `[slug]`.
- Always read parameters from `params` props. Never manually parse `window.location`.

### Casing
- All route folders inside `app/` MUST use **`kebab-case`** (e.g., `forget-password`, `reset-password`, `mandatory-compliance-requirements`).

---

## Data Fetching & State Boundaries

```text
app/(private)/dashboard/titles/page.tsx (Server Component)
│
├──> Server Fetch / Parallel Data
└──> Renders Feature: (features/Titles/)
     ├──> Reusable UI: (shared/ui/Table/)
     └──> Interactive Form: ("use client")
```

- **Server-Side Data:** Prefer fetching in Server Components or passing initial data to features.
- **Client-Side Data:** Use TanStack Query / React Context inside `features/` when realtime or interactive mutations are required.
- **Never Fetch in `shared/ui/`:** Reusable UI components must be stateless and receive data strictly via props.

---

## Special Files Standard

| File | Purpose & Rule |
|---|---|
| `layout.tsx` | Defines shared page shells (sidebar, topbar, providers) or route-specific layouts (e.g., dynamic page headers, back-buttons, and tab navigation menus like `TitleTabs`). MUST be placed at the routing level (`app/`) and NOT within feature components (`features/`). Must NOT contain business logic or page-specific state. |
| `loading.tsx` | Fallback UI for React Suspense during route transitions. Should render skeletons matching the page design. |
| `error.tsx` | Route-level error boundary. MUST be a Client Component (`"use client"`). Never display raw stack traces to users. |
| `not-found.tsx` | Triggered by `notFound()`. Render clean fallback UI when resources do not exist. |

---

## Navigation & Metadata

### Navigation API (`next/navigation`)
- Import `useRouter`, `usePathname`, `useSearchParams`, `redirect`, `notFound` exclusively from `next/navigation`.
- **FORBIDDEN:** Importing from `next/router` or `next/compat/router`.

### Metadata API
- Export static metadata or dynamic `generateMetadata`:
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Titles Management | Minlitica",
  description: "Manage mandatory compliance requirements",
};
```
- **FORBIDDEN:** Manipulating `document.title` manually in `useEffect`.

---

## Next.js Anti-Patterns Checklist (Check Before Code Generation)
- [ ] Is there any import from `next/router`? (MUST use `next/navigation`).
- [ ] Is `"use client"` placed on `page.tsx` or `layout.tsx` unnecessarily?
- [ ] Is `params` or `searchParams` un-awaited in Next.js 16 `page.tsx`?
- [ ] Is there direct API fetching or heavy business logic inside `app/`?
- [ ] Are route folders inside `app/` written in `camelCase` instead of `kebab-case`?
- [ ] Is `<img>` used instead of `next/image`?
- [ ] Are view layouts, back buttons, or tab navigations nested inside `features/` instead of route layouts (`layout.tsx` under `app/`)?
