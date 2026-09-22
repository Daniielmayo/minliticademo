---
name: forms-and-validation
description: Defines form handling and validation standards using React Hook Form and Zod for the Minlitica Frontend application. Use this skill whenever creating forms, input fields, validation schemas, or form submission handlers.
---

# Forms & Validation Standards (React Hook Form + Zod)

## Purpose

This document establishes the official standards for managing form state, validation, error handling, and field controls in `minlitica-frontend`.
The objective is to guarantee type-safe form validations, accessible controls, and seamless integration between Zod schemas and React Hook Form.

---

## Core Form Rules

1. **Schema-Driven Validation:** EVERY form MUST be backed by an explicit Zod validation schema.
2. **Inferred Types:** Form data types MUST be inferred dynamically from the Zod schema using `z.infer<typeof schema>`. Do NOT manually duplicate interface definitions.
3. **Accessible Form Primitives:** Use shadcn/ui form primitives (`<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>`) to ensure proper ARIA accessibility and automated error message wiring.
4. **Co-location:** Form schemas and default values belong inside the feature folder (`features/<Feature>/schemas/` or `features/<Feature>/types.ts`).

---

## Standard Form Implementation Pattern

### 1. Zod Schema Definition (`loginSchema.ts`)

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password is too long"),
  rememberMe: z.boolean().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;
