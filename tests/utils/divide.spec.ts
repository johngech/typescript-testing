import { describe, it, expect } from "vitest";
import {
  divide,
  divideSync,
  divideWithRemainder,
  DivisionError,
} from "../../src/utils/divide";

describe("divideSync", () => {
  it("should divide two positive numbers", () => {
    expect(divideSync(10, 2)).toBe(5);
  });

  it("should handle negative numbers", () => {
    expect(divideSync(-10, 2)).toBe(-5);
    expect(divideSync(10, -2)).toBe(-5);
    expect(divideSync(-10, -2)).toBe(5);
  });

  it("should apply precision option", () => {
    expect(divideSync(10, 3, { precision: 2 })).toBe(3.33);
    expect(divideSync(1, 7, { precision: 4 })).toBe(0.1429);
  });

  it("should throw DivisionError when dividing by zero", () => {
    expect(() => divideSync(10, 0)).toThrow(DivisionError);
    expect(() => divideSync(10, 0)).toThrow(/Cannot divide by zero/i);
  });

  it("should include dividend and divisor in DivisionError", () => {
    try {
      divideSync(10, 0);
    } catch (error) {
      expect(error).toBeInstanceOf(DivisionError);
      expect((error as DivisionError).dividend).toBe(10);
      expect((error as DivisionError).divisor).toBe(0);
    }
  });

  it("should throw DivisionError for invalid dividend", () => {
    expect(() => divideSync(Number.NaN, 2)).toThrow(
      /Dividend must be a valid number/i,
    );
  });

  it("should throw DivisionError for invalid divisor", () => {
    expect(() => divideSync(10, Number.NaN)).toThrow(
      /Divisor must be a valid number/i,
    );
  });
});

describe("divide", () => {
  it("should divide asynchronously", async () => {
    const result = await divide(10, 2);
    expect(result).toBe(5);
  });

  it("should handle precision in async divide", async () => {
    const result = await divide(10, 3, { precision: 1 });
    expect(result).toBe(3.3);
  });

  it("should reject when dividing by zero", async () => {
    await expect(divide(10, 0)).rejects.toThrow(DivisionError);
  });

  it("should reject for invalid input", async () => {
    await expect(divide(Number.NaN, 2)).rejects.toThrow(
      /Dividend must be a valid number/i,
    );
  });
});

describe("divideWithRemainder", () => {
  it("should return quotient and remainder for exact division", () => {
    const result = divideWithRemainder(10, 2);
    expect(result).toEqual({ quotient: 5, remainder: 0, divisible: true });
  });

  it("should return quotient and remainder for non-exact division", () => {
    const result = divideWithRemainder(10, 3);
    expect(result).toEqual({ quotient: 3, remainder: 1, divisible: false });
  });

  it("should handle negative numbers", () => {
    const result = divideWithRemainder(-10, 3);
    expect(result.quotient).toBe(-4);
    expect(result.remainder).toBe(2);
  });

  it("should mark as divisible when remainder is zero", () => {
    expect(divideWithRemainder(12, 4).divisible).toBe(true);
    expect(divideWithRemainder(13, 4).divisible).toBe(false);
  });

  it("should throw DivisionError when dividing by zero", () => {
    expect(() => divideWithRemainder(10, 0)).toThrow(DivisionError);
  });
});
