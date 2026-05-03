import { it, expect, describe, vi } from "vitest";

import { Answer } from "../../src/utils/Answer";

describe("Answer", () => {
  it("should return the correct value", () => {
    const answer = new Answer(42);

    expect(answer.value()).toBe(42);
  });

  it("should allow spying on value method", () => {
    const answer = new Answer(42);
    const spy = vi.spyOn(answer, "value");

    answer.value();

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveReturnedWith(42);
  });
});
