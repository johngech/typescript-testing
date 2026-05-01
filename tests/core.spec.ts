import { it, expect, describe } from "vitest";
import {
  calculateDiscount,
  canDrive,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from "../src/core";

describe("getCoupons", () => {
  it("should return an arrays of coupons", () => {
    const coupons = getCoupons();

    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should return an array of coupons with valid code", () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(coupon).toBeTruthy();
    });
  });

  it("should return an array of coupons with valid discounts", () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

/**
 * Positive Testing and Negative Testing
 *
 * Positive Testing:
 * -> Ensures our application works correctly under normal conditions.
 *
 * Negative Testing:
 *  -> Checks how well our applications handles unexpected or incorrect input.
 *
 */

describe("calculateDiscount", () => {
  it("should return discounted price if given valid code", () => {
    expect(calculateDiscount({ price: 10, discountCode: "SAVE10" })).toBe(9);
    expect(calculateDiscount({ price: 10, discountCode: "SAVE20" })).toBe(8);
  });

  it("should handle negative price", () => {
    expect(calculateDiscount({ price: -10, discountCode: "SAVE10" })).toMatch(
      /invalid/i,
    );
  });

  it("should handle invalid discount code", () => {
    expect(calculateDiscount({ price: 10, discountCode: "INVALID" })).toBe(10);
  });
});

describe("validateUserInput", () => {
  it("should return success if given valid input", () => {
    expect(validateUserInput({ username: "john", age: 18 })).toMatch(
      /success/i,
    );
    expect(validateUserInput({ username: "john", age: 20 })).toMatch(
      /success/i,
    );
    expect(validateUserInput({ username: "john", age: 100 })).toMatch(
      /success/i,
    );
  });

  it("should handle username less than 3 characters long", () => {
    expect(validateUserInput({ username: "aa", age: 20 })).toMatch(/invalid/i);
  });

  it("should handle username greater than 255 characters long", () => {
    expect(validateUserInput({ username: "a".repeat(256), age: 20 })).toMatch(
      /invalid/i,
    );
  });

  it("should handle age less than 18", () => {
    expect(validateUserInput({ username: "john", age: 17 })).toMatch(
      /invalid/i,
    );
  });

  it("should handle age greater than 100", () => {
    expect(validateUserInput({ username: "john", age: 101 })).toMatch(
      /invalid/i,
    );
  });

  it("should handle invalid username and age", () => {
    expect(validateUserInput({ username: "", age: 101 })).toMatch(
      /invalid username/i,
    );
    expect(validateUserInput({ username: "", age: 101 })).toMatch(
      /invalid age/i,
    );
  });
});

/**
 * Boundary Testing
 * => Testing techniques where we focus on the edges or boundaries of input values
 *  to ensure our software is working correctly under extreme conditions
 */

describe("isPriceInRange", () => {
  it("should return false when price is outside the range", () => {
    expect(isPriceInRange(-10, 0, 100)).toBeFalsy();
    expect(isPriceInRange(200, 0, 100)).toBeFalsy();
  });

  it("should return true when price is equal to the min or the max", () => {
    expect(isPriceInRange(0, 0, 100)).toBeTruthy();
    expect(isPriceInRange(100, 0, 100)).toBeTruthy();
  });

  it("should return true when price is within the range", () => {
    expect(isPriceInRange(25, 0, 100)).toBeTruthy();
    expect(isPriceInRange(50, 0, 100)).toBeTruthy();
    expect(isPriceInRange(75, 0, 100)).toBeTruthy();
  });

  // Parametrized Test => Data Test
  it.each([
    { scenario: "price < min", price: -10, result: false },
    { scenario: "price = min", price: 0, result: true },
    { scenario: "price between min and max", price: 50, result: true },
    { scenario: "price = max", price: 100, result: true },
    { scenario: "price > max", price: 200, result: false },
  ])("should return $result when $scenario", ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });
});

describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;

  it("should return false if username is too short", () => {
    expect(isValidUsername("a".repeat(minLength - 1))).toBeFalsy();
  });

  it("should return false if username is too long", () => {
    expect(isValidUsername("a".repeat(maxLength + 1))).toBeFalsy();
  });

  it("should return false for empty string", () => {
    expect(isValidUsername("")).toBeFalsy();
  });

  it("should return true when username is at the min or max length", () => {
    expect(isValidUsername("a".repeat(minLength))).toBeTruthy();
    expect(isValidUsername("a".repeat(maxLength))).toBeTruthy();
  });

  it("should return true when username is within the min or max length", () => {
    expect(isValidUsername("a".repeat(minLength + 1))).toBeTruthy();
    expect(isValidUsername("a".repeat(maxLength - 1))).toBeTruthy();
  });
});

describe("canDrive", () => {
  it("should return error for an invalid country code", () => {
    expect(canDrive({ age: 17, countryCode: "ET" })).toMatch(/invalid/i);
  });

  it("should return false for underage in the US", () => {
    expect(canDrive({ age: 15, countryCode: "US" })).toBeFalsy();
  });

  it("should return true for min age in the US", () => {
    expect(canDrive({ age: 16, countryCode: "US" })).toBeTruthy();
  });

  it("should return true for eligible age in the US", () => {
    expect(canDrive({ age: 17, countryCode: "US" })).toBeTruthy();
  });

  it("should return false for underage in the UK", () => {
    expect(canDrive({ age: 16, countryCode: "UK" })).toBeFalsy();
  });

  it("should return true for min age in the UK", () => {
    expect(canDrive({ age: 17, countryCode: "UK" })).toBeTruthy();
  });

  it("should return true for eligible age in the UK", () => {
    expect(canDrive({ age: 18, countryCode: "UK" })).toBeTruthy();
  });

  /**
   * Parametrize Test
   * => A way to run the same test multiple times with different sets of input data
   */

  it.each([
    { age: 15, countryCode: "US", result: false },
    { age: 16, countryCode: "US", result: true },
    { age: 17, countryCode: "US", result: true },
    { age: 16, countryCode: "UK", result: false },
    { age: 17, countryCode: "UK", result: true },
    { age: 18, countryCode: "UK", result: true },
  ])(
    "should return $result for ($age, $countryCode)",
    ({ age, countryCode, result }) => {
      expect(canDrive({ age: age, countryCode: countryCode })).toBe(result);
    },
  );
});
