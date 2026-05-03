import { describe, it, expect, vi } from "vitest";

/**

* Testing Terminology: Mock, Spy, Stub 
*
* ==================================================
* MOCK
* ==================================================
* Replaces a real implementation completely and allows
* control + verification of behavior.
*
* Real-world analogy:
* Hiring a fake chef who doesn’t cook—just serves exactly
* what you tell them.
*
* Test Example:
  */

import { greetUser } from "../../src/mock-stub-spy/service";

vi.mock("../../src/mock-stub-spy/db", () => ({
  getUserFromDB: vi.fn(() => ({ id: "1", name: "Mocked User" })),
}));

describe("Mock example", () => {
  it("uses mocked implementation", () => {
    const result = greetUser("1");

    expect(result).toBe("Hello, Mocked User");
  });
});

/*
 * ==================================================
 * SUMMARY
 * ==================================================
 * Mock → replace implementation completely
 */
