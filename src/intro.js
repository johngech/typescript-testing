// Lesson: Writing your first tests
export function max(a, b) {
  return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

export function factorial(number) {
  if (number < 0) return undefined;
  return number === 0 || number === 1 ? 1 : number * factorial(number - 1);
}

export function square(number) {
  return number * number;
}

export function add(numbers) {
  let sum = 0;

  for (const number of numbers) sum += Number(number);
  return sum;
}

const fibonacii = (number) => {
  // if(number === undefined) return undefined;
  // else if(number <= 2) return 1;
  // return fibonacii(number-1)+ fibonacii(number-2);
  return number === undefined
    ? undefined
    : number <= 2
    ? 1
    : fibonacii(number - 1) + fibonacii(number - 2);
};
export function computeFibonacii(number) {
  if (typeof number !== "number") return undefined;
  let result = 0;
  for (let x = 1; x <= number; x++) result = fibonacii(x);
  return result;
}

export function digitSum(number) {
  if (typeof number !== "number") return undefined;
  if (number < 0) return number;
  let sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = parseInt((number /= 10));
  }
  return sum;
}

// Get all prime numbers
export function sieveOfEratosthens(n) {
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
  let primeNumbers = [];
  for (let i = 2; i <= n; i++) {
    if (primes[i]) {
      primeNumbers.push(i);
    }
  }

  return primeNumbers;
}

export function isPalindrome(value) {
  if (value === undefined || value === null) return false;
  // Convert and remove any non alphanumberic character.
  const originalNumber = value.toString().replace(/[^a-zA-Z0-9]/g, "");
  let reversedString = originalNumber.split("").reverse().join("");
  return originalNumber === reversedString;
}
export class Point {
  #x;
  #y;
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  calculateDistance(point) {
    const Dx = point.#x - this.#x;
    const Dy = point.#y - this.#y;
    return Math.sqrt(Math.pow(Dx, 2) + Math.pow(Dy, 2));
  }
  setX(x) {
    this.#x = x;
  }
  getX() {
    return this.#x;
  }

  setY(y) {
    this.#y = y;
  }
  getY() {
    return this.#y;
  }
}
