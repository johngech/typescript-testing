// Lesson: Writing your first tests
export function max(a: number, b: number): number {
  return a >= b ? a : b;
}

// Exercise
export function fizzBuzz(n: number): string | number {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

export function calculateAverage(numbers: number[] = []): number {
  if (numbers.length === 0) return Number.NaN;
  const sum = numbers.reduce((acc, cur) => acc + cur, 0);

  return sum / numbers.length;
}

export function factorial(number: number): number | undefined {
  if (number < 0) return undefined;
  if (number === 0 || number === 1) return 1;
  return number * factorial(number - 1)!;
}

export function square(number: number): number {
  return number * number;
}

export function combine(value: (string | number)[]): number | string {
  if (value.length === 0) return 0;

  // If all elements are numbers, sum them
  if (value.every((item) => typeof item === "number"))
    return value.reduce((acc, cur) => acc + cur, 0);

  // Otherwise, concatenate as strings
  return value.map((item) => String(item)).join("");
}

export const fibonacci = (number: number): number => {
  if (number < 0) throw new Error("Input must be non-negative");
  if (!Number.isInteger(number)) return 0;
  if (number <= 2) return 1;
  return fibonacci(number - 1) + fibonacci(number - 2);
};

export function getSumOfFibonacci(number: number): number {
  if (number < 0) throw new Error("Input must be non-negative");
  if (!Number.isInteger(number)) return 0;
  const range = Array.from({ length: number }, (_, i) => i + 1);
  return range.map((x) => fibonacci(x)).reduce((acc, cur) => acc + cur, 0);
}

export function digitSum(number: number): number {
  const isNegative = number < 0;
  number = Math.abs(number);
  let sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }
  return isNegative ? -1 * sum : sum;
}

// Get all prime numbers
export function getListOfPrimeNumbers(n: number): number[] {
  // Step 1: Create an array of boolean values
  let primes = new Array(n + 1).fill(true);
  primes[0] = primes[1] = false; // 0 and 1 are not prime numbers
  for (let p = 2; p * p <= n; p++) {
    if (primes[p]) {
      // Step 3: Mark multiples of p as not prime
      for (let i = p * p; i <= n; i += p) {
        primes[i] = false;
      }
    }
  }
  // Step 4: Collect all prime numbers
  let primeNumbers: number[] = [];
  for (let i = 2; i <= n; i++) {
    if (primes[i]) {
      primeNumbers.push(i);
    }
  }

  return primeNumbers;
}

export function isPalindrome(value: unknown): boolean {
  if (value == null) return false;
  // Convert and remove any non alphanumberic character.
  const originalNumber = String(value).replace(/[^a-zA-Z0-9]/g, "");
  let reversedString = originalNumber.split("").reverse().join("");
  return originalNumber === reversedString;
}

export class Point {
  #x: number;
  #y: number;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  calculateDistance(point: Point): number {
    const Dx = point.#x - this.#x;
    const Dy = point.#y - this.#y;
    return Math.sqrt(Math.pow(Dx, 2) + Math.pow(Dy, 2));
  }

  setX(x: number): void {
    this.#x = x;
  }

  getX(): number {
    return this.#x;
  }

  setY(y: number): void {
    this.#y = y;
  }

  getY(): number {
    return this.#y;
  }
}
