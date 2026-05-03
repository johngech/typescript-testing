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
  return number * (factorial(number - 1) as number);
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

// Get all prime numbers up to n using Sieve of Eratosthenes
export function getListOfPrimeNumbers(n: number): number[] {
  if (n < 2 || !Number.isInteger(n)) return [];

  // Initialize sieve: index represents number, value represents isPrime
  const sieve = new Array(n + 1).fill(true);
  sieve[0] = sieve[1] = false;

  // Mark non-prime numbers
  for (let p = 2; p * p <= n; p++) {
    if (sieve[p]) {
      for (let multiple = p * p; multiple <= n; multiple += p) {
        sieve[multiple] = false;
      }
    }
  }

  // Collect prime numbers using filter
  return Array.from({ length: n + 1 }, (_, i) => i).filter((i) => sieve[i]);
}

export function isPalindrome(value: string | number): boolean {
  // Convert to string and remove non-alphanumeric characters
  const cleaned = String(value).replaceAll(/[^a-zA-Z0-9]/g, "");
  const chars = Array.from(cleaned);

  // Check if palindrome using two-pointer approach
  for (let i = 0; i < Math.floor(chars.length / 2); i++) {
    if (chars[i] !== chars[chars.length - 1 - i]) return false;
  }

  return true;
}
