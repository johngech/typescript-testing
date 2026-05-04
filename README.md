# TypeScript Testing Patterns with Vitest

A comprehensive collection of real-world testing examples and patterns using TypeScript, Vitest, and Bun. This repository demonstrates advanced testing techniques through practical mock services, utility modules, and interactive test examples.

## What This Repository Covers

- **Mocking** — Module mocking with `vi.mock()` and `vi.mocked()` for isolating dependencies
- **Stubbing** — Using `vi.spyOn()` to replace method implementations with controlled behavior
- **Spying** — Observing function calls and interactions without changing implementation
- **Interaction Testing** — Verifying how components collaborate using `toHaveBeenCalledWith()` and related matchers
- **Positive & Negative Testing** — Testing both success paths and error scenarios
- **Boundary Testing** — Parametrized tests for edge cases (time boundaries, input limits)
- **Parametrized Testing** — Using `it.each()` with arrays of objects for data-driven tests
- **Asynchronous Code Testing** — Testing async/await patterns, promises, and mocked delays
- **Custom Error Classes** — Testing domain-specific errors with `toThrow()` matchers
- **Fake Timers** — Controlling time with `vi.useFakeTimers()` and `vi.advanceTimersByTime()`
- **Object Assertions** — Using `toHaveProperty()` and `toMatchObject()` for flexible assertions

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript (strict mode)
- **Test Framework**: Vitest v4 + Vite v8
- **Linting**: ESLint v10 with typescript-eslint
- **Formatting**: Prettier v3
- **CI**: GitHub Actions (Test & Lint workflow)

## Example: Refresh Token Test

```typescript
describe("refreshToken", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mockUsers to initial state
    mockUsers.length = 0;
    mockUsers.push(...initialUsers);
  });

  it("should throw an error when empty token is provided", async () => {
    await expect(refreshToken("")).rejects.toThrow(
      /refresh token is required/i
    );
  });

  it("should throw an error when invalid token is provided", async () => {
    await expect(refreshToken("abce123d$#%")).rejects.toThrow(
      InvalidTokenError
    );
  });

  it("should throw an error when provided token is expired", async () => {
    vi.useFakeTimers();

    const { refreshToken: refresh } = await login({
      email: "admin@example.com",
      password: "ab2#".repeat(2),
    });

    // Decode token to get actual expiration
    const decoded = JSON.parse(
      Buffer.from(refresh, "base64").toString("utf-8")
    );

    // Advance time past token expiration
    vi.advanceTimersByTime(decoded.exp - Date.now() + 1000);

    await expect(refreshToken(refresh)).rejects.toThrow(TokenExpiredError);

    vi.useRealTimers();
  });

  it("should issue a new access token", async () => {
    const { refreshToken: refresh } = await login({
      email: "user@example.com",
      password: "ab2@".repeat(2),
    });

    const result = await refreshToken(refresh);

    expect(result).toHaveProperty("accessToken");
    expect(result).toMatchObject({ expiresIn: 3600 });
  });

  it("should call delay with 50ms", async () => {
    const { refreshToken: refresh } = await login({
      email: "user@example.com",
      password: "ab2@".repeat(2),
    });

    await refreshToken(refresh);

    expect(delay).toHaveBeenCalledWith(50);
  });
});
```

## Project Structure

```
src/
├── utils/          # Advanced utility modules (auth, tax, primes, etc.)
├── libs/           # Library modules (security, currency, shipping, etc.)
├── core.ts         # Main exercises (Stack, validation, discounts)
├── mocking.ts      # Mocking examples using libs modules
└── mock-stub-spy/  # Stubbing, mocking, spying examples

tests/
├── utils/          # Tests for utility modules
├── mock-stub-spy/  # Tests for stubbing/spying examples
├── core.spec.ts    # Tests for core exercises
└── mocking.spec.ts # Comprehensive mocking examples
```

## Commands

```bash
bun run test        # Run all tests
bun run test:ui     # Vitest UI mode
bun run coverage    # Run tests with coverage
bun run typecheck   # TypeScript type checking
bun run lint        # ESLint with auto-fix
bun run format      # Prettier format all files
```

## Getting Started

### Prerequisites

Install Bun (if not already installed):

```bash
# macOS, Linux, or WSL
curl -fsSL https://bun.sh/install | bash

# Or via npm (if Node.js is available)
npm install -g bun
```

See the [official Bun documentation](https://bun.sh/docs) for more installation options and setup guides.

### Clone and Run

```bash
# Clone the repository
git clone https://github.com/your-username/ts-testing.git
cd ts-testing

# Install dependencies
bun install

# Run tests
bun run test

# Start exploring!
# - Source code: src/
# - Tests: tests/
```
