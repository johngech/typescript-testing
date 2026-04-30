export function calculateTax(income, taxRate = 0.15) {
  if (typeof income !== "number" || income < 0) return NaN;
  return income * taxRate;
}
