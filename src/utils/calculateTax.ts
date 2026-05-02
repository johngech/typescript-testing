export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface TaxCalculationResult {
  tax: number;
  effectiveRate: number;
  bracket: TaxBracket;
  income: number;
}

export interface TaxOptions {
  brackets?: TaxBracket[];
  year?: number;
}

const DEFAULT_BRACKETS: TaxBracket[] = [
  { min: 0, max: 10000, rate: 0.1 },
  { min: 10001, max: 50000, rate: 0.15 },
  { min: 50001, max: 100000, rate: 0.2 },
  { min: 100001, max: Infinity, rate: 0.25 },
];

export function calculateTax(
  income: number,
  options: TaxOptions = {},
): TaxCalculationResult {
  if (income < 0) {
    throw new Error(
      `Invalid income: must be a non-negative number, got ${income}`,
    );
  }

  const brackets = options.brackets ?? DEFAULT_BRACKETS;
  const bracket =
    brackets.find((b) => income >= b.min && income <= b.max) ??
    (brackets.at(-1) as TaxBracket);

  const tax = income * bracket.rate;
  const effectiveRate = income > 0 ? tax / income : 0;

  return {
    tax: Number(tax.toFixed(2)),
    effectiveRate: Number(effectiveRate.toFixed(4)),
    bracket,
    income,
  };
}

export async function calculateTaxAsync(
  income: number,
  options: TaxOptions = {},
): Promise<TaxCalculationResult> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = calculateTax(income, options);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, 10);
  });
}
