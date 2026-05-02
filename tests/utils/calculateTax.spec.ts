import { describe, expect, it } from "vitest";
import {
  calculateTax,
  calculateTaxAsync,
  type TaxBracket,
} from "../../src/utils/calculateTax";

describe("calculateTax", () => {
  it("should calculate tax using default brackets", () => {
    const result = calculateTax(10000);

    expect(result.tax).toBe(1000);
    expect(result.effectiveRate).toBe(0.1);
    expect(result.bracket.rate).toBe(0.1);
  });

  it("should calculate tax for higher brackets", () => {
    const result = calculateTax(30000);

    expect(result.tax).toBe(4500); // 30000 * 0.15
    expect(result.bracket.rate).toBe(0.15);
  });

  it("should calculate tax for top bracket", () => {
    const result = calculateTax(150000);

    expect(result.tax).toBe(37500); // 150000 * 0.25
    expect(result.bracket.rate).toBe(0.25);
  });

  it("should return correct effective rate", () => {
    const result = calculateTax(50000);

    expect(result.effectiveRate).toBe(0.15);
  });

  it("should handle zero income", () => {
    const result = calculateTax(0);

    expect(result.tax).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });

  it("should throw error for negative income", () => {
    expect(() => calculateTax(-100)).toThrow(/Invalid income/);
  });

  it("should throw error if provided income is less than '0'", () => {
    expect(() => calculateTax(-0.5)).toThrow(/Invalid income/);
  });

  it("should use custom brackets when provided", () => {
    const customBrackets: TaxBracket[] = [
      { min: 0, max: 20000, rate: 0.05 },
      { min: 20001, max: Infinity, rate: 0.1 },
    ];

    const result = calculateTax(15000, { brackets: customBrackets });

    expect(result.tax).toBe(750); // 15000 * 0.05
    expect(result.bracket.rate).toBe(0.05);
  });

  it("should return complete TaxCalculationResult object", () => {
    const result = calculateTax(10000);

    expect(result).toHaveProperty("tax");
    expect(result).toHaveProperty("effectiveRate");
    expect(result).toHaveProperty("bracket");
    expect(result).toHaveProperty("income");
    expect(result.income).toBe(10000);
  });
});

describe("calculateTaxAsync", () => {
  it("should calculate tax asynchronously", async () => {
    const result = await calculateTaxAsync(10000);

    expect(result.tax).toBe(1000);
    expect(result.effectiveRate).toBe(0.1);
  });

  it("should use custom brackets asynchronously", async () => {
    const customBrackets: TaxBracket[] = [{ min: 0, max: 10000, rate: 0.08 }];

    const result = await calculateTaxAsync(10000, { brackets: customBrackets });

    expect(result.tax).toBe(800);
  });

  it("should reject for invalid income", async () => {
    await expect(calculateTaxAsync(-100)).rejects.toThrow(/Invalid income/);
  });

  it("should return complete result object asynchronously", async () => {
    const result = await calculateTaxAsync(50000);

    expect(result).toMatchObject({
      income: 50000,
      tax: expect.any(Number),
      effectiveRate: expect.any(Number),
      bracket: expect.any(Object),
    });
  });
});
