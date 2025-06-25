export const formatRupee = (amount) => {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // remove decimals if you don't want .00
  }).format(amount);

  return formattedAmount;
};

export const formatRupeeWithDecimals = (amount) => {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
};
