import { it, expect, describe } from "vitest";

import {
  max,
  fizzBuzz,
  calculateAverage,
  factorial,
  square,
  combine,
  fibonacci,
  getSumOfFibonacci,
  digitSum,
  getListOfPrimeNumbers,
  isPalindrome,
} from "../src/intro";

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

describe("fizzBuzz", () => {
  it("should return 'FizzBuzz' if given number is divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return 'Fizz' if given arg is only divisible by 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });

  it("should return 'Buzz' if given arg is only divisible by 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  it("should return arg as a string if given arg is not divisible by both 3 and 5", () => {
    expect(fizzBuzz(1)).toBe("1");
  });
});

/**
 *  Test Driven Development (TDD) ==> Test First approach
 * 1. Start by writing a failing test
 * 2. Write just enough code to make the test pass
 * 3. Refactor the code if necessary
 */

describe("calculateAverage", () => {
  it("should return NaN if given array is empty", () => {
    expect(calculateAverage([])).toBeNaN();
  });

  it("should calculate the average of an array when single element is given", () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it("should calculate the average of an array when two arguments are given", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  it("should calculate the average of an array when three arguments are given", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe("factorial", () => {
  it("should return undefined if given arg is less than zero", () => {
    expect(factorial(-1)).toBeUndefined();
  });

  it.each([
    { actual: 0, expected: 1 },
    { actual: 1, expected: 1 },
    { actual: 2, expected: 2 },
    { actual: 3, expected: 6 },
    { actual: 4, expected: 24 },
  ])(
    "should return $expected if given arg is $actual",
    ({ actual, expected }) => {
      expect(factorial(actual)).toBe(expected);
    }
  );
});

describe("square", () => {
  it.each([
    { actual: -0.5, expected: 0.25 },
    { actual: -2, expected: 4 },
    { actual: -1, expected: 1 },
    { actual: 0, expected: 0 },
    { actual: 1, expected: 1 },
    { actual: -2, expected: 4 },
    { actual: 0.5, expected: 0.25 },
  ])(
    "should return '$expected' if provided arg is '$actual'",
    ({ actual, expected }) => {
      expect(square(actual)).toBe(expected);
    }
  );
});

describe("combine", () => {
  it("should return '0' if provided an empty array", () => {
    expect(combine([])).toBe(0);
  });

  it.each([
    { actual: [-1, 0, 1], expected: 0 },
    { actual: ["a", "b", "1"], expected: "ab1" },
    { actual: ["-1", "0", "1"], expected: "-101" },
    { actual: ["a", "0", 1], expected: "a01" },
  ])(
    "should return '$expected' if provided arg is '$actual'",
    ({ actual, expected }) => {
      expect(combine(actual)).toBe(expected);
    }
  );
});

describe("fibonacci", () => {
  it("should throw an error if given arg is less than zero", () => {
    expect(() => fibonacci(-1)).toThrow(/non-negative/);
  });

  it("should return 0 if provided arg is not an integer", () => {
    expect(fibonacci(1.1)).toBe(0);
    expect(fibonacci(0.5)).toBe(0);
  });

  it.each([
    { n: 1, expected: 1 },
    { n: 2, expected: 1 },
    { n: 3, expected: 2 },
    { n: 4, expected: 3 },
    { n: 5, expected: 5 },
    { n: 6, expected: 8 },
  ])(
    "should return $expected for the $n-th Fibonacci number",
    ({ n, expected }) => {
      expect(fibonacci(n)).toBe(expected);
    }
  );
});

describe("getSumOfFibonacci", () => {
  it("should throw an error if given arg is less than zero", () => {
    expect(() => getSumOfFibonacci(-1)).toThrow(/non-negative/);
  });

  it("should return 0 if provided arg is not an integer", () => {
    expect(getSumOfFibonacci(1.1)).toBe(0);
    expect(getSumOfFibonacci(0.1)).toBe(0);
  });

  it.each([
    { n: 1, expected: 1 },
    { n: 2, expected: 2 },
    { n: 3, expected: 4 },
    { n: 4, expected: 7 },
    { n: 5, expected: 12 },
    { n: 6, expected: 20 },
  ])(
    "should return $expected for the sum of Fibonacci numbers from 1 to $n",
    ({ n, expected }) => {
      expect(getSumOfFibonacci(n)).toBe(expected);
    }
  );
});

describe("digitSum", () => {
  it.each([
    { n: -123, expected: -6 },
    { n: -10, expected: -1 },
    { n: -1, expected: -1 },
    { n: 0, expected: 0 },
    { n: 1, expected: 1 },
    { n: 10, expected: 1 },
    { n: 20, expected: 2 },
    { n: 123, expected: 6 },
  ])(
    "should return '$expected' as the sum of the digit '$actual' if provided",
    ({ n, expected }) => {
      expect(digitSum(n)).toBe(expected);
    }
  );
});

describe("getListOfPrimeNumbers", () => {
  it.each([
    { n: -1, expected: [] },
    { n: 0, expected: [] },
    { n: 1, expected: [] },
  ])(
    "should return '$expected' when provided arg is less than 2, which is '$n'",
    ({ n, expected }) => {
      expect(getListOfPrimeNumbers(n)).toStrictEqual(expected);
    }
  );

  it.each([
    { n: -1.1, expected: [] },
    { n: 0.5, expected: [] },
    { n: 1.1, expected: [] },
  ])(
    "should return '$expected' when provided arg is not an integer, which is '$n'",
    ({ n, expected }) => {
      expect(getListOfPrimeNumbers(n)).toStrictEqual(expected);
    }
  );

  it.each([
    { n: 2, expected: [2] },
    { n: 3, expected: [2, 3] },
    { n: 4, expected: [2, 3] },
    { n: 5, expected: [2, 3, 5] },
    { n: 6, expected: [2, 3, 5] },
    { n: 7, expected: [2, 3, 5, 7] },
    { n: 19, expected: [2, 3, 5, 7, 11, 13, 17, 19] },
  ])(
    "should return '$expected' when provided arg is '$n'",
    ({ n, expected }) => {
      expect(getListOfPrimeNumbers(n)).toStrictEqual(expected);
    }
  );
});

describe("isPalindrome", () => {
  it.each([
    { value: 123 },
    { value: 10 },
    { value: -123 },
    { value: "abc" },
    { value: "1a3" },
  ])(
    "should return false if provided arg is not palindrome,which is '$value'",
    ({ value }) => {
      expect(isPalindrome(value)).toBeFalsy();
    }
  );

  it.each([
    { value: 121 },
    { value: 101 },
    { value: -131 },
    { value: "aba" },
    { value: "radar" },
  ])(
    "should return true if provided arg is palindrome,which is $value",
    ({ value }) => {
      expect(isPalindrome(value)).toBeTruthy();
    }
  );
});
