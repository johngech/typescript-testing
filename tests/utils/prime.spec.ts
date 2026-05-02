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

  it("should return true for prime numbers", () => {
    expect(isPrimeNumber(2)).toBe(true);
    expect(isPrimeNumber(3)).toBe(true);
    expect(isPrimeNumber(5)).toBe(true);
    expect(isPrimeNumber(7)).toBe(true);
    expect(isPrimeNumber(11)).toBe(true);
    expect(isPrimeNumber(13)).toBe(true);
    expect(isPrimeNumber(97)).toBe(true);
  });

  it("should return false for composite numbers", () => {
    expect(isPrimeNumber(4)).toBe(false);
    expect(isPrimeNumber(6)).toBe(false);
    expect(isPrimeNumber(8)).toBe(false);
    expect(isPrimeNumber(9)).toBe(false);
    expect(isPrimeNumber(10)).toBe(false);
    expect(isPrimeNumber(100)).toBe(false);
  });

  it("should return false for non-integer numbers", () => {
    expect(isPrimeNumber(3.5)).toBe(false);
  });

  it("should return false for NaN", () => {
    expect(isPrimeNumber(NaN)).toBe(false);
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
    await expect(isPrimeNumberAsync(9999999999999, 1)).rejects.toThrow(/timed out/);
  });

  it("should handle edge case numbers", async () => {
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

  it("should return the number itself for prime numbers", () => {
    expect(primeFactorization(7)).toEqual([7]);
    expect(primeFactorization(13)).toEqual([13]);
  });

  it("should return prime factors for composite numbers", () => {
    expect(primeFactorization(12)).toEqual([2, 2, 3]);
    expect(primeFactorization(60)).toEqual([2, 2, 3, 5]);
    expect(primeFactorization(100)).toEqual([2, 2, 5, 5]);
  });
});

describe("getNthPrime", () => {
  it("should return null for non-positive n", () => {
    expect(getNthPrime(0)).toBeNull();
    expect(getNthPrime(-1)).toBeNull();
  });

  it("should return correct nth prime", () => {
    expect(getNthPrime(1)).toBe(2);
    expect(getNthPrime(2)).toBe(3);
    expect(getNthPrime(3)).toBe(5);
    expect(getNthPrime(4)).toBe(7);
    expect(getNthPrime(5)).toBe(11);
    expect(getNthPrime(10)).toBe(29);
  });
});

describe("getPrimesInRange", () => {
  it("should return primes in the given range", () => {
    expect(getPrimesInRange(1, 10)).toEqual([2, 3, 5, 7]);
    expect(getPrimesInRange(10, 20)).toEqual([11, 13, 17, 19]);
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
