// src/components/Currency.js
import React from 'react';
import { formatRupee } from '../utils/formatCurrency';

const Currency = ({ amount, isExpense }) => {
  const formatted = formatRupee(amount);
  return (
    <span className={isExpense ? 'text-red-500' : 'text-green-600'}>
      {isExpense && '- '}
      {formatted}
    </span>
  );
};

export default Currency;
