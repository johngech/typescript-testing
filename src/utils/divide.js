export function divide(x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new TypeError("Both inputs must be numbers");
  }
  if (y === 0) {
    throw new Error("Cannot divide by zero");
  }
  if (x < 0 || y < 0) {
    return Math.abs(x / y);
  }
  return x / y;
}
