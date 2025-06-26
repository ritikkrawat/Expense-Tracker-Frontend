import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#22C55E', '#875CF5','#FA2C37'];

const formatRupee = (amount) => {
  return `₹${new Intl.NumberFormat('en-IN').format(amount)}`;
};

const FinanceOverView = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: 'Total Income', amount: totalIncome },
    { name: 'Total Balance', amount: totalBalance },
    { name: 'Total Expense', amount: totalExpense },
  ];

  return (
    <div className='card transition-all duration-200 hover:shadow-xl hover:scale-[1.01] hover:border hover:border-blue-100 hover:bg-blue-50/20'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={formatRupee(totalBalance)}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverView;
