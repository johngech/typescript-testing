export function generateCode() {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

export default {
  generateCode,
};

console.log(generateCode());
const minimum = 100;
const maximum = 999;

console.log(Math.floor(Math.random() * (maximum - minimum + 1)) + 100);
