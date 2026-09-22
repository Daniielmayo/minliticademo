---
name: typescript
description: Defines strict TypeScript 5+ standards for the Minlitica Frontend application (React 19, Next.js 16). This skill MUST be used whenever creating or modifying interfaces, type aliases, generics, props, API models, hooks return types, or type guards.
---

# TypeScript Standards & Strict Typing Rules

## Purpose

This document defines the strict TypeScript standards for the `minlitica-frontend` repository.
The goal is to produce type-safe, self-documenting, and scalable code. Always prioritize type safety over convenience. Never generate code that weakens or bypasses strict mode.

---

## Strict Rules & Prohibitions

1. **Strictly Forbidden:** `any` type, `//@ts-ignore`, `//@ts-nocheck`, or unsafe assertions (`value as any`).
2. **Type Imports:** Always use `import type { ... }` when importing type-only entities to enable clean tree-shaking and module boundary separation.
3. **Explicit Public APIs:** Always type function parameters and return types for exported functions, custom hooks, and API services.

---

## `unknown` vs `any` & Type Guards

- Use `unknown` when a data structure is not yet verified (e.g., raw API payloads, dynamic JSON, external storage).
- **NEVER** use `unknown` directly without type narrowing or a custom Type Guard:

```ts
// GOOD: Type Guard
function isApiError(error: unknown): error is { message: string; statusCode: number } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "statusCode" in error
  );
}
