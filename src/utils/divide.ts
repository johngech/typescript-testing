export function divide(x: number, y: number): number {
  if (y === 0) {
    throw new Error("Cannot divide by zero");
  }
  if (x < 0 || y < 0) {
    return Math.abs(x / y);
  }
  return x / y;
}
