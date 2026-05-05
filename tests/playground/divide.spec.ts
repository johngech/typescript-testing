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
