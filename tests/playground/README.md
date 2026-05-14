# Playground - Divide Function Tests

## Overview

Comprehensive test suite for the `divide` function located in `src/playground/divide.ts`. The tests cover all edge cases and behaviors of the synchronous division utility with optional precision control.

## What Was Tested

### DivisionError Class

Tests verify that the custom error class is properly instantiated with the correct `name` property and extends the native `Error` class. All error-throwing scenarios are validated to throw `DivisionError` specifically.

### Error Handling - Division by Zero

All division by zero scenarios are tested:

- Positive dividend divided by zero
- Negative dividend divided by zero
- Zero divided by zero

Each scenario confirms that a `DivisionError` with the message "Division by zero" is thrown.

### Error Handling - Invalid Inputs (NaN)

Tests cover all NaN input combinations:

- NaN as the dividend alone
- NaN as the divisor alone
- Both dividend and divisor as NaN

Each case validates the appropriate error message ("Invalid dividend" or "Invalid divisor").

### Infinity Edge Cases

Tests infinity behavior:

- Positive/negative Infinity as dividend with finite divisor
- Finite dividend divided by positive/negative Infinity
- Infinity divided by Infinity (produces NaN result without throwing)

### Basic Arithmetic Operations

Covers standard division scenarios:

- Two positive numbers
- Two negative numbers
- Mixed signs (positive/negative and negative/positive)
- Zero as dividend

### Precision Option

Validates the `precision` option behavior:

- Rounding to specified decimal places (0, 2, 5, 10 decimal places)
- Repeating decimal results (1/3, 2/3)
- Negative results with precision
- Exact divisions (no rounding needed)

### Floating Point Edge Cases

Tests for JavaScript floating point quirks:

- Very small numbers (0.000001)
- Very large numbers (1e308)
- Decimal inputs with known floating point issues (0.3 / 0.1)
- High precision with floating point results

### Default Options

Confirms correct behavior when:

- Options object is empty `{}`
- Options parameter is omitted entirely

## Test Case Documentation

### Test Metadata

| Field                | Value                             |
| -------------------- | --------------------------------- |
| **Test Suite ID**    | TS-DIV-001                        |
| **Module**           | `src/playground/divide.ts`        |
| **Test File**        | `tests/playground/divide.spec.ts` |
| **Test Framework**   | Vitest v4                         |
| **Language**         | TypeScript (strict mode)          |
| **Test Type**        | Unit Test                         |
| **Total Test Cases** | 25                                |
| **Execution Date**   | 2026-05-06                        |
| **Executed By**      | Automated (Vitest)                |

### Test Cases

| Test ID    | Test Name                           | Test Description                                                         | Category  | Priority | Preconditions | Test Steps                              | Expected Result                                        | Actual Result                                          | Status |
| ---------- | ----------------------------------- | ------------------------------------------------------------------------ | --------- | -------- | ------------- | --------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ | ------ |
| TC-DIV-001 | Divide two positive numbers         | Verify division of two positive numbers returns correct quotient         | Positive  | High     | None          | Call `divide(10, 2)`                    | Returns `5`                                            | Returns `5`                                            | Pass   |
| TC-DIV-002 | Divide two negative numbers         | Verify division of two negative numbers returns positive quotient        | Positive  | High     | None          | Call `divide(-10, -2)`                  | Returns `5`                                            | Returns `5`                                            | Pass   |
| TC-DIV-003 | Divide negative by positive         | Verify mixed sign division (negative dividend) returns negative result   | Positive  | High     | None          | Call `divide(-10, 2)`                   | Returns `-5`                                           | Returns `-5`                                           | Pass   |
| TC-DIV-004 | Divide positive by negative         | Verify mixed sign division (negative divisor) returns negative result    | Positive  | High     | None          | Call `divide(10, -2)`                   | Returns `-5`                                           | Returns `-5`                                           | Pass   |
| TC-DIV-005 | Divide zero by positive number      | Verify zero dividend returns zero                                        | Positive  | High     | None          | Call `divide(0, 5)`                     | Returns `0`                                            | Returns `0`                                            | Pass   |
| TC-DIV-006 | Divide positive by zero             | Verify division by zero throws DivisionError                             | Negative  | Critical | None          | Call `divide(10, 0)`                    | Throws `DivisionError` with message "Division by zero" | Throws `DivisionError` with message "Division by zero" | Pass   |
| TC-DIV-007 | Divide zero by zero                 | Verify 0/0 throws DivisionError                                          | Negative  | Critical | None          | Call `divide(0, 0)`                     | Throws `DivisionError` with message "Division by zero" | Throws `DivisionError` with message "Division by zero" | Pass   |
| TC-DIV-008 | Divide negative by zero             | Verify negative number divided by zero throws DivisionError              | Negative  | Critical | None          | Call `divide(-10, 0)`                   | Throws `DivisionError` with message "Division by zero" | Throws `DivisionError` with message "Division by zero" | Pass   |
| TC-DIV-009 | NaN as dividend                     | Verify NaN dividend throws DivisionError with "Invalid dividend" message | Negative  | Critical | None          | Call `divide(NaN, 2)`                   | Throws `DivisionError` with message "Invalid dividend" | Throws `DivisionError` with message "Invalid dividend" | Pass   |
| TC-DIV-010 | NaN as divisor                      | Verify NaN divisor throws DivisionError with "Invalid divisor" message   | Negative  | Critical | None          | Call `divide(10, NaN)`                  | Throws `DivisionError` with message "Invalid divisor"  | Throws `DivisionError` with message "Invalid divisor"  | Pass   |
| TC-DIV-011 | Both operands as NaN                | Verify both NaN inputs throws DivisionError                              | Negative  | Critical | None          | Call `divide(NaN, NaN)`                 | Throws `DivisionError`                                 | Throws `DivisionError`                                 | Pass   |
| TC-DIV-012 | Positive Infinity as dividend       | Verify Infinity divided by finite number returns Infinity                | Edge Case | Medium   | None          | Call `divide(Infinity, 2)`              | Returns `Infinity`                                     | Returns `Infinity`                                     | Pass   |
| TC-DIV-013 | Negative Infinity as dividend       | Verify -Infinity divided by finite number returns -Infinity              | Edge Case | Medium   | None          | Call `divide(-Infinity, 2)`             | Returns `-Infinity`                                    | Returns `-Infinity`                                    | Pass   |
| TC-DIV-014 | Finite divided by positive Infinity | Verify finite number divided by Infinity returns 0                       | Edge Case | Medium   | None          | Call `divide(10, Infinity)`             | Returns `0`                                            | Returns `0`                                            | Pass   |
| TC-DIV-015 | Finite divided by negative Infinity | Verify finite number divided by -Infinity returns -0                     | Edge Case | Medium   | None          | Call `divide(10, -Infinity)`            | Returns `-0`                                           | Returns `-0`                                           | Pass   |
| TC-DIV-016 | Infinity divided by Infinity        | Verify Infinity/Infinity returns NaN                                     | Edge Case | Medium   | None          | Call `divide(Infinity, Infinity)`       | Returns `NaN`                                          | Returns `NaN`                                          | Pass   |
| TC-DIV-017 | Precision rounding to 2 decimals    | Verify precision option rounds to 2 decimal places                       | Positive  | High     | None          | Call `divide(10, 3, { precision: 2 })`  | Returns `3.33`                                         | Returns `3.33`                                         | Pass   |
| TC-DIV-018 | Precision rounding to 0 decimals    | Verify precision 0 returns integer                                       | Positive  | High     | None          | Call `divide(10, 3, { precision: 0 })`  | Returns `3`                                            | Returns `3`                                            | Pass   |
| TC-DIV-019 | Precision with repeating decimal    | Verify precision handles repeating decimals correctly                    | Positive  | High     | None          | Call `divide(1, 3, { precision: 3 })`   | Returns `0.333`                                        | Returns `0.333`                                        | Pass   |
| TC-DIV-020 | Precision with negative result      | Verify precision rounds negative results correctly                       | Positive  | High     | None          | Call `divide(-10, 3, { precision: 2 })` | Returns `-3.33`                                        | Returns `-3.33`                                        | Pass   |
| TC-DIV-021 | Precision with exact division       | Verify precision does not alter exact results                            | Positive  | High     | None          | Call `divide(10, 2, { precision: 2 })`  | Returns `5`                                            | Returns `5`                                            | Pass   |
| TC-DIV-022 | Very small numbers                  | Verify division handles very small decimal numbers                       | Edge Case | Medium   | None          | Call `divide(0.000001, 2)`              | Returns `0.0000005`                                    | Returns `0.0000005`                                    | Pass   |
| TC-DIV-023 | Very large numbers                  | Verify division handles very large numbers near MAX_SAFE_INTEGER         | Edge Case | Medium   | None          | Call `divide(1e308, 2)`                 | Returns `5e307`                                        | Returns `5e307`                                        | Pass   |
| TC-DIV-024 | Empty options object                | Verify function works with empty options `{}`                            | Positive  | Low      | None          | Call `divide(10, 2, {})`                | Returns `5`                                            | Returns `5`                                            | Pass   |
| TC-DIV-025 | No options parameter                | Verify function works without options parameter                          | Positive  | Low      | None          | Call `divide(10, 2)`                    | Returns `5`                                            | Returns `5`                                            | Pass   |

### Test Summary

| Metric                    | Value         |
| ------------------------- | ------------- |
| **Total Test Cases**      | 25            |
| **Passed**                | 25            |
| **Failed**                | 0             |
| **Blocked**               | 0             |
| **Not Executed**          | 0             |
| **Pass Rate**             | 100%          |
| **Critical Tests**        | 6 (All Pass)  |
| **High Priority Tests**   | 10 (All Pass) |
| **Medium Priority Tests** | 7 (All Pass)  |
| **Low Priority Tests**    | 2 (All Pass)  |

### Coverage Breakdown

## Source Code

<summary>src/playground/divide.ts</summary>

```typescript
export class DivisionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DivisionError";
  }
}

export interface DivideOptions {
  precision?: number;
}

export function divide(
  x: number,
  y: number,
  options: DivideOptions = {}
): number {
  if (Number.isNaN(x)) throw new DivisionError("Invalid dividend");

  if (Number.isNaN(y)) throw new DivisionError("Invalid divisor");

  if (y === 0) throw new DivisionError("Division by zero");

  let result = x / y;
  if (options.precision !== undefined)
    result = Number(result.toFixed(options.precision));

  return result;
}
```

## Test Code

<summary>tests/playground/divide.spec.ts</summary>

```typescript
import { describe, it, expect } from "vitest";
import { divide, DivisionError } from "../../src/playground/divide";

describe("divide", () => {
  describe("basic operations", () => {
    it("should divide two positive numbers", () => {
      expect(divide(10, 2)).toBe(5);
    });

    it("should divide two negative numbers", () => {
      expect(divide(-10, -2)).toBe(5);
    });

    it("should handle mixed signs", () => {
      expect(divide(-10, 2)).toBe(-5);
      expect(divide(10, -2)).toBe(-5);
    });

    it("should handle division resulting in zero", () => {
      expect(divide(0, 5)).toBe(0);
    });
  });

  describe("edge cases with zero", () => {
    it("should throw DivisionError when dividing by zero (positive dividend)", () => {
      expect(() => divide(10, 0)).toThrow(DivisionError);
      expect(() => divide(10, 0)).toThrow(/division by zero/i);
    });

    it("should throw DivisionError when dividing zero by zero", () => {
      expect(() => divide(0, 0)).toThrow(DivisionError);
    });

    it("should throw DivisionError when dividing negative by zero", () => {
      expect(() => divide(-10, 0)).toThrow(DivisionError);
    });
  });

  describe("edge cases with NaN", () => {
    it("should throw DivisionError when dividend is NaN", () => {
      expect(() => divide(Number.NaN, 2)).toThrow(DivisionError);
      expect(() => divide(Number.NaN, 2)).toThrow(/Invalid dividend/i);
    });

    it("should throw DivisionError when divisor is NaN", () => {
      expect(() => divide(10, Number.NaN)).toThrow(DivisionError);
      expect(() => divide(10, Number.NaN)).toThrow(/Invalid divisor/i);
    });

    it("should throw DivisionError when both are NaN", () => {
      expect(() => divide(Number.NaN, Number.NaN)).toThrow(DivisionError);
    });
  });

  describe("edge cases with Infinity", () => {
    it("should handle Infinity as dividend", () => {
      expect(divide(Infinity, 2)).toBe(Infinity);
      expect(divide(-Infinity, 2)).toBe(-Infinity);
    });

    it("should handle Infinity as divisor", () => {
      expect(divide(10, Infinity)).toBe(0);
      expect(divide(10, -Infinity)).toBe(-0);
    });

    it("should handle Infinity divided by Infinity (NaN)", () => {
      const result = divide(Infinity, Infinity);
      expect(Number.isNaN(result)).toBe(true);
    });
  });

  describe("precision option", () => {
    it("should round to specified decimal places", () => {
      expect(divide(10, 3, { precision: 2 })).toBe(3.33);
      expect(divide(10, 3, { precision: 0 })).toBe(3);
      expect(divide(10, 3, { precision: 5 })).toBe(3.33333);
    });

    it("should handle precision with repeating decimals", () => {
      expect(divide(1, 3, { precision: 3 })).toBe(0.333);
      expect(divide(2, 3, { precision: 4 })).toBe(0.6667);
    });

    it("should handle precision with negative results", () => {
      expect(divide(-10, 3, { precision: 2 })).toBe(-3.33);
    });

    it("should not affect exact divisions", () => {
      expect(divide(10, 2, { precision: 2 })).toBe(5);
    });
  });

  describe("floating point edge cases", () => {
    it("should handle very small numbers", () => {
      expect(divide(0.000001, 2)).toBe(0.0000005);
    });

    it("should handle very large numbers", () => {
      expect(divide(1e308, 2)).toBe(5e307);
    });

    it("should handle decimal dividends and divisors", () => {
      expect(divide(0.3, 0.1)).toBeCloseTo(3);
      expect(divide(1.5, 0.5)).toBe(3);
    });

    it("should handle precision with floating point results", () => {
      expect(divide(1, 3, { precision: 10 })).toBe(0.3333333333);
    });
  });

  describe("DivisionError properties", () => {
    it("should have correct error name", () => {
      try {
        divide(10, 0);
      } catch (error) {
        expect(error).toBeInstanceOf(DivisionError);
        expect((error as DivisionError).name).toBe("DivisionError");
      }
    });

    it("should be instance of Error", () => {
      try {
        divide(10, 0);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("no options provided", () => {
    it("should work with default empty options", () => {
      expect(divide(10, 2, {})).toBe(5);
    });

    it("should work without options parameter", () => {
      expect(divide(10, 2)).toBe(5);
    });
  });
});
```

## Assets

### Test Results in Terminal

![Test Results in Terminal](../../assets/Screenshot%20from%202026-05-14%2011-18-08.png)

### Test Results in Vitest UI

![Code Coverage Result](../../assets/Screenshot%20from%202026-05-14%2011-23-44.png)

### Code Coverage Result

![Test Results in Vitest UI](../../assets/Screenshot%20from%202026-05-14%2011-25-08.png)

## Repository

https://github.com/johngech/typescript-testing
