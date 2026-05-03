import { it, expect, describe, vi } from "vitest";
/**
 *
 * ==================================================
 * STUB
 * ==================================================
 *
 * Replaces a function's output with a fixed value,
 * without caring about how it was called.
 *
 * Real-world analogy:
 * Giving the chef pre-made sauce so the dish becomes predictable.
 *
 * Test Example:
 */

import { exchange } from "../../src/mock-stub-spy/exchange";

describe("Stub example", () => {
  it("controls output of dependency", () => {
    vi.spyOn(exchange, "getExchangeRate").mockReturnValue(2);

    const result = exchange.convert(10);

    expect(result).toBe(20);
  });
});

/**
 *
 * ==================================================
 * SUMMARY
 * ==================================================
 * Stub → control output only
 */
