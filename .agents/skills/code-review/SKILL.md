---
name: code-review
description: Conducts comprehensive code reviews against the Minlitica Frontend engineering standards, Clean Architecture, React 19 / Next.js 16 patterns, TypeScript strictness, accessibility, and performance before marking code as production-ready. Use this skill whenever reviewing PRs, refactoring code, or validating generated components.
---

# Code Review Standards & Quality Audit

## Purpose

This document defines the automated code review standards for `minlitica-frontend`.
The objective is to objectively evaluate code quality, prevent technical debt, ensure architectural compliance, and provide structured, actionable feedback without rewriting code unnecessarily.

---

## Core Review Categories

Every review MUST evaluate the changes across these 10 core pillars:

1. **Architecture & Placement:** Is code located in the correct directory (`app/`, `features/<Feature>/`, or `shared/ui/`)?
2. **Naming Conventions:** Are routes in `kebab-case`, components/features in `PascalCase`, and hooks in `camelCase`?
3. **TypeScript Strictness:** Zero `any` types, explicit DTO interfaces, proper use of `import type`.
4. **React 19 & Next.js 16 Standards:** Proper Server/Client Component boundary, clean hook usage, small focused components (<200 lines).
5. **UI & Tailwind CSS v4:** Theme tokens used (`bg-background`, `text-primary`), class merging with `cn()`, mobile-first responsiveness.
6. **Forms & Data Fetching:** Zod schemas for forms, TanStack Query for server state, API services decoupled from UI.
7. **Performance:** No premature `useMemo`/`useCallback`, no redundant state, optimized assets (`next/image`, `next/font`).
8. **Accessibility (a11y):** Semantic HTML (`<button>`, `<main>`), keyboard navigation, proper ARIA labels, focus rings.
9. **Security:** No exposed API keys or hardcoded secrets, safe input handling.
10. **Clean Code & Maintainability:** Readable logic, dry components, single responsibility.

---

## Standard Review Output Format

When performing a code review, always output the findings using this exact structure:

```markdown
# 🔍 Code Review Report

## 📌 Executive Summary
[Brief overview of code quality, purpose of changes, and overall assessment]

## ✅ Strengths & Highlights
- [Highlight 1: Good architectural decision]
- [Highlight 2: Clean TypeScript / Zod implementation]

## ⚠️ Findings & Required Changes

### 🔴 High Priority (Blockers)
- **[Category - e.g., Architecture]**: [Description of issue and why it breaks standards]
  - *Suggested Fix*: `[Code snippet or path correction]`

### 🟡 Medium Priority (Improvements)
- **[Category - e.g., Accessibility]**: [Description]
  - *Suggested Fix*: `[Correction]`

### 🟢 Low Priority (Style & Refinements)
- **[Category - e.g., Naming]**: [Description]

---

## 📊 Scorecard (1 to 10)

| Category | Score | Notes |
|---|---|---|
| Architecture & Placement | 10/10 | Strictly respects feature structure |
| TypeScript Strictness | 9/10 | No `any` used, clean interfaces |
| React & Next.js Patterns | 8/10 | Good split of Client/Server |
| Tailwind CSS & UI | 9/10 | Correct `cn()` usage and tokens |
| Performance & State | 9/10 | No redundant `useEffect` or state |
| Accessibility (a11y) | 8/10 | Semantic tags used |
| **Overall Rating** | **8.8/10** | **APPROVED / REJECTED** |

---

## 📋 Approval Checklist

- [ ] Respects Clean Architecture and Folder Ownership
- [ ] Strictly Typed (Zero `any` or forced casts)
- [ ] Follows project Naming Conventions
- [ ] Free of hardcoded API endpoints or credentials
- [ ] Passes basic accessibility checks
