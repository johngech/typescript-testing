import { it, expect, describe } from "vitest";

describe("toBeMatchers - objects", () => {
  it("should demonstrate object matchers", () => {
    const result = { name: "john" };

    // We use the .toBe(*) matcher:
    // - to compare primitives (number, string, boolean, ...)
    // expect(result).toBe({ name: "john" }); // failing test

    // We use the .toEqual(*) matcher:
    // to compare objects()
    expect(result).toEqual({ name: "john" });

    // To compare truthy ness we use the following matchers
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
    expect(1).toBeDefined();
    expect(undefined).toBeUndefined();
    expect(null).toBeNull();
    expect(null).toBeNullable();

    // To compare numbers we use the following matchers
    expect(1).toBeGreaterThan(0);
    expect(1).toBeGreaterThanOrEqual(1);
    expect(1).toBeLessThan(2);
    expect(1).toBeLessThanOrEqual(1);
    // expect(actual).toBeCloseTo(expected,numOfDigits);

    // To assert against string:
    // .toBeMatch(string);

    // To assert against objects
    // .toEqual(array|object)
    // .toMatchObject(object)
    // .toHaveProperty(object)

    // To assert against array
    // .toHaveLength(number)
    // .toContain(value)

    // To assert against exceptions
    // .toThrowError(value)
  });
});

describe("toBeMatchers - strings", () => {
  it("should demonstrate string matchers", () => {
    const result = "The request file was not found.";

    // Loose (Too general) assertion
    expect(result).toBeDefined();

    // Tight (Too specific) assertion
    expect(result).toBe("The request file was not found.");

    // Good/Better assertion
    expect(result).toMatch("not found");
  });
});

describe("toBeMatchers - arrays", () => {
  it("should demonstrate array matchers", () => {
    const result = [1, 2, 3];

    // Loose (Too general) assertion
    expect(result).toBeDefined();

    // Tight (Too specific) assertion
    expect(result).toEqual([1, 2, 3]);
    expect(result).toHaveLength(3);

    // Good/Better assertion
    expect(result).toEqual(expect.arrayContaining([2, 1, 3]));
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("toBeMatchers - advanced objects", () => {
  it("should demonstrate advanced object matchers", () => {
    const result = { name: "john", id: 1 };

    // Loose (Too general) assertion
    expect(result).toBeDefined();

    // Tight (Too specific) assertion
    // expect(result).toEqual({ name: "john" });

    // Good/Better assertion
    expect(result).toMatchObject({ name: "john" });
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("name", "john");
    expect(typeof result.name).toBe("string");
    expect(result.name).toBeTypeOf("string");
  });
});
