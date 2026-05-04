# AGENTS.md

## Stack

- Runtime: Bun (bun.lock present, no package-lock/ yarn.lock)
- Language: TypeScript (strict mode enabled)
- Test framework: Vitest v4 + Vite v8
- Type checking: `tsc --noEmit` via `bun run typecheck`
- Linter: ESLint v10 with `@eslint/js` recommended + `typescript-eslint` recommended/strict
- Formatter: Prettier v3 with custom config

## Commands

- `bun run test` — run all tests (Vitest, processes .ts files)
- `bun run test:ui` — Vitest UI mode
- `bun run coverage` — Vitest with coverage (v8)
- `bun run typecheck` — TypeScript type checking
- `bun run lint` — ESLint with auto-fix
- `bun run format` — Prettier format all files

## Structure

- `src/utils/` — advanced utility modules:
  - `getSum.ts` — summation with options (ignore negatives/zeros, transform), async support
  - `divide.ts` — DivisionError class, sync/async divide, divideWithRemainder, precision control
  - `calculateTax.ts` — progressive tax brackets, TaxCalculationResult, async support
  - `prime.ts` — optimized prime checks (O(√n)), primeFactorization, getNthPrime, getPrimesInRange, PrimeSieve class
  - `Answer.ts` — simple class with value method (for spying examples)
  - `customerApi.ts` — mock customer API with CRUD operations
  - `orderService.ts` — mock order processing service
  - `authService.ts` — mock token-based auth service (login, refreshToken, validateToken)
- `src/libs/` — library modules (security, currency, email, payment, analytics, shipping)
- `src/core.ts` — main exercises (discounts, validation, async, Stack class, password strength)
- `src/intro.ts` — introductory functions (max, fizzBuzz, factorial, fibonacci, etc.)
- `src/mocking.ts` — mocking examples using libs modules (getPriceInCurrency, getShippingInfo, renderPage, submitOrder, signUp, login, isOnline, getDiscount)
- `src/mock-stub-spy/` — examples for stubbing, mocking, spying:
  - `exchange.ts` — object pattern module with getExchangeRate and convert (for stubbing demo with vi.spyOn)
  - `db.ts` — mock database module
  - `service.ts` — mock service module
- `tests/` — test files:
  - `intro.spec.ts` (complete)
  - `core.spec.ts` (tests for Stack, createProduct, isStrongPassword)
  - `utils/*.spec.ts` (tests for utility modules)
  - `mocking.spec.ts` (comprehensive mocking examples: module mocking, interaction testing, partial mocking, spying, date mocking with parametrized tests)
  - `mock-stub-spy/stub.test.ts` (stubbing example with vi.spyOn)
  - `utils/Answer.test.ts` (spying example on class methods)
- `vitest.config.ts` — explicit Vitest configuration
- `eslint.config.ts` — ESLint config with js/typescript-eslint recommended + strict
- `prettier.config.ts` — Prettier config (singleQuote, semi, printWidth: 100)
- `.github/workflows/ci.yml` — GitHub Actions: Test & Lint workflow

## Notes

- Coverage output goes to `coverage/` (gitignored)
- No web app entry point (no index.html) — Vite is used only for Vitest
- `@types/node` installed for Node.js type definitions (Buffer, etc.)
- `tsconfig.json` includes `"types": ["node"]` for Node.js type support, and includes both `src/**/*.ts` and `tests/**/*.ts`
- Tests use Vitest mocks (`vi.mock`, `vi.spyOn`, `vi.mocked`) and fake timers (`vi.useFakeTimers`, `vi.setSystemTime`)
- Parametrized tests use `it.each` with array of objects format
- Git hooks configured with husky + lint-staged
- `.prettierignore` excludes node_modules, dist, coverage
- `.eslintignore` deprecated (ignores now in `eslint.config.ts`)
- GitHub Actions workflow "Test & Lint" runs on push/PR to main/master: typecheck → lint → test
