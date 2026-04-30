# AGENTS.md

## Stack
- Runtime: Bun (bun.lock present, no package-lock/ yarn.lock)
- Language: TypeScript (strict mode enabled)
- Test framework: Vitest v4 + Vite v8
- Type checking: `tsc --noEmit` via `bun run typecheck`

## Commands
- `bun run test` — run all tests (Vitest, processes .ts files)
- `bun run test:ui` — Vitest UI mode
- `bun run coverage` — Vitest with coverage (v8)
- `bun run typecheck` — TypeScript type checking

## Structure
- `src/utils/` — utility functions (getSum, divide, calculateTax, prime)
- `src/libs/` — library modules (security, currency, email, payment, analytics, shipping)
- `src/core.ts` — main exercises (discounts, validation, async, Stack class, password strength)
- `vitest.config.ts` — explicit Vitest configuration
- No tests exist yet — this is a course repo where learners write them

## Notes
- No CI workflows, no ESLint/Prettier, no pre-commit hooks
- Coverage output goes to `coverage/` (gitignored)
- No web app entry point (no index.html) — Vite is used only for Vitest
