export function generateCode(
  minValue: number = 100000,
  maxValue: number = 999999,
): number {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

export default {
  generateCode,
};

console.log(generateCode());
const minimum = 100;
const maximum = 999;

console.log(Math.floor(Math.random() * (maximum - minimum + 1)) + 100);
