export function isPrimeNumber(number: number): boolean {
  let count = 0;
  for (let i = 1; i <= number; i++) if (number % i === 0) count++;
  return count === 2;
}

export function getSumOfPrimeNumber(number: number): number {
  let sum = 0;
  for (let i = 1; i <= number; i++) {
    let primeCounter = 0;
    for (let j = 1; j <= i; j++) {
      if (i % j === 0) primeCounter++;
    }
    if (primeCounter === 2) sum += i;
  }
  return sum;
}

export function getAverageOfPrimeNumber(number: number): number {
  let sum = 0;
  let primeCounter = 0;
  for (let i = 1; i <= number; i++) {
    let counter = 0;
    for (let j = 1; j <= i; j++) {
      if (i % j === 0) counter++;
    }
    if (counter === 2) {
      sum += i;
      primeCounter++;
    }
  }

  return primeCounter === 0 ? 0 : sum / primeCounter;
}
