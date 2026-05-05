export class DivisionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DivisionError";
  }
}

export interface DivideOptions {
  precision?: number;
}

export function divide(
  x: number,
  y: number,
  options: DivideOptions = {}
): number {
  if (Number.isNaN(x)) throw new DivisionError("Invalid dividend");

  if (Number.isNaN(y)) throw new DivisionError("Invalid divisor");

  if (y === 0) throw new DivisionError("Division by zero");

  let result = x / y;
  if (options.precision !== undefined)
    result = Number(result.toFixed(options.precision));

  return result;
}
