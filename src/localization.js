const percentageFormat = new Intl.NumberFormat(window.navigator.language, {
  style: "percent",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

module.exports = { percentageFormat };
