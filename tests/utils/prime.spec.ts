import { describe, it, expect, beforeAll } from "vitest";
import {
  isPrimeNumber,
  isPrimeNumberAsync,
  primeFactorization,
  getNthPrime,
  getPrimesInRange,
  PrimeSieve,
  getSumOfPrimeNumber,
  getAverageOfPrimeNumber,
} from "../../src/utils/prime";

describe("isPrimeNumber", () => {
  it("should return false for numbers less than 2", () => {
    expect(isPrimeNumber(0)).toBe(false);
    expect(isPrimeNumber(1)).toBe(false);
    expect(isPrimeNumber(-5)).toBe(false);
  });

  it.each([2, 3, 5, 7, 11, 13, 17, 19, 97])(
    "should return true for prime numbers",
    (n) => {
      expect(isPrimeNumber(n)).toBe(true);
    }
  );

  it.each([4, 6, 8, 9, 10, 100])(
    "should return false for composite numbers",
    (n) => {
      expect(isPrimeNumber(n)).toBe(false);
    }
  );

  it("should return false for non-integer numbers", () => {
    expect(isPrimeNumber(3.5)).toBe(false);
  });

  it("should return false for NaN", () => {
    expect(isPrimeNumber(Number.NaN)).toBe(false);
  });
});

describe("isPrimeNumberAsync", () => {
  it("should return true for prime numbers asynchronously", async () => {
    const result = await isPrimeNumberAsync(17);

    expect(result).toBe(true);
  });

  it("should return false for composite numbers asynchronously", async () => {
    const result = await isPrimeNumberAsync(100);

    expect(result).toBe(false);
  });

  it("should timeout for very large numbers", async () => {
    await expect(isPrimeNumberAsync(9999999999999, 1)).rejects.toThrow(
      /timed out/
    );
  });

  it.concurrent("should handle edge case numbers", async () => {
    const result1 = await isPrimeNumberAsync(2);
    const result2 = await isPrimeNumberAsync(1);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });
});

describe("primeFactorization", () => {
  it("should return empty array for numbers less than 2", () => {
    expect(primeFactorization(0)).toEqual([]);
    expect(primeFactorization(1)).toEqual([]);
  });

  it.each([7, 13, 19])(
    "should return the number itself for prime numbers",
    (n) => {
      expect(primeFactorization(n)).toEqual([n]);
    }
  );

  it.each([
    { given: 12, expected: [2, 2, 3] },
    { given: 60, expected: [2, 2, 3, 5] },
    { given: 100, expected: [2, 2, 5, 5] },
  ])(
    "should return prime factors for composite numbers",
    ({ given, expected }) => {
      expect(primeFactorization(given)).toEqual(expected);
    }
  );
});

describe("getNthPrime", () => {
  it("should return null for non-positive n", () => {
    expect(getNthPrime(0)).toBeNull();
    expect(getNthPrime(-1)).toBeNull();
  });

  it.each([
    { given: 1, expected: 2 },
    { given: 2, expected: 3 },
    { given: 3, expected: 5 },
    { given: 4, expected: 7 },
    { given: 5, expected: 11 },
    { given: 10, expected: 29 },
  ])("should return correct nth prime", ({ given, expected }) => {
    expect(getNthPrime(given)).toBe(expected);
  });
});

describe("getPrimesInRange", () => {
  it.each([
    { min: 1, max: 10, expected: [2, 3, 5, 7] },
    { min: 10, max: 20, expected: [11, 13, 17, 19] },
  ])("should return primes in the given range", ({ min, max, expected }) => {
    expect(getPrimesInRange(min, max)).toEqual(expected);
  });

  it("should return empty array if no primes in range", () => {
    expect(getPrimesInRange(0, 1)).toEqual([]);
  });

  it("should handle when min is greater than max", () => {
    expect(getPrimesInRange(20, 10)).toEqual([]);
  });

  it("should include boundary values if prime", () => {
    expect(getPrimesInRange(2, 2)).toEqual([2]);
  });
});

describe("PrimeSieve", () => {
  let sieve: PrimeSieve;

  beforeAll(() => {
    sieve = new PrimeSieve(1000);
  });

  it("should correctly identify primes using sieve", () => {
    expect(sieve.isPrime(2)).toBe(true);
    expect(sieve.isPrime(17)).toBe(true);
    expect(sieve.isPrime(4)).toBe(false);
    expect(sieve.isPrime(100)).toBe(false);
  });

  it("should return all primes up to max", () => {
    const primes = sieve.getPrimes();

    expect(primes[0]).toBe(2);
    expect(primes).toContain(97);
    expect(primes).not.toContain(4);
  });

  it("should return the max value", () => {
    expect(sieve.getMax()).toBe(1000);
  });

  it("should handle numbers beyond sieve max using fallback", () => {
    expect(sieve.isPrime(10000)).toBe(false);
    expect(sieve.isPrime(9973)).toBe(true); // known large prime
  });

  it("should reset sieve with new max", () => {
    sieve.reset(100);
    expect(sieve.getMax()).toBe(100);
    expect(sieve.getPrimes().length).toBe(25); // 25 primes up to 100
  });
});

describe("getSumOfPrimeNumber", () => {
  it("should return 0 for numbers less than 2", () => {
    expect(getSumOfPrimeNumber(0)).toBe(0);
    expect(getSumOfPrimeNumber(1)).toBe(0);
  });

  it("should return sum of primes up to n", () => {
    expect(getSumOfPrimeNumber(10)).toBe(17); // 2+3+5+7
    expect(getSumOfPrimeNumber(20)).toBe(77); // 2+3+5+7+11+13+17+19
  });
});

describe("getAverageOfPrimeNumber", () => {
  it("should return 0 for numbers less than 2", () => {
    expect(getAverageOfPrimeNumber(0)).toBe(0);
    expect(getAverageOfPrimeNumber(1)).toBe(0);
  });

  it("should return average of primes up to n", () => {
    expect(getAverageOfPrimeNumber(10)).toBe(4.25); // (2+3+5+7)/4
    expect(getAverageOfPrimeNumber(20)).toBe(9.625); // (2+3+5+7+11+13+17+19)/8
  });
});
