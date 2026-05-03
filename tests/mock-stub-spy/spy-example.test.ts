import { it, expect, describe, vi } from "vitest";
/**
 *
 * ==================================================
 * SPY
 * ==================================================
 * *
 * Wraps a real function to observe how it is used
 * while still executing real logic.
 *
 * Real-world analogy:
 * Installing a camera in a real kitchen to watch the chef cook.
 *
 * Test Example:
 */

import * as db from "../../src/mock-stub-spy/db";
import { greetUser as greetUserSpy } from "../../src/mock-stub-spy/service";

describe("Spy example", () => {
  it("observes real implementation", () => {
    const spy = vi.spyOn(db, "getUserFromDB");

    const result = greetUserSpy("1");

    expect(spy).toHaveBeenCalledWith("1");
    expect(result).toBe("Hello, Yohannes"); // real value
  });
});
/*
 * ==================================================
 * SUMMARY
 * ==================================================
 * Spy  → observe real implementation
 */
