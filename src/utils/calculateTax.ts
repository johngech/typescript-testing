export function calculateTax(income: number, taxRate: number = 0.15): number {
  if (income < 0) return NaN;
  return income * taxRate;
}
