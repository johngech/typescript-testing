import { it, expect, describe } from "vitest";

import { max } from "../src/intro";

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    // AAA
    // Arrange: Turn on the TV
    // Act: Press the power button
    // Assert: Verify the TV is off

    // Arrange
    const a = 2;
    const b = 1;

    // Act
    const result = max(a, b);

    // Assert
    expect(result).toBe(2);
  });

  it("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });

  it("should return the first argument when both arguments are equal", () => {
    expect(max(1, 1)).toBe(1);
  });
});
