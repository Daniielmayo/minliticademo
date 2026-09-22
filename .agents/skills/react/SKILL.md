---
name: react
description: Defines the React 19 development standards for the Minlitica Frontend application. This skill MUST be used whenever creating or refactoring React components, custom hooks, state management, composition patterns, or reusable UI controls.
---

# React 19 Development Standards & Component Rules

## Purpose

This document defines the React 19 standards for the `minlitica-frontend` codebase.
The goal is to build components that are reusable, maintainable, accessible, predictable, and strictly decoupled from business logic when in `shared/ui/`.

---

## Tech Stack & Version Compatibility

- **React Version:** React 19
- **Primitives & Styling:** Tailwind CSS v4, Radix / shadcn/ui primitives (`components/ui/`).
- **Form & Validation Layer:** React Hook Form + Zod.

---

## Component Anatomy & Structure Order

All React components MUST follow this internal order for consistency:

```tsx
// 1. Imports (React, external, shared UI, feature, hooks, types, utils)
import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/shared/ui/Button";

// 2. Types & Interfaces
export interface UserCardProps {
  name: string;
  role: string;
  onEdit?: () => void;
}

// 3. Component Definition
export function UserCard({ name, role, onEdit }: UserCardProps) {
  // 4. Local State & Hooks
  const [isHovered, setIsHovered] = useState(false);

  // 5. Derived Values (NO useEffect for calculated values!)
  const displayRole = role.toUpperCase();

  // 6. Event Handlers (prefix with 'handle')
  const handleCardClick = () => {
    if (onEdit) onEdit();
  };

  // 7. JSX Output
  return (
    <div className="p-4 border rounded-lg" onClick={handleCardClick}>
      <h3>{name}</h3>
      <p>{displayRole}</p>
    </div>
  );
}
