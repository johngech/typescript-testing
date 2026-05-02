export function isPrimeNumber(n: number): boolean {
  if (typeof n !== "number" || isNaN(n) || n < 2) return false;
  if (!Number.isInteger(n)) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export async function isPrimeNumberAsync(
  n: number,
  timeoutMs: number = 1000
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Prime check timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    setTimeout(() => {
      try {
        const result = isPrimeNumber(n);
        clearTimeout(timer);
        resolve(result);
      } catch (error) {
        clearTimeout(timer);
        reject(error);
      }
    }, 10);
  });
}

export function primeFactorization(n: number): number[] {
  if (n <= 1) return [];
  const factors: number[] = [];
  let num = n;

  while (num % 2 === 0) {
    factors.push(2);
    num = num / 2;
  }

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    while (num % i === 0) {
      if (isPrimeNumber(i)) factors.push(i);
      num = num / i;
    }
  }

  if (num > 2 && isPrimeNumber(num)) factors.push(num);
  return factors;
}

export function getNthPrime(n: number): number | null {
  if (n <= 0) return null;
  let count = 0;
  let num = 2;

  while (count < n) {
    if (isPrimeNumber(num)) {
      count++;
      if (count === n) return num;
    }
    num++;
  }
  return null;
}

export function getPrimesInRange(min: number, max: number): number[] {
  const primes: number[] = [];
  for (let i = Math.max(2, min); i <= max; i++) {
    if (isPrimeNumber(i)) primes.push(i);
  }
  return primes;
}

export class PrimeSieve {
  private sieve: boolean[];
  private max: number;
  private primeCache: number[];

  constructor(max: number = 1000000) {
    this.max = max;
    this.sieve = new Array(max + 1).fill(true);
    this.sieve[0] = this.sieve[1] = false;

    for (let i = 2; i * i <= max; i++) {
      if (this.sieve[i]) {
        for (let j = i * i; j <= max; j += i) {
          this.sieve[j] = false;
        }
      }
    }

    this.primeCache = [];
    for (let i = 2; i <= max; i++) {
      if (this.sieve[i]) this.primeCache.push(i);
    }
  }

  isPrime(n: number): boolean {
    if (n < 0 || n > this.max) {
      return isPrimeNumber(n);
    }
    return this.sieve[n];
  }

  getPrimes(): number[] {
    return [...this.primeCache];
  }

  getMax(): number {
    return this.max;
  }

  reset(newMax: number): void {
    this.max = newMax;
    this.sieve = new Array(newMax + 1).fill(true);
    this.sieve[0] = this.sieve[1] = false;

    for (let i = 2; i * i <= newMax; i++) {
      if (this.sieve[i]) {
        for (let j = i * i; j <= newMax; j += i) {
          this.sieve[j] = false;
        }
      }
    }

    this.primeCache = [];
    for (let i = 2; i <= newMax; i++) {
      if (this.sieve[i]) this.primeCache.push(i);
    }
  }
}

export function getSumOfPrimeNumber(number: number): number {
  if (number < 2) return 0;
  let sum = 0;
  for (let i = 2; i <= number; i++) {
    if (isPrimeNumber(i)) sum += i;
  }
  return sum;
}

export function getAverageOfPrimeNumber(number: number): number {
  if (number < 2) return 0;
  let sum = 0;
  let count = 0;
  for (let i = 2; i <= number; i++) {
    if (isPrimeNumber(i)) {
      sum += i;
      count++;
    }
  }
  return count === 0 ? 0 : sum / count;
}
