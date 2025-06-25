import React from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { formatRupee } from '../../utils/formatCurrency';

const CustomExpenseLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
          <p className='text-xs font-semibold text-red-800 mb-1'>{payload[0].payload.category}</p>
          <p className='text-sm text-gray-600'>
            Amount: <span className='text-sm font-medium text-gray-900'>{formatRupee(payload[0].payload.amount)}</span>
          </p>
        </div>
      )
    }
    return null;
  };

  return (
    <div className='bg-white'>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='expenseGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#FA2C37' stopOpacity={0.4} />
              <stop offset='95%' stopColor='#FA2C37' stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke='none' />
          <XAxis dataKey='month' tick={{ fontSize: 12, fill: '#555' }} stroke='none' />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke='none' />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type='monotone'
            dataKey='amount'
            stroke='#FA2C37'
            fill='url(#expenseGradient)'
            strokeWidth={3}
            dot={{ r: 3, fill: '#FA2C37' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomExpenseLineChart;
