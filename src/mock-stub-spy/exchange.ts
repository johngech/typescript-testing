export const exchange = {
  getExchangeRate() {
    return Math.random() * 100;
  },
  convert(amount: number) {
    return amount * this.getExchangeRate();
  },
};