---
name: performance
description: Defines the performance standards and optimization strategies for the Minlitica Frontend application. Use this skill whenever optimizing component rendering, reducing bundle size, improving load times, configuring image/font optimization, lazy loading, caching strategies, or troubleshooting UI bottlenecks.
---

# Performance Standards & Optimization Strategies

## Purpose

This document defines the performance standards for `minlitica-frontend`.
The goal is to build fast, scalable, and maintainable web applications without sacrificing readability or clean architecture.

> **Performance Philosophy:** Readability and maintainability come first. Do NOT optimize prematurely. Measure before optimizing, and prioritize architectural fixes over micro-optimizations.

---

## Core Performance Principles

1. **Server First:** Prefer React Server Components (RSC) by default. Use Client Components (`"use client"`) strictly when user interactivity or browser APIs are required.
2. **Minimal JavaScript:** Keep the initial JS bundle size as small as possible.
3. **No Premature Memoization:** Do NOT wrap components in `React.memo` or functions in `useCallback`/`useMemo` by default. Only apply them when profiling proves a clear bottleneck.
4. **Data Proximity:** Fetch data as close to the server or consuming feature component as possible.

---

## Rendering & Component Design

- **State Localisation:** Keep React state as local as possible. Do NOT lift state higher in the component tree than necessary.
- **Derived State:** Never store derived state in `useState` or synch with `useEffect`. Always calculate derived values during render:

  ```tsx
  // BAD: Redundant state sync
  const [fullName, setFullName] = useState("");
  useEffect(() => { setFullName(`${user.firstName} ${user.lastName}`); }, [user]);

  // GOOD: Calculate during render
  const fullName = `${user.firstName} ${user.lastName}`;
