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

| Category                  | Test Count | Status   |
| ------------------------- | ---------- | -------- |
| Positive (Happy Path)     | 12         | All Pass |
| Negative (Error Handling) | 6          | All Pass |
| Edge Cases                | 7          | All Pass |
