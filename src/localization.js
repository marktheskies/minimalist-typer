const percentageFormat = new Intl.NumberFormat(window.navigator.language, {
  style: "percent",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const wpmFormat = new Intl.NumberFormat(window.navigator.language, {
  maximumFractionDigits: 0,
});

module.exports = { percentageFormat, wpmFormat };
