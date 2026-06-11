# Koda-Arc Schema File Structure Guidelines

This document details the structural guidelines for the schema package (`packages/schema`), which serves as the single source of truth for validation rules and data types.

## 1. Directory Structure

The schema package should be organized as follows:

```
packages/schema/src/
├── entities/           # Database entity validations (e.g., Session, Message, User)
├── api/                # API contract schemas (e.g., requests, responses)
├── index.ts            # Barrel export of all validation schemas and inferred types
```

---

## 2. Key Architectural Guidelines

### 2.1 Zero External Workspace Dependencies
- **Rule:** This package **must not** import any codebase symbols from `@koda-arc/cli`, `@koda-arc/server`, or `@koda-arc/db`.
- **Rationale:** Keeps validation models fully pure, fast to load, and deployable across any workspace environment.

### 2.2 Inferred Types
- Always define validation schemas (e.g. using Zod, ArkType, or TypeBox) and export both the schema objects and their TypeScript inferred types.
- Example:
  ```typescript
  import { z } from "zod";
  
  export const SessionSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    createdAt: z.date(),
  });
  
  export type Session = z.infer<typeof SessionSchema>;
  ```
