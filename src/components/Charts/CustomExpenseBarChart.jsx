import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatRupee } from '../../utils/formatCurrency';

const CustomExpenseBarChart = ({ data }) => {

  const maxAmount = Math.max(...data.map(item => item.amount));

  const getExpenseBarColor = (amount) => {
    const intensity = amount / maxAmount;
    const red = 250;
    const green = Math.floor(230 - (intensity * 180));
    const blue = Math.floor(230 - (intensity * 180));
    return `rgb(${red},${green},${blue})`;
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
          <p className='text-xs font-semibold text-red-800 mb-1'>{payload[0].payload.category}</p>
          <p className='text-sm text text-gray-600'>
            Amount: <span className='text-sm font-medium text-gray-900'>
              {formatRupee(payload[0].payload.amount)}
            </span>
          </p>
        </div>
      )
    }
    return null;
  };

  return (
    <div className='bg-white mt-6'>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke='none' />
          <XAxis dataKey='month' tick={{ fontSize: 12, fill: '#555' }} stroke='none' />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke='none' />
          <Tooltip content={<CustomToolTip />} />
          <Bar dataKey='amount' radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getExpenseBarColor(entry.amount)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomExpenseBarChart;
