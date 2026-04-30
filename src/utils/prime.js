export function isPrimeNumber(number) {
  if (typeof number !== "number") return NaN;
  let count = 0;
  for (let i = 1; i <= number; i++) if (number % i === 0) count++;
  return count === 2 ? true : false;
}

export function getSumOfPrimeNumber(number) {
  if (typeof number !== "number") return NaN;
  let sum = 0;
  for (let i = 1; i <= number; i++) {
    let primeCounter = 0;
    let currentNumber = i;
    for (let j = 1; j <= currentNumber; j++) {
      if (currentNumber % j === 0) primeCounter++;
    }
    if (primeCounter === 2) sum += currentNumber;
  }
  return sum;
}

export function getAverageOfPrimeNumber(number) {
  if (typeof number !== "number") return NaN;
  let sum = 0;
  let primeCounter = 0;
  for (let i = 1; i <= number; i++) {
    let counter = 0;
    let currentNumber = i;
    for (let j = 1; j <= currentNumber; j++) {
      if (currentNumber % j === 0) counter++;
    }
    if (counter === 2) {
      sum += currentNumber;
      primeCounter++;
    }
  }

  return primeCounter === 0 ? 0 : sum / primeCounter;
}
