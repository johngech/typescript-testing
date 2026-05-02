export class DivisionError extends Error {
  constructor(
    message: string,
    public dividend?: number,
    public divisor?: number
  ) {
    super(message);
    this.name = "DivisionError";
  }
}

export interface DivideOptions {
  precision?: number;
}

export function divideSync(
  x: number,
  y: number,
  options: DivideOptions = {}
): number {
  if (typeof x !== "number" || isNaN(x)) {
    throw new DivisionError(`Dividend must be a valid number, got ${x}`);
  }
  if (typeof y !== "number" || isNaN(y)) {
    throw new DivisionError(`Divisor must be a valid number, got ${y}`);
  }
  if (y === 0) {
    throw new DivisionError("Cannot divide by zero", x, y);
  }

  let result = x / y;
  if (options.precision !== undefined) {
    result = Number(result.toFixed(options.precision));
  }
  return result;
}

export async function divide(
  x: number,
  y: number,
  options: DivideOptions = {}
): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = divideSync(x, y, options);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, 10);
  });
}

export function divideWithRemainder(x: number, y: number): {
  quotient: number;
  remainder: number;
  divisible: boolean;
} {
  if (y === 0) {
    throw new DivisionError("Cannot divide by zero", x, y);
  }

  const quotient = Math.floor(x / y);
  const remainder = x - quotient * y;

  return {
    quotient,
    remainder,
    divisible: remainder === 0,
  };
}
