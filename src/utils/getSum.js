export function getSum(...numbers) {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}
