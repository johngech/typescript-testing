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
- `src/utils/` — advanced utility modules:
  - `getSum.ts` — summation with options (ignore negatives/zeros, transform), async support
  - `divide.ts` — DivisionError class, sync/async divide, divideWithRemainder, precision control
  - `calculateTax.ts` — progressive tax brackets, TaxCalculationResult, async support
  - `prime.ts` — optimized prime checks (O(√n)), primeFactorization, getNthPrime, getPrimesInRange, PrimeSieve class
- `src/libs/` — library modules (security, currency, email, payment, analytics, shipping)
- `src/core.ts` — main exercises (discounts, validation, async, Stack class, password strength)
- `src/intro.ts` — introductory functions (max, fizzBuzz, factorial, fibonacci, etc.)
- `src/mocking.ts` — mocking examples using libs modules
- `tests/` — test files: `intro.spec.ts` (complete), `core.spec.ts` (tests for Stack, createProduct, isStrongPassword), `setupAndTeardown.spec.ts`, `toBeMatchers.spec.ts`
- `vitest.config.ts` — explicit Vitest configuration
- No tests exist for `src/utils/`, `src/libs/`, or `src/mocking.ts`

## Notes
- No CI workflows, no ESLint/Prettier, no pre-commit hooks
- Coverage output goes to `coverage/` (gitignored)
- No web app entry point (no index.html) — Vite is used only for Vitest
