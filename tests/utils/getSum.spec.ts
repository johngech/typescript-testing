import { describe, it, expect } from "vitest";
import { getSum, getSumAsync, getSumWithOptions, type SumOptions } from "../../src/utils/getSum";

describe("getSum", () => {
  it("should return the sum of multiple numbers", () => {
    expect(getSum(1, 2, 3, 4, 5)).toBe(15);
  });

  it("should return 0 for no arguments", () => {
    expect(getSum()).toBe(0);
  });

  it("should handle negative numbers", () => {
    expect(getSum(10, -5, 5)).toBe(10);
  });

  it("should handle decimal numbers", () => {
    expect(getSum(0.1, 0.2)).toBeCloseTo(0.3);
  });

  it("should throw TypeError for non-number arguments", () => {
    expect(() => getSum(1, "two" as any)).toThrow(TypeError);
    expect(() => getSum(1, "two" as any)).toThrow(/expected number/);
  });

  it("should throw TypeError for NaN", () => {
    expect(() => getSum(1, NaN)).toThrow(TypeError);
  });
});

describe("getSumAsync", () => {
  it("should return the sum asynchronously", async () => {
    const result = await getSumAsync(1, 2, 3);
    expect(result).toBe(6);
  });

  it("should handle empty input asynchronously", async () => {
    const result = await getSumAsync();
    expect(result).toBe(0);
  });

  it("should reject with TypeError for invalid input", async () => {
    await expect(getSumAsync(1, "x" as any)).rejects.toThrow(TypeError);
  });
});

describe("getSumWithOptions", () => {
  const numbers = [1, -2, 0, 3, -4, 5];

  it("should ignore negatives when option is set", () => {
    const result = getSumWithOptions(numbers, { ignoreNegatives: true });
    expect(result).toBe(9); // 1 + 0 + 3 + 5
  });

  it("should ignore zeros when option is set", () => {
    const result = getSumWithOptions(numbers, { ignoreZeros: true });
    expect(result).toBe(3); // 1 + (-2) + 3 + (-4) + 5
  });

  it("should apply transform function to each number", () => {
    const result = getSumWithOptions(numbers, { transform: (n) => n * 2 });
    expect(result).toBe(6); // 2 + (-4) + 0 + 6 + (-8) + 10
  });

  it("should combine multiple options", () => {
    const result = getSumWithOptions(numbers, {
      ignoreNegatives: true,
      ignoreZeros: true,
      transform: (n) => n * 3,
    });
    expect(result).toBe(27); // (1*3) + (3*3) + (5*3)
  });

  it("should return 0 for empty array", () => {
    expect(getSumWithOptions([], {})).toBe(0);
  });
});
