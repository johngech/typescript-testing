export interface SumOptions {
  ignoreNegatives?: boolean;
  ignoreZeros?: boolean;
  transform?: (n: number) => number;
}

export function getSum(...numbers: number[]): number {
  numbers.forEach((num, index) => {
    if (Number.isNaN(num)) {
      throw new TypeError(
        `Invalid number at index ${index}: expected number, got ${typeof num}`,
      );
    }
  });
  return numbers.reduce((acc, cur) => acc + cur, 0);
}

export async function getSumAsync(...numbers: number[]): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = getSum(...numbers);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, 10);
  });
}

export function getSumWithOptions(
  numbers: number[],
  options: SumOptions = {},
): number {
  let filtered = [...numbers];

  if (options.ignoreNegatives) filtered = filtered.filter((num) => num >= 0);

  if (options.ignoreZeros) filtered = filtered.filter((num) => num !== 0);

  if (options.transform) filtered = filtered.map(options.transform);

  return getSum(...filtered);
}
