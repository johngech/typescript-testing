export function getSum(...numbers: number[]): number {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}
