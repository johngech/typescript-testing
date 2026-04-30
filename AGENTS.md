# AGENTS.md

## Stack
- Runtime: Bun (bun.lock present, no package-lock/ yarn.lock)
- Language: JavaScript (no tsconfig.json, despite repo name)
- Test framework: Vitest v4 + Vite v8
- No TypeScript, no linting, no typechecking configured

## Commands
- `bun run test` — run all tests (Vitest)
- `bun run test:ui` — Vitest UI mode
- `bun run coverage` — Vitest with coverage (v8)
- `bun run dev` — Vite dev server
- `bun run build` — Vite build

## Structure
- `src/utils/` — utility functions (getSum, divide, calculateTax, prime)
- `src/libs/` — library modules (security, currency, email, payment, analytics, shipping)
- `src/core.js` — main exercises (discounts, validation, async, Stack class, password strength)
- No tests exist yet — this is a course repo where learners write them

## Notes
- No CI workflows, no ESLint/Prettier, no pre-commit hooks
- Coverage output goes to `coverage/` (gitignored)
